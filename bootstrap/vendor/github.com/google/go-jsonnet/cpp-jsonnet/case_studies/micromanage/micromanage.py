# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import collections
import json
import os
import shutil
import subprocess
import sys
import tempfile
import traceback

import _jsonnet

import service_google
import service_amazon
import util
import validate

service_compilers = {
    'Google': service_google.GoogleService(),
    'Amazon': service_amazon.AmazonService(),
}
    
def get_compiler(config, service):
    environments = config['environments']
    environment = environments[service.get('environment', 'default')]
    return service_compilers[environment['kind']], environment
    

def config_check_service(environments, root, path):
    try:
        service = validate.path_val(root, path, 'object')
        env_name = validate.path_val(root, path + ['environment'], 'string', 'default')
        default = env_name == 'default'
        env = environments.get(env_name)
        if env is None:
            if default:
                raise validate.ConfigError(('The service at %s has no environment field, and no ' +
                                            'environment called "default" exists.')
                                           % validate.render_path(path))
            else:
                raise validate.ConfigError('In %s, unrecognized environment %s'
                                           % (validate.render_path(path), env_name))
        compiler = service_compilers.get(env['kind'])
        compiler.validateService(root, path)
        for child_name, child in compiler.children(service):
            config_check_service(environments, root, path + [child_name])
    except validate.ConfigError as e:
        if e.note is None:
            e.note = ('Did you mean for %s to be a visible field (: instead of ::)?'
                      % validate.render_path(path))
        raise
    
def services(config):
    for service_name, service in config.iteritems():
        if service_name == 'environments':
            continue
        yield service_name, service

def config_check(config):
    validate.path_val(config, [], 'object')
    environments = validate.path_val(config, ['environments'], 'object', {})

    # Check environments
    environments = config['environments']
    for env_name, env in environments.iteritems():
        kind_name = validate.path_val(config, ['environments', env_name, 'kind'], 'string')
        compiler = service_compilers.get(kind_name)
        if not compiler:
            raise validate.ConfigError(
                'Unrecognized kind "%s" in environment %s' % (kind_name, env_name))
        compiler.validateEnvironment(config, ['environments', env_name])

    # Check services
    for service_name, service in services(config):
        config_check_service(environments, config, [service_name])

            
ext_vars = {}  # For Jsonnet evaluation
search_paths = [  # Where we look for imported jsonnet files
    os.path.dirname(os.path.realpath(__file__)) + '/lib/'
]
debug = False

#  Returns content if worked, None if file not found, or throws an exception
def jsonnet_try_path(dir, rel):
    if not rel:
        raise RuntimeError('Got invalid filename (empty string).')
    if rel[0] == '/':
        full_path = rel
    else:
        full_path = dir + rel
    if full_path[-1] == '/':
        raise RuntimeError('Attempted to import a directory')

    if not os.path.isfile(full_path):
        return full_path, None
    with open(full_path) as f:
        return full_path, f.read()

    
def jsonnet_import_callback(dir, rel):
    full_path, content = jsonnet_try_path(dir, rel)
    if content:
        return full_path, content
    for path in search_paths:
        full_path, content = jsonnet_try_path(path, rel)
        if content:
            return full_path, content
    raise RuntimeError('File not found')


def config_load(filename, ext_vars):
    try:
        text = _jsonnet.evaluate_file(
            filename,
            max_trace=100,
            ext_vars=ext_vars,
            import_callback=jsonnet_import_callback)
    except RuntimeError as e:
        # Error from Jsonnet
        sys.stderr.write(e.message)
        sys.stderr.write('\n')
        sys.exit(1)

    config = json.loads(text)
    try:
        config_check(config)
    except validate.ConfigError as e:
        if debug:
            traceback.print_exc()
        else:
            sys.stderr.write('Config error: %s\n' % e.message)
        if e.note:
            sys.stderr.write('%s\n' % e.note)
        sys.exit(1)
    return config


def preprocess(config):
    """Return a copy of the config with ${-} handled."""

    def aux(ctx, service_name, service):
        compiler, _ = get_compiler(config, service)
        r2 = compiler.preprocess(ctx, service_name, service)
        ctx = ctx + [service_name]
        for child_name, child in compiler.children(service):
            r2[child_name] = aux(ctx, child_name, child)
        return r2

    r = {
        'environments': config['environments'],
    }

    for service_name, service in services(config):
        r[service_name] = aux([], service_name, service)

    return r


def get_build_artefacts(config):
    """Create all required build artefacts, modify config to refer to them."""

    def aux(ctx, service_name, service):
        compiler, environment = get_compiler(config, service)
        new_service, service_barts = compiler.getBuildArtefacts(environment, ctx, service)
        ctx = ctx + [service_name]
        for child_name, child in compiler.children(service):
            new_child, child_barts = aux(ctx, child_name, child)
            util.merge_into(service_barts, child_barts)
            new_service[child_name] = new_child
        return new_service, service_barts

    barts = {}
    new_config = {
        'environments': config['environments'],
    }
    for service_name, service in services(config):
        new_service, service_barts = aux([], service_name, service)
        new_config[service_name] = new_service
        util.merge_into(barts, service_barts)
    return new_config, barts


def compile(config, barts):
    def aux(ctx, service_name, service):
        compiler, _ = get_compiler(config, service)
        service_tfs = compiler.compile(ctx, service_name, service, barts)
        ctx = ctx + [service_name]
        for child_name, child in compiler.children(service):
            util.merge_into(service_tfs, aux(ctx, child_name, child))
        return service_tfs

    tfs = {}

    for service_name, service in services(config):
        util.merge_into(tfs, aux([], service_name, service))

    for environment_name, environment in config['environments'].iteritems():
        compiler = service_compilers[environment['kind']]
        tf_dict = compiler.compileProvider(environment_name, environment)
        util.merge_into(tfs, tf_dict)

    # Avoid a warning from Terraform that there are no tf files
    if not len(tfs):
        tfs['empty.tf'] = {}

    for tfname, tf in tfs.iteritems():
        if 'resource' in tf:
            new_resources = {}
            for rtype_name, rtype_dict in tf['resource'].iteritems():
                if rtype_dict:
                    new_resources[rtype_name] = rtype_dict
                    for r_name, r_dict in rtype_dict.iteritems():
                        # depends_on changed to always be a list.
                        if 'depends_on' in r_dict and isinstance(r_dict['depends_on'], basestring):
                            r_dict['depends_on'] = [r_dict['depends_on']]
            # Remove empty resource dicts, workaround for
            # https://github.com/hashicorp/terraform/issues/6368
            tf['resource'] = new_resources
    return tfs


def confirmation_dialog(msg):
    sys.stdout.write('%s  [y/N]:  ' % msg)
    while True:
        choice = raw_input().lower()
        if choice == '':
            choice = 'n'
        if choice in ['y', 'n']:
            break
        sys.stdout.write('Please press either y or n, then hit enter:  ')
    return choice


def output_delete(dirpath):
    shutil.rmtree(dirpath)


def action_blueprint(config_file, config, args):
    if args:
        sys.stderr.write('Action "blueprint" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)
    print(util.jsonstr(config))
        

def generate(dirpath, config, do_build):
    files = []

    config = preprocess(config)
    config, barts = get_build_artefacts(config)

    for bart_name, bart in barts.iteritems():
        bart.outputFiles(dirpath)
        files += bart.getOutputFiles(dirpath)

    if not do_build:
        barts = {}

    barts_to_build = {}
    # Output build artefact files
    for bart_name, bart in barts.iteritems():
        if bart.needsBuild():
            barts_to_build[bart_name] = bart

    for bart_name, bart in barts_to_build.iteritems():
        bart.doBuild(dirpath)

    for bart_name, bart in barts_to_build.iteritems():
        bart.wait(dirpath)

    for bart_name, bart in barts.iteritems():
        bart.postBuild()

    tfs = compile(config, barts)

    # Output Terraform configs
    for filename, tf in tfs.iteritems():
        dirfilename = '%s/%s' % (dirpath, filename)
        files += [dirfilename]
        with open(dirfilename, 'w') as f:
            f.write(util.jsonstr(tf))

    return files


def action_generate_to_editor(config_file, config, args):
    if args:
        sys.stderr.write('Action "generate-to-editor" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)
    dirpath = tempfile.mkdtemp()
    files = generate(dirpath, config, False)
    command = [os.getenv('EDITOR')] + files
    process = subprocess.Popen(command)
    process.wait()
    output_delete(dirpath)


def action_apply(config_file, config, args):
    if args:
        sys.stderr.write('Action "apply" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)

    dirpath = tempfile.mkdtemp()
    generate(dirpath, config, True)

    state_file = config_file + '.tfstate'

    command = ['terraform', 'plan',
               '-state', '%s/%s' % (os.getcwd(), state_file),
               '-detailed-exitcode',
               '-out', 'tf.plan']
    tf_process = subprocess.Popen(command, cwd=dirpath)
    plan_exitcode = tf_process.wait()
    if plan_exitcode == 0:
        pass  # Empty plan, nothing to do
    elif plan_exitcode == 2:
        choice = confirmation_dialog('Apply these changes?')

        if choice == 'y':
            command = ['terraform', 'apply', '-state', '%s/%s' % (os.getcwd(), state_file), 'tf.plan']
            tf_process = subprocess.Popen(command, cwd=dirpath)
            exitcode = tf_process.wait()
            if exitcode != 0:
                sys.stderr.write('Error from terraform apply, aborting.\n')
                sys.exit(1)
        else:
            print 'Not applying the changes.'
    else:
        sys.stderr.write('Error from terraform plan, aborting.\n')
        sys.exit(1)

    output_delete(dirpath)


def action_destroy(config_file, config, args):
    if args:
        sys.stderr.write('Action "apply" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)

    dirpath = tempfile.mkdtemp()
    generate(dirpath, config, False)
    command = ['terraform', 'destroy', '-force', '-state', '%s/%s.tfstate' % (os.getcwd(), config_file)]
    tf_process = subprocess.Popen(command, cwd=dirpath)
    exitcode = tf_process.wait()
    if exitcode != 0:
        sys.stderr.write('Error from terraform, aborting.\n')
        sys.exit(1)
    output_delete(dirpath)


def action_graph(config_file, config, args):
    if args:
        sys.stderr.write('Action "destroy" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)

    dirpath = tempfile.mkdtemp()
    generate(dirpath, config, False)
    dotfilename = '%s/graph.dot' % dirpath
    with open(dotfilename, 'w') as dotfile:
        tf_process = subprocess.Popen(['terraform', 'graph'], stdout=dotfile, cwd=dirpath)
        exitcode = tf_process.wait()
        if exitcode != 0:
            sys.stderr.write('Error from terraform, aborting.\n')
            sys.exit(1)
    pngfilename = '%s/graph.png' % dirpath
    with open(pngfilename, 'w') as pngfile:
        dot_process = subprocess.Popen(['dot', '-Tpng', dotfilename], stdout=pngfile, cwd=dirpath)
        exitcode = dot_process.wait()
        if exitcode != 0:
            sys.stderr.write('Error from dot, aborting.\n')
            sys.exit(1)
    geeqie_process = subprocess.Popen(['geeqie', pngfilename], cwd=dirpath)
    exitcode = geeqie_process.wait()
    if exitcode != 0:
        sys.stderr.write('Error from geeqie, aborting.\n')
        sys.exit(1)
    output_delete(dirpath)



def action_show(config_file, config, args):
    if args:
        sys.stderr.write('Action "destroy" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)

    dirpath = tempfile.mkdtemp()
    generate(dirpath, config, False)
    shutil.copyfile('%s/%s.tfstate' % (os.getcwd(), config_file), dirpath + '/terraform.tfstate')
    tf_process = subprocess.Popen(['terraform', 'show'], cwd=dirpath)
    exitcode = tf_process.wait()
    if exitcode != 0:
        sys.stderr.write('Error from terraform, aborting.\n')
        sys.exit(1)
    output_delete(dirpath)



def action_output(config_file, config, args):
    if args:
        sys.stderr.write('Action "destroy" accepts no arguments, but got:  %s\n' % ' '.join(args))
        sys.exit(1)

    dirpath = tempfile.mkdtemp()
    generate(dirpath, config, False)
    tfstate = '%s/%s.tfstate' % (os.getcwd(), config_file)
    tf_process = subprocess.Popen(['terraform', 'output', '-state=' + tfstate], cwd=dirpath)
    exitcode = tf_process.wait()
    if exitcode != 0:
        sys.stderr.write('Error from terraform, aborting.\n')
        sys.exit(1)
    output_delete(dirpath)



def action_image_gc(config_file, config, args):
    raise RuntimeError('Sorry, this code is currently in a state of ill-repair.')
    config = preprocess(config)
    config, barts = get_build_artefacts(config)

    used_images = collections.defaultdict(lambda: [])
    google_images = {}
    amazon_amis = {}


    for bart_name, bart in barts.iteritems():
        environment = bart.environment
        if environment['kind'] == 'Google':
            project = environment['project']
            used_images[project].append(bart.name())
            if project not in google_images:
                image_tuples = google_get_images_json_key(project, environment['serviceAccount'])
                google_images[project] = image_tuples
        elif environment['kind'] == 'Amazon':
            access_key = environment['accessKey']
            used_images[access_key].append(bart.name())
            if access_key not in amazon_amis:
                image_tuples = amazon_get_images(environment['region'], access_key, environment['secretKey'])
                amazon_amis[access_key] = [image_tuple + (environment,) for image_tuple in image_tuples]
        else:
            raise RuntimeError('Got invalid enviroment kind: "%s"' % iamge_type)


    # Delete all images older than X which are not currently in a version / module
    got_any_google = False
    for project, imgs in google_images.iteritems():
        mmimgs = [img for img in imgs if img[0].startswith('micromanage-') and not img[0] in used_images[project]]
        for img in mmimgs:
            if (now - img[1]).days > 7:
                if not got_any_google:
                    got_any_google = True
                    print 'Execute the following commands to clean up Google images:'
                print 'gcloud --project=%s compute images delete -q %s  # %s days old' % (project, img[0],  (now - img[1]).days)
    if not got_any_google:
        print 'There were no Google images to clean up.'

    got_any_amazon = False
    for access_key, imgs in google_images.iteritems():
        mmimgs = [img for img in imgs if img[0].startswith('micromanage-') and not img[0] in used_images[access_key]]
        for img in mmimgs:
            img_name, img_creation_timestamp, env = img
            days_old = (now - img_creation_timestamp).days 
            if days_old > 7:
                if not got_any_amazon:
                    got_any_amazon = True
                    print 'Execute the following commands to clean up Amazon AMIs:'
                region = img[2]['region']
                secret_key = img[2]['secretKey']
                print 'ec2-deregister --region %s --aws-access-key %s --aws-secret-key %s %s  # %s days old' % (region, access_key, secret_key, img_name,  days_old)
                #TODO(dcunnin): need to delete by snapshot-id, not by ami id
                print 'ec2-delete-snapshot --region %s --aws-access-key %s --aws-secret-key %s %s  # %s days old' % (region, access_key, secret_key, img_name, days_old)
    if not got_any_amazon:
        print 'There were no Amazon AMIs to clean up.'


actions = {
    'blueprint': action_blueprint,
    'generate-to-editor': action_generate_to_editor,
    'apply': action_apply,
    'destroy': action_destroy,
    'graph': action_graph,
    'show': action_show,
    'output': action_output,
    'image-gc': action_image_gc,
}


def print_usage(channel):
    channel.write("Usage: python micromanage.py <config.jsonnet> <action> <args>\n")
    channel.write("Available actions: %s\n" % ', '.join(actions.keys()))

remaining_args = []
i = 1

def next_arg(i):
    i += 1
    if i >= len(sys.argv):
        sys.stderr.write('Expected another commandline argument.\n')
        sys.exit(1)
    return i, sys.argv[i]

while i < len(sys.argv):
    arg = sys.argv[i]
    if arg == '-E' or arg == '--env':
        i, env_var = next_arg(i)
        env_val = os.environ.get(env_var)
        if not env_val:
            sys.stderr.write('-E referred to non-existent environment variable "%s".\n' % env_var)
            sys.exit(1)
        ext_vars[env_var] = env_val
    elif arg == '-V' or arg == '--var':
        i, data = next_arg(i)
        splits = string.split(data, '=', 1)
        if len(splits) < 2:
            sys.stderr.write('-V must be followed by key=val, got "%s".\n' % data)
            sys.exit(1)
        ext_vars[splits[0]] = splits[1]
    elif arg == '-J' or arg == '--jpath':
        i, val = next_arg(i)
        search_paths = [val] + search_paths
    elif arg == '-d' or arg == '--debug':
        debug = True
    elif arg == '-f' or arg == '--force':
        force = True
    else:
        remaining_args.append(arg)
    i += 1

if len(remaining_args) < 2:
    sys.stderr.write('Not enough commandline arguments.\n')
    print_usage(sys.stderr)
    sys.exit(1)

config_file = remaining_args[0]
action = remaining_args[1]
args = remaining_args[2:]

if action not in actions:
    sys.stderr.write('Invalid action: "%s"' % action)
    print_usage(sys.stderr)
    sys.exit(1)

config = config_load(config_file, ext_vars)
actions[action](config_file, config, args)

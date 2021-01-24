import yaml
import collections
from pathlib import Path

dependabot = {}
dependabot['version'] = 2
dependabot['updates'] = []
ignored_folders = ['node_modules', 'dist', '.git', 'deprecated']

def get_owners(path):
    while not Path(path/'OWNERS').is_file():
        path = path.parent.absolute()
    with open(path/'OWNERS') as owner_file:
        owners = yaml.load(owner_file)
        return owners

def get_docker_paths():
    dockerfile_list = list(repo_path.glob('**/*ockerfile*'))
    docker_clean_list = []
    for dockerfile in dockerfile_list:
        if all(x not in str(dockerfile) for x in ignored_folders):
            if dockerfile.parents[0] not in docker_clean_list:
                docker_clean_list.append(dockerfile.parents[0])
    return docker_clean_list

def get_npm_paths():
    npm_list = list(repo_path.glob('**/package*.json'))
    npm_clean_list = []
    for npm_file in npm_list:
        if all(x not in str(npm_file) for x in ignored_folders):
            if npm_file.parents[0] not in npm_clean_list:
                npm_clean_list.append(npm_file.parents[0])
    return npm_clean_list

def get_pip_paths():
    pip_list = list(repo_path.glob('**/*requirements.txt'))
    pip_clean_list = []
    for pip_file in pip_list:
        if all(x not in str(pip_file) for x in ignored_folders):
            if pip_file.parents[0] not in pip_clean_list:
                pip_clean_list.append(pip_file.parents[0])
    return pip_clean_list

def get_go_paths():
    go_list = list(repo_path.glob('**/go.*'))
    go_clean_list = []
    for go_file in go_list:
        if all(x not in str(go_file) for x in ignored_folders):
            if go_file.parents[0] not in go_clean_list:
                go_clean_list.append(go_file.parents[0])
    return go_clean_list

def append_updates(ecosystem, directory, assignees, reviewers=None):
    config = {}
    config['package-ecosystem'] = ecosystem
    config['directory'] = directory
    config['schedule']= {}
    config['schedule']['interval'] = 'daily'
    config['open-pull-requests-limit'] = 10
    config['assignees'] = assignees
    if reviewers:
        config['reviewers'] = reviewers
    dependabot['updates'].append(config)

def main():
    for docker_path in get_docker_paths():
        string_path = str(docker_path)
        assignees = get_owners(docker_path).get('approvers')
        reviewers = get_owners(docker_path).get('reviewers')
        append_updates('docker', string_path, assignees, reviewers)

    for npm_path in get_npm_paths():
        string_path = str(npm_path)
        assignees = get_owners(npm_path).get('approvers')
        reviewers = get_owners(npm_path).get('reviewers')
        append_updates('npm', string_path, assignees, reviewers)

    for pip_path in get_pip_paths():
        string_path = str(pip_path)
        assignees = get_owners(pip_path).get('approvers')
        reviewers = get_owners(pip_path).get('reviewers')
        append_updates('pip', string_path, assignees, reviewers)

    for go_path in get_go_paths():
        string_path = str(go_path)
        assignees = get_owners(go_path).get('approvers')
        reviewers = get_owners(go_path).get('reviewers')
        append_updates('gomod', string_path, assignees, reviewers)

    with open('.github/dependabot.yml', 'w') as outfile:
        yaml.dump(dependabot, outfile, default_flow_style=False)

    print(get_docker_paths())
    print(get_npm_paths())
    print(get_pip_paths())
    print(get_go_paths())

if __name__ == "__main__":
    repo_path = Path(__file__).parents[1]
    main()
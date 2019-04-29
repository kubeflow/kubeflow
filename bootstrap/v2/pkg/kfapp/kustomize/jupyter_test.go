package kustomize_test

import (
  "testing"
)

func writeJupyter(th *KustTestHarness) {
  th.writeF("/manifests/jupyter/jupyter/base/config-map.yaml", `
apiVersion: v1
kind: ConfigMap
metadata:
  name: jupyter-config
data:
  jupyter_config.py: |
    # -*- coding: utf-8 -*-
    """
    Configuration file for JupyterHub.

    Kubeflow uses this file as the configuration file for JupyterHub. It contains
    all glue code necessary to integrate JupyterHub with the remaining Kubeflow
    components.

    Note that this file is also responsible for importing the UI-specific Spawner
    class from <ui-dir>/spawner.py, and setting the 'spawner_class' configuration
    option.
    """

    import os
    from importlib.util import spec_from_file_location, module_from_spec
    from jhub_remote_user_authenticator.remote_user_auth import     RemoteUserAuthenticator

    SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'

    # Import the UI-specific Spawner
    spec = spec_from_file_location('spawner', '/etc/config/spawner.py')
    spawner = module_from_spec(spec)
    spec.loader.exec_module(spawner)

    ###################################################
    # JupyterHub Options
    ###################################################
    c.JupyterHub.ip = '0.0.0.0'
    c.JupyterHub.hub_ip = '0.0.0.0'
    # Don't try to cleanup servers on exit - since in general for k8s, we want
    # the hub to be able to restart without losing user containers
    c.JupyterHub.cleanup_servers = False
    ###################################################

    ###################################################
    # Spawner Options
    ###################################################
    c.JupyterHub.spawner_class = spawner.KubeFormSpawner

    c.KubeSpawner.cmd = 'start-singleuser.sh'
    c.KubeSpawner.args = ['--allow-root']
    # gpu images are very large ~15GB. need a large timeout.
    c.KubeSpawner.start_timeout = 60 * 30
    # Increase timeout to 5 minutes to avoid HTTP 500 errors on JupyterHub
    c.KubeSpawner.http_timeout = 60 * 5

    # Volume setup
    c.KubeSpawner.singleuser_uid = 1000
    c.KubeSpawner.singleuser_fs_gid = 100
    c.KubeSpawner.singleuser_working_dir = '/home/jovyan'

    # Allow environment vars to override uid and gid.
    # This allows local host path mounts to be read/writable
    env_uid = os.environ.get('NOTEBOOK_UID')
    if env_uid:
      c.KubeSpawner.singleuser_uid = int(env_uid)
    env_gid = os.environ.get('NOTEBOOK_GID')
    if env_gid:
      c.KubeSpawner.singleuser_fs_gid = int(env_gid)
    access_local_fs = os.environ.get('ACCESS_LOCAL_FS')
    if access_local_fs == 'true':

      def modify_pod_hook(spawner, pod):
        pod.spec.containers[0].lifecycle = {
            'postStart': {
                'exec': {
                    'command': [
                        'ln', '-s', '/mnt/local-notebooks',
                        '/home/jovyan/local-notebooks'
                    ]
                }
            }
        }
        return pod

      c.KubeSpawner.modify_pod_hook = modify_pod_hook

    ###################################################
    # Persistent volume options
    ###################################################

    # Set user_storage_pvc_ensure to False to prevent KubeSpawner from handling PVCs
    # We natively handle PVCs via KubeFormSpawner and its dedicated methods

    # NOTE: user_storage_pvc_ensure has been deprecated in a future release
    c.KubeSpawner.storage_pvc_ensure = False
    c.KubeSpawner.user_storage_pvc_ensure = False

    volumes = []
    volume_mounts = []

    gcp_secret_name = os.environ.get('GCP_SECRET_NAME')
    if gcp_secret_name:
      volumes.append({
          'name': gcp_secret_name,
          'secret': {
              'secretName': gcp_secret_name,
          }
      })
      volume_mounts.append({
          'name': gcp_secret_name,
          'mountPath': SERVICE_ACCOUNT_SECRET_MOUNT
      })

    c.KubeSpawner.volumes = volumes
    c.KubeSpawner.volume_mounts = volume_mounts

    storage_class = None
    if os.environ.get('STORAGE_CLASS') != 'null':
      storage_class = os.environ.get('STORAGE_CLASS')

    rok_secret_name = ''
    if os.environ.get('ROK_SECRET_NAME') != 'null':
      rok_secret_name = os.environ.get('ROK_SECRET_NAME')

    # Set both service_account and singleuser_service_account because
    # singleuser_service_account has been deprecated in a future release
    c.KubeSpawner.service_account = 'jupyter-notebook'
    c.KubeSpawner.singleuser_service_account = 'jupyter-notebook'
    # Authenticator
    if os.environ.get('KF_AUTHENTICATOR') == 'iap':
      c.JupyterHub.authenticator_class = RemoteUserAuthenticator
      c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'
    else:
      c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'

    if os.environ.get('DEFAULT_JUPYTERLAB').lower() == 'true':
      c.KubeSpawner.default_url = '/lab'

    # Set extra spawner configuration variables
    c.KubeSpawner.extra_spawner_config = {
        'gcp_secret_name': gcp_secret_name,
        'storage_class': storage_class,
        'rok_secret_name': rok_secret_name,
    }
  script.js: |
    // This function is executed when the document is ready
    $(function() {

      // Toggle advanced options inside the Spawner form
      $('#toggle_advanced_options').on('click', function(e) {
        $('#advanced_fields').toggle();
      });

      // Resize Spawner form to take up more page width
      $('.row.col-sm-offset-2.col-sm-8').attr({
        'class': 'row col-sm-offset-1 col-sm-10',
        'style': 'padding: 15px;'
      });

      // Update upper-right sign-out icon to FontAwesome 5
      $('.fa.fa-sign-out').attr('class', 'fas fa-sign-out-alt');

      // Update Spawn button text upon form submission
      if (formDefaults) {
        $('#spawn_form').one('submit', function() {
          $(this).find('input[type="submit"]')
          .attr('disabled', true)
          .val('Spawning...');
        });
      } else {
        $("h1:contains('Spawner Options')" ).remove();
        $('#spawn_form').find('input[type="submit"]').remove();
      }

      // Configure Image input elements
      setImageType();

      // Dynamically change Workspace form fields behavior
      setWorkspaceEventListeners();

      // Fill the form with values defined in the YAML config file
      setDefaultFormValues();

      // Set tooltip to readOnly form fields
      setTooltipsOnImmutable();
    });

    // Dynamically update Image input field, based on radio button selection
    function setImageType() {
      imageType = $('#imageType').find('input:checked').val();
      if (imageType == 'standard') {
        $('select[for=standardImages]')
          .attr({'id': 'image', 'name': 'image'}).css({'display': ''});
        $('input[for=customImage]')
          .attr({'id': '', 'name': ''}).removeAttr('required').css({'display': 'none'});
      } else {
        $('input[for=customImage]')
          .attr({'id': 'image', 'name': 'image'}).css({'display': ''});
        $('select[for=standardImages]')
          .attr({'id': '', 'name': ''}).removeAttr('required').css({'display': 'none'});
      }
    }

    // Set default values to form fields
    function setDefaultFormValues() {

      // If config.yaml is empty, no need to initialize anything
      if (!formDefaults) {
        return;
      }

      if ('image' in formDefaults) {
        // Set Container image dropdown list
        if ('options' in formDefaults.image) {
          formDefaults.image.options.forEach(function(item) {
            $('#image').append($('<option/>').attr('value', item).text(item));
          });
        }
        // Set default Container Image, if specified
        $('#image').val('');
        if ('value' in formDefaults.image) {
          $('#image').val(formDefaults.image.value);
        }

        // Make Container Image field readonly, if specified
        if ('readOnly' in formDefaults.image) {
          $('#option_standard').prop({
              'disabled': formDefaults.image.readOnly,
              'immutable': formDefaults.image.readOnly
          });
          $('#option_custom').prop({
              'disabled': formDefaults.image.readOnly,
              'immutable': formDefaults.image.readOnly
          });
        }
      }

      if ('cpu' in formDefaults) {
        // Set default CPU, if specified
        $('#cpu').val('');
        if ('value' in formDefaults.cpu) {
          $('#cpu').val(formDefaults.cpu.value);
        }
        // Make CPU field readonly, if specified
        if ('readOnly' in formDefaults.cpu) {
          $('#cpu').attr({
            'readonly': formDefaults.cpu.readOnly,
            'immutable': formDefaults.cpu.readOnly
          });
        }
      }

      if ('memory' in formDefaults) {
        // Set default Memory, if specified
        $('#memory').val('');
        if ('value' in formDefaults.memory) {
          $('#memory').val(formDefaults.memory.value);
        }
        // Make Memory field readonly if specified
        if ('readOnly' in formDefaults.memory) {
          $('#memory').attr({
            'readonly': formDefaults.memory.readOnly,
            'immutable': formDefaults.memory.readOnly
          });
        }
      }

      $('#ws_name').attr('placeholder', username + '-workspace');
      $('#ws_mount_path').attr('placeholder', '/home/jovyan');

      if ('workspaceVolume' in formDefaults) {
        var defaultWorkspaceReadOnly = formDefaults.workspaceVolume.readOnly

        if ('value' in formDefaults.workspaceVolume) {
          var defaultWorkspace = formDefaults.workspaceVolume.value;
          // Set the default Workspace Volume, if specified
          if (defaultWorkspace) {
            if ('type' in defaultWorkspace) {
              // Set the Workspace Volume Type, if specified
              $('#ws_type').val('');
              if ('value' in defaultWorkspace.type) {
                $('#ws_type').val(defaultWorkspace.type.value);
              }
              // Make the Workspace Volume Type readonly, if specified
              if ('readOnly' in defaultWorkspace.type || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_type').attr({
                  'readonly': defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly
                });
                if ($('#ws_type').attr('readonly')) {
                  $('#ws_type').on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }
            $('#ws_type').trigger('change');

            if ('name' in defaultWorkspace) {
              $('#ws_name').val('');
              // Set the Workspace Volume Name, if specified
              if ('value' in defaultWorkspace.name) {
                $('#ws_name').val(defaultWorkspace.name.value).trigger('focusout');
              }
              // Make the Workspace Volume Name readonly, if specified
              if ('readOnly' in defaultWorkspace.name || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_name').attr({
                  'readonly': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('size' in defaultWorkspace) {
              $('#ws_size').val('');
              // Set the Workspace Volume Size, if specified
              if ('value' in defaultWorkspace.size) {
                $('#ws_size').val(defaultWorkspace.size.value);
              }
              // Make the Workspace Volume Size readonly, if specified
              if ('readOnly' in defaultWorkspace.size || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_size').attr({
                  'readonly': defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('mountPath' in defaultWorkspace) {
              $('#ws_mount_path').val('');
              // Set the Workspace Volume MountPath, if specified
              if ('value' in defaultWorkspace.mountPath) {
                $('#ws_mount_path').val(defaultWorkspace.mountPath.value);
              }
              // Make the Workspace Volume MountPath readonly, if specified
              if ('readOnly' in defaultWorkspace.mountPath || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_mount_path').attr({
                  'readonly': defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('accessModes' in defaultWorkspace) {
              $('#ws_access_modes').val('');
              // Set the Workspace Volume Access Modes, if specified
              if ('value' in defaultWorkspace.accessModes) {
                $('#ws_access_modes').val(defaultWorkspace.accessModes.value);
              }
              // Make the Workspace Volume Access Modes readonly, if specified
              if ('readOnly' in defaultWorkspace.accessModes || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_access_modes').attr({
                  'readonly': defaultWorkspace.accessModes.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.accessModes.readOnly || defaultWorkspaceReadOnly
                });
                if ($('#ws_access_modes').attr('readonly')) {
                  $('#ws_access_modes').on('mousedown', function(e) {
                    e.preventDefault(); this.blur();  window.focus();
                  });
                }
              }
            }
          }
        }
      }

      if ('dataVolumes' in formDefaults) {
          var dataVolumesReadOnly = formDefaults.dataVolumes.readOnly
          // Disable Add Volume button, if specified
          if ('readOnly' in formDefaults.dataVolumes) {
            $('#add_volume').attr({
              'disabled': dataVolumesReadOnly,
              'immutable': dataVolumesReadOnly
            });
          }

          // Set default Data Volumes - Disable if specified
          var defaultDataVolumes = []
          if ('value' in formDefaults.dataVolumes) {
            defaultDataVolumes = formDefaults.dataVolumes.value;
          }
          for (i = 0; i < defaultDataVolumes.length; i++) {
            addVolume();

            var vol = {}
            if ('value' in defaultDataVolumes[i]) {
              vol = defaultDataVolumes[i].value;
            }

            if ('type' in vol) {
              $('#vol_type' + counter).val('');
              if ('value' in vol.type) {
                $('#vol_type' + counter).val(vol.type.value).trigger('change');
              }
              if ('readOnly' in vol.type || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_type' + counter).attr({
                  'readonly': vol.type.readOnly || dataVolumesReadOnly,
                  'immutable': vol.type.readOnly || dataVolumesReadOnly
                });
                if ($('#vol_type' + counter).attr('readonly')) {
                  $('#vol_type' + counter).on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }

            if ('name' in vol) {
              $('#vol_name' + counter).val('');
              if ('value' in vol.name) {
                $('#vol_name' + counter).val(vol.name.value).trigger('focusout');
              }
              if ('readOnly' in vol.name || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_name' + counter).attr({
                  'readonly': vol.name.readOnly || dataVolumesReadOnly,
                  'immutable': vol.name.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('size' in vol) {
              $('#vol_size' + counter).val('');
              if ('value' in vol.size) {
                $('#vol_size' + counter).val(vol.size.value);
              }
              if ('readOnly' in vol.size || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_size' + counter).attr({
                  'readonly': vol.size.readOnly || dataVolumesReadOnly,
                  'immutable': vol.size.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('mountPath' in vol) {
              $('#vol_mount_path' + counter).val('');
              if ('value' in vol.mountPath) {
                $('#vol_mount_path' + counter).val(vol.mountPath.value);
              }
              if ('readOnly' in vol.mountPath || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_mount_path' + counter).attr({
                  'readonly': vol.mountPath.readOnly || dataVolumesReadOnly,
                  'immutable': vol.mountPath.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('accessModes' in vol) {
              $('#vol_access_modes' + counter).val('');
              if ('value' in vol.accessModes) {
                $('#vol_access_modes' + counter).val(vol.accessModes.value);
              }
              if ('readOnly' in vol.accessModes || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_access_modes' + counter).attr({
                  'readonly': vol.accessModes.readOnly || dataVolumesReadOnly,
                  'immutable': vol.accessModes.readOnly || dataVolumesReadOnly
                });
                if ($('#vol_access_modes' + counter).attr('readonly')) {
                  $('#vol_access_modes' + counter).on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }

            // Disable Delete button, if specified
            if ('readOnly' in formDefaults.dataVolumes) {
              $('#vol_delete_button' + counter).attr({
                'disabled': formDefaults.dataVolumes.readOnly,
                'immutable': formDefaults.dataVolumes.readOnly
              });
            }
          }
      }

      if ('extraResources' in formDefaults) {
        // Set default Extra Resources, if specified
        $('#extraResources').val('{}');
        if ('value' in formDefaults.extraResources) {
          $('#extraResources').val(formDefaults.extraResources.value);
        }
        // Make Extra Resources field readonly, if specified
        if ('readOnly' in formDefaults.extraResources) {
          $('#extraResources').attr({
            'readonly': formDefaults.extraResources.readOnly,
            'immutable': formDefaults.extraResources.readOnly
          });
        }
      }
    }

    // Register jQuery event listeners for the Workspace Volume
    function  setWorkspaceEventListeners() {
      var workspaceType = $('#ws_type');
      var workspaceName = $('#ws_name');
      var workspaceSize = $('#ws_size');
      var workspaceAccessModes = $('#ws_access_modes');
      var workspaceMountPath = $('#ws_mount_path');

      // Disable/Enable Workspace size option based on its Type
      workspaceType.on('change', function() {
        // Set attributes for the Volume fields
        if (this.value == 'Existing') {
          setAttributes(workspaceName, {'list': 'suggest_pvcs'});
          setAttributes(workspaceSize, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Size is autofilled when mounting existing Volumes'
          });
          setAttributes(workspaceAccessModes, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Access Mode is autofilled when mounting existing Volumes'
          });
          $('#ws_access_modes option').not(':selected').attr('disabled', 'disabled')
        } else if (this.value == 'New') {
          setAttributes(workspaceName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
          unsetAttributes(workspaceAccessModes, 'readonly data-toggle data-placement title');
        }

        // Set values for non-readonly Volume fields
        setValue(workspaceName, '');
        setValue(workspaceSize, workspaceSize.attr('placeholder'));
        setValue(workspaceMountPath, '');
        setValue(workspaceAccessModes, workspaceAccessModes.find('option:first').val());
      });

      workspaceName.on('focusout', function() {
        for (var i = 0; i < existingPVCs.length; i++) {
          if (existingPVCs[i].name == this.value) {
            // Volume already exists - autocomplete its Size and Access Mode
            setValue(workspaceType, 'Existing');
            setAttributes(workspaceName, {'list': 'suggest_pvcs'});
            setAttributes(workspaceSize, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Size is autofilled when mounting existing Volumes'
            });
            setValue(workspaceSize, existingPVCs[i].size);
            setAttributes(workspaceAccessModes, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Access Mode is autofilled when mounting existing Volumes'
            });
            setValue(workspaceAccessModes, existingPVCs[i].access_modes);
            break;
          }
        }

        if (this.value.length > 0) {
          setValue(workspaceMountPath, '/home/jovyan/' + this.value);
        } else {
          setValue(workspaceMountPath, '' + this.value);
        }

        if (i == existingPVCs.length) {
          // Volume does not exist - set its Type to 'New'
          setValue(workspaceType, 'New');
          setAttributes(workspaceName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
          setValue(workspaceSize, '');
          unsetAttributes(workspaceAccessModes, 'readonly data-toggle data-placement title');
          setValue(workspaceAccessModes, workspaceAccessModes.find('option:first').val());
        }
      });

      // Trigger focusout event to check the Workspace name
      workspaceName.trigger('focusout');
    }

    // Counter and options for Dataset Volumes
    var counter = 0;
    var options = [
      'vol_type', 'vol_name', 'vol_size', 'vol_mount_path', 'vol_access_modes'
    ];

    // Dynamically adds a UI element for configuring a volume
    function addVolume() {
      counter++;

      // Input for volume type
      var volumeType = $('<select>').attr({
        class: 'form-control',
        id: 'vol_type' + counter,
        name: 'vol_type' + counter,
        required: true
      });

      volumeType
        .append($('<option/>').attr({selected: true, value: 'New'}).text('New'))
        .append($('<option/>').attr({value: 'Existing'}).text('Existing'));

      // Input for volume name
      var volumeName = $('<input>').attr({
        class: 'form-control',
        id: 'vol_name' + counter,
        name: 'vol_name' + counter,
        type: 'text',
        placeholder: username + '-volume-' + counter,
        list: 'suggest_pvcs_disabled',
        value: username + '-volume-' + counter,
        required: true
      });

      // Input for volume size
      var volumeSize = $('<input>').attr({
        class: 'form-control',
        id: 'vol_size' + counter,
        name: 'vol_size' + counter,
        type: 'number',
        min: '0',
        step: '0.5',
        placeholder: '10',
        value: '10',
        required: true
      });

      // Input for volume mount point
      var volumeMountPath = $('<input>').attr({
        class: 'form-control',
        id: 'vol_mount_path' + counter,
        name: 'vol_mount_path' + counter,
        type: 'text',
        placeholder: '/home/jovyan/' + username + '-volume-' + counter,
        required: true
      });

      // Selection for volume access mode
      var volumeAccessModes = $('<select>').attr({
          class: 'form-control',
          id: 'vol_access_modes' + counter,
          name: 'vol_access_modes' + counter,
          required: true
      });

      volumeAccessModes
        .append($('<option/>').attr({value: 'ReadWriteOnce'}).text('ReadWriteOnce'))
        .append($('<option/>').attr({value: 'ReadWriteMany'}).text('ReadWriteMany'))
        .append($('<option/>').attr({value: 'ReadOnlyMany'}).text('ReadOnlyMany'));

      // Delete button for volume removal
      var deleteButton = $('<button/>').attr({
        class: 'btn btn-danger btn-sm',
        id: 'vol_delete_button' + counter,
        type: 'button',
        onclick: 'removeVolume(' + counter + ');'
      });

      deleteButton.append($('<i>').attr({class: 'fas fa-minus'}));

      // Disable/Enable Volume size option based on its Type
      volumeType.on('change', function() {
        if (this.value == 'Existing') {
          // Set attributes for the Volume fields
          setAttributes(volumeName, {'list': 'suggest_pvcs'});
          setAttributes(volumeSize, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Size is autofilled when mounting existing Volumes'
          });
          setAttributes(volumeAccessModes, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Access Mode is autofilled when mounting existing Volumes'
          });
          $('#vol_access_modes option').not(':selected').attr('disabled', 'disabled')
        } else if (this.value == 'New') {
          setAttributes(volumeName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
          unsetAttributes(volumeAccessModes, 'readonly data-toggle data-placement title');
        }

        // Set values for non-readonly Volume fields
        setValue(volumeName, '');
        setValue(volumeSize, volumeSize.attr('placeholder'));
        setValue(volumeMountPath, '');
        setValue(volumeAccessModes, volumeAccessModes.find('option:first').val());
      });

      volumeName.on('focusout', function() {
        for (var i = 0; i < existingPVCs.length; i++) {
          if (existingPVCs[i].name == this.value) {
            // Volume already exists - autocomplete its Size and Access Mode
            setValue(volumeType, 'Existing');
            setAttributes(volumeName, {'list': 'suggest_pvcs'});
            setAttributes(volumeSize, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Size is autofilled when mounting existing Volumes'
            });
            setValue(volumeSize, existingPVCs[i].size)
            setAttributes(volumeAccessModes, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Access Mode is autofilled when cloning existing Volumes'
            });
            setValue(volumeAccessModes, existingPVCs[i].access_modes)
            break;
          }
        }

        if (this.value.length > 0) {
          setValue(volumeMountPath, '/home/jovyan/' + this.value);
        } else {
          setValue(volumeMountPath, '' + this.value);
        }

        if (i == existingPVCs.length) {
          // Volume does not exist - set its Type to 'New'
          setValue(volumeType, 'New');
          setAttributes(volumeName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
          unsetAttributes(volumeAccessModes, 'readonly data-toggle data-placement title');
          setValue(volumeAccessModes, volumeAccessModes.find('option:first').val());
        }
      });

      // Create and append new volume
      $('<div/>', {'class': 'form-group volume' + counter})
        .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 14%'}).append(volumeType))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 20%'}).append(volumeName))
        .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 12%'}).append(volumeSize))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 29%'}).append(volumeMountPath))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 19%'}).append(volumeAccessModes))
        .append($('<div/>', {class: 'col-sm-1 form-group', style: 'width: 5%; padding: 2px'}).append(deleteButton))
        .hide().fadeIn('fast').appendTo($('#data_volumes'));

      // Trigger focusout event to check Volume Name
      volumeName.trigger('focusout');
    }

    // Dynamically remove a previously added UI element for configuring a volume
    function removeVolume(id) {
      $('.volume' + id).fadeOut('fast', function() {
        $(this).remove();
      });
      counter--;

      // Normalize the IDs of remainder volumes
      for (i = id; i <= counter; i++) {
        var volumeElement = $('.volume' + (i + 1));
        volumeElement.find('#vol_delete_button' + (i + 1)).attr({
          'id': 'vol_delete_button' + i,
          'onclick': 'removeVolume(' + i + ')'
        });

        // Update the class of the Volume
        volumeElement.removeClass('volume' + (i + 1)).addClass('volume' + i);

        // Update the id and name of the Volume options
        options.forEach(function(option) {
          volumeElement.find('#' + option + (i + 1)).attr({
            'id': option + i,
            'name': option + i
          });
        });

        // Update Volume options
        setAttributes(volumeElement.find('[id^=vol_name]'), {
          'placeholder': username + '-volume-' + i,
        });
        setValue(volumeElement.find('[id^=vol_name]'), username + '-volume-' + i)
        setAttributes(volumeElement.find('[id^=vol_mount_path]'), {
          'placeholder': '/home/jovyan/' + username + '-volume-' + i,
        });
        setValue(volumeElement.find('[id^=vol_mount_path]'), '/home/jovyan/' + username + '-volume-' + i)
      }
    }

    // Helper function to set a tooltip to admin-disabled Spawner form fields
    function setTooltipsOnImmutable() {
      $(':input[immutable=true]').attr({
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'This option has been set by your administrator'
      });
    }

    // Helper function to set the value of a mutable Spawner option
    function setValue(element, value) {
      if (!element.attr('immutable')) {
        element.val(value);
      }
    }

    // Helper function to set attributes of a mutable Spawner option
    function setAttributes(element, attributes) {
      if (!element.attr('immutable')) {
        element.attr(attributes);
      }
    }

    // Helper function to unset attributes of a mutable Spawner option
    function unsetAttributes(element, attributes) {
      if (!element.attr('immutable')) {
        element.removeAttr(attributes);
      }
    }
  spawner.py: |
    # -*- coding: utf-8 -*-
    import json
    import yaml
    import string
    import escapism
    from tornado import gen
    from traitlets import Dict
    from jinja2 import FileSystemLoader, Environment

    from kubespawner.objects import make_pvc
    from kubespawner.spawner import KubeSpawner
    from kubernetes.client.rest import ApiException

    SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'


    class KubeFormSpawner(KubeSpawner):
      """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

      def __init__(self, *args, **kwargs):
        """Call init() of parent class and initialize volume lists."""
        super(KubeFormSpawner, self).__init__(*args, **kwargs)
        self.initial_volumes = list(self.volumes)
        self.initial_volume_mounts = list(self.volume_mounts)

      @property
      def spawner_ui_config(self):
        # Read raw YAML file, format it and parse it as dict
        if not hasattr(self, "_spawner_ui_config"):
          c = None
          try:
            with open('/etc/config/spawner_ui_config.yaml', 'r') as f:
              c = self._expand_user_properties(f.read())
          except IOError:
            self.log.warning('Error opening Spawner UI config file')

          try:
            if yaml.safe_load(c) is None:
              # YAML exists but is empty
              self._spawner_ui_config = {}
            else:
              # YAML exists and is not empty
              self._spawner_ui_config = yaml.safe_load(c)
          except yaml.YAMLError as e:
            self.log.warning(
                'Spawner UI config file contains'
                'invalid YAML syntax: {}', e)
            return None

        return self._spawner_ui_config

      extra_spawner_config = Dict({},
                                  config=True,
                                  help="""
            A dictionary with extra configuration parameters for KubeFormSpawner.
            """)

      def options_form(self, form):
        # Create Jinja environment to dynamically load templates
        j2_env = Environment(loader=FileSystemLoader('/etc/config'))

        # Get available PVCs in a given namespace
        # This is a blocking K8s API call
        existing_pvcs = self._list_pvcs_in_namespace(self.namespace)

        form_defaults = None
        if self.spawner_ui_config is not None:
          # YAML exists and was parsed successfully
          if self.spawner_ui_config['spawnerFormDefaults'] is not None:
            form_defaults = self.spawner_ui_config['spawnerFormDefaults']
          else:
            form_defaults = {}

        # Return the rendered template as a unicode string
        return j2_env.get_template('template.html').render(
            form_defaults=form_defaults,
            existing_pvcs=existing_pvcs,
            username=self._expand_user_properties('{username}'))

      def options_from_form(self, formdata):
        options = {}
        if self.spawner_ui_config is not None:
          form_defaults = self.spawner_ui_config['spawnerFormDefaults']

        # Manage Image
        image_readonly = False
        if self._default_config_contains('image'):
          options['image'] = form_defaults['image']['value']
          image_readonly = form_defaults['image'].get('readOnly', False)
        if ('image' in formdata and formdata['image'][0]):
          image_from_form = formdata['image'][0].strip()
          if image_readonly:
            # Provided image must be standard
            if image_from_form in form_defaults['image']['options']:
              options['image'] = image_from_form
          else:
            # Provided image can be standard or custom
            options['image'] = image_from_form

        # Manage CPU
        cpu_readonly = False
        if self._default_config_contains('cpu'):
          options['cpu'] = form_defaults['cpu']['value']
          cpu_readonly = form_defaults['cpu'].get('readOnly', False)
        if (not cpu_readonly and 'cpu' in formdata and formdata['cpu'][0]):
          options['cpu'] = formdata['cpu'][0].strip()

        # Manage Memory
        memory_readonly = False
        if self._default_config_contains('memory'):
          options['memory'] = form_defaults['memory']['value']
          memory_readonly = form_defaults['memory'].get('readOnly', False)
        if (not memory_readonly and 'memory' in formdata and formdata['memory'][0]):
          options['memory'] = formdata['memory'][0].strip()

        # Manage Workspace Volume
        options['workspaceVolume'] = {}
        ws_volume = {}

        ws_volume_readonly = False
        if self._default_config_contains('workspaceVolume'):
          ws_volume_readonly =           form_defaults['workspaceVolume'].get('readOnly', False)

          # The Workspace Volume is specified in 'config.yaml'
          default_ws_volume = form_defaults['workspaceVolume']['value']

          # Get and set the default values from the YAML configuration file,
          # if present and not marked as readonly
          ws_type_readonly = False
          if ('type' in default_ws_volume and 'value' in default_ws_volume['type']):
            ws_volume['type'] = default_ws_volume['type']['value']
            ws_type_readonly =             default_ws_volume['type'].get('readOnly', False)

          ws_name_readonly = False
          if ('name' in default_ws_volume and 'value' in default_ws_volume['name']):
            ws_volume['name'] = default_ws_volume['name']['value']
            ws_name_readonly =             default_ws_volume['name'].get('readOnly', False)

          ws_size_readonly = False
          if ('size' in default_ws_volume and 'value' in default_ws_volume['size']):
            ws_volume['size'] =             '%sGi' % default_ws_volume['size']['value']
            ws_size_readonly =             default_ws_volume['size'].get('readOnly', False)

          ws_mount_path_readonly = False
          if ('mountPath' in default_ws_volume and
              'value' in default_ws_volume['mountPath']):
            ws_volume['mountPath'] =             default_ws_volume['mountPath']['value']
            ws_mount_path_readonly =             default_ws_volume['mountPath'].get('readOnly', False)

          ws_access_modes_readonly = False
          if ('accessModes' in default_ws_volume and
              'value' in default_ws_volume['accessModes']):
            ws_volume['accessModes'] =             default_ws_volume['accessModes']['value']
            ws_access_modes_readonly =             default_ws_volume['accessModes'].get('readOnly', False)

        # Get and set the Workspace Volume values from the form, if present
        # and not marked as readonly
        if not ws_volume_readonly:
          if (not ws_type_readonly and 'ws_type' in formdata and
              formdata['ws_type'][0]):
            ws_volume['type'] = formdata['ws_type'][0].strip()

          if (not ws_name_readonly and 'ws_name' in formdata and
              formdata['ws_name'][0]):
            ws_volume['name'] = formdata['ws_name'][0].strip()

          if (not ws_size_readonly and 'ws_size' in formdata and
              formdata['ws_size'][0]):
            ws_volume['size'] = '%sGi' % formdata['ws_size'][0].strip()

          if (not ws_mount_path_readonly and 'ws_mount_path' in formdata and
              formdata['ws_mount_path'][0]):
            ws_volume['mountPath'] =             formdata['ws_mount_path'][0].strip()

          if (not ws_access_modes_readonly and 'ws_access_modes' in formdata and
              formdata['ws_access_modes'][0]):
            ws_volume['accessModes'] =             formdata['ws_access_modes'][0].strip()

        options['workspaceVolume'] = ws_volume

        # Manage Data Volumes
        options['dataVolumes'] = []
        data_volumes_readonly = False
        if self._default_config_contains('dataVolumes'):
          data_volumes_readonly =           form_defaults['dataVolumes'].get('readOnly', False)

        if data_volumes_readonly:
          # Set Data Volumes as specified in the Spawner configuration file
          for volume in form_defaults['dataVolumes']['value']:
            data_volume = {}
            for f in ['type', 'name', 'size', 'mountPath', 'accessModes']:
              data_volume[f] = volume['value'][f]['value']
            data_volume['size'] += 'Gi'
            options['dataVolumes'].append(data_volume)
        else:
          # Deduce the total number of Data Volumes
          data_volumes_cnt = 0
          for k, v in formdata.items():
            if k.startswith('vol_type'):
              data_volumes_cnt += 1

          # Set Data Volumes as specified in the Spawner form
          for i in range(1, data_volumes_cnt + 1):
            data_volume = {}

            # Get all Data Volume fields from the form
            id = 'vol_type' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['type'] = formdata[id][0].strip()

            id = 'vol_name' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['name'] = formdata[id][0].strip()

            id = 'vol_size' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['size'] = '%sGi' % formdata[id][0].strip()

            id = 'vol_mount_path' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['mountPath'] = formdata[id][0].strip()

            id = 'vol_access_modes' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['accessModes'] = formdata[id][0].strip()

            options['dataVolumes'].append(data_volume)

        # Manage Extra Resources
        extra_resources_readonly = False
        if self._default_config_contains('extraResources'):
          options['extraResources'] = (form_defaults['extraResources']['value'])
          extra_resources_readonly =           form_defaults['extraResources'].get('readOnly', False)
        if (not extra_resources_readonly and 'extraResources' in formdata and
            formdata['extraResources'][0]):
          options['extraResources'] =           formdata['extraResources'][0].strip()

        return options

      @property
      def singleuser_image_spec(self):
        return self.user_options['image']

      image_spec = singleuser_image_spec

      @property
      def cpu_guarantee(self):
        return self.user_options['cpu']

      @property
      def mem_guarantee(self):
        return self.user_options['memory']

      @property
      def workspace_volume(self):
        return self.user_options["workspaceVolume"]

      @property
      def data_volumes(self):
        return self.user_options["dataVolumes"]

      @property
      def extra_resource_limits(self):
        extra = ''
        if self.user_options['extraResources']:
          extra = json.loads(self.user_options['extraResources'])
        return extra

      def get_env(self):
        env = super(KubeFormSpawner, self).get_env()
        gcp_secret_name = self.extra_spawner_config['gcp_secret_name']
        if gcp_secret_name:
          env['GOOGLE_APPLICATION_CREDENTIALS'] = '{}/{}.json'.format(
              SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name)
        return env

      # TODO(kkasravi): add unit test
      def _parse_user_name(self, username):
        safe_chars = set(string.ascii_lowercase + string.digits)
        name = username.split(':')[-1]
        legacy = ''.join([s if s in safe_chars else '-' for s in name.lower()])
        safe = escapism.escape(name, safe=safe_chars, escape_char='-').lower()
        return legacy, safe, name

      def _expand_user_properties(self, template):
        # Override KubeSpawner method to remove prefix accounts.google: for iap
        legacy, safe, name = self._parse_user_name(self.user.name)

        # Set servername based on whether named-server initialised
        if self.name:
          servername = '-{}'.format(self.name)
        else:
          servername = ''

        rname = template.format(
            userid=self.user.id,
            username=safe,
            unescaped_username=name,
            legacy_escape_username=legacy,
            servername=servername,
        )
        return rname

      def _default_config_contains(self, option):
        """Check if config.yaml contains a value for a Spawner option."""
        if self.spawner_ui_config is not None:
          form_defaults = None
          if 'spawnerFormDefaults' in self.spawner_ui_config:
            form_defaults = self.spawner_ui_config['spawnerFormDefaults']

          if form_defaults is not None and option in form_defaults:
            if 'value' in form_defaults[option]:
              return True
        return False

      def _get_pvc_manifest(self, name, storage_class, access_modes, storage,
                            labels, annotations):
        """
        Return a PVC spec based on the given parameters.
        This manifest will be used to create PVCs in the K8s cluster.
        """
        return make_pvc(
            name=name,
            storage_class=storage_class,
            access_modes=access_modes,
            storage=storage,
            labels=labels,
            annotations=annotations)

      def _list_pvcs_in_namespace(self, namespace):
        """
        Return a list with all non-failed PVCs in a K8s namespace.
        Each list entry is a dict with 'name', 'size' and 'access_modes' keys.
        """
        existing_pvcs = []

        try:
          resp = self.api.list_namespaced_persistent_volume_claim(
              namespace=namespace, watch=False)

        except ApiException as e:
          self.log.warn('Could not list PVCs in %s: %s', namespace, e)
          raise

        # Iterate over all existing PVCs and return all non-failed ones
        for pvc in [pvc for pvc in resp.items if pvc.status.phase != 'Failed']:
          existing_pvcs.append({
              "name":
              pvc.metadata.name,
              "size":
              pvc.spec.resources.requests.get('storage')[:-2],
              "access_modes":
              pvc.spec.access_modes
          })

        return existing_pvcs

      @gen.coroutine
      def _prepare_volumes(self):
        """Create PVC manifests and attach as volumes to the Notebook."""
        # Reset Volumes and VolumeMounts to initial KubeSpawner values
        self.volumes = list(self.initial_volumes)
        self.volume_mounts = list(self.initial_volume_mounts)

        # Workspace and Data Volumes are managed as PVCs
        persistent_volumes = [self.workspace_volume] + self.data_volumes

        for (idx, volume) in enumerate(persistent_volumes):
          if volume['type'] == 'New':
            yield self._provision_new_pvc(volume, self.namespace)
          elif volume['type'] == 'Existing':
            yield self._get_existing_pvc(volume['name'], self.namespace)

          # Upon success, mount PVC as a volume
          self.volumes.append({
              'name': 'volume-%d-{username}' % idx,
              'persistentVolumeClaim': {
                  'claimName': volume['name']
              }
          })

          self.volume_mounts.append({
              'mountPath': volume['mountPath'],
              'name': 'volume-%d-{username}' % idx
          })

      @gen.coroutine
      def _provision_new_pvc(self, volume, namespace):
        """Issue a K8s API request to create a new, namespaced PVC."""
        labels = self._build_common_labels(
            self._expand_all(self.user_storage_extra_labels))
        labels.update({'component': 'singleuser-storage'})
        annotations = self._build_common_annotations({})

        # Create a V1PersistentVolumeClaim for the API call
        pvc_manifest = self._get_pvc_manifest(
            name=volume['name'],
            storage_class=self.extra_spawner_config['storage_class'],
            access_modes=[volume['accessModes']],
            storage=volume['size'],
            labels=labels,
            annotations=annotations)

        pvc = None
        try:
          pvc = yield self.asynchronize(
              self.api.create_namespaced_persistent_volume_claim,
              namespace=namespace,
              body=pvc_manifest)

        except ApiException as e:
          if e.status == 409:
            self.log.warning('PVC %s already exists. New PVC not created.',
                             volume['name'])
          self.log.info(e.reason)
          raise

        self.log.info('PVC %s was successfully created', volume['name'])
        return pvc

      @gen.coroutine
      def _get_existing_pvc(self, pvc_name, namespace):
        """Issue a K8s API request to retrieve a namespaced PVC."""
        pvc = None

        try:
          pvc = yield self.asynchronize(
              self.api.read_namespaced_persistent_volume_claim,
              name=pvc_name,
              namespace=namespace)

        except ApiException as e:
          self.log.warning('PVC %s could not be retrieved: %s', pvc_name, e)
          raise

        self.log.info('PVC %s was successfully retrieved', pvc_name)
        return pvc

      @gen.coroutine
      def start(self):
        """Override KubeSpawner class start method."""
        yield self._prepare_volumes()
        _start = yield super(KubeFormSpawner, self).start()
        return _start
  spawner_ui_config.yaml: |
    # Configuration file for the default JupyterHub Spawner UI
    # Each key corresponds to a JupyterHub Spawner UI option
    # If a key is missing, the respective Spawner UI option will be left untouched
    #
    # Each Spawner UI option is configured by two keys: 'value' and 'readOnly'
    # - The 'value' key contains the default value
    # - The 'readOnly' key determines if the option will be available to users
    #
    # If the 'readOnly' key is present and set to 'true', the respective option
    # will be disabled for users and only set by the admin
    # If the 'readOnly' key is missing (defaults to 'false'), the respective option
    # will be available for users
    #
    # Please note that some values (e.g. {servername}, {username}) may be templated
    # and expanded according to KubeSpawner's rules
    #
    # For more information regarding JupyterHub KubeSpawner and its configuration:
    # https://jupyterhub-kubespawner.readthedocs.io/en/latest/spawner.html

    spawnerFormDefaults:
      image:
        # The container Image for the user's Jupyter Notebook
        # If readonly, this value must be a member of the list below
        value: gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-cpu:v0.5.0
        # The list of available standard container Images
        options:
          - gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.5.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.5.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.6.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.6.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.7.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.7.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.9.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.9.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.11.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.11.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.12.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.12.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-2.0.0a-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-2.0.0a-notebook-gpu:v0.5.0
        # By default, custom container Images are allowed
        # Uncomment the following line to only enable standard container Images
        #readOnly: true
      cpu:
        # CPU for user's Notebook
        value: '1.0'
      memory:
        # Memory for user's Notebook
        value: 1.0Gi
      workspaceVolume:
        # Workspace Volume to be attached to user's Notebook
        # Each Workspace Volume is declared with the following attributes:
        # Type, Name, Size, MountPath and Access Mode
        value:
          type:
            # The Type of the Workspace Volume
            # Supported values: 'New', 'Existing'
            value: New
          name:
            # The Name of the Workspace Volume
            # Note that this is a templated value
            value: {username}{servername}-workspace
          size:
            # The Size of the Workspace Volume (in Gi)
            value: '10'
          mountPath:
            # The Path that the Workspace Volume will be mounted
            readOnly: true
            value: /home/jovyan
          accessModes:
            # The Access Mode of the Workspace Volume
            # Supported values: 'ReadWriteOnce', 'ReadWriteMany', 'ReadOnlyMany'
            value: ReadWriteOnce
      dataVolumes:
        # List of additional Data Volumes to be attached to the user's Notebook
        value: []
        # Each Data Volume is declared with the following attributes:
        # Type, Name, Size, MountPath and Access Mode
        #
        # For example, a list with 2 Data Volumes:
        #value:
        #  - value:
        #      type:
        #        value: New
        #      name:
        #        value: {username}{servername}-vol-1
        #      size:
        #        value: '10'
        #      mountPath:
        #        value: /home/jovyan/{username}{servername}-vol-1
        #      accessModes:
        #        value: ReadWriteOnce
        #  - value:
        #      type:
        #        value: New
        #      name:
        #        value: {username}{servername}-vol-2
        #      size:
        #        value: '5'
        #      mountPath:
        #        value: /home/jovyan/{username}{servername}-vol-2
        #      accessModes:
        #        value: ReadWriteOnce
        #
        # Uncomment the following line to make the Data Volumes list readonly
        #readOnly: true
      extraResources:
        # Extra Resource Limits for user's Notebook
        # Note that braces are escaped
        value: "{{}}"
  style.css: |
    body {
        font-family:
          "Lato", -apple-system, BlinkMacSystemFont, "Avenir Next",
          "Avenir", "Segoe UI", "Lucida Grande", "Helvetica Neue", "Helvetica",
          "Fira Sans", "Roboto", "Noto", "Droid Sans", "Cantarell", "Oxygen",
          "Ubuntu", "Franklin Gothic Medium", "Century Gothic", "Liberation Sans",
          sans-serif;
    }

     b, strong {
        font-weight: 600;
    }

    .panel-primary>.panel-heading {
      padding-bottom: 4.5px;
    }

    .btn-jupyter[disabled] {
      background-color: #F37524;
      border-color: #E34F21;
    }

    .btn-success {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    .btn-success:hover {
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }

    .btn-success:active:focus {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    .btn-success:focus {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    input[readonly] {
      cursor: not-allowed;
    }

    select[readonly] {
      cursor: not-allowed;
    }

    .col-sm-3 {
      padding-left: 10px;
      padding-right: 10px;
    }
  template.html: |
    {% block css %}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
      <style type="text/css">
        {% include "style.css" %}
      </style>
    {% endblock %}

    {% block javascript %}
      <script type="text/javascript">
        var existingPVCs = {{ existing_pvcs|tojson }};
        var formDefaults = {{ form_defaults|tojson }};
        var username = {{ username|tojson }};
        {% include "script.js" %}
      </script>
    {% endblock %}

    {% block existing_pvcs %}
      {% if form_defaults is not none %}
        <datalist id="suggest_pvcs">
          {% for pvc in existing_pvcs %}
            <option value="{{ pvc.name }}">
          {% endfor %}
        </datalist>
      {% endif %}
    {% endblock %}

    {% block error_message %}
      {% if form_defaults is none %}
        <div style="display: inline-block; text-align: left;padding: 10px;">
          <h3>The <code>config.yaml</code> file contains invalid YAML syntax</h3>
          <h4>Please follow the steps below to address this issue:</h4>
          <p class="help-block">
            1. Correct all YAML syntax errors in the <code>config.yaml</code> file<br>
            2. Ask your administrator to restart the JupyterHub server<br>
            3. Return at this page and log in to view the Spawner form
          </p>
        </div>
      {% endif %}
    {% endblock %}

    {% block header %}
      {% if form_defaults is not none %}
        <div class="panel-info">
          <div class="panel-heading">Fill out the form to customize your Jupyter Notebook.</div>
        </div>
      {% endif %}
    {% endblock %}

    {% block image %}
      {% if form_defaults is not none %}
        <!-- Image -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <i class="fab fa-docker"></i>
            <label>Image</label>
          </div>
          <div class="panel-body" style="padding: 10px;">
            <div id='imageType' style="padding-bottom: 5px;">
              <label class="radio-inline">
                <input id="option_standard" type="radio" name="imageType" onclick="setImageType()"
                       value="standard" checked>Standard
              </label>
              <label class="radio-inline">
                <input id="option_custom" type="radio" name="imageType" onclick="setImageType()"
                       value="custom">Custom
              </label>
            </div>
            <select class="form-control" for="standardImages" required></select>
            <input class="form-control" for="customImage" placeholder="repo/image:tag" required>
          </div>
          <p class="text-muted" style="padding: 10px;">
            A starter Docker image for JupyterHub with a baseline deployment and typical ML packages.
          </p>
        </div>
        {% endif %}
    {% endblock %}

    {% block toggle_advanced_button %}
      {% if form_defaults is not none %}
        <!-- Advanced Options Toggle Button -->
        <div style="text-align: center; padding: 10px;">
          <a id="toggle_advanced_options" class="btn btn-primary">Toggle Advanced</a>
        </div>
      {% endif %}
    {% endblock %}

    {% block advanced_fields %}
      {% if form_defaults is not none %}
        <div id="advanced_fields" style="display: none;">
          {% block cpu %}
            <!-- CPU -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-microchip"></i>
                <label>CPU</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                <input class="form-control" id='cpu' name='cpu'
                       placeholder='200m, 2.5, etc' required>
                </input>
              </div>
              <p class="text-muted" style="padding: 10px;">
                For CPU-intensive workloads, you can choose more than 1 CPU
                (e.g. <span><code>1.5</code></span>).
              </p>
            </div>
          {% endblock %}

          {% block memory %}
            <!-- Memory -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-memory"></i>
                <label>Memory</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                <input class="form-control" id='memory' name='memory'
                       placeholder='100Mi, 1.5Gi, etc' required>
                </input>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Specify the total amount of RAM reserved by your Notebook
                (e.g. <span><code>2.0Gi</code></span>).
              </p>
            </div>
          {% endblock %}

          {% block workspaceVolume %}
            <!-- Workspace Volume -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-laptop-code" style="padding: 0px 2px;"></i>
                <label>Workspace Volume</label>
              </div>
              <div class="panel-body" id="workspace_volume">
                  <div class="col-sm-2" style="width: 14%"><label>Type</label></div>
                  <div class="col-sm-3" style="width: 20%"><label>Name</label></div>
                  <div class="col-sm-2" style="width: 12%"><label>Size (Gi)</label></div>
                  <div class="col-sm-3" style="width: 29%"><label>Mount Path</label></div>
                  <div class="col-sm-3" style="width: 19%"><label>Access Mode</label></div>
                  <div class="col-sm-*">
                  <div class="col-sm-2" style="width: 14%">
                    <select class="form-control" name="ws_type" id="ws_type">
                      <option selected>New</option>
                      <option>Existing</option>
                    </select>
                  </div>
                  <div class="col-sm-3" style="width: 20%">
                    <input class="form-control" name="ws_name" id="ws_name"
                           list="suggest_pvcs_disabled" required>
                    </input>
                  </div>
                  <div class="col-sm-2" style="width: 12%">
                    <input class="form-control" name="ws_size" id="ws_size" placeholder='10'
                           type="number" step="0.5" min="0" required>
                    </input>
                  </div>
                  <div class="col-sm-3" style="width: 29%">
                    <input class="form-control" id="ws_mount_path" name="ws_mount_path" required></input>
                  </div>
                  <div class="col-sm-3" style="width: 19%">
                    <select class="form-control" id="ws_access_modes" name="ws_access_modes" required>
                      <option value="ReadWriteOnce">ReadWriteOnce</option>
                      <option value="ReadWriteMany">ReadWriteMany</option>
                      <option value="ReadOnlyMany">ReadOnlyMany</option>
                    </select>
                  </div>
                </div>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Configure the Volume to be mounted as your personal Workspace.</br>
                For example, to create an empty Workspace:
                <span><code>New</code></span>
                <span><code>{{ username }}-workspace</code></span>,
                <span><code>10</code></span>,
                <span><code>/home/jovyan</code></span>,
                <span><code>ReadWriteOnce</code></span>
              </p>
            </div>
          {% endblock %}

          {% block dataVolumes %}
            <!-- Data Volumes -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="far fa-hdd" style="padding: 0px 2px;"></i>
                <label>Data Volumes</label>
              </div>
              <div class="panel-body">
                <div class="col-sm-2" style="width: 14%"><label>Type</label></div>
                <div class="col-sm-3" style="width: 20%"><label>Name</label></div>
                <div class="col-sm-2" style="width: 12%"><label>Size (Gi)</label></div>
                <div class="col-sm-3" style="width: 29%"><label>Mount Path</label> </div>
                <div class="col-sm-3" style="width: 19%"><label>Access Mode</label></div>
                <div class="col-sm-*" id="data_volumes"></div>
                <div class="col-sm-2">
                  <button id="add_volume" class="btn btn-success btn-sm" type="button" onclick="addVolume();">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Configure the Volumes to be mounted as your Datasets.</br>
                For example, to create an empty Data Volume:
                <span><code>New</code></span>,
                <span><code>{{ username }}-volume-1</code></span>,
                <span><code>5</code></span>,
                <span><code>/home/jovyan/{{ username }}-volume-1</code></span>,
                <span><code>ReadWriteOnce</code></span>
              </p>
            </div>
          {% endblock %}

          {% block extra_resources %}
            <!-- Extra Resources -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-cogs"></i>
                <label>Extra Resources</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                {% raw %}
                <input class="form-control" id="extraResources" name='extraResources' placeholder='{"nvidia.com/gpu": 3}' required></input>
                {% endraw %}
              </div>
              <p class="text-muted" style="padding: 10px;">
                Reserve additional resources.</br>
                For example, to reserve 2 GPUs: <span><code>{"nvidia.com/gpu": 2}</code></span>
              </p>
            </div>
          {% endblock %}
        </div>
      {% endif %}
    {% endblock %}

    {% block footer %}
      {% if form_defaults is not none %}
        <div class="panel-warning">
          <div class="panel-heading">
            In case your Jupyter Notebook does not start, make sure that the resource quotas you specified are available in the cluster.
          </div>
        </div>
      {% endif %}
    {% endblock %}
`)
  th.writeF("/manifests/jupyter/jupyter/base/role-binding.yaml", `
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  name: jupyter-notebook-role
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: jupyter-notebook-role
subjects:
- kind: ServiceAccount
  name: jupyter-notebook
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  name: jupyter-role
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: jupyter-role
subjects:
- kind: ServiceAccount
  name: jupyter
`)
  th.writeF("/manifests/jupyter/jupyter/base/role.yaml", `
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  name: jupyter-notebook-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  - secrets
  - services
  verbs:
  - '*'
- apiGroups:
  - ""
  - apps
  - extensions
  resources:
  - deployments
  - replicasets
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  name: jupyter-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - persistentvolumeclaims
  verbs:
  - get
  - watch
  - list
  - create
  - delete
- apiGroups:
  - ""
  resources:
  - events
  - secrets
  verbs:
  - get
  - watch
  - list
`)
  th.writeF("/manifests/jupyter/jupyter/base/service-account.yaml", `
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jupyter
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jupyter-notebook
`)
  th.writeF("/manifests/jupyter/jupyter/base/service.yaml", `
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: "true"
  name: jupyter-0
spec:
  clusterIP: None
  ports:
  - name: hub
    port: 8000
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: jupyter-lb-hub-mapping
      prefix: /hub/
      rewrite: /hub/
      timeout_ms: 300000
      service: jupyter-lb.$(namespace)
      use_websocket: true
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: jupyter-lb-user-mapping
      prefix: /user/
      rewrite: /user/
      timeout_ms: 300000
      service: jupyter-lb.$(namespace)
      use_websocket: true
  labels:
    app: jupyter-lb
  name: jupyter-lb
spec:
  ports:
  - name: hub
    port: 80
    targetPort: 8000
  type: $(serviceType)
`)
  th.writeF("/manifests/jupyter/jupyter/base/stateful-set.yaml", `
apiVersion: apps/v1beta2
kind: StatefulSet
metadata:
  name: jupyter
spec:
  replicas: 1
  serviceName: ""
  template:
    metadata:
      labels:
        app: jupyter
    spec:
      containers:
      - command:
        - jupyterhub
        - -f
        - /etc/config/jupyter_config.py
        env:
        - name: KF_AUTHENTICATOR
          valueFrom:
            configMapKeyRef:
              name: parameters
              key: KF_AUTHENTICATOR
        - name: DEFAULT_JUPYTERLAB
          valueFrom:
            configMapKeyRef:
              name: parameters
              key: DEFAULT_JUPYTERLAB
        - name: STORAGE_CLASS
          valueFrom:
            configMapKeyRef:
              name: parameters
              key: DEFAULT_JUPYTERLAB
        - name: ROK_SECRET_NAME
          value: secret-rok-{username}
        image: gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1
        name: jupyter
        ports:
        - containerPort: 8000
        - containerPort: 8081
        volumeMounts:
        - mountPath: /etc/config
          name: config-volume
      serviceAccountName: jupyter
      volumes:
      - configMap:
          name: jupyter-config
        name: config-volume
  updateStrategy:
    type: RollingUpdate
  volumeClaimTemplates: []
`)
  th.writeF("/manifests/jupyter/jupyter/base/params.yaml", `
varReference:
- path: spec/template/spec/containers/imagePullPolicy
  kind: Deployment
- path: metadata/annotations/getambassador.io\/config
  kind: Service
- path: spec/type
  kind: Service
`)
  th.writeF("/manifests/jupyter/jupyter/base/params.env", `
STORAGE_CLASS=null
KF_AUTHENTICATOR=null
DEFAULT_JUPYTERLAB=false
serviceType=ClusterIP
`)
  th.writeK("/manifests/jupyter/jupyter/base", `
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: kubeflow
resources:
- config-map.yaml
- role-binding.yaml
- role.yaml
- service-account.yaml
- service.yaml
- stateful-set.yaml
commonLabels:
  kustomize.component: jupyter
  app: jupyter
images:
  - name: gcr.io/kubeflow/jupyterhub-k8s
    newName: gcr.io/kubeflow/jupyterhub-k8s
    newTag: v20180531-3bb991b1
configMapGenerator:
- name: parameters
  env: params.env
generatorOptions:
  disableNameSuffixHash: true
vars:
- name: serviceType
  objref:
    kind: ConfigMap
    name: parameters
    apiVersion: v1
  fieldref:
    fieldpath: data.serviceType
- name: namespace
  objref:
    kind: Service
    name: jupyter-lb
    apiVersion: v1
  fieldref:
    fieldpath: metadata.namespace
configurations:
- params.yaml
`)
}

func TestJupyter(t *testing.T) {
  th := NewKustTestHarness(t, "/manifests/jupyter/jupyter/base")
  writeJupyter(th)
  m, err := th.makeKustTarget().MakeCustomizedResMap()
  if err != nil {
    t.Fatalf("Err: %v", err)
  }
  th.assertActualEqualsExpected(m, `
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-notebook
  namespace: kubeflow
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-notebook-role
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  - secrets
  - services
  verbs:
  - '*'
- apiGroups:
  - ""
  - apps
  - extensions
  resources:
  - deployments
  - replicasets
  verbs:
  - '*'
- apiGroups:
  - kubeflow.org
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - '*'
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-role
  namespace: kubeflow
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - persistentvolumeclaims
  verbs:
  - get
  - watch
  - list
  - create
  - delete
- apiGroups:
  - ""
  resources:
  - events
  - secrets
  verbs:
  - get
  - watch
  - list
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-notebook-role
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: jupyter-notebook-role
subjects:
- kind: ServiceAccount
  name: jupyter-notebook
  namespace: kubeflow
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-role
  namespace: kubeflow
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: jupyter-role
subjects:
- kind: ServiceAccount
  name: jupyter
  namespace: kubeflow
---
apiVersion: v1
data:
  jupyter_config.py: |
    # -*- coding: utf-8 -*-
    """
    Configuration file for JupyterHub.

    Kubeflow uses this file as the configuration file for JupyterHub. It contains
    all glue code necessary to integrate JupyterHub with the remaining Kubeflow
    components.

    Note that this file is also responsible for importing the UI-specific Spawner
    class from <ui-dir>/spawner.py, and setting the 'spawner_class' configuration
    option.
    """

    import os
    from importlib.util import spec_from_file_location, module_from_spec
    from jhub_remote_user_authenticator.remote_user_auth import     RemoteUserAuthenticator

    SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'

    # Import the UI-specific Spawner
    spec = spec_from_file_location('spawner', '/etc/config/spawner.py')
    spawner = module_from_spec(spec)
    spec.loader.exec_module(spawner)

    ###################################################
    # JupyterHub Options
    ###################################################
    c.JupyterHub.ip = '0.0.0.0'
    c.JupyterHub.hub_ip = '0.0.0.0'
    # Don't try to cleanup servers on exit - since in general for k8s, we want
    # the hub to be able to restart without losing user containers
    c.JupyterHub.cleanup_servers = False
    ###################################################

    ###################################################
    # Spawner Options
    ###################################################
    c.JupyterHub.spawner_class = spawner.KubeFormSpawner

    c.KubeSpawner.cmd = 'start-singleuser.sh'
    c.KubeSpawner.args = ['--allow-root']
    # gpu images are very large ~15GB. need a large timeout.
    c.KubeSpawner.start_timeout = 60 * 30
    # Increase timeout to 5 minutes to avoid HTTP 500 errors on JupyterHub
    c.KubeSpawner.http_timeout = 60 * 5

    # Volume setup
    c.KubeSpawner.singleuser_uid = 1000
    c.KubeSpawner.singleuser_fs_gid = 100
    c.KubeSpawner.singleuser_working_dir = '/home/jovyan'

    # Allow environment vars to override uid and gid.
    # This allows local host path mounts to be read/writable
    env_uid = os.environ.get('NOTEBOOK_UID')
    if env_uid:
      c.KubeSpawner.singleuser_uid = int(env_uid)
    env_gid = os.environ.get('NOTEBOOK_GID')
    if env_gid:
      c.KubeSpawner.singleuser_fs_gid = int(env_gid)
    access_local_fs = os.environ.get('ACCESS_LOCAL_FS')
    if access_local_fs == 'true':

      def modify_pod_hook(spawner, pod):
        pod.spec.containers[0].lifecycle = {
            'postStart': {
                'exec': {
                    'command': [
                        'ln', '-s', '/mnt/local-notebooks',
                        '/home/jovyan/local-notebooks'
                    ]
                }
            }
        }
        return pod

      c.KubeSpawner.modify_pod_hook = modify_pod_hook

    ###################################################
    # Persistent volume options
    ###################################################

    # Set user_storage_pvc_ensure to False to prevent KubeSpawner from handling PVCs
    # We natively handle PVCs via KubeFormSpawner and its dedicated methods

    # NOTE: user_storage_pvc_ensure has been deprecated in a future release
    c.KubeSpawner.storage_pvc_ensure = False
    c.KubeSpawner.user_storage_pvc_ensure = False

    volumes = []
    volume_mounts = []

    gcp_secret_name = os.environ.get('GCP_SECRET_NAME')
    if gcp_secret_name:
      volumes.append({
          'name': gcp_secret_name,
          'secret': {
              'secretName': gcp_secret_name,
          }
      })
      volume_mounts.append({
          'name': gcp_secret_name,
          'mountPath': SERVICE_ACCOUNT_SECRET_MOUNT
      })

    c.KubeSpawner.volumes = volumes
    c.KubeSpawner.volume_mounts = volume_mounts

    storage_class = None
    if os.environ.get('STORAGE_CLASS') != 'null':
      storage_class = os.environ.get('STORAGE_CLASS')

    rok_secret_name = ''
    if os.environ.get('ROK_SECRET_NAME') != 'null':
      rok_secret_name = os.environ.get('ROK_SECRET_NAME')

    # Set both service_account and singleuser_service_account because
    # singleuser_service_account has been deprecated in a future release
    c.KubeSpawner.service_account = 'jupyter-notebook'
    c.KubeSpawner.singleuser_service_account = 'jupyter-notebook'
    # Authenticator
    if os.environ.get('KF_AUTHENTICATOR') == 'iap':
      c.JupyterHub.authenticator_class = RemoteUserAuthenticator
      c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'
    else:
      c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'

    if os.environ.get('DEFAULT_JUPYTERLAB').lower() == 'true':
      c.KubeSpawner.default_url = '/lab'

    # Set extra spawner configuration variables
    c.KubeSpawner.extra_spawner_config = {
        'gcp_secret_name': gcp_secret_name,
        'storage_class': storage_class,
        'rok_secret_name': rok_secret_name,
    }
  script.js: |
    // This function is executed when the document is ready
    $(function() {

      // Toggle advanced options inside the Spawner form
      $('#toggle_advanced_options').on('click', function(e) {
        $('#advanced_fields').toggle();
      });

      // Resize Spawner form to take up more page width
      $('.row.col-sm-offset-2.col-sm-8').attr({
        'class': 'row col-sm-offset-1 col-sm-10',
        'style': 'padding: 15px;'
      });

      // Update upper-right sign-out icon to FontAwesome 5
      $('.fa.fa-sign-out').attr('class', 'fas fa-sign-out-alt');

      // Update Spawn button text upon form submission
      if (formDefaults) {
        $('#spawn_form').one('submit', function() {
          $(this).find('input[type="submit"]')
          .attr('disabled', true)
          .val('Spawning...');
        });
      } else {
        $("h1:contains('Spawner Options')" ).remove();
        $('#spawn_form').find('input[type="submit"]').remove();
      }

      // Configure Image input elements
      setImageType();

      // Dynamically change Workspace form fields behavior
      setWorkspaceEventListeners();

      // Fill the form with values defined in the YAML config file
      setDefaultFormValues();

      // Set tooltip to readOnly form fields
      setTooltipsOnImmutable();
    });

    // Dynamically update Image input field, based on radio button selection
    function setImageType() {
      imageType = $('#imageType').find('input:checked').val();
      if (imageType == 'standard') {
        $('select[for=standardImages]')
          .attr({'id': 'image', 'name': 'image'}).css({'display': ''});
        $('input[for=customImage]')
          .attr({'id': '', 'name': ''}).removeAttr('required').css({'display': 'none'});
      } else {
        $('input[for=customImage]')
          .attr({'id': 'image', 'name': 'image'}).css({'display': ''});
        $('select[for=standardImages]')
          .attr({'id': '', 'name': ''}).removeAttr('required').css({'display': 'none'});
      }
    }

    // Set default values to form fields
    function setDefaultFormValues() {

      // If config.yaml is empty, no need to initialize anything
      if (!formDefaults) {
        return;
      }

      if ('image' in formDefaults) {
        // Set Container image dropdown list
        if ('options' in formDefaults.image) {
          formDefaults.image.options.forEach(function(item) {
            $('#image').append($('<option/>').attr('value', item).text(item));
          });
        }
        // Set default Container Image, if specified
        $('#image').val('');
        if ('value' in formDefaults.image) {
          $('#image').val(formDefaults.image.value);
        }

        // Make Container Image field readonly, if specified
        if ('readOnly' in formDefaults.image) {
          $('#option_standard').prop({
              'disabled': formDefaults.image.readOnly,
              'immutable': formDefaults.image.readOnly
          });
          $('#option_custom').prop({
              'disabled': formDefaults.image.readOnly,
              'immutable': formDefaults.image.readOnly
          });
        }
      }

      if ('cpu' in formDefaults) {
        // Set default CPU, if specified
        $('#cpu').val('');
        if ('value' in formDefaults.cpu) {
          $('#cpu').val(formDefaults.cpu.value);
        }
        // Make CPU field readonly, if specified
        if ('readOnly' in formDefaults.cpu) {
          $('#cpu').attr({
            'readonly': formDefaults.cpu.readOnly,
            'immutable': formDefaults.cpu.readOnly
          });
        }
      }

      if ('memory' in formDefaults) {
        // Set default Memory, if specified
        $('#memory').val('');
        if ('value' in formDefaults.memory) {
          $('#memory').val(formDefaults.memory.value);
        }
        // Make Memory field readonly if specified
        if ('readOnly' in formDefaults.memory) {
          $('#memory').attr({
            'readonly': formDefaults.memory.readOnly,
            'immutable': formDefaults.memory.readOnly
          });
        }
      }

      $('#ws_name').attr('placeholder', username + '-workspace');
      $('#ws_mount_path').attr('placeholder', '/home/jovyan');

      if ('workspaceVolume' in formDefaults) {
        var defaultWorkspaceReadOnly = formDefaults.workspaceVolume.readOnly

        if ('value' in formDefaults.workspaceVolume) {
          var defaultWorkspace = formDefaults.workspaceVolume.value;
          // Set the default Workspace Volume, if specified
          if (defaultWorkspace) {
            if ('type' in defaultWorkspace) {
              // Set the Workspace Volume Type, if specified
              $('#ws_type').val('');
              if ('value' in defaultWorkspace.type) {
                $('#ws_type').val(defaultWorkspace.type.value);
              }
              // Make the Workspace Volume Type readonly, if specified
              if ('readOnly' in defaultWorkspace.type || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_type').attr({
                  'readonly': defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly
                });
                if ($('#ws_type').attr('readonly')) {
                  $('#ws_type').on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }
            $('#ws_type').trigger('change');

            if ('name' in defaultWorkspace) {
              $('#ws_name').val('');
              // Set the Workspace Volume Name, if specified
              if ('value' in defaultWorkspace.name) {
                $('#ws_name').val(defaultWorkspace.name.value).trigger('focusout');
              }
              // Make the Workspace Volume Name readonly, if specified
              if ('readOnly' in defaultWorkspace.name || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_name').attr({
                  'readonly': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('size' in defaultWorkspace) {
              $('#ws_size').val('');
              // Set the Workspace Volume Size, if specified
              if ('value' in defaultWorkspace.size) {
                $('#ws_size').val(defaultWorkspace.size.value);
              }
              // Make the Workspace Volume Size readonly, if specified
              if ('readOnly' in defaultWorkspace.size || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_size').attr({
                  'readonly': defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('mountPath' in defaultWorkspace) {
              $('#ws_mount_path').val('');
              // Set the Workspace Volume MountPath, if specified
              if ('value' in defaultWorkspace.mountPath) {
                $('#ws_mount_path').val(defaultWorkspace.mountPath.value);
              }
              // Make the Workspace Volume MountPath readonly, if specified
              if ('readOnly' in defaultWorkspace.mountPath || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_mount_path').attr({
                  'readonly': defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly
                });
              }
            }

            if ('accessModes' in defaultWorkspace) {
              $('#ws_access_modes').val('');
              // Set the Workspace Volume Access Modes, if specified
              if ('value' in defaultWorkspace.accessModes) {
                $('#ws_access_modes').val(defaultWorkspace.accessModes.value);
              }
              // Make the Workspace Volume Access Modes readonly, if specified
              if ('readOnly' in defaultWorkspace.accessModes || 'readOnly' in formDefaults.workspaceVolume) {
                $('#ws_access_modes').attr({
                  'readonly': defaultWorkspace.accessModes.readOnly || defaultWorkspaceReadOnly,
                  'immutable': defaultWorkspace.accessModes.readOnly || defaultWorkspaceReadOnly
                });
                if ($('#ws_access_modes').attr('readonly')) {
                  $('#ws_access_modes').on('mousedown', function(e) {
                    e.preventDefault(); this.blur();  window.focus();
                  });
                }
              }
            }
          }
        }
      }

      if ('dataVolumes' in formDefaults) {
          var dataVolumesReadOnly = formDefaults.dataVolumes.readOnly
          // Disable Add Volume button, if specified
          if ('readOnly' in formDefaults.dataVolumes) {
            $('#add_volume').attr({
              'disabled': dataVolumesReadOnly,
              'immutable': dataVolumesReadOnly
            });
          }

          // Set default Data Volumes - Disable if specified
          var defaultDataVolumes = []
          if ('value' in formDefaults.dataVolumes) {
            defaultDataVolumes = formDefaults.dataVolumes.value;
          }
          for (i = 0; i < defaultDataVolumes.length; i++) {
            addVolume();

            var vol = {}
            if ('value' in defaultDataVolumes[i]) {
              vol = defaultDataVolumes[i].value;
            }

            if ('type' in vol) {
              $('#vol_type' + counter).val('');
              if ('value' in vol.type) {
                $('#vol_type' + counter).val(vol.type.value).trigger('change');
              }
              if ('readOnly' in vol.type || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_type' + counter).attr({
                  'readonly': vol.type.readOnly || dataVolumesReadOnly,
                  'immutable': vol.type.readOnly || dataVolumesReadOnly
                });
                if ($('#vol_type' + counter).attr('readonly')) {
                  $('#vol_type' + counter).on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }

            if ('name' in vol) {
              $('#vol_name' + counter).val('');
              if ('value' in vol.name) {
                $('#vol_name' + counter).val(vol.name.value).trigger('focusout');
              }
              if ('readOnly' in vol.name || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_name' + counter).attr({
                  'readonly': vol.name.readOnly || dataVolumesReadOnly,
                  'immutable': vol.name.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('size' in vol) {
              $('#vol_size' + counter).val('');
              if ('value' in vol.size) {
                $('#vol_size' + counter).val(vol.size.value);
              }
              if ('readOnly' in vol.size || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_size' + counter).attr({
                  'readonly': vol.size.readOnly || dataVolumesReadOnly,
                  'immutable': vol.size.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('mountPath' in vol) {
              $('#vol_mount_path' + counter).val('');
              if ('value' in vol.mountPath) {
                $('#vol_mount_path' + counter).val(vol.mountPath.value);
              }
              if ('readOnly' in vol.mountPath || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_mount_path' + counter).attr({
                  'readonly': vol.mountPath.readOnly || dataVolumesReadOnly,
                  'immutable': vol.mountPath.readOnly || dataVolumesReadOnly
                });
              }
            }

            if ('accessModes' in vol) {
              $('#vol_access_modes' + counter).val('');
              if ('value' in vol.accessModes) {
                $('#vol_access_modes' + counter).val(vol.accessModes.value);
              }
              if ('readOnly' in vol.accessModes || 'readOnly' in formDefaults.dataVolumes) {
                $('#vol_access_modes' + counter).attr({
                  'readonly': vol.accessModes.readOnly || dataVolumesReadOnly,
                  'immutable': vol.accessModes.readOnly || dataVolumesReadOnly
                });
                if ($('#vol_access_modes' + counter).attr('readonly')) {
                  $('#vol_access_modes' + counter).on('mousedown', function(e) {
                    e.preventDefault(); this.blur(); window.focus();
                  });
                }
              }
            }

            // Disable Delete button, if specified
            if ('readOnly' in formDefaults.dataVolumes) {
              $('#vol_delete_button' + counter).attr({
                'disabled': formDefaults.dataVolumes.readOnly,
                'immutable': formDefaults.dataVolumes.readOnly
              });
            }
          }
      }

      if ('extraResources' in formDefaults) {
        // Set default Extra Resources, if specified
        $('#extraResources').val('{}');
        if ('value' in formDefaults.extraResources) {
          $('#extraResources').val(formDefaults.extraResources.value);
        }
        // Make Extra Resources field readonly, if specified
        if ('readOnly' in formDefaults.extraResources) {
          $('#extraResources').attr({
            'readonly': formDefaults.extraResources.readOnly,
            'immutable': formDefaults.extraResources.readOnly
          });
        }
      }
    }

    // Register jQuery event listeners for the Workspace Volume
    function  setWorkspaceEventListeners() {
      var workspaceType = $('#ws_type');
      var workspaceName = $('#ws_name');
      var workspaceSize = $('#ws_size');
      var workspaceAccessModes = $('#ws_access_modes');
      var workspaceMountPath = $('#ws_mount_path');

      // Disable/Enable Workspace size option based on its Type
      workspaceType.on('change', function() {
        // Set attributes for the Volume fields
        if (this.value == 'Existing') {
          setAttributes(workspaceName, {'list': 'suggest_pvcs'});
          setAttributes(workspaceSize, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Size is autofilled when mounting existing Volumes'
          });
          setAttributes(workspaceAccessModes, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Access Mode is autofilled when mounting existing Volumes'
          });
          $('#ws_access_modes option').not(':selected').attr('disabled', 'disabled')
        } else if (this.value == 'New') {
          setAttributes(workspaceName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
          unsetAttributes(workspaceAccessModes, 'readonly data-toggle data-placement title');
        }

        // Set values for non-readonly Volume fields
        setValue(workspaceName, '');
        setValue(workspaceSize, workspaceSize.attr('placeholder'));
        setValue(workspaceMountPath, '');
        setValue(workspaceAccessModes, workspaceAccessModes.find('option:first').val());
      });

      workspaceName.on('focusout', function() {
        for (var i = 0; i < existingPVCs.length; i++) {
          if (existingPVCs[i].name == this.value) {
            // Volume already exists - autocomplete its Size and Access Mode
            setValue(workspaceType, 'Existing');
            setAttributes(workspaceName, {'list': 'suggest_pvcs'});
            setAttributes(workspaceSize, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Size is autofilled when mounting existing Volumes'
            });
            setValue(workspaceSize, existingPVCs[i].size);
            setAttributes(workspaceAccessModes, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Access Mode is autofilled when mounting existing Volumes'
            });
            setValue(workspaceAccessModes, existingPVCs[i].access_modes);
            break;
          }
        }

        if (this.value.length > 0) {
          setValue(workspaceMountPath, '/home/jovyan/' + this.value);
        } else {
          setValue(workspaceMountPath, '' + this.value);
        }

        if (i == existingPVCs.length) {
          // Volume does not exist - set its Type to 'New'
          setValue(workspaceType, 'New');
          setAttributes(workspaceName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
          setValue(workspaceSize, '');
          unsetAttributes(workspaceAccessModes, 'readonly data-toggle data-placement title');
          setValue(workspaceAccessModes, workspaceAccessModes.find('option:first').val());
        }
      });

      // Trigger focusout event to check the Workspace name
      workspaceName.trigger('focusout');
    }

    // Counter and options for Dataset Volumes
    var counter = 0;
    var options = [
      'vol_type', 'vol_name', 'vol_size', 'vol_mount_path', 'vol_access_modes'
    ];

    // Dynamically adds a UI element for configuring a volume
    function addVolume() {
      counter++;

      // Input for volume type
      var volumeType = $('<select>').attr({
        class: 'form-control',
        id: 'vol_type' + counter,
        name: 'vol_type' + counter,
        required: true
      });

      volumeType
        .append($('<option/>').attr({selected: true, value: 'New'}).text('New'))
        .append($('<option/>').attr({value: 'Existing'}).text('Existing'));

      // Input for volume name
      var volumeName = $('<input>').attr({
        class: 'form-control',
        id: 'vol_name' + counter,
        name: 'vol_name' + counter,
        type: 'text',
        placeholder: username + '-volume-' + counter,
        list: 'suggest_pvcs_disabled',
        value: username + '-volume-' + counter,
        required: true
      });

      // Input for volume size
      var volumeSize = $('<input>').attr({
        class: 'form-control',
        id: 'vol_size' + counter,
        name: 'vol_size' + counter,
        type: 'number',
        min: '0',
        step: '0.5',
        placeholder: '10',
        value: '10',
        required: true
      });

      // Input for volume mount point
      var volumeMountPath = $('<input>').attr({
        class: 'form-control',
        id: 'vol_mount_path' + counter,
        name: 'vol_mount_path' + counter,
        type: 'text',
        placeholder: '/home/jovyan/' + username + '-volume-' + counter,
        required: true
      });

      // Selection for volume access mode
      var volumeAccessModes = $('<select>').attr({
          class: 'form-control',
          id: 'vol_access_modes' + counter,
          name: 'vol_access_modes' + counter,
          required: true
      });

      volumeAccessModes
        .append($('<option/>').attr({value: 'ReadWriteOnce'}).text('ReadWriteOnce'))
        .append($('<option/>').attr({value: 'ReadWriteMany'}).text('ReadWriteMany'))
        .append($('<option/>').attr({value: 'ReadOnlyMany'}).text('ReadOnlyMany'));

      // Delete button for volume removal
      var deleteButton = $('<button/>').attr({
        class: 'btn btn-danger btn-sm',
        id: 'vol_delete_button' + counter,
        type: 'button',
        onclick: 'removeVolume(' + counter + ');'
      });

      deleteButton.append($('<i>').attr({class: 'fas fa-minus'}));

      // Disable/Enable Volume size option based on its Type
      volumeType.on('change', function() {
        if (this.value == 'Existing') {
          // Set attributes for the Volume fields
          setAttributes(volumeName, {'list': 'suggest_pvcs'});
          setAttributes(volumeSize, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Size is autofilled when mounting existing Volumes'
          });
          setAttributes(volumeAccessModes, {
            'readonly': true,
            'data-toggle': 'tooltip', 'data-placement': 'top',
            'title': 'Access Mode is autofilled when mounting existing Volumes'
          });
          $('#vol_access_modes option').not(':selected').attr('disabled', 'disabled')
        } else if (this.value == 'New') {
          setAttributes(volumeName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
          unsetAttributes(volumeAccessModes, 'readonly data-toggle data-placement title');
        }

        // Set values for non-readonly Volume fields
        setValue(volumeName, '');
        setValue(volumeSize, volumeSize.attr('placeholder'));
        setValue(volumeMountPath, '');
        setValue(volumeAccessModes, volumeAccessModes.find('option:first').val());
      });

      volumeName.on('focusout', function() {
        for (var i = 0; i < existingPVCs.length; i++) {
          if (existingPVCs[i].name == this.value) {
            // Volume already exists - autocomplete its Size and Access Mode
            setValue(volumeType, 'Existing');
            setAttributes(volumeName, {'list': 'suggest_pvcs'});
            setAttributes(volumeSize, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Size is autofilled when mounting existing Volumes'
            });
            setValue(volumeSize, existingPVCs[i].size)
            setAttributes(volumeAccessModes, {
              'readonly': true,
              'data-toggle': 'tooltip', 'data-placement': 'top',
              'title': 'Access Mode is autofilled when cloning existing Volumes'
            });
            setValue(volumeAccessModes, existingPVCs[i].access_modes)
            break;
          }
        }

        if (this.value.length > 0) {
          setValue(volumeMountPath, '/home/jovyan/' + this.value);
        } else {
          setValue(volumeMountPath, '' + this.value);
        }

        if (i == existingPVCs.length) {
          // Volume does not exist - set its Type to 'New'
          setValue(volumeType, 'New');
          setAttributes(volumeName, {'list': 'suggest_pvcs_disabled'});
          unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
          unsetAttributes(volumeAccessModes, 'readonly data-toggle data-placement title');
          setValue(volumeAccessModes, volumeAccessModes.find('option:first').val());
        }
      });

      // Create and append new volume
      $('<div/>', {'class': 'form-group volume' + counter})
        .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 14%'}).append(volumeType))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 20%'}).append(volumeName))
        .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 12%'}).append(volumeSize))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 29%'}).append(volumeMountPath))
        .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 19%'}).append(volumeAccessModes))
        .append($('<div/>', {class: 'col-sm-1 form-group', style: 'width: 5%; padding: 2px'}).append(deleteButton))
        .hide().fadeIn('fast').appendTo($('#data_volumes'));

      // Trigger focusout event to check Volume Name
      volumeName.trigger('focusout');
    }

    // Dynamically remove a previously added UI element for configuring a volume
    function removeVolume(id) {
      $('.volume' + id).fadeOut('fast', function() {
        $(this).remove();
      });
      counter--;

      // Normalize the IDs of remainder volumes
      for (i = id; i <= counter; i++) {
        var volumeElement = $('.volume' + (i + 1));
        volumeElement.find('#vol_delete_button' + (i + 1)).attr({
          'id': 'vol_delete_button' + i,
          'onclick': 'removeVolume(' + i + ')'
        });

        // Update the class of the Volume
        volumeElement.removeClass('volume' + (i + 1)).addClass('volume' + i);

        // Update the id and name of the Volume options
        options.forEach(function(option) {
          volumeElement.find('#' + option + (i + 1)).attr({
            'id': option + i,
            'name': option + i
          });
        });

        // Update Volume options
        setAttributes(volumeElement.find('[id^=vol_name]'), {
          'placeholder': username + '-volume-' + i,
        });
        setValue(volumeElement.find('[id^=vol_name]'), username + '-volume-' + i)
        setAttributes(volumeElement.find('[id^=vol_mount_path]'), {
          'placeholder': '/home/jovyan/' + username + '-volume-' + i,
        });
        setValue(volumeElement.find('[id^=vol_mount_path]'), '/home/jovyan/' + username + '-volume-' + i)
      }
    }

    // Helper function to set a tooltip to admin-disabled Spawner form fields
    function setTooltipsOnImmutable() {
      $(':input[immutable=true]').attr({
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'This option has been set by your administrator'
      });
    }

    // Helper function to set the value of a mutable Spawner option
    function setValue(element, value) {
      if (!element.attr('immutable')) {
        element.val(value);
      }
    }

    // Helper function to set attributes of a mutable Spawner option
    function setAttributes(element, attributes) {
      if (!element.attr('immutable')) {
        element.attr(attributes);
      }
    }

    // Helper function to unset attributes of a mutable Spawner option
    function unsetAttributes(element, attributes) {
      if (!element.attr('immutable')) {
        element.removeAttr(attributes);
      }
    }
  spawner.py: |
    # -*- coding: utf-8 -*-
    import json
    import yaml
    import string
    import escapism
    from tornado import gen
    from traitlets import Dict
    from jinja2 import FileSystemLoader, Environment

    from kubespawner.objects import make_pvc
    from kubespawner.spawner import KubeSpawner
    from kubernetes.client.rest import ApiException

    SERVICE_ACCOUNT_SECRET_MOUNT = '/var/run/secrets/sa'


    class KubeFormSpawner(KubeSpawner):
      """Implement a custom Spawner to spawn pods in a Kubernetes Cluster."""

      def __init__(self, *args, **kwargs):
        """Call init() of parent class and initialize volume lists."""
        super(KubeFormSpawner, self).__init__(*args, **kwargs)
        self.initial_volumes = list(self.volumes)
        self.initial_volume_mounts = list(self.volume_mounts)

      @property
      def spawner_ui_config(self):
        # Read raw YAML file, format it and parse it as dict
        if not hasattr(self, "_spawner_ui_config"):
          c = None
          try:
            with open('/etc/config/spawner_ui_config.yaml', 'r') as f:
              c = self._expand_user_properties(f.read())
          except IOError:
            self.log.warning('Error opening Spawner UI config file')

          try:
            if yaml.safe_load(c) is None:
              # YAML exists but is empty
              self._spawner_ui_config = {}
            else:
              # YAML exists and is not empty
              self._spawner_ui_config = yaml.safe_load(c)
          except yaml.YAMLError as e:
            self.log.warning(
                'Spawner UI config file contains'
                'invalid YAML syntax: {}', e)
            return None

        return self._spawner_ui_config

      extra_spawner_config = Dict({},
                                  config=True,
                                  help="""
            A dictionary with extra configuration parameters for KubeFormSpawner.
            """)

      def options_form(self, form):
        # Create Jinja environment to dynamically load templates
        j2_env = Environment(loader=FileSystemLoader('/etc/config'))

        # Get available PVCs in a given namespace
        # This is a blocking K8s API call
        existing_pvcs = self._list_pvcs_in_namespace(self.namespace)

        form_defaults = None
        if self.spawner_ui_config is not None:
          # YAML exists and was parsed successfully
          if self.spawner_ui_config['spawnerFormDefaults'] is not None:
            form_defaults = self.spawner_ui_config['spawnerFormDefaults']
          else:
            form_defaults = {}

        # Return the rendered template as a unicode string
        return j2_env.get_template('template.html').render(
            form_defaults=form_defaults,
            existing_pvcs=existing_pvcs,
            username=self._expand_user_properties('{username}'))

      def options_from_form(self, formdata):
        options = {}
        if self.spawner_ui_config is not None:
          form_defaults = self.spawner_ui_config['spawnerFormDefaults']

        # Manage Image
        image_readonly = False
        if self._default_config_contains('image'):
          options['image'] = form_defaults['image']['value']
          image_readonly = form_defaults['image'].get('readOnly', False)
        if ('image' in formdata and formdata['image'][0]):
          image_from_form = formdata['image'][0].strip()
          if image_readonly:
            # Provided image must be standard
            if image_from_form in form_defaults['image']['options']:
              options['image'] = image_from_form
          else:
            # Provided image can be standard or custom
            options['image'] = image_from_form

        # Manage CPU
        cpu_readonly = False
        if self._default_config_contains('cpu'):
          options['cpu'] = form_defaults['cpu']['value']
          cpu_readonly = form_defaults['cpu'].get('readOnly', False)
        if (not cpu_readonly and 'cpu' in formdata and formdata['cpu'][0]):
          options['cpu'] = formdata['cpu'][0].strip()

        # Manage Memory
        memory_readonly = False
        if self._default_config_contains('memory'):
          options['memory'] = form_defaults['memory']['value']
          memory_readonly = form_defaults['memory'].get('readOnly', False)
        if (not memory_readonly and 'memory' in formdata and formdata['memory'][0]):
          options['memory'] = formdata['memory'][0].strip()

        # Manage Workspace Volume
        options['workspaceVolume'] = {}
        ws_volume = {}

        ws_volume_readonly = False
        if self._default_config_contains('workspaceVolume'):
          ws_volume_readonly =           form_defaults['workspaceVolume'].get('readOnly', False)

          # The Workspace Volume is specified in 'config.yaml'
          default_ws_volume = form_defaults['workspaceVolume']['value']

          # Get and set the default values from the YAML configuration file,
          # if present and not marked as readonly
          ws_type_readonly = False
          if ('type' in default_ws_volume and 'value' in default_ws_volume['type']):
            ws_volume['type'] = default_ws_volume['type']['value']
            ws_type_readonly =             default_ws_volume['type'].get('readOnly', False)

          ws_name_readonly = False
          if ('name' in default_ws_volume and 'value' in default_ws_volume['name']):
            ws_volume['name'] = default_ws_volume['name']['value']
            ws_name_readonly =             default_ws_volume['name'].get('readOnly', False)

          ws_size_readonly = False
          if ('size' in default_ws_volume and 'value' in default_ws_volume['size']):
            ws_volume['size'] =             '%sGi' % default_ws_volume['size']['value']
            ws_size_readonly =             default_ws_volume['size'].get('readOnly', False)

          ws_mount_path_readonly = False
          if ('mountPath' in default_ws_volume and
              'value' in default_ws_volume['mountPath']):
            ws_volume['mountPath'] =             default_ws_volume['mountPath']['value']
            ws_mount_path_readonly =             default_ws_volume['mountPath'].get('readOnly', False)

          ws_access_modes_readonly = False
          if ('accessModes' in default_ws_volume and
              'value' in default_ws_volume['accessModes']):
            ws_volume['accessModes'] =             default_ws_volume['accessModes']['value']
            ws_access_modes_readonly =             default_ws_volume['accessModes'].get('readOnly', False)

        # Get and set the Workspace Volume values from the form, if present
        # and not marked as readonly
        if not ws_volume_readonly:
          if (not ws_type_readonly and 'ws_type' in formdata and
              formdata['ws_type'][0]):
            ws_volume['type'] = formdata['ws_type'][0].strip()

          if (not ws_name_readonly and 'ws_name' in formdata and
              formdata['ws_name'][0]):
            ws_volume['name'] = formdata['ws_name'][0].strip()

          if (not ws_size_readonly and 'ws_size' in formdata and
              formdata['ws_size'][0]):
            ws_volume['size'] = '%sGi' % formdata['ws_size'][0].strip()

          if (not ws_mount_path_readonly and 'ws_mount_path' in formdata and
              formdata['ws_mount_path'][0]):
            ws_volume['mountPath'] =             formdata['ws_mount_path'][0].strip()

          if (not ws_access_modes_readonly and 'ws_access_modes' in formdata and
              formdata['ws_access_modes'][0]):
            ws_volume['accessModes'] =             formdata['ws_access_modes'][0].strip()

        options['workspaceVolume'] = ws_volume

        # Manage Data Volumes
        options['dataVolumes'] = []
        data_volumes_readonly = False
        if self._default_config_contains('dataVolumes'):
          data_volumes_readonly =           form_defaults['dataVolumes'].get('readOnly', False)

        if data_volumes_readonly:
          # Set Data Volumes as specified in the Spawner configuration file
          for volume in form_defaults['dataVolumes']['value']:
            data_volume = {}
            for f in ['type', 'name', 'size', 'mountPath', 'accessModes']:
              data_volume[f] = volume['value'][f]['value']
            data_volume['size'] += 'Gi'
            options['dataVolumes'].append(data_volume)
        else:
          # Deduce the total number of Data Volumes
          data_volumes_cnt = 0
          for k, v in formdata.items():
            if k.startswith('vol_type'):
              data_volumes_cnt += 1

          # Set Data Volumes as specified in the Spawner form
          for i in range(1, data_volumes_cnt + 1):
            data_volume = {}

            # Get all Data Volume fields from the form
            id = 'vol_type' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['type'] = formdata[id][0].strip()

            id = 'vol_name' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['name'] = formdata[id][0].strip()

            id = 'vol_size' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['size'] = '%sGi' % formdata[id][0].strip()

            id = 'vol_mount_path' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['mountPath'] = formdata[id][0].strip()

            id = 'vol_access_modes' + str(i)
            if id in formdata and formdata[id][0]:
              data_volume['accessModes'] = formdata[id][0].strip()

            options['dataVolumes'].append(data_volume)

        # Manage Extra Resources
        extra_resources_readonly = False
        if self._default_config_contains('extraResources'):
          options['extraResources'] = (form_defaults['extraResources']['value'])
          extra_resources_readonly =           form_defaults['extraResources'].get('readOnly', False)
        if (not extra_resources_readonly and 'extraResources' in formdata and
            formdata['extraResources'][0]):
          options['extraResources'] =           formdata['extraResources'][0].strip()

        return options

      @property
      def singleuser_image_spec(self):
        return self.user_options['image']

      image_spec = singleuser_image_spec

      @property
      def cpu_guarantee(self):
        return self.user_options['cpu']

      @property
      def mem_guarantee(self):
        return self.user_options['memory']

      @property
      def workspace_volume(self):
        return self.user_options["workspaceVolume"]

      @property
      def data_volumes(self):
        return self.user_options["dataVolumes"]

      @property
      def extra_resource_limits(self):
        extra = ''
        if self.user_options['extraResources']:
          extra = json.loads(self.user_options['extraResources'])
        return extra

      def get_env(self):
        env = super(KubeFormSpawner, self).get_env()
        gcp_secret_name = self.extra_spawner_config['gcp_secret_name']
        if gcp_secret_name:
          env['GOOGLE_APPLICATION_CREDENTIALS'] = '{}/{}.json'.format(
              SERVICE_ACCOUNT_SECRET_MOUNT, gcp_secret_name)
        return env

      # TODO(kkasravi): add unit test
      def _parse_user_name(self, username):
        safe_chars = set(string.ascii_lowercase + string.digits)
        name = username.split(':')[-1]
        legacy = ''.join([s if s in safe_chars else '-' for s in name.lower()])
        safe = escapism.escape(name, safe=safe_chars, escape_char='-').lower()
        return legacy, safe, name

      def _expand_user_properties(self, template):
        # Override KubeSpawner method to remove prefix accounts.google: for iap
        legacy, safe, name = self._parse_user_name(self.user.name)

        # Set servername based on whether named-server initialised
        if self.name:
          servername = '-{}'.format(self.name)
        else:
          servername = ''

        rname = template.format(
            userid=self.user.id,
            username=safe,
            unescaped_username=name,
            legacy_escape_username=legacy,
            servername=servername,
        )
        return rname

      def _default_config_contains(self, option):
        """Check if config.yaml contains a value for a Spawner option."""
        if self.spawner_ui_config is not None:
          form_defaults = None
          if 'spawnerFormDefaults' in self.spawner_ui_config:
            form_defaults = self.spawner_ui_config['spawnerFormDefaults']

          if form_defaults is not None and option in form_defaults:
            if 'value' in form_defaults[option]:
              return True
        return False

      def _get_pvc_manifest(self, name, storage_class, access_modes, storage,
                            labels, annotations):
        """
        Return a PVC spec based on the given parameters.
        This manifest will be used to create PVCs in the K8s cluster.
        """
        return make_pvc(
            name=name,
            storage_class=storage_class,
            access_modes=access_modes,
            storage=storage,
            labels=labels,
            annotations=annotations)

      def _list_pvcs_in_namespace(self, namespace):
        """
        Return a list with all non-failed PVCs in a K8s namespace.
        Each list entry is a dict with 'name', 'size' and 'access_modes' keys.
        """
        existing_pvcs = []

        try:
          resp = self.api.list_namespaced_persistent_volume_claim(
              namespace=namespace, watch=False)

        except ApiException as e:
          self.log.warn('Could not list PVCs in %s: %s', namespace, e)
          raise

        # Iterate over all existing PVCs and return all non-failed ones
        for pvc in [pvc for pvc in resp.items if pvc.status.phase != 'Failed']:
          existing_pvcs.append({
              "name":
              pvc.metadata.name,
              "size":
              pvc.spec.resources.requests.get('storage')[:-2],
              "access_modes":
              pvc.spec.access_modes
          })

        return existing_pvcs

      @gen.coroutine
      def _prepare_volumes(self):
        """Create PVC manifests and attach as volumes to the Notebook."""
        # Reset Volumes and VolumeMounts to initial KubeSpawner values
        self.volumes = list(self.initial_volumes)
        self.volume_mounts = list(self.initial_volume_mounts)

        # Workspace and Data Volumes are managed as PVCs
        persistent_volumes = [self.workspace_volume] + self.data_volumes

        for (idx, volume) in enumerate(persistent_volumes):
          if volume['type'] == 'New':
            yield self._provision_new_pvc(volume, self.namespace)
          elif volume['type'] == 'Existing':
            yield self._get_existing_pvc(volume['name'], self.namespace)

          # Upon success, mount PVC as a volume
          self.volumes.append({
              'name': 'volume-%d-{username}' % idx,
              'persistentVolumeClaim': {
                  'claimName': volume['name']
              }
          })

          self.volume_mounts.append({
              'mountPath': volume['mountPath'],
              'name': 'volume-%d-{username}' % idx
          })

      @gen.coroutine
      def _provision_new_pvc(self, volume, namespace):
        """Issue a K8s API request to create a new, namespaced PVC."""
        labels = self._build_common_labels(
            self._expand_all(self.user_storage_extra_labels))
        labels.update({'component': 'singleuser-storage'})
        annotations = self._build_common_annotations({})

        # Create a V1PersistentVolumeClaim for the API call
        pvc_manifest = self._get_pvc_manifest(
            name=volume['name'],
            storage_class=self.extra_spawner_config['storage_class'],
            access_modes=[volume['accessModes']],
            storage=volume['size'],
            labels=labels,
            annotations=annotations)

        pvc = None
        try:
          pvc = yield self.asynchronize(
              self.api.create_namespaced_persistent_volume_claim,
              namespace=namespace,
              body=pvc_manifest)

        except ApiException as e:
          if e.status == 409:
            self.log.warning('PVC %s already exists. New PVC not created.',
                             volume['name'])
          self.log.info(e.reason)
          raise

        self.log.info('PVC %s was successfully created', volume['name'])
        return pvc

      @gen.coroutine
      def _get_existing_pvc(self, pvc_name, namespace):
        """Issue a K8s API request to retrieve a namespaced PVC."""
        pvc = None

        try:
          pvc = yield self.asynchronize(
              self.api.read_namespaced_persistent_volume_claim,
              name=pvc_name,
              namespace=namespace)

        except ApiException as e:
          self.log.warning('PVC %s could not be retrieved: %s', pvc_name, e)
          raise

        self.log.info('PVC %s was successfully retrieved', pvc_name)
        return pvc

      @gen.coroutine
      def start(self):
        """Override KubeSpawner class start method."""
        yield self._prepare_volumes()
        _start = yield super(KubeFormSpawner, self).start()
        return _start
  spawner_ui_config.yaml: |
    # Configuration file for the default JupyterHub Spawner UI
    # Each key corresponds to a JupyterHub Spawner UI option
    # If a key is missing, the respective Spawner UI option will be left untouched
    #
    # Each Spawner UI option is configured by two keys: 'value' and 'readOnly'
    # - The 'value' key contains the default value
    # - The 'readOnly' key determines if the option will be available to users
    #
    # If the 'readOnly' key is present and set to 'true', the respective option
    # will be disabled for users and only set by the admin
    # If the 'readOnly' key is missing (defaults to 'false'), the respective option
    # will be available for users
    #
    # Please note that some values (e.g. {servername}, {username}) may be templated
    # and expanded according to KubeSpawner's rules
    #
    # For more information regarding JupyterHub KubeSpawner and its configuration:
    # https://jupyterhub-kubespawner.readthedocs.io/en/latest/spawner.html

    spawnerFormDefaults:
      image:
        # The container Image for the user's Jupyter Notebook
        # If readonly, this value must be a member of the list below
        value: gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-cpu:v0.5.0
        # The list of available standard container Images
        options:
          - gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.4.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.5.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.5.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.6.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.6.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.7.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.7.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.8.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.9.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.9.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.11.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.11.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.12.0-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.12.0-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-1.13.1-notebook-gpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-2.0.0a-notebook-cpu:v0.5.0
          - gcr.io/kubeflow-images-public/tensorflow-2.0.0a-notebook-gpu:v0.5.0
        # By default, custom container Images are allowed
        # Uncomment the following line to only enable standard container Images
        #readOnly: true
      cpu:
        # CPU for user's Notebook
        value: '1.0'
      memory:
        # Memory for user's Notebook
        value: 1.0Gi
      workspaceVolume:
        # Workspace Volume to be attached to user's Notebook
        # Each Workspace Volume is declared with the following attributes:
        # Type, Name, Size, MountPath and Access Mode
        value:
          type:
            # The Type of the Workspace Volume
            # Supported values: 'New', 'Existing'
            value: New
          name:
            # The Name of the Workspace Volume
            # Note that this is a templated value
            value: {username}{servername}-workspace
          size:
            # The Size of the Workspace Volume (in Gi)
            value: '10'
          mountPath:
            # The Path that the Workspace Volume will be mounted
            readOnly: true
            value: /home/jovyan
          accessModes:
            # The Access Mode of the Workspace Volume
            # Supported values: 'ReadWriteOnce', 'ReadWriteMany', 'ReadOnlyMany'
            value: ReadWriteOnce
      dataVolumes:
        # List of additional Data Volumes to be attached to the user's Notebook
        value: []
        # Each Data Volume is declared with the following attributes:
        # Type, Name, Size, MountPath and Access Mode
        #
        # For example, a list with 2 Data Volumes:
        #value:
        #  - value:
        #      type:
        #        value: New
        #      name:
        #        value: {username}{servername}-vol-1
        #      size:
        #        value: '10'
        #      mountPath:
        #        value: /home/jovyan/{username}{servername}-vol-1
        #      accessModes:
        #        value: ReadWriteOnce
        #  - value:
        #      type:
        #        value: New
        #      name:
        #        value: {username}{servername}-vol-2
        #      size:
        #        value: '5'
        #      mountPath:
        #        value: /home/jovyan/{username}{servername}-vol-2
        #      accessModes:
        #        value: ReadWriteOnce
        #
        # Uncomment the following line to make the Data Volumes list readonly
        #readOnly: true
      extraResources:
        # Extra Resource Limits for user's Notebook
        # Note that braces are escaped
        value: "{{}}"
  style.css: |
    body {
        font-family:
          "Lato", -apple-system, BlinkMacSystemFont, "Avenir Next",
          "Avenir", "Segoe UI", "Lucida Grande", "Helvetica Neue", "Helvetica",
          "Fira Sans", "Roboto", "Noto", "Droid Sans", "Cantarell", "Oxygen",
          "Ubuntu", "Franklin Gothic Medium", "Century Gothic", "Liberation Sans",
          sans-serif;
    }

     b, strong {
        font-weight: 600;
    }

    .panel-primary>.panel-heading {
      padding-bottom: 4.5px;
    }

    .btn-jupyter[disabled] {
      background-color: #F37524;
      border-color: #E34F21;
    }

    .btn-success {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    .btn-success:hover {
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }

    .btn-success:active:focus {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    .btn-success:focus {
      color: #fff;
      background-color: #28a745;
      border-color: #28a745;
    }

    input[readonly] {
      cursor: not-allowed;
    }

    select[readonly] {
      cursor: not-allowed;
    }

    .col-sm-3 {
      padding-left: 10px;
      padding-right: 10px;
    }
  template.html: |
    {% block css %}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css">
      <style type="text/css">
        {% include "style.css" %}
      </style>
    {% endblock %}

    {% block javascript %}
      <script type="text/javascript">
        var existingPVCs = {{ existing_pvcs|tojson }};
        var formDefaults = {{ form_defaults|tojson }};
        var username = {{ username|tojson }};
        {% include "script.js" %}
      </script>
    {% endblock %}

    {% block existing_pvcs %}
      {% if form_defaults is not none %}
        <datalist id="suggest_pvcs">
          {% for pvc in existing_pvcs %}
            <option value="{{ pvc.name }}">
          {% endfor %}
        </datalist>
      {% endif %}
    {% endblock %}

    {% block error_message %}
      {% if form_defaults is none %}
        <div style="display: inline-block; text-align: left;padding: 10px;">
          <h3>The <code>config.yaml</code> file contains invalid YAML syntax</h3>
          <h4>Please follow the steps below to address this issue:</h4>
          <p class="help-block">
            1. Correct all YAML syntax errors in the <code>config.yaml</code> file<br>
            2. Ask your administrator to restart the JupyterHub server<br>
            3. Return at this page and log in to view the Spawner form
          </p>
        </div>
      {% endif %}
    {% endblock %}

    {% block header %}
      {% if form_defaults is not none %}
        <div class="panel-info">
          <div class="panel-heading">Fill out the form to customize your Jupyter Notebook.</div>
        </div>
      {% endif %}
    {% endblock %}

    {% block image %}
      {% if form_defaults is not none %}
        <!-- Image -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <i class="fab fa-docker"></i>
            <label>Image</label>
          </div>
          <div class="panel-body" style="padding: 10px;">
            <div id='imageType' style="padding-bottom: 5px;">
              <label class="radio-inline">
                <input id="option_standard" type="radio" name="imageType" onclick="setImageType()"
                       value="standard" checked>Standard
              </label>
              <label class="radio-inline">
                <input id="option_custom" type="radio" name="imageType" onclick="setImageType()"
                       value="custom">Custom
              </label>
            </div>
            <select class="form-control" for="standardImages" required></select>
            <input class="form-control" for="customImage" placeholder="repo/image:tag" required>
          </div>
          <p class="text-muted" style="padding: 10px;">
            A starter Docker image for JupyterHub with a baseline deployment and typical ML packages.
          </p>
        </div>
        {% endif %}
    {% endblock %}

    {% block toggle_advanced_button %}
      {% if form_defaults is not none %}
        <!-- Advanced Options Toggle Button -->
        <div style="text-align: center; padding: 10px;">
          <a id="toggle_advanced_options" class="btn btn-primary">Toggle Advanced</a>
        </div>
      {% endif %}
    {% endblock %}

    {% block advanced_fields %}
      {% if form_defaults is not none %}
        <div id="advanced_fields" style="display: none;">
          {% block cpu %}
            <!-- CPU -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-microchip"></i>
                <label>CPU</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                <input class="form-control" id='cpu' name='cpu'
                       placeholder='200m, 2.5, etc' required>
                </input>
              </div>
              <p class="text-muted" style="padding: 10px;">
                For CPU-intensive workloads, you can choose more than 1 CPU
                (e.g. <span><code>1.5</code></span>).
              </p>
            </div>
          {% endblock %}

          {% block memory %}
            <!-- Memory -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-memory"></i>
                <label>Memory</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                <input class="form-control" id='memory' name='memory'
                       placeholder='100Mi, 1.5Gi, etc' required>
                </input>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Specify the total amount of RAM reserved by your Notebook
                (e.g. <span><code>2.0Gi</code></span>).
              </p>
            </div>
          {% endblock %}

          {% block workspaceVolume %}
            <!-- Workspace Volume -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-laptop-code" style="padding: 0px 2px;"></i>
                <label>Workspace Volume</label>
              </div>
              <div class="panel-body" id="workspace_volume">
                  <div class="col-sm-2" style="width: 14%"><label>Type</label></div>
                  <div class="col-sm-3" style="width: 20%"><label>Name</label></div>
                  <div class="col-sm-2" style="width: 12%"><label>Size (Gi)</label></div>
                  <div class="col-sm-3" style="width: 29%"><label>Mount Path</label></div>
                  <div class="col-sm-3" style="width: 19%"><label>Access Mode</label></div>
                  <div class="col-sm-*">
                  <div class="col-sm-2" style="width: 14%">
                    <select class="form-control" name="ws_type" id="ws_type">
                      <option selected>New</option>
                      <option>Existing</option>
                    </select>
                  </div>
                  <div class="col-sm-3" style="width: 20%">
                    <input class="form-control" name="ws_name" id="ws_name"
                           list="suggest_pvcs_disabled" required>
                    </input>
                  </div>
                  <div class="col-sm-2" style="width: 12%">
                    <input class="form-control" name="ws_size" id="ws_size" placeholder='10'
                           type="number" step="0.5" min="0" required>
                    </input>
                  </div>
                  <div class="col-sm-3" style="width: 29%">
                    <input class="form-control" id="ws_mount_path" name="ws_mount_path" required></input>
                  </div>
                  <div class="col-sm-3" style="width: 19%">
                    <select class="form-control" id="ws_access_modes" name="ws_access_modes" required>
                      <option value="ReadWriteOnce">ReadWriteOnce</option>
                      <option value="ReadWriteMany">ReadWriteMany</option>
                      <option value="ReadOnlyMany">ReadOnlyMany</option>
                    </select>
                  </div>
                </div>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Configure the Volume to be mounted as your personal Workspace.</br>
                For example, to create an empty Workspace:
                <span><code>New</code></span>
                <span><code>{{ username }}-workspace</code></span>,
                <span><code>10</code></span>,
                <span><code>/home/jovyan</code></span>,
                <span><code>ReadWriteOnce</code></span>
              </p>
            </div>
          {% endblock %}

          {% block dataVolumes %}
            <!-- Data Volumes -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="far fa-hdd" style="padding: 0px 2px;"></i>
                <label>Data Volumes</label>
              </div>
              <div class="panel-body">
                <div class="col-sm-2" style="width: 14%"><label>Type</label></div>
                <div class="col-sm-3" style="width: 20%"><label>Name</label></div>
                <div class="col-sm-2" style="width: 12%"><label>Size (Gi)</label></div>
                <div class="col-sm-3" style="width: 29%"><label>Mount Path</label> </div>
                <div class="col-sm-3" style="width: 19%"><label>Access Mode</label></div>
                <div class="col-sm-*" id="data_volumes"></div>
                <div class="col-sm-2">
                  <button id="add_volume" class="btn btn-success btn-sm" type="button" onclick="addVolume();">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <p class="text-muted" style="padding: 10px;">
                Configure the Volumes to be mounted as your Datasets.</br>
                For example, to create an empty Data Volume:
                <span><code>New</code></span>,
                <span><code>{{ username }}-volume-1</code></span>,
                <span><code>5</code></span>,
                <span><code>/home/jovyan/{{ username }}-volume-1</code></span>,
                <span><code>ReadWriteOnce</code></span>
              </p>
            </div>
          {% endblock %}

          {% block extra_resources %}
            <!-- Extra Resources -->
            <div class="panel panel-primary">
              <div class="panel-heading">
                <i class="fas fa-cogs"></i>
                <label>Extra Resources</label>
              </div>
              <div class="panel-body" style="padding: 10px;">
                {% raw %}
                <input class="form-control" id="extraResources" name='extraResources' placeholder='{"nvidia.com/gpu": 3}' required></input>
                {% endraw %}
              </div>
              <p class="text-muted" style="padding: 10px;">
                Reserve additional resources.</br>
                For example, to reserve 2 GPUs: <span><code>{"nvidia.com/gpu": 2}</code></span>
              </p>
            </div>
          {% endblock %}
        </div>
      {% endif %}
    {% endblock %}

    {% block footer %}
      {% if form_defaults is not none %}
        <div class="panel-warning">
          <div class="panel-heading">
            In case your Jupyter Notebook does not start, make sure that the resource quotas you specified are available in the cluster.
          </div>
        </div>
      {% endif %}
    {% endblock %}
kind: ConfigMap
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-config
  namespace: kubeflow
---
apiVersion: v1
data:
  DEFAULT_JUPYTERLAB: "false"
  KF_AUTHENTICATOR: "null"
  STORAGE_CLASS: "null"
  serviceType: ClusterIP
kind: ConfigMap
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: parameters
  namespace: kubeflow
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: "true"
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-0
  namespace: kubeflow
spec:
  clusterIP: None
  ports:
  - name: hub
    port: 8000
  selector:
    app: jupyter
    kustomize.component: jupyter
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    getambassador.io/config: |-
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: jupyter-lb-hub-mapping
      prefix: /hub/
      rewrite: /hub/
      timeout_ms: 300000
      service: jupyter-lb.kubeflow
      use_websocket: true
      ---
      apiVersion: ambassador/v0
      kind:  Mapping
      name: jupyter-lb-user-mapping
      prefix: /user/
      rewrite: /user/
      timeout_ms: 300000
      service: jupyter-lb.kubeflow
      use_websocket: true
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter-lb
  namespace: kubeflow
spec:
  ports:
  - name: hub
    port: 80
    targetPort: 8000
  selector:
    app: jupyter
    kustomize.component: jupyter
  type: ClusterIP
---
apiVersion: apps/v1beta2
kind: StatefulSet
metadata:
  labels:
    app: jupyter
    kustomize.component: jupyter
  name: jupyter
  namespace: kubeflow
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jupyter
      kustomize.component: jupyter
  serviceName: ""
  template:
    metadata:
      labels:
        app: jupyter
        kustomize.component: jupyter
    spec:
      containers:
      - command:
        - jupyterhub
        - -f
        - /etc/config/jupyter_config.py
        env:
        - name: KF_AUTHENTICATOR
          valueFrom:
            configMapKeyRef:
              key: KF_AUTHENTICATOR
              name: parameters
        - name: DEFAULT_JUPYTERLAB
          valueFrom:
            configMapKeyRef:
              key: DEFAULT_JUPYTERLAB
              name: parameters
        - name: STORAGE_CLASS
          valueFrom:
            configMapKeyRef:
              key: DEFAULT_JUPYTERLAB
              name: parameters
        - name: ROK_SECRET_NAME
          value: secret-rok-{username}
        image: gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1
        name: jupyter
        ports:
        - containerPort: 8000
        - containerPort: 8081
        volumeMounts:
        - mountPath: /etc/config
          name: config-volume
      serviceAccountName: jupyter
      volumes:
      - configMap:
          name: jupyter-config
        name: config-volume
  updateStrategy:
    type: RollingUpdate
  volumeClaimTemplates: []
`)
}

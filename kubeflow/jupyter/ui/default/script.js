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

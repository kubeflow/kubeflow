// This function is executed when the document is ready
$(function() {

  // Toggle advanced options inside the Spawner form
  $('#toggle_advanced_options').on('click', function(e) {
    $('#advanced_fields').toggle();
  });

  // Enable Autofill button if a Lab URL is provided
  $('#rokLabURL').on('change keyup paste', function() {
      if (this.value.length > 0) {
        $('#autofill').removeAttr('disabled data-toggle data-placement title');
      } else {
        // Hide success/error texts
        $('#rok_lab_url_success_text').attr('hidden', true);
        $('#rok_lab_url_error_text').attr('hidden', true);

        // Restore rokLabURL input field style
        $('#rokLabURL').removeClass('valid invalid');

        // Set tooltip
        $('#autofill').attr({
          'disabled': true,
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': 'Please provide a Rok Jupyter Lab URL to enable autofill'
        });
      }
  }).keydown(function(e) {
    // Do not submit form if Enter is pressed
    if (e.which == 10 || e.which == 13) {
      e.stopPropagation();
      // If Enter is pressed, autofill the form
      $('#autofill').trigger('click');
    }
  })
  .keypress(function(e) {
    if (e.which == 10 || e.which == 13) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  // Autofill the Spawner form using metadata from a Rok Jupyter Lab URL
  $('#autofill').click(function() {
    formCleanup();
    // Show advanced options to show autocompletion
    setTimeout(function() {
      autofillForm();
      $('#advanced_fields').show();
    }, 250);
  });

  // Resize Spawner form to take up more page width
  $('.row.col-sm-offset-2.col-sm-8').attr({
    'class': 'col-sm-*',
    'style': 'padding: 15px;'
  });

  // Update upper-right sign-out icon to FontAwesome 5
  $('.fa.fa-sign-out').attr('class', 'fas fa-sign-out-alt');

  // Update Spawn button text upon form submission
  if (rok_token.length > 0 && formDefaults) {
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

  // Set tooltip to admin-disabled form fields
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

  if ('rokLabURL' in formDefaults) {
    // Set default Rok Lab URL, if specified
    if ('value' in formDefaults.rokLabURL) {
      $('#rokLabURL').val(formDefaults.rokLabURL.value).trigger('change');
    }
    // Make Rok  Lab URL field readonly, if specified
    if ('readOnly' in formDefaults.rokLabURL) {
      $('#rokLabURL').attr({
        'readonly': formDefaults.rokLabURL.readOnly,
        'immutable': formDefaults.rokLabURL.readOnly
      });
    }
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
  $('#ws_rok_url').attr({
    'readonly': true,
    'data-toggle': 'tooltip',
    'data-placement': 'top',
    'title': 'You can only enter a Rok URL when mounting an existing Rok Volume'
  });
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

        if ('rokURL' in defaultWorkspace) {
          $('#ws_rok_url').val('');
          // Set the Workspace Rok URL, if specified
          if ('value' in defaultWorkspace.rokURL) {
            $('#ws_rok_url').val(defaultWorkspace.rokURL.value).trigger('change');
          }
          // Make the Workspace Rok URL readonly, if specified
          if ('readOnly' in defaultWorkspace.rokURL || 'readOnly' in formDefaults.workspaceVolume) {
            $('#ws_rok_url').attr('readonly', defaultWorkspace.rokURL.readOnly || defaultWorkspaceReadOnly);
          }
        }

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

        if ('rokURL' in vol) {
          $('#vol_rok_url' + counter).val('');
          if ('value' in vol.rokURL) {
            $('#vol_rok_url' + counter).val(vol.rokURL.value).trigger('change');
          }
          if ('readOnly' in vol.rokURL || 'readOnly' in formDefaults.dataVolumes) {
            $('#vol_rok_url' + counter).attr({
              'readonly': vol.rokURL.readOnly || dataVolumesReadOnly,
              'immutable': vol.rokURL.readOnly || dataVolumesReadOnly
            });
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

        // Disable Delete button, if specified
        if ('readOnly' in formDefaults.dataVolumes) {
          $('#vol_delete_button' + counter).attr({
            'readonly': formDefaults.dataVolumes.readOnly,
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
function setWorkspaceEventListeners() {
  var workspaceType = $('#ws_type');
  var workspaceRokURL = $('#ws_rok_url');
  var workspaceName = $('#ws_name');
  var workspaceSize = $('#ws_size');
  var workspaceMountPath = $('#ws_mount_path');

  // Disable/Enable Workspace size option based on its Type
  workspaceType.on('change', function() {
    // Set attributes for the Volume fields
    if (this.value == 'Existing') {
      unsetAttributes(workspaceRokURL, 'readonly data-toggle data-placement title');
      setAttributes(workspaceSize, {
        'readonly': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'Size is autofilled when mounting an existing Rok Volume'
      });
    } else if (this.value == 'New') {
      setAttributes(workspaceRokURL, {
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'You can only enter a Rok URL when mounting an existing Rok Volume'
      });
      unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
    }

    // Set values for non-readonly Volume fields
    setValue(workspaceName, workspaceName.attr('placeholder'));
    setValue(workspaceRokURL, '');
    setValue(workspaceSize, workspaceSize.attr('placeholder'));
    setValue(workspaceMountPath, workspaceMountPath.attr('placeholder'));
  });

  workspaceRokURL.on('change paste', function() {
    if (this.value.length > 0) {
      autofillWorkspaceVolume(this.value);
    }
  });

  // Trigger focusout event to check the Workspace name
  workspaceName.trigger('focusout');
}

// Counter and options for Dataset Volumes
var counter = 0;
var options = [
  'vol_type', 'vol_rok_url', 'vol_name', 'vol_size', 'vol_mount_path'
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

  // Input for volume Rok URL
  var volumeRokURL = $('<input>').attr({
    class: 'form-control',
    id: 'vol_rok_url' + counter,
    name: 'vol_rok_url' + counter,
    placeholder: 'Rok Volume URL',
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
      unsetAttributes(volumeRokURL, 'readonly data-toggle data-placement title');
      setAttributes(volumeSize, {
        'readonly': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'Size is autofilled when mounting an existing Rok Volume'
      });
    } else if (this.value == 'New') {
      setAttributes(volumeRokURL, {
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'You can only enter a Rok URL when mounting an existing Rok Volume'
      });
      unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
    }

    // Set values for non-readonly Volume fields
    setValue(volumeName, volumeName.attr('placeholder'));
    setValue(volumeRokURL, '');
    setValue(volumeSize, volumeSize.attr('placeholder'));
    setValue(volumeMountPath, volumeMountPath.attr('placeholder'));
  });

  volumeRokURL.on('change paste', function() {
    if (this.value.length > 0) {
      var dataVolumeId = $(this).attr('id').match(/\d/g).join("");
      autofillDataVolume(this.value, dataVolumeId);
    }
  });

  volumeName.on('focusout', function() {
    if (this.value.length > 0) {
      setValue(volumeMountPath, '/home/jovyan/' + this.value);
    } else {
      setValue(volumeMountPath, '' + this.value);
    }
  });

  // Set the Type of the new Volume to 'New'
  volumeType.val('New').trigger('change');

  // Create and append new volume
  $('<div/>', {'class': 'form-group volume' + counter})
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 14%'}).append(volumeType))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 28%'}).append(volumeRokURL))
    .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 19%'}).append(volumeName))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 10%'}).append(volumeSize))
    .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 24%'}).append(volumeMountPath))
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

// Autofill the form based on the lab URL
function autofillForm() {
  var rok_lab_url = $('#rokLabURL').val();
  var base_url = rok_lab_url.substring(0, rok_lab_url.lastIndexOf('/') + 1);

  // Fetch Rok Jupyter Lab Metadata to autofill the form
  $.ajax({
    url: rok_lab_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {
      if (!getHeader(request,'X-Object-Meta-image')) {
        // This is not a valid Rok Jupyter Lab URL
        markInvalid();
      } else {
        // This is a valid Rok Jupyter Lab url
        markValid();

        // Autofill Image, CPU, Memory and Extra Resources from Rok Jupyter Lab Metadata
        setValue($('#image'), getHeader(request, 'X-Object-Meta-image') || '');
        setValue($('#cpu'), getHeader(request, 'X-Object-Meta-cpu') || '');
        setValue($('#memory'), getHeader(request, 'X-Object-Meta-memory') || '');
        setValue($('#extraResources'), getHeader(request, 'X-Object-Meta-extraResources') || '{}');

        // Autofill Workspace Volume
        var workspace_version = getHeader(request, 'X-Object-Group-Member-0-Version');
        var workspace_url = getHeader(request, 'X-Object-Group-Member-0-Object') + '?version=' + workspace_version;
        setValue($('#ws_type'), 'Existing');
        $('#ws_type').trigger('change');
        setValue($('#ws_rok_url'), base_url + workspace_url);
        $('#ws_rok_url').trigger('change');

        // Autofill Data Volumes
        for(i = 1; i < getHeader(request, 'X-Object-Group-Member-Count'); i++) {
          addVolume();
          var dataset_version = getHeader(request, 'X-Object-Group-Member-' + i + '-Version');
          var dataset_url = base_url + getHeader(request, 'X-Object-Group-Member-' + i + '-Object') + '?version=' + dataset_version;
          setValue($('#vol_type' + counter), 'Existing');
          $('#vol_type' + counter).trigger('change');
          setValue($('#vol_rok_url' + counter), dataset_url);
          $('#vol_rok_url' + counter).trigger('change');
        }
      }
    },
    error: function(XMLHttpRequest, e) {
      markInvalid();
      console.log('Failed to retrieve Rok Jupyter Lab Metadata:', e);
    }
  });
}

// Autofill the Workspace Volume fields with metadata from the Rok Volume URL
function autofillWorkspaceVolume(rok_member_url) {
  $.ajax({
    url: rok_member_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {
      setValue($('#ws_name'), getHeader(request, 'X-Object-Meta-workspace'));
      setValue($('#ws_size'), getHeader(request, 'Content-Length')/Math.pow(1024, 3));
      setValue($('#ws_mount_path'), getHeader(request, 'X-Object-Meta-mountpoint'));
    },
    error: function(XMLHttpRequest, e) {
      console.log('Failed to retrieve Rok Jupyter Workspace Metadata:', e);
    }
  });
}

// Autofill the Data Volume fields with metadata from the Rok Volume URL
function autofillDataVolume(rok_member_url, data_volume_id) {
  $.ajax({
    url: rok_member_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {
      setValue($('#vol_name' + data_volume_id), getHeader(request, 'X-Object-Meta-dataset'));
      setValue($('#vol_size' + data_volume_id), getHeader(request, 'Content-Length')/Math.pow(1024, 3));
      setValue($('#vol_mount_path' + data_volume_id), getHeader(request, 'X-Object-Meta-mountpoint'));
    },
    error: function(XMLHttpRequest, e) {
      console.log('Failed to retrieve Rok Jupyter Volume Metadata:', e);
    }
  });
}

// Wrapper function to get decoded HTTP header from a Response Object
function getHeader(request, header) {
  if (request.getResponseHeader(header)) {
    return decodeURIComponent(request.getResponseHeader(header));
  }
  return null;
}

// Helper function to mark Rok Lab URL input as invalid
function markInvalid() {
  $('#rokLabURL').addClass('invalid')
  $('#rok_lab_url_error_text').removeAttr('hidden');
}

// Helper function to mark Rok Lab URL input as valid
function markValid() {
  $('#rokLabURL').addClass('valid')
  $('#rok_lab_url_success_text').removeAttr('hidden');
}

// Heler function to clean Spawner form
function formCleanup() {

  // Empty Notebook fields
  setValue($('#image'), '');
  setValue($('#cpu'), '');
  setValue($('#memory'), '');
  setValue($('#extraResources'), '');

  // Empty Workspace Volume fields
  setValue($('#ws_type'), 'New');
  $('#ws_type').trigger('change');
  setValue($('#ws_size'), '');
  setValue($('#ws_name'), '');

  // Remove all Data Volumes
  for (var i=counter; i>0; i--) {
    removeVolume(i);
  }

  // Hide success/error texts
  $('#rok_lab_url_success_text').attr('hidden', true);
  $('#rok_lab_url_error_text').attr('hidden', true);

  // Restore rokLabURL input field style
  $('#rokLabURL').removeClass('valid invalid');
}


$(window).on('load', function () {
  // Fix the required inputs:
  // https://github.com/google/material-design-lite/issues/1502#issuecomment-211702642
  $('[data-required=true]').each(function() {
    $(this).attr('required', true);
  });

  // Enable Autofill button if a Lab URL is provided
  document.querySelector("#autofill").MaterialButton.disable()
  
  $('#rokLabURL').on('change keyup paste', function() {
    if (this.value.length > 0) {
      $('#autofill').removeAttr('disabled data-toggle data-placement title');
      document.querySelector("#autofill").MaterialButton.enable()
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
      document.querySelector("#autofill").MaterialButton.disable()
    }
  })
  .keydown(function(e) {
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
    
    setTimeout(function() {
      autofillForm();
    }, 250);
  });

  // Configure Image input elements
  setImageType()

  // Dynamically change Workspace form fields behavior
  setWorkspaceEventListeners();

  // Fill the form with values defined in the YAML config file
  setDefaultFormValues();

  // Set tooltip to readOnly form fields
  setTooltipsOnImmutable();
});


$(document).ready(function() {
  // Function handling the Form submit
  // stop the default submit action and apply custom JS function
  $("#spawn-form").submit(function(e) {
    var body = $(this).serializeArray()
    var form = $(this)
    e.preventDefault();
    postNotebook(form, body);
  })
})


// Dynamically update Image input field, based on radio button selection
function setImageType() {
  // imageType = $('#imageType').find('input:checked').val();
  imageType = $('input[name="imageType"]:checked').val();
  if (imageType == 'standard') {
    $('#img-sel-div').css({'display': ''});
    $('#standardImages').attr('required', true);
    $('#cstm-inp-div').css({'display': 'none'});  // The div
    $('#customImage').removeAttr('required')  // The input
  } else {
    $('#cstm-inp-div').css({'display': ''});
    $('#customImage').attr('required', true);
    $('#img-sel-div').css({'display': 'none'});   // The div
    $('#standardImages').removeAttr('required');  // The select
  }
}

// Register jQuery event listeners for the Workspace Volume
function  setWorkspaceEventListeners() {
  var workspaceType = $('#ws_type');
  var workspaceRokURL = $("#ws_rok_url")
  var workspaceName = $('#ws_name');
  var workspaceSize = $('#ws_size');
  var workspaceMountPath = $('#ws_mount_path');

  // Disable/Enable Workspace size option based on its Type
  workspaceType.on('change', function() {
    // Set attributes for the Volume fields
    if (this.value == 'Existing') {

      setAttributes(workspaceSize, {
        'readonly': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'Size is autofilled when mounting existing Volumes'
      });
      // document.querySelector("#size-input-div").MaterialTextfield.disable()

      unsetAttributes(workspaceRokURL, 'readonly data-toggle data-placement title');
      unsetAttributes(workspaceMountPath, 'readonly data-toggle data-placement title');
      unsetAttributes(workspaceName, 'readonly data-toggle data-placement title');
      document.querySelector("#wsrokurl-input-div").MaterialTextfield.enable()
      document.querySelector("#wsname-input-div").MaterialTextfield.enable()
      document.querySelector("#mountpath-input-div").MaterialTextfield.enable()

      // Hide the warning from None option
      $("#error-msg-vol").fadeOut("fast", function() {
        $(this).hide()
      })
    }
    else if (this.value == 'New') {
      unsetAttributes(workspaceName, 'readonly data-toggle data-placement title');
      unsetAttributes(workspaceSize, 'readonly data-toggle data-placement title');
      unsetAttributes(workspaceMountPath, 'readonly data-toggle data-placement title');
      document.querySelector("#wsname-input-div").MaterialTextfield.enable()
      document.querySelector("#size-input-div").MaterialTextfield.enable()
      document.querySelector("#mountpath-input-div").MaterialTextfield.enable()

      // Disable RokUrl
      setAttributes(workspaceRokURL, {
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'You can only enter a Rok URL when mounting an existing Rok Volume'
      });
      document.querySelector("#wsrokurl-input-div").MaterialTextfield.disable()

      // Hide the warning from None option
      $("#error-msg-vol").fadeOut("fast", function() {
        $(this).hide()
      })
    }
    else if (this.value == "None") {
      var attrs = {
        'readonly': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'No volume will be added to the Notebook'
      }

      setAttributes(workspaceRokURL, attrs)
      setAttributes(workspaceName, attrs)
      setAttributes(workspaceSize, attrs)
      setAttributes(workspaceMountPath, attrs)
      document.querySelector("#wsrokurl-input-div").MaterialTextfield.disable()
      document.querySelector("#wsname-input-div").MaterialTextfield.disable()
      document.querySelector("#size-input-div").MaterialTextfield.disable()
      document.querySelector("#mountpath-input-div").MaterialTextfield.disable()

      // Hide the warning from None option
      $("#error-msg-vol").show()
    }

  });

  workspaceRokURL.on('change paste', function() {
    if (this.value.length > 0) {
      autofillWorkspaceVolume(this.value);
    }
  });
}

// Set default values to form fields
function setDefaultFormValues() {

  // If config.yaml is empty, no need to initialize anything
  if (!formDefaults) {
    return;
  }

  // Image
  if ('image' in formDefaults) {
    // Set Container image dropdown list
    $('#standardImages').val('')
    if ('options' in formDefaults.image) {
      formDefaults.image.options.forEach(function(item) {
        $('#standardImages').append($('<option/>').attr('value', item).text(item));
      });

      // $('#standardImages').change()
    }
    // Set default Container Image, if specified
    $('#standardImages').val('');
    if ('value' in formDefaults.image) {
      $('#standardImages').val(formDefaults.image.value)
      $("#img-sel-div").addClass("is-dirty"); // dirty way to puth the text on top
    }

    // Make Container Image field readonly, if specified
    if ('readOnly' in formDefaults.image && formDefaults.image.readOnly) {
      $('#option_standard').prop({
          'disabled': formDefaults.image.readOnly,
          'immutable': formDefaults.image.readOnly
      });
      document.querySelector("#custom-radio").MaterialRadio.disable()

      $('#option_custom').prop({
          'disabled': formDefaults.image.readOnly,
          'immutable': formDefaults.image.readOnly
      });
      document.querySelector("#standard-radio").MaterialRadio.disable()
    }
  }

  // CPU
  if ('cpu' in formDefaults) {
    // Set default CPU, if specified
    $('#cpu').val('');
    if ('value' in formDefaults.cpu) {
      $('#cpu').val(formDefaults.cpu.value);
    }
    // Make CPU field readonly, if specified
    if ('readOnly' in formDefaults.cpu && formDefaults.cpu.readOnly) {
      $('#cpu').prop({
          'disabled': formDefaults.image.readOnly,
          'immutable': formDefaults.image.readOnly
      });
      document.querySelector("#cpu-input-div").MaterialTextfield.disable()
    }
  }

  // Memory
  if ('memory' in formDefaults) {
    // Set default Memory, if specified
    $('#memory').val('');
    if ('value' in formDefaults.memory) {
      $('#memory').val(formDefaults.memory.value);
    }
    // Make Memory field readonly if specified
    if ('readOnly' in formDefaults.memory && formDefaults.memory.readOnly) {
      $('#memory').attr({
        'readonly': formDefaults.memory.readOnly,
        'immutable': formDefaults.memory.readOnly
      });
      document.querySelector("#memory-input-div").MaterialTextfield.disable()
    }
  }

  $('#ws_name').attr('placeholder', username + '-workspace');
  $('#ws_mount_path').attr('placeholder', '/home/jovyan');

  // Workspace Volume
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
              'immutable': defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly,
            });

            if ($('#ws_type').attr('readonly')) {
              $('#ws_type').on('mousedown', function(e) {
                e.preventDefault(); this.blur(); window.focus();
              });
            }
          }
        }
        $('#ws_type').trigger('change');

        // Name
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
              'immutable': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly,
              'disabled': defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly,
            });

            if (defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly) {
              document.querySelector("#name-input-div").MaterialTextfield.disable()
            }
          }
        }

        // Size
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
              'immutable': defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly,
            });
          }
        }

        // Mount Path
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
              'immutable': defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly,
            });
          }
        }

        // Access Modes
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

  // Data Volumes
  if ('dataVolumes' in formDefaults) {
      var dataVolumesReadOnly = formDefaults.dataVolumes.readOnly
      // Disable Add Volume button, if specified
      if ('readOnly' in formDefaults.dataVolumes) {
        $('#add_volume').attr({
          'disabled': dataVolumesReadOnly,
          'immutable': dataVolumesReadOnly
        });
        // MDL way to disable a button
        document.querySelector("#add_volume").MaterialButton.disable()
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
          // MDL way to disable a button
          document.querySelector("#vol_delete_button"+counter).MaterialButton.disable()
        }
      }
  }

  // Extra Resources
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

// Counter and options for Dataset Volumes
var counter = 0;
var options = [
  'vol_type', 'vol_name', 'vol_size', 'vol_mount_path', 'vol_access_modes'
];

function addVolume() {
  counter++;

  //  ---- Input for volume type ----
  // -------------------------------
  var volumeTypeCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
    style: "width: 14%"
  });

  var volumeTypeTextField = $('<div>').attr({
    class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label wide",
  });

  var volumeType = $('<select>').attr({
    class: "mdl-textfield__input",
    id: 'vol_type' + counter,
    name: 'vol_type' + counter,
    'data-required': "true",
    'data-vol-id': counter
  });

  var volumeTypeLabel = $("<label>").attr({
    class: "mdl-textfield__label",
    for: "vol_type" + counter
  }).text("Type")

  volumeType
    .append($('<option/>').attr({selected: true, value: 'New'}).text('New'))
    .append($('<option/>').attr({value: 'Existing'}).text('Existing'));

  volumeTypeTextField.append(volumeType)
  volumeTypeTextField.append(volumeTypeLabel)
  volumeTypeCell.append(volumeTypeTextField);

  //  ---- Input for volume Rok Url ----
  // ----------------------------------
  var volumeRokURLCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
    style: "width: 20%",
  });

  var volumeRokURLTextField = $('<div>').attr({
    class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label wide",
    id: "vol_rokurl_textfield" + counter
  });

  var volumeRokURL = $('<input>').attr({
    class: "mdl-textfield__input",
    type: "url",
    id: 'vol_rok_url' + counter,
    placeholder: "Rok Volume URL",
    name: 'vol_rok_url' + counter,
    'data-required': "true"
  });

  var volumeRokURLLabel = $("<label>").attr({
    class: "mdl-textfield__label",
    for: "vol_rok_url" + counter
  }).text("Rok URL")

  volumeRokURLTextField.append(volumeRokURL)
  volumeRokURLTextField.append(volumeRokURLLabel)
  volumeRokURLCell.append(volumeRokURLTextField);

  //  ---- Input for volume name ----
  // -------------------------------
  var volumeNameCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
    style: "width: 20%"
  });

  var volumeNameTextField = $('<div>').attr({
    class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label wide",
  });

  var volumeName = $('<input>').attr({
    class: "mdl-textfield__input",
    type: "text",
    id: 'vol_name' + counter,
    placeholder: 'data-vol-' + counter,
    name: 'vol_name' + counter,
    value: 'data-vol-' + counter,
    'data-required': "true"
  });

  var volumeNameLabel = $("<label>").attr({
    class: "mdl-textfield__label",
    for: "vol_name" + counter
  }).text("Name")

  volumeNameTextField.append(volumeName)
  volumeNameTextField.append(volumeNameLabel)
  volumeNameCell.append(volumeNameTextField);

  // ---- Input for volume size ----
  // -------------------------------
  var volumeSizeCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
    style: "width: 8%"
  });

  var volumeSizeTextField = $('<div>').attr({
    class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label wide",
    id: "vol_size_textfield" + counter
  });

  var volumeSize = $('<input>').attr({
    class: "mdl-textfield__input",
    type: "number",
    min: '0.5',
    step: '0.5',
    id: 'vol_size' + counter,
    placeholder: '10',
    name: 'vol_size' + counter,
    value: '10',
    'data-required': "true"
  });

  var volumeSizeLabel = $("<label>").attr({
    class: "mdl-textfield__label",
    for: "vol_size" + counter
  }).text("Size (Gi)")

  volumeSizeTextField.append(volumeSize)
  volumeSizeTextField.append(volumeSizeLabel)
  volumeSizeCell.append(volumeSizeTextField);

  // ---- Input for volume Path ----
  // -------------------------------
  var volumeMountPathCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
    style: "width: 20%"
  });

  var volumeMountPathTextField = $('<div>').attr({
    class: "mdl-textfield mdl-js-textfield mdl-textfield--floating-label wide",
    id: "vol_mount_textfield" + counter
  });

  var volumeMountPath = $('<input>').attr({
    class: "mdl-textfield__input",
    type: "text",
    id: 'vol_mount_path' + counter,
    placeholder: '/home/jovyan/' + 'data-vol-' + counter,
    name: 'vol_mount_path' + counter,
    value: '/home/jovyan/' + 'data-vol-' + counter,
    'data-required': "true"
  });

  var volumeMountPathLabel = $("<label>").attr({
    class: "mdl-textfield__label",
    for: 'vol_mount_path' + counter
  }).text("Mount Path")

  volumeMountPathTextField.append(volumeMountPath)
  volumeMountPathTextField.append(volumeMountPathLabel)
  volumeMountPathCell.append(volumeMountPathTextField);

  // Delete button for volume removal
  var deleteButtonCell = $('<div>').attr({
    class: "mdl-cell mdl-cell--1-col",
  }).css({
    'width': '5%',
    'padding-top': '15px',
  });

  var deleteButton = $('<button/>').attr({
    class: "mdl-button mdl-js-button mdl-button--icon",
    id: 'vol_delete_button' + counter,
    type: 'button',
    onclick: 'removeVolume(' + counter + ');'
  });

  deleteButton.append($('<i>').attr({class: "material-icons"}).text('delete'));
  deleteButtonCell.append(deleteButton)

  // Add these to the form
  var row = $("<div>", {class: "mdl-grid wide nopad"})
    .append(volumeTypeCell)
    .append(volumeRokURLCell)
    .append(volumeNameCell)
    .append(volumeSizeCell)
    .append(volumeMountPathCell)
    .append(deleteButtonCell)

  $("<div>", {class: 'volume' + counter, style: "height: 100%"})
    .append(row)
    .appendTo($('#data_volumes'));
  componentHandler.upgradeAllRegistered();

  volumeType.on('change', function() {
    var vol_id = $(this).attr('data-vol-id')
    if (this.value == 'Existing') {
      setAttributes(volumeSize, {
        'readonly': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'Size is autofilled when mounting existing Volumes'
      });
      // document.querySelector("#vol_size_textfield"+vol_id).MaterialTextfield.disable()

      unsetAttributes(volumeRokURL, 'readonly data-toggle data-placement title');
      document.querySelector("#vol_rokurl_textfield"+vol_id).MaterialTextfield.enable()

    } else if (this.value == 'New') {
      unsetAttributes(volumeSize, 'readonly data-toggle data-placement title');
      // document.querySelector("#vol_size_textfield"+vol_id).MaterialTextfield.enable()

      setAttributes(volumeRokURL, {
        'readonly': true,
        'disabled': true,
        'data-toggle': 'tooltip', 'data-placement': 'top',
        'title': 'Access Mode is autofilled when mounting existing Volumes'
      });
      document.querySelector("#vol_rokurl_textfield"+vol_id).MaterialTextfield.disable()
    }
    componentHandler.upgradeAllRegistered();
  })

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

}

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

    // The next two are for disabling the Size and Mount Textfields
    volumeElement.find('#vol_size_textfield' + (i+1)).attr({
      id: "vol_size_textfield" + i
    })

    volumeElement.find('#vol_rokurl_textfield' + (i+1)).attr({
      id: "vol_rokurl_textfield" + i
    })

    volumeElement.find('#vol_type' + (i+1)).attr({
      'data-vol-id': i
    })

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
      'placeholder': 'data-vol-' + i,
    });
    setValue(volumeElement.find('[id^=vol_name]'), 'data-vol-' + i)
    setAttributes(volumeElement.find('[id^=vol_mount_path]'), {
      'placeholder': '/home/jovyan/' + 'data-vol-' + i,
    });
    setValue(volumeElement.find('[id^=vol_mount_path]'), '/home/jovyan/' + 'data-vol-' + i)
  }
}

function postNotebook(form, data) {
  // Post the data and based on the result, show error msg
  ns = form.find("#ns-inp").val()

  $.post(prefix + `/api/namespaces/${ns}/notebooks`, data, function(res) {
    if(res.success == true) {
      window.location.href = prefix + "/" +"?namespace=" + ns
    }
    else {
      innerHTML = `
      <div class="alert alert-danger">
        <span class="close" onclick="this.parentElement.style.display='none'">&times;</span>
        <strong>Error: </strong><span class='danger-log'></span>
      </div>`

      const $e = $("#error-msgs").html(innerHTML)
      $('.danger-log', $e).text(res.log)

      $('html,body').stop().animate({scrollTop:0}, "fast");
    }
  })
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

  // Don't fill the form on empty URL
  if (rok_lab_url.length === 0) {
    return;
  }

  // Fetch Rok Jupyter Lab Metadata to autofill the form
  $.ajax({
    url: rok_lab_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token,
    },
    success: function(data, textStatus, request) {
      if (!getHeader(request,'X-Object-Meta-image')) {
        // This is not a valid Rok Jupyter Lab URL
        markInvalid();
      } else {
        // This is a valid Rok Jupyter Lab url
        markValid();

        // Autofill Image, CPU, Memory and Extra Resources from Rok Jupyter Lab Metadata
        document.querySelector("#option_custom").click();
        setValue($('#customImage'), getHeader(request, 'X-Object-Meta-image') || '');
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

        componentHandler.upgradeAllRegistered();
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
      componentHandler.upgradeAllRegistered();
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
  // setValue($('#ws_type'), 'New');
  // $('#ws_type').trigger('change');
  // setValue($('#ws_size'), '');
  // setValue($('#ws_name'), '');

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

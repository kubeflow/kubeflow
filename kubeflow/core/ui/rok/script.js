// This function is executed when the document is ready
$(function() {

  // Toggle advanced options inside the Spawner form
  $('#toggle_advanced_options').on('click', function(e) {
    $('#advanced_fields').toggle();
  });

  // Enable Autofill button if a Lab URL is provided
  $('#rokLabURL').on('change keyup paste', function() {
      if ($(this).val().length > 0) {
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
  });

  // Autofill the Spawner form using metadata from a Rok Jupyter Lab URL
  $('#autofill').click(function() {
    autofillForm();
  });

  // Resize Spawner form to take up more page width
  $('.row.col-sm-offset-2.col-sm-8').attr({
    'class': 'row col-sm-offset-1 col-sm-10',
    'style': 'padding:15px;'
  });

  // Update upper-right sign-out icon to FontAwesome 5
  $('.fa.fa-sign-out').attr('class', 'fas fa-sign-out-alt');

  // Update Spawn button text upon form submission
  $('#spawn_form').one('submit', function() {
    $(this).find('input[type="submit"]')
      .attr('disabled', true)
      .val('Spawning...');
  });

  // Dynamically change Workspace form fields behavior
  setWorkspaceEventListeners();

  // Fill the form with values defined in the YAML config file
  setDefaultFormValues();

  // Set tooltip to disabled form fields
  setTooltipsOnReadOnly();
});

// Set default values to form fields
function setDefaultFormValues() {

  if ('rokToken' in formDefaults) {
    // Set default Rok Token, if specified
    if ('value' in formDefaults.rokToken) {
      $('#rokToken').val(formDefaults.rokToken.value);
    }
    // Make Rok Token field readonly, if specified
    if ('readOnly' in formDefaults.rokToken) {
      $('#rokToken').attr('disabled', formDefaults.rokToken.readOnly);
    }
  }

  if ('rokLabURL' in formDefaults) {
    // Set default Rok Lab URL, if specified
    if ('value' in formDefaults.rokLabURL) {
      $('#rokLabURL').val(formDefaults.rokLabURL.value).trigger('change');
    }
    // Make Rok  Lab URL field readonly, if specified
    if ('readOnly' in formDefaults.rokLabURL) {
      $('#rokLabURL').attr('disabled', formDefaults.rokLabURL.readOnly);
    }
  }

  // Set default Container Image - Disable if specified
  if (formDefaults.image.options) {
    formDefaults.image.options.forEach(function(item) {
      $('#image').append($('<option/>').attr('value', item).text(item));
    });
  }

  // Set default Container Image, if specified
  if (formDefaults.image.value) {
    $('#image').val(formDefaults.image.value);
  }

  // Make Container Image field readonly, if specified
  if (formDefaults.image.readOnly) {
    $('#image').attr('readonly', true);
  }

  // Set default CPU, if specified
  if (formDefaults.cpu.value) {
    $('#cpu').val(formDefaults.cpu.value);
  }

  // Make CPU field readonly, if specified
  if (formDefaults.cpu.readOnly) {
    $('#cpu').attr('readonly', true);
  }

  // Set default Memory, if specified
  if (formDefaults.memory.value) {
    $('#memory').val(formDefaults.memory.value);
  }

  // Make Memory field readonly if specified
  if (formDefaults.memory.readOnly) {
    $('#memory').attr('readonly', true);
  }

  // Set default Workspace Volume, if specified
  // Make Workspace Volume fields readonly, if specified
  var defaultWorkspace = formDefaults.workspaceVolume.value;
  var defaultWorkspaceReadOnly = formDefaults.workspaceVolume.readOnly

  if (defaultWorkspace) {
    $('#ws_type').val(defaultWorkspace.type.value).trigger('change');
    if (defaultWorkspace.type.readOnly || defaultWorkspaceReadOnly) {
      $('#ws_type').attr('readonly', true);
    }

    $('#ws_rok_url' + counter).val(defaultWorkspace.rokURL.value).trigger('change');
    if (defaultWorkspace.rokURL.readOnly) {
      $('#ws_rok_url' + counter).attr('readonly', true);
    }

    $('#ws_name').val(defaultWorkspace.name.value).trigger('focusout');
    if (defaultWorkspace.name.readOnly || defaultWorkspaceReadOnly) {
      $('#ws_name').attr('readonly', true);
    }

    $('#ws_size').val(defaultWorkspace.size.value);
    if (defaultWorkspace.size.readOnly || defaultWorkspaceReadOnly) {
      $('#ws_size').attr('readonly', true);
    }

    $('#ws_mount_path').val(defaultWorkspace.mountPath.value);
    if (defaultWorkspace.mountPath.readOnly || defaultWorkspaceReadOnly) {
      $('#ws_mount_path').attr('readonly', true);
    }
  }

  // Set default Data Volumes - Disable if specified
  if (formDefaults.dataVolumes.readOnly) {
    $('#add_volume').attr('readonly', true);
  }

  var defaultDataVolumes = formDefaults.dataVolumes.value;

  for (i=0; i<defaultDataVolumes.length; i++) {
    addVolume();
    var vol = defaultDataVolumes[i].value;

    $('#vol_type' + counter).val(vol.type.value).trigger('change');
    if (vol.type.readOnly) {
      $('#vol_type' + counter).attr('readonly', true);
    }

    $('#vol_rok_url' + counter).val(vol.rokURL.value).trigger('change');
    if (vol.rokURL.readOnly) {
      $('#vol_rok_url' + counter).attr('readonly', true);
    }

    $('#vol_name' + counter).val(vol.name.value).trigger('focusout');
    if (vol.name.readOnly) {
      $('#vol_name' + counter).attr('readonly', true);
    }

    $('#vol_size' + counter).val(vol.size.value);
    if (vol.size.readOnly) {
      $('#vol_size' + counter).attr('readonly', true);
    }

    $('#vol_mount_path' + counter).val(vol.mountPath.value);
    if (vol.mountPath.readOnly) {
      $('#vol_mount_path' + counter).attr('readonly', true);
    }

    if (defaultDataVolumes[i].readOnly){
      $('#vol_delete_button' + counter).attr('disabled', true);
    }
  }

  // Set default Extra Resources, if specified
  if (formDefaults.extraResources.value) {
    $('#extraResources').val(formDefaults.extraResources.value);
  }

  // Make Extra Resources field readonly, if specified
  if (formDefaults.extraResources.readOnly) {
    $('#extraResources').attr('disabled', true);
  }
}

// Register jQuery event listeners for the Workspace Volume
function  setWorkspaceEventListeners() {
  var workspaceType = $('#ws_type');
  var workspaceRokURL = $('#ws_rok_url');
  var workspaceName = $('#ws_name');
  var workspaceSize = $('#ws_size');

  // Disable/Enable Workspace size option based on its Type
  workspaceType.on('change', function(){
    if (this.value == 'Existing') {
      workspaceRokURL.removeAttr('disabled data-toggle data-placement title');
      workspaceName.attr({
          'readonly': true,
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': 'Name is autofilled when cloning an existing Volume'
      }).val('');
      workspaceSize.attr({
          'readonly': true,
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': 'Size is autofilled when cloning an existing Volume'
      }).val('');
    } else if (this.value == 'New') {
      workspaceRokURL.attr({
        'disabled': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'You can only enter a Rok URL when cloning an existing Volume'
      }).val('');
      workspaceName.removeAttr('readonly data-toggle data-placement title').val('');
      workspaceSize.removeAttr('readonly data-toggle data-placement title').val('');
    }
  });

  workspaceRokURL.on('change paste', function(e) {
    if ($(this).val().length > 0) {
      autofillWorkspaceVolume($(this).val(), $('#rokToken').val());
    }
  });
}

// Counter and options for Dataset Volumes
var counter=0;
var options = ['vol_type', 'vol_rok_url', 'vol_name', 'vol_size', 'vol_mount_path'];

// Dynamically adds a UI element for configuring a volume
function addVolume() {
  counter++;

  // Input for volume type
  var volumeType = $('<select>').attr({
      class: 'form-control',
      id: 'vol_type' + counter,
      name: 'vol_type' + counter
  });

  volumeType
    .append($('<option/>').val('New').text('New'))
    .append($('<option/>').val('Existing').text('Existing'));

  // Selection for Rok volume URL
  var volumeRokURL = $('<input>').attr({
    class: 'form-control',
    id: 'vol_rok_url' + counter,
    name: 'vol_rok_url' + counter,
    placeholder: 'Rok Volume URL'
  });

  // Input for volume name
  var volumeName = $('<input>').attr({
    class: 'form-control',
    id: 'vol_name' + counter,
    name: 'vol_name' + counter,
    type: 'text',
    placeholder: 'volume-' + counter
  });

  // Input for volume size
  var volumeSize = $('<input>').attr({
    class: 'form-control',
    id: 'vol_size' + counter,
    name: 'vol_size' + counter,
    type: 'number',
    min: '0',
    step: '0.5',
    placeholder: '5'
  });

  // Input for volume mount point
  var volumeMountPath = $('<input>').attr({
    class: 'form-control',
    id: 'vol_mount_path' + counter,
    name: 'vol_mount_path' + counter,
    type: 'text',
    placeholder: '/data/volume-' + counter
  });

  // Delete button for volume removal
  var deleteButton = $('<button/>').attr({
    class: 'btn btn-danger btn-sm',
    id: 'vol_delete_button' + counter,
    type: 'button',
    onclick: 'removeVolume(' + counter + ');'
  });

  deleteButton.append($('<i>').attr({class: 'fas fa-minus'}));

  // Register jQuery event listeners for the new Data Volume
  volumeType.on('change', function() {
    if (this.value == 'Existing') {
      volumeRokURL.removeAttr('disabled data-toggle data-placement title');
      volumeName.attr({
          'readonly': true,
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': 'Name is autofilled when cloning an existing Volume'
      }).val('');
      volumeSize.attr({
          'readonly': true,
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': 'Size is autofilled when cloning an existing Volume'
      }).val('');
    } else if (this.value == 'New') {
      volumeRokURL.attr({
        'disabled': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'You can only enter a Rok URL when cloning an existing Volume'
      }).val('');
      volumeName.removeAttr('readonly data-toggle data-placement title').val('');
      volumeSize.removeAttr('readonly data-toggle data-placement title').val('');
    }
  });

  volumeRokURL.on('change paste', function(e) {
    if ($(this).val().length > 0) {
      var dataVolumeId = $(this).attr('id').match(/\d/g).join("");
      autofillDataVolume($(this).val(), $('#rokToken').val(), dataVolumeId);
    }
  });

  // Set the Type of the new Volume to 'New'
  volumeType
    .val('New')
    .trigger('change');

  // Create and append new Data Volume
  $('<div/>', {'class': 'form-group volume' + counter})
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 15%'}).append(volumeType))
    .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 27.5%'}).append(volumeRokURL))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 20%'}).append(volumeName))
    .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 12.5%'}).append(volumeSize))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 20%'}).append(volumeMountPath))
    .append($('<div/>', {class: 'col-sm-1 form-group', style: 'width: 5%; padding: 2px 0px;'}).append(deleteButton))
    .hide().fadeIn('normal').appendTo($('#data_volumes'));
}

// Dynamically remove a previously added UI element for configuring a volume
function removeVolume(id) {
  $('.volume' + id).fadeOut('normal', function() {
    $(this).remove();
  });
  counter--;

  // Normalize the IDs of remainder volumes
  for (i=id; i<=counter; i++) {
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

    // Update the placeholders of the Volume options
    volumeElement.find('[id^=vol_name]').attr('placeholder', 'volume-' + i);
    volumeElement.find('[id^=vol_mount_path]').attr('placeholder', '/data/volume-' + i);
  }
}

// Autofill the form based on the lab URL
function autofillForm() {
  var rok_token = $('#rokToken').val();
  var rok_lab_url = $('#rokLabURL').val();
  var base_url = rok_lab_url.substring(0, rok_lab_url.lastIndexOf('/') + 1);

  // Empty Workspace Volume fields
  $('#ws_size').val('');
  $('#ws_name').val('');
  $('#ws_type').val('New').trigger('change');

  // Remove all Data Volumes
  for (var i=counter; i>0; i--) {
    removeVolume(i);
  }

  // Hide success/error texts
  $('#rok_lab_url_success_text').attr('hidden', true);
  $('#rok_lab_url_error_text').attr('hidden', true);

  // Restore rokLabURL input field style
  $('#rokLabURL').removeClass('valid invalid');

  // Fetch Rok Jupyter Lab Metadata to autofill the form
  $.ajax({
    url: rok_lab_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {

      if (!getHeader(request,'X-Object-Meta-lab')) {
        // This is not a valid Rok Jupyter Lab URL
        markInvalid();
      } else {
        // This is a valid Rok Jupyter Lab url
        markValid();

        // Open advanced options to show autocompletion
        $('#advanced_fields').toggle();

        // Autofill Image, CPU, Memory and Extra Resources from Rok Jupyter Lab Metadata
        $('#image').val(getHeader(request, 'X-Object-Meta-image') || '');
        $('#cpu').val(getHeader(request, 'X-Object-Meta-cpu') || '');
        $('#memory').val(getHeader(request, 'X-Object-Meta-memory') || '');
        $('#extraResources').val(getHeader(request, 'X-Object-Meta-extraResources') || '');

        // Autofill Workspace Volume
        var workspace_version = getHeader(request, 'X-Object-Group-Member-0-Version');
        var workspace_url = getHeader(request, 'X-Object-Group-Member-0-Object') + '?version=' + workspace_version;
        $('#ws_type').val('Existing').trigger('change');
        $('#ws_rok_url').val(base_url + workspace_url).trigger('change');

        // Autofill Data Volumes
        for(i = 1; i < getHeader(request, 'X-Object-Group-Member-Count'); i++) {
          addVolume();
          var dataset_version = getHeader(request, 'X-Object-Group-Member-' + i + '-Version');
          var dataset_url = base_url + getHeader(request, 'X-Object-Group-Member-' + i + '-Object') + '?version=' + dataset_version; ;
          $('#vol_type' + counter).val('Existing').trigger('change');
          $('#vol_rok_url' + counter).val(dataset_url).trigger('change');
        }
      }
    },
    error: function(XMLHttpRequest, e) {
      markInvalid();
      console.log('Could not retrieve Rok Jupyter Lab Metadata:', e);
    }
  });
}

// Autofill the Workspace Volume fields with metadata from the Rok Volume URL
function autofillWorkspaceVolume(rok_member_url, rok_token) {
  $.ajax({
    url: rok_member_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {
      $('#ws_name').val(getHeader(request, 'X-Object-Meta-workspace'));
      $('#ws_size').val(Math.round(getHeader(request, 'Content-Length')/Math.pow(1024, 3)));
    },
    error: function(XMLHttpRequest, e) {
      console.log('Could not retrieve Rok Jupyter Workspace Metadata:', e);
    }
  });
}

// Autofill the Data Volume fields with metadata from the Rok Volume URL
function autofillDataVolume(rok_member_url, rok_token, data_volume_id) {
  $.ajax({
    url: rok_member_url,
    type: 'HEAD',
    headers: {
      'X-Auth-Token': rok_token
    },
    success: function(data, textStatus, request) {
      $('#vol_name' + data_volume_id).val(getHeader(request, 'X-Object-Meta-dataset'));
      $('#vol_size' + data_volume_id).val(Math.round(getHeader(request, 'Content-Length')/Math.pow(1024, 3)));
      $('#vol_mount_path' + data_volume_id).val(getHeader(request, 'X-Object-Meta-mountpoint'));
    },
    error: function(XMLHttpRequest, e) {
      console.log('Could not retrieve Rok Jupyter Volume Metadata:', e);
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

// Helper function to set a tooltip to admin-disabled Spawner form fields
function setTooltipsOnReadOnly() {
  // Get all readOnly Elements
  var readOnlyElements = $(':input[readonly]');

  // Keep only readOnly Elements that do not already have a tooltip
  var filtered = readOnlyElements.filter(function() {
    return !($(this).attr('data-toggle'))
  });

  // Set tooltip
  filtered.attr({
    'data-toggle': 'tooltip',
    'data-placement': 'top',
    'title': 'This option has been set by your administrator'
  });
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

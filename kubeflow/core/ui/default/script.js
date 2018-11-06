// This function is executed when the document is ready
$(function() {

  // Toggle advanced options inside the Spawner form
  $('#toggle_advanced_options').on('click', function(e) {
    $('#advanced_fields').toggle();
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

  // Set tooltip to readOnly form fields
  setTooltipsOnReadOnly();
});

// Set default values to form fields
function setDefaultFormValues() {

  // Set default Container Image - Disable if specified
  if (formDefaults.image.options) {
    formDefaults.image.options.forEach(function(item) {
      $('#image').append($('<option/>').attr('value', item).text(item));
    });
  }

  // Set default Container Image, if specified
  if (formDefaults.image.value) {
    $('#image').val(formDefaults.image.value)
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
    $('#ws_access_modes').val(defaultWorkspace.accessModes.value);
    if (defaultWorkspace.accessModes.readOnly || defaultWorkspaceReadOnly) {
      $('#ws_access_modes').attr('readonly', true);
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

    $('#vol_access_modes' + counter).val(vol.accessModes.value);
    if (vol.accessModes.readOnly) {
      $('#vol_access_modes' + counter).attr('readonly', true);
    }

    if (defaultDataVolumes[i].readOnly){
      $('#vol_delete_button' + counter).attr('readonly', true);
    }
  }

  // Set default Extra Resources, if specified
  if (formDefaults.extraResources.value) {
    $('#extraResources').val(formDefaults.extraResources.value);
  }

  // Make Extra Resources field readonly, if specified
  if (formDefaults.extraResources.readOnly) {
    $('#extraResources').attr('readonly', true);
  }
}

// Register jQuery event listeners for the Workspace Volume
function  setWorkspaceEventListeners() {
  var workspaceType = $('#ws_type');
  var workspaceName = $('#ws_name');
  var workspaceSize = $('#ws_size');
  var workspaceAccessModes = $('#ws_access_modes');

  // Disable/Enable Workspace size option based on its Type
  // For 'Existing' Workspace, provide suggestions from the cluster
  workspaceType.on('change', function(){
    if (this.value == 'Existing') {
      workspaceName.attr('list', 'suggest_pvcs').val('');

      workspaceSize.attr({
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'Size is autofilled when cloning existing Volumes',
        'value': ''
      });

      workspaceAccessModes.attr({
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'Access Modes are autofilled when cloning existing Volumes',
        'value': ''
      });

    } else if (this.value == 'New') {
      workspaceName.attr('list', 'suggest_pvcs_disabled').val('');
      workspaceSize.removeAttr('readonly data-toggle data-placement title').val('');
      workspaceAccessModes.removeAttr('readonly data-toggle data-placement title').val('');
    }
  });

  workspaceName.on('change keyup paste', function(e) {
    if (workspaceType.val() == 'Existing') {
      // If Volume already exists, autocomplete Volume Size and Access Mode
      workspaceSize.val('');
      workspaceAccessModes.val('');
      for (var i=0; i<existingPVCs.length; i++) {
        if (existingPVCs[i].name == e.target.value) {
          workspaceSize.val(existingPVCs[i].size);
          workspaceAccessModes.val(existingPVCs[i].access_modes);
          break;
        }
      }
    }
  });
}

// Counter and options for Dataset Volumes
var counter=0;
var options = ['vol_type', 'vol_name', 'vol_size', 'vol_mount_path', 'vol_access_modes'];

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
    .append($('<option/>').attr({selected: true, value: 'New'}).text('New'))
    .append($('<option/>').attr({value: 'Existing'}).text('Existing'));

  // Input for volume name
  var volumeName = $('<input>').attr({
    class: 'form-control',
    id: 'vol_name' + counter,
    name: 'vol_name' + counter,
    type: 'text',
    placeholder: 'volume-' + counter,
    list: 'suggest_pvcs_disabled'
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

  // Selection for volume access mode
  var volumeAccessModes = $('<select>').attr({
      class: 'form-control',
      id: 'vol_access_modes' + counter,
      name: 'vol_access_modes' + counter
  });

  volumeAccessModes
    .append($('<option/>').attr({value: 'ReadWriteOnce'}).text('RWO'))
    .append($('<option/>').attr({value: 'ReadWriteMany'}).text('RWX'))
    .append($('<option/>').attr({value: 'ReadOnlyMany'}).text('ROX'));


  // Delete button for volume removal
  var deleteButton = $('<button/>').attr({
    class: 'btn btn-danger btn-sm',
    id: 'vol_delete_button' + counter,
    type: 'button',
    onclick: 'removeVolume(' + counter + ');'
  });

  deleteButton.append($('<i>').attr({class: 'fas fa-minus'}));

  // Create and append new volume
  $('<div/>', {'class': 'form-group volume' + counter})
    .append($('<div/>', {class: 'col-sm-2 form-group'}).append(volumeType))
    .append($('<div/>', {class: 'col-sm-3 form-group', style: 'width: 22.5%'}).append(volumeName))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 12.5%'}).append(volumeSize))
    .append($('<div/>', {class: 'col-sm-3 form-group'}).append(volumeMountPath))
    .append($('<div/>', {class: 'col-sm-2 form-group', style: 'width: 14%'}).append(volumeAccessModes))
    .append($('<div/>', {class: 'col-sm-1 form-group', style: 'padding: 2px'}).append(deleteButton))
    .hide().fadeIn('normal').appendTo($('#data_volumes'));

  // Disable/Enable Volume size option based on its Type
  volumeType.on('change', function(){
    if (this.value == 'Existing') {

      volumeName.attr('list', 'suggest_pvcs').val('');

      volumeSize.attr({
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'Size is autofilled when cloning existing Volumes',
        'value': ''
      });

      volumeAccessModes.attr({
        'readonly': true,
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        'title': 'Access Modes are autofilled when cloning existing Volumes',
        'value': ''
      });

    } else if (this.value == 'New') {
      volumeName.attr('list', 'suggest_pvcs_disabled').val('');
      volumeSize.removeAttr('readonly data-toggle data-placement title').val('');
      volumeAccessModes.removeAttr('readonly data-toggle data-placement title').val('');
    }
  });

  volumeName.on('change keyup paste', function(e){
    if (volumeType.val() == 'Existing') {
      // If Volume already exists, autocomplete Volume Size and Access Mode
      volumeSize.val('');
      volumeAccessModes.val('');
      for (var i = 0; i < existingPVCs.length; i++) {
        if (existingPVCs[i].name == e.target.value) {
          volumeSize.val(existingPVCs[i].size);
          volumeAccessModes.val(existingPVCs[i].access_modes);
          break;
        }
      }
    }
  });
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

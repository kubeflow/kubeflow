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

  // Fill the form with values defined in the YAML config file
  setDefaultFormValues();

  // Set tooltip to disabled form fields
  setTooltipsOnDisabled();
});

// Set default values to form fields
function setDefaultFormValues() {

  // Set default Container Image - Disable if specified
  formDefaults.image.options.forEach(function(item) {
    $('#image').append($('<option/>').attr('value', item).text(item));
  });

  $('#image').val(formDefaults.image.value)
  if (formDefaults.image.readOnly) {
    $('#image').attr('disabled', true);
  }

  // Set default CPU - Disable if specified
  $('#cpu').val(formDefaults.cpu.value);
  if (formDefaults.cpu.readOnly) {
    $('#cpu').attr('disabled', true);
  }

  // Set default Memory - Disable if specified
  $('#memory').val(formDefaults.memory.value);
  if (formDefaults.memory.readOnly) {
    $('#memory').attr('disabled', true);
  }

  // Set default Extra Resources - Disable if specified
  $('#extraResources').val(formDefaults.extraResources.value);
  if (formDefaults.extraResources.readOnly) {
    $('#extraResources').attr('disabled', true);
  }
}

// Helper function to set a tooltip to admin-disabled Spawner form fields
function setTooltipsOnDisabled() {
  // Get all disabled Elements
  var disabledElements = $('*:disabled');

  // Keep only disabled Elements that do not already have a tooltip
  var filtered = disabledElements.filter(function() {
    return !($(this).attr('data-toggle'))
  });

  // Set tooltip
  filtered.attr({
    'data-toggle': 'tooltip',
    'data-placement': 'top',
    'title': 'This option has been set by your administrator'
  });
}

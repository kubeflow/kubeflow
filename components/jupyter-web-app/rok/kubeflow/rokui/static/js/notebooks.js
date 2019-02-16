$(document).ready(function(){
  // Update the Notebooks when a Namespace is selected
  $("#ns-select").on("change", function() {
    var ns = this.value;
    updateNotebooksInNamespace(ns);

    // Change the function for the CREATE NOTEBOOK button
    $("#create-nb-btn").click(_ => createNotebook(ns))
  });

  // Search Bar
  $('#search-nb').bind("enterKey",function(e){
    var ns = this.value;
    updateNotebooksInNamespace(ns);

    // Change the function for the CREATE NOTEBOOK button
    $("#create-nb-btn").click(_ => createNotebook(ns))

    // In case user sees only default ns and we go to a ns with search bar
    // then the change listener won't be triggered
    $("#ns-select").val("")

  });

  $('#search-nb').keyup(function(e){
      if(e.keyCode == 13) {
        $(this).trigger("enterKey");
      }
  });

  // Get Notebooks for the ServiceAccount's Namespace
  var ns = new URL(window.location.href).searchParams.get("namespace")
  if (ns) {
    // Load the selected ns
    $("#ns-select").val(ns)
  }
  $("#ns-select").trigger("change");
});

function deleteNotebook(ns, nb) {
  $.getJSON(prefix + "/delete-notebook", { namespace:ns, notebook:nb}, function(data, status) {
    var innerHTML = ''
    if(data.success == true) {
      updateNotebooksInNamespace(ns)
    }
    else {
      innerHTML = `
      <div class="alert alert-warning">
        <span class="close" onclick="this.parentElement.style.display='none'">&times;</span>
        <strong>Warning!</strong><span class='warning-log'></span>
      </div>`
    }
    const $e = $("#error-msgs").html(innerHTML)
    $('.warning-log', $e).text(data.log)
  });
};

function connectNotebook(ns, nb) {
  window.open(`/notebook/${ns}/${nb}`, "_blank");
};

function createNotebook(ns) {
  // Redirect to Add Notebook URL
  window.location.href = `${prefix}/add-notebook?namespace=${ns}`
};

function updateNotebooksInNamespace(ns) {
  // Put the add Notebook button
  $('#nb-table-body').html("");

  // Get the Notebooks for selected Namespace
  $.getJSON(prefix + "/list-notebooks", { namespace:ns }, function(data, status) {
    // Remove data from table and errors
    $("#error-msgs").empty();
    $('#nb-table-body').empty();

    if(data.success == true){
      // Create a row for every notebook
      for(var i=0; i < data.notebooks.length; i++) {

        var nb = data.notebooks[i];
        // Col 1: Notebook Name
        var col1 = $("<td>").attr({
          class: "mdl-data-table__cell--non-numeric"
        }).text(nb)

        // Col 2: Notebook Namespace
        var col2 = $("<td>").text(ns)

        // Col 3: Notebook Options
        var col3 = $("<td>")

        var actions_btn = $("<button>").attr({
          class: "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon",
          id: 'menu'+i
        })

        var btn_icon = $("<i>").attr({
          class: "material-icons"
        }).text("more_vert")

        var actions_menu = $("<ul>").attr({
          class: "mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right",
          for: 'menu'+i
        })

        var connect = $("<li>").attr({
          class: "mdl-menu__item",
          onclick: 'connectNotebook(\''+ns+'\',\''+nb+'\')'
        }).text('Connect')

        var del = $("<li>").attr({
          class: "mdl-menu__item",
          onclick: 'deleteNotebook(\''+ns+'\',\''+nb+'\')'
        }).text('Delete')

        actions_btn.append(btn_icon)
        col3.append(actions_btn)
        actions_menu.append(connect)
        actions_menu.append(del)
        col3.append(actions_menu)

        // Create the row
        var new_row = $("<tr>")
          .append(col1)
          .append(col2)
          .append(col3)
        $('#nb-table-body').append(new_row);
      }
    }
    else{
      innerHTML = `
      <div class="alert alert-warning">
        <span class="close" onclick="this.parentElement.style.display='none'">&times;</span>
        <strong>Warning!</strong><span class='warning-log'></span>
      </div>`

      const $e = $("#error-msgs").html(innerHTML)
      $('.warning-log', $e).text(data.log)
    }

    // Load the dynamic components of mdl
    // https://stackoverflow.com/a/34579828
    componentHandler.upgradeAllRegistered();

  });
}

function searchOut() {
  $("#ns-select").text("")
}

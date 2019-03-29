var namespace = ""
var prevNotebooks = []

var TRIES = 3
var timer = 1             // id of current running timer
var retries = TRIES       // if it goes to zero, double the waiting time
var wait_time = 1         // seconds

$(document).ready(function(){
  // Update the Notebooks when a Namespace is selected
  $("#ns-select").on("change", function() {
    namespace = this.value;
    resetTimerMechanism()
    updateNotebooksInNamespace(namespace);

    // Change the function for the CREATE NOTEBOOK button
    $("#create-nb-btn").click(_ => createNotebook(namespace))
  });

  // Search Bar
  $('#search-nb').bind("enterKey",function(e){
    namespace = this.value;
    resetTimerMechanism()
    updateNotebooksInNamespace(namespace);

    // Change the function for the CREATE NOTEBOOK button
    $("#create-nb-btn").click(_ => createNotebook(namespace))

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

  // Periodically check if the Notebook's State has changed. The function
  // updateNotebooksInNamespace handles the polling
  timer = setTimeout(function() {
    updateNotebooksInNamespace(namespace)
  }, 1000)
});

function resetTimerMechanism() {
  // Stop any previously running timer and set tries and wait time to defaults
  clearTimeout(timer)
  retries = TRIES + 1
  wait_time = 1
}

function updatePolling(val_changed) {
  // if the value changed, then reset the counter and waiting time
  if (val_changed) {
    resetTimerMechanism()

    // restart polling
    timer = setTimeout(function() {
      updateNotebooksInNamespace(namespace)
    }, wait_time * 1000)
  } else {
    // If the value didn't change, then double the waiting time (up to 16 secs)
    // and decrease the retries
    retries--;
    if (retries == 0) {
      retries = TRIES
      wait_time = Math.min(wait_time * 2, 16)

      // reset the timer to the new waiting time
      clearTimeout(timer)
      timer = setTimeout(function() {
        updateNotebooksInNamespace(namespace)
      }, wait_time * 1000)
    } else {
      // Reset the timer by waiting_time
      clearTimeout(timer)
      timer = setTimeout(function() {
        updateNotebooksInNamespace(namespace)
      }, wait_time * 1000)
    }
  }
}

function deleteNotebook(ns, nb) {
  $.ajax({
    url: prefix + `/api/namespaces/${ns}/notebooks/${nb}`,
    type: 'DELETE',
    success: function(data, status) {
      var innerHTML = ''
      if(data.success == true) {
        resetTimerMechanism()
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
    },
  })
};

function connectNotebook(ns, nb) {
  window.open(`/notebook/${ns}/${nb}`, "_blank");
};

function createNotebook(ns) {
  // Redirect to Add Notebook URL
  window.location.href = `${prefix}/new?namespace=${ns}`
};

// Functions for the Notebook Columns in the Table
function createSpinner(tip, i) {
  var col0 = $('<td>')
  var stat = $('<div>').attr({
    'id': 'stat' + i,
    'class': 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active'
  })
  var statTip = $('<div>').attr({
    class: "mdl-tooltip",
    for: 'stat' + i,
  }).text(tip)

  col0.append(stat)
      .append(statTip)

  return col0
}

function createNbStatusIcon(txt, img, size, i) {
  var col0 = $('<td>')

  // Show the respective icon
  var stat = $('<div>').attr({id: 'stat' + i})
  var icon = $('<i>').attr({
    class: img,
    style: size,
  })
  var statTip = $('<div>').attr({
    class: "mdl-tooltip",
    for: 'stat' + i,
  }).text(txt)

  stat.append(icon)
  col0.append(stat)
      .append(statTip)

  return col0
}

function createNbStatusCol(nb, i) {
    // If the pod has been created, keep track of container status
  if ('running' in nb.status) {
    icon = "fa fa-check-circle"
    size = "font-size:24px;color:green"
    return createNbStatusIcon('Running', icon, size, i)
  }
  else if ('waiting' in nb.status) {
    reason = nb.status.waiting.reason

    // Check if ImagePullBackOff
    if (reason == 'ImagePullBackOff') {
      icon = "fas fa-times"
      size = "font-size:24px;color:red"
      return createNbStatusIcon(reason, icon, size, i)
    }
    // Check if it is downloading the image
    else if (reason == 'ContainerCreating') {
      // Loading icon      
      return createSpinner(reason, i)
    }
    else {
      icon = "fas fa-exclamation-triangle"
      size = "font-size:24px;color:orange"
      return createNbStatusIcon(reason, icon, size, i)
    } 
  } 
  else if ('terminated' in nb.status) {
    // Notebook shouldn't terminate
    reason = nb.status.terminated.reason
    icon = "fas fa-times"
    size = "font-size:24px;color:red"
    return createNbStatusIcon(reason, icon, size, i)
  }

  // Check if the underlying pods have been created
  if (nb.pods == 0) {
    return createSpinner('Scheduling Pod', i)
  }
}

function createNbVolumesCol(nb, i) {
  var col = $('<td>');
  var vols_actions_btn = $("<button>").attr({
    class: "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon",
    id: 'vols'+i
  })

  var vols_btn_icon = $("<i>").attr({
    class: "material-icons"
  }).text("storage")

  var vols_actions_menu = $("<ul>").attr({
    class: "mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right",
    for: 'vols'+i
  })

  if (nb.volumes.length === 0) {
    vols_actions_menu.append(
      $("<li>").attr({
        class: "mdl-menu__item",
        disabled: true,
      }).text('None')
    )
  } else {
    // Create an entry for each volume
    for(var j=0; j < nb.volumes.length; j++) {
      vols_actions_menu.append(
        $("<li>").attr({
          class: "mdl-menu__item",
        }).text(nb.volumes[j].name)
      )
    }
  }

  vols_actions_btn.append(vols_btn_icon)
  col.append(vols_actions_btn)
  col.append(vols_actions_menu)

  return col
}

function createNbActionsCol(nb, i) {
  var col = $('<td>');
  // Connect
  ready = true
  if ('running' in nb.status) { 
    ready = false 
  }
  
  var connect_btn = $("<button>").attr({
    class: "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored ",
    id: 'connect'+i,
    disabled: ready,
    onclick: `connectNotebook('${nb.namespace}', '${nb.name}')`,
  }).text('CONNECT')

  col.append(connect_btn)

  // Delete
  var delete_btn = $("<button>").attr({
    class: "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon",
    id: 'delete'+i,
    onclick: `createDialog('${nb.namespace}', '${nb.name}')`,
  })

  var delete_icon = $("<i>").attr({
    class: "material-icons",
    // style: "color:red;"
  }).text("delete")

  var delTip = $('<div>').attr({
    class: "mdl-tooltip",
    for: 'delete' + i,
  }).text('Delete the Notebook')

  
  delete_btn.append(delete_icon)
  col.append(delete_btn)
     .append(delTip)

  return col
}

function createDialog(ns, nm) {
  showDialog({
    title: 'You are about to delete Notebook Server: ' + nm,
    text: 'Are you sure you want to delete this Notebook Server? Your data might be lost if the Server is not backed by persistent storage.',
    negative: {
        title: 'CANCEL'
    },
    positive: {
        title: 'DELETE',
        onClick: function (e) {
          deleteNotebook(ns, nm)
        }
    }
  });
}

// Function that updates the Notebooks table
function updateNotebooksInNamespace(ns) {
  // Put the add Notebook button
  var tmp = $('<div>')
  
  // Get the Notebooks for selected Namespace
  $.getJSON(prefix + `/api/namespaces/${ns}/notebooks`, function(data, status) {
    // Remove data from table and errors
    $("#error-msgs").empty();
    // $('#nb-table-body').empty();

    if(data.success == true){
      // First check if the state hasn't changed      
      if (_.isEqual(prevNotebooks, data.notebooks)) {
        updatePolling(false)
        return;
      }

      // Create a row for every notebook
      for(var i=0; i < data.notebooks.length; i++) {
        var nb = data.notebooks[i];

        // Col 0: Notebook Loading
        var col0 = createNbStatusCol(nb, i)

        // Col 1: Notebook Name
        var col1 = $("<td>").text(nb.name)

        // Col 2: Notebook Name
        var col2 = $("<td>").text(nb.uptime)

        // Col 3: Notebook Image
        var col3 = $("<td>").attr({
          'id': 'image' + i,
        }).text(nb.srt_image)
        
        $("<div>").attr({
          'class': "mdl-tooltip",
          'data-mdl-for': "image" + i,
        }).text(nb.image).appendTo('body')
        
        // Col 4: Notebook CPU
        var col4 = $("<td>").text(nb.cpu)

        // Col 5: Notebook Memory
        var col5 = $("<td>").text(nb.mem)

        // Col 6: Notebook Volumes
        var col6 = createNbVolumesCol(nb, i)

        // Col 7: Notebook Options
        var col7 = createNbActionsCol(nb, i)

        // Create the row
        var new_row = $("<tr>")
          .append(col0)
          .append(col1)
          .append(col2)
          .append(col3)
          .append(col4)
          .append(col5)
          .append(col6)
          .append(col7)
        tmp.append(new_row)
      }
      $('#nb-table-body').html(tmp.html())
      // Make a deep copy
      prevNotebooks = JSON.parse(JSON.stringify(data.notebooks))
      updatePolling(true)
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
  })
    .fail(function() {
      // If failed to get a response, keep increasing the wait time / tries
      updatePolling(false)
    })
}

function searchOut() {
  $("#ns-select").text("")
}

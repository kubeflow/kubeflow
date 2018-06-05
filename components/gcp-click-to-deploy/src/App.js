import React, { Component } from 'react';
// TODO(jlewi): Replace with official logo image. Also it would 
// be good to use a .svg or at least a high res image.
import logo from './kubeflow-logo.jpg';
// TODO(jlewi): Can we fetch these directly from GitHub so we always get the latest value?
// When I tried using fetch API to do that I ran into errors that I interpreted as chrome blocking
// downloads from other domains from the one the app is being served at.
// So for security reasons it might be better to just bundle the configs.
// When we build a docker image as part of our release process we can just
// copy in the latest configs.
import clusterSpecPath from './configs/cluster-kubeflow.yaml';
import clusterJinjaPath from './configs/cluster.jinja';
import './App.css';
import yaml from 'yaml-js';


// TODO(jlewi): Can we set email automatically to the signed in email?
// TODO(jlewi): For the FQDN we should have a drop down box to select custom domain or automatically provisioned
// domain. Based on the response if the user selects auto domain then we should automatically supply the suffix
// <hostname>.endpoints.<Project>.cloud.goog

var gapi = null;
//const jinjaTemplate = "./configs/cluster.jinja";

var auth2 = null;

// TODO(jlewi): ClientId for project cloud-ml-dev we should change this.
var clientId = "236417448818-pksajgd0a6ghtjv3rlbvr7h9lo6uu17t.apps.googleusercontent.com";

/**
 * Handler for when the sign-in state changes.
 *
 * @param {boolean} isSignedIn The new signed in state.
 */
var updateSignIn = function() {
  console.log('update sign in state');
  if (auth2.isSignedIn.get()) {
    console.log('signed in');
    // var emailObj = window.document.getElementById("email");

    // if (emailObj.value == "") {
    //   console.log("Setting email");
    //   emailObj.value = "newvalue@.com";
    // }
  
    // TODO(jlewi): Code copied from the google+ example
   //  helper.onSignInCallback(gapi.auth2.getAuthInstance());
  }else{
    console.log('signed out');
    // TODO(jlewi): Code copied from the google+ example
    // helper.onSignInCallback(gapi.auth2.getAuthInstance());
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {project: 'cloud-ml-dev',
      deploymentName: 'kubeflow',
      ipName: "kubeflow",
      hostname: "<HOST>.endpoints.<PROJECT>.cloud.goog",      
      email:"john@doe.com",
      zone: "us-east1-d",
    };

    // startApp();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Create a  Kubeflow deployment.
  createDeployment() {
    var templates = this.props.getDeployemtTemplates();
    if (this.state.project == "") {
      alert("You must set project");
      return      
    }

    if (this.state.zone == "") {
      alert("You must set zone");
      return      
    }
    if (this.state.email == "") {
      alert("You must set email");
      return      
    }
    if (this.state.ipName == "") {
      alert("You must set IP Name");
      return      
    }
    if (this.state.deploymentName == "") {
      alert("You must set deployment name");
      return
    }
    if (this.state.hostName == "") {
      alert("You must set hostname");
      return      
    }

    var kubeflow = templates.clusterSpec.resources[0];
    
    kubeflow.name = this.state.deploymentName;
    kubeflow.properties.zone = this.state.zone;

    // Load the bootstrapper config.
    var config = yaml.load(kubeflow.properties.bootstrapperConfig); 

    if (config == null) {
      alert("Property bootstrapperConfig not found in deployment config.");
    } 

    var state = this.state;
    config.app.parameters.forEach(function (p) {
      if (p.name == "acmeEmail") {
        p.value = state.email;
      }

      if (p.name == "ipName") {
        p.value = state.ipName;
      }

      if (p.hostname == "hostname") {
        p.value = state.hostname;
      }      
    });

    templates.clusterSpec.resources[0] = kubeflow;
    var yamlClusterSpec = yaml.dump(templates.clusterSpec);
    this.props.appendLine("Spec:\n" + yaml.dump(yamlClusterSpec));
        
    var resource = {
      "name": this.state.deploymentName,
      "target": {
        "config": {
         "content":  yamlClusterSpec,
        },
        "imports": [
          {
            "name": "cluster.jinja",
            "content": templates.clusterJinja, 
          }
        ],
      },
    };

    var appendLine = this.props.appendLine;
    gapi.client.deploymentmanager.deployments.insert({project: this.state.project,
      resource: resource,}).then(function(res) {   
      appendLine("Result of insert:\n" + res);
    }, function(err) {
      appendLine("Error doing insert:\n" + err);
      alert("Error doing insert: " + err)
    });

  } // insertDeployment

  // TODO(jlewi): We aren't really using submit since we don't want to post the data anywhere.
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div>
        <label>
          Project:
          <input type="text" name="project" value={this.state.project} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Deployment name:
          <input type="text" name="deploymentName" value={this.state.deploymentName} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Zone
          <input type="text" name="zone" value={this.state.zone} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          IP name:
          <input type="text" name="ipName" value={this.state.ipName} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          hostname:
          <input type="text" name="hostname" value={this.state.hostname} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          Email for Lets Encrypt:
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        </div>
      </form>
      <div>
      <button className="createDeployment" onClick={() => this.createDeployment()}>
        Create Deployment
      </button>
      </div>
      </div>
    );
  }
}

class SignInButton extends Component {
    onSignIn (google_user) {
      //     // I want this method to be executed
    }

    render () {
      return (
          // TODO(jlewi): How can we set data-onsuccess
          <div id="loginButton" className="g-signin2"  data-theme="dark" />
      )
    }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiLoaded: false,      
      clusterJinja: "",
      clusterSpec: null,
    };
  }

  getDeployemtTemplates() {
    return {
      clusterJinja: this.state.clusterJinja,
      clusterSpec: this.state.clusterSpec,
    };
  }

  // createClients  does the following
  // 1. loads the auth library
  // 2. Renders the sign in button
  // 3. Creates a client for the deployment manager.
  createClients() {  
    console.log("createClients called");

    window.gapi.load('auth2', // Initialize the API client library
      function () {});
 
    //   //On load, called to load the auth2 library and API client library.
    var thisVar = this;
    gapi.load('signin2', function(){
      console.log("Loaded signin2");
    });
    gapi.load('client:auth2', function() {    

      // TODO(jlewi): Why do we load the client for deployment manager
      // when load of auth2 is done?
      gapi.client.load('deploymentmanager','v2').then(function() {
      console.log("Loaded deploymentmanager");
      // If we don't set a var = to this then we can't bind this in the
      // callback.
      thisVar.state.clientLoaded = true;


      console.log("load auth2");
      // See: https://developers.google.com/identity/sign-in/web/reference
      // Initializes the auth2 library.
      gapi.auth2.init({fetch_basic_profile: false,
          client_id: clientId,
          scope:'https://www.googleapis.com/auth/cloud-platform'}).then(
            function (){
              console.log('init');
              auth2 = gapi.auth2.getAuthInstance();              
              auth2.isSignedIn.listen(updateSignIn);
              auth2.then(updateSignIn);
            });

      console.log("render button");      
      gapi.signin2.render('loginButton', {
          width: 200,
          height: 50,
          scope: 'https://www.googleapis.com/auth/cloud-platform',
          //onSucess: updateSignIn,
          fetch_basic_profile: false })

      }).catch(function(error){
        console.log("Error occured loading deployment manager: " + error);
      });
    });
  } // startApp

 // TODO(jlewi): I copied this code from
 // https://gist.github.com/mikecrittenden/28fe4877ddabff65f589311fd5f8655c
 // At a high level I think its creating a script element in the DOM
 // as a way of loading the gapi library.
 // I modified the code to store a reference to gapi in the global
 // variable gapi.
 // I have no idea whether this is the right way to dynamically load
 // javascript libraries in REACT.
 loadClientWhenGapiReady(script) {
    console.log('Trying To Load Client!');
    console.log(script)
    // TODO(jlewi): Do we need this?
    if(script.getAttribute('gapi_processed')){
      gapi = window.gapi;
      console.log('Client is ready! Now you can access gapi. :)');
      this.gapiLoaded = true;
      this.createClients();
      if(window.location.hostname==='localhost'){
        window.gapi.client.load("http://localhost:8080/_ah/api/discovery/v1/apis/metafields/v1/rest")
        .then((response) => {
          console.log("Connected to metafields API locally.");
          },
          function (err) {
            console.log("Error connecting to metafields API locally.");
          }
        );
      }
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }


  initGapi() {
    console.log('Initializing GAPI...');
    console.log('Creating the google script tag...');

    const script = document.createElement("script");
    script.onload = () => {
      console.log('Loaded script, now loading our api...')
      // Gapi isn't available immediately so we have to wait until it is to use gapi.
      this.loadClientWhenGapiReady(script);
    };
    script.src = "https://apis.google.com/js/client.js";
    
    document.body.appendChild(script);
  }

  componentDidMount() {
    // this.loadYoutubeApi();
    this.appendLine("initGapi");
    this.initGapi();

    // Load the YAML and jinja templates
    // TODO(jlewi): The fetches should happen asynchronously.
    // The user shouldn't be able to click submit until
    // the fetches have succeeded. How can we do that?
    var n = this;

    this.appendLine("loadClusterJinjaPath");
    // Load the jinja template into a string because 
    // we will need it for the deployments insert request.
    fetch(clusterJinjaPath, {mode: 'no-cors'})
      .then(function(response) {     
        console.log('Got response');        
        return response.text();
      })
      .then(function(text) {
        n.state.clusterJinja = text;
        console.log('Loaded clusterJinja successfully');
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });


    this.appendLine("loadClusterSpec");
    // Load the YAML for the actual config and parse it.
    fetch(clusterSpecPath, {mode: 'no-cors'})
      .then(function(response) {     
        console.log('Got response');        
        return response.text();
      })
      .then(function(text) {
        n.state.clusterSpec = yaml.load(text);
        //console.log('Loaded clusterSpecPath successfully');
      })
      .catch(function(error) {
        console.log('Request failed', error)
      });

  }

  appendLine(newLine) {
    var element = window.document.getElementById("logs");
    if (element == null) {
      console.error("Could not get logs element.");
      return
    }
    var currentValue = element.value;

    if (currentValue)  {
      currentValue += "\n";
    }

    window.document.getElementById("logs").value  = currentValue  + newLine;
  }

  render() {
    return (      
      <div className="App" id="app">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SignInButton/>
        <p className="App-intro">
          To get started 
            * Fill out the fields below
            * Click create deployment
        </p>        
        <NameForm id="nameForm" appendLine={(newline) => this.appendLine(newline)} getDeployemtTemplates={ () => this.getDeployemtTemplates()} />
        <p> Logs </p>
        <textarea id="logs" width="800" height="800"></textarea>        
      </div>
    );
  }
}

export default App;

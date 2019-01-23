import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const style = {
  margin: 15,
};

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      dialogTitle: '',
    };
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Kubeflow Cluster Login"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange = {(event, val) => this.setState({username: val})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event, val) => this.setState({password: val})}
            />
            <br/>
            <RaisedButton label="Login" primary={true} style={style} onClick={this.handleClick.bind(this)}/>
          </div>
        </MuiThemeProvider>
        <Dialog open={!!this.state.dialogTitle} keepMounted={true}
                onClose={() => this.setState({ dialogTitle: ''})}>
          <DialogTitle>
            {this.state.dialogTitle}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogTitle: ''})} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleClick(){
    try {
      const hostname = window.location.hostname;
      axios.post("https://" + hostname + "/apikflogin", {"req-num": "1"}, {
        auth: {
          username: this.state.username,
          password: this.state.password
        },
        headers: {'x-from-login': 'true'}
      }).then(response => {
        console.log(response);
        // Login successful, get http.StatusSeeOther
        // redirect to central dashboard
        if (response.status === 205) {
          console.log("Login successfull");
          window.location = "/"
        } else {
          console.log("Unrecgonized response, please post issue to https://github.com/kubeflow/kubeflow");
          this.setState({
            dialogTitle: 'Unrecgonized response, please post issue to https://github.com/kubeflow/kubeflow',
          });
        }
      }).catch(e => {
        console.log('Exception: ', e);
        this.setState({
          dialogTitle: 'Username or password incorrect',
        });
      });
    } catch (e) {
      console.log('Exception: ', e);
    }
  }
}

export default Login;

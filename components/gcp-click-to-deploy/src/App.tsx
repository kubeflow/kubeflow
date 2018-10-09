import { MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CommonCss, theme } from './Css';
import DeployForm from './DeployForm';
import Gapi from './Gapi';
import Header from './Header';
import kubeflowText from './kubeflow-text.svg';
import logo from './logo.svg';
import Page404 from './Page404';
import Splash from './Splash';

declare global {
  interface Window {
    gapiPromise: Promise<any>;
  }
}

const styles: { [p: string]: React.CSSProperties } = {
  app: {
    backgroundColor: CommonCss.accent,
    display: 'flex',
    flexFlow: 'column',
    fontFamily: '"google sans", Helvetica',
    height: '100%',
    width: '100%',
  },
  container: {
    overflow: 'auto',
  },
  content: {
    display: 'flex',
    margin: '5% 10%',
  },
  leftPane: {
    color: '#fff',
    flexBasis: '40%',
    fontSize: '1.1em',
    fontWeight: 400,
    lineHeight: '1.7em',
    marginRight: '5%',
  },
  logoContainer: {
    display: 'flex',
    marginBottom: 60,
  },
  logoImg: {
    height: 40,
    marginRight: 25,
    width: 40,
  },
  logoText: {
    width: 120,
  },
  rightPane: {
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0 5px 15px 0 #666',
    margin: 'auto',
    position: 'relative',
    width: 600,
  },
  title: {
    fontSize: '1.9em',
    lineHeight: '1.3em',
    marginBottom: 25,
  },
};

const PrivateRoute = ({ component, signedIn, ...rest }: any) => {
  const routeComponent = (props: { location: string }) => (
    signedIn
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

class App extends React.Component<any, { signedIn: boolean }> {

  constructor(props: { signedIn: boolean }) {
    super(props);
    this.state = {
      signedIn: false,
    };

    Gapi.listenForSignInChanges(signedIn => {
      this.setState({
        signedIn,
      });
    });
  }

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={styles.app}>
          <Header />
          <div style={styles.container}>
            <div style={styles.content}>
              <div style={styles.leftPane}>
                <div style={styles.logoContainer}>
                  <img src={logo} style={styles.logoImg} />
                  <img src={kubeflowText} style={styles.logoText} />
                </div>
                <div style={styles.title}>Deploy on GCP</div>
                <div>
                  To deploy Kubeflow on Google Cloud Platform:
                </div>
                <br />
                <div>
                  <ul>
                    <li> Enter the name of the GCP project you want to use  </li>
                    <li> Pick a name for your deployment </li>
                    <li> Pick a zone where you want Kubeflow to be deployed </li>
                    <li> Follow these 
                         <a href="https://www.kubeflow.org/docs/started/getting-started-gke/#create-oauth-client-credentials"
                            style={{ color: 'inherit', marginLeft: 5 }}
                         >
                         instructions</a> to create an OAuth client and
                         then enter the id and secret</li>
                    <li> (Optional) Change the value of Kubeflow version 
                         if you don't want to use the default version. </li>
                    <li> Click deploy </li>
                  </ul>
                </div>
                <div>
                  Notice:
                  <ul>

                     <li> When you click deploy a short lived OAuth token granting access to your GCP resources will be sent to the
                          Kubeflow deploy service
                     </li>
                     <li> The Kubeflow deploy service uses this to create Kubeflow GCP resources on your behalf
                     </li>
                     <li> If you don't want to delegate a credential to the service please use our
                          <a href="https://www.kubeflow.org/docs/started/getting-started-gke/"
                            style={{ color: 'inherit', marginLeft: 5 }}
                          >CLI to deploy Kubeflow</a>
                     </li>
                     <li> <a style={{ color: 'inherit', marginLeft: 5 }} href="https://policies.google.com/terms">Terms</a>
                     </li>
                     <li><a style={{ color: 'inherit', marginLeft: 5 }} href="https://policies.google.com/privacy">Privacy</a>
                     </li>
                  </ul>
                </div>                
              </div>
              <div style={styles.rightPane}>
                <Switch>
                  <Route exact={true} path="/" component={Splash} />
                  <PrivateRoute signedIn={this.state.signedIn} exact={true} path="/deploy" component={DeployForm} />
                  <Route component={Page404} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider >
    );
  }

}

export default App;

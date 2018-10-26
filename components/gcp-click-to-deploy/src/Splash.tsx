import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { Redirect } from 'react-router';
import Gapi from './Gapi';
import hero from './hero.png';

const spinnerDimension = 40;
const signInButtonId = 'loginButton';

const styles: { [p: string]: React.CSSProperties } = {
  heroImg: {
    borderRadius: '5px 5px 0 0',
    width: 600,
  },
  overlay: {
    backgroundColor: '#ffffff87',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  signInButton: {
    paddingTop: 40,
  },
  signInText: {
    color: '#333',
    fontSize: '1.3em',
    marginBottom: 15,
  },
  spinner: {
    color: '#3777dd',
    height: spinnerDimension,
    width: spinnerDimension,
  },
  spinnerContainer: {
    left: `calc(50% - ${spinnerDimension}px / 2)`,
    position: 'absolute',
    top: `calc(50% - ${spinnerDimension}px / 2)`,
  },
  splashText: {
    color: '#777',
    padding: 50,
  },
};

interface SplashProps {
  location: {
    state: {
      from: Location;
    }
  };
}

// This element appears by default if the user tries to navigate to any page,
// until the sign in status is verified, then it can redirect back to the user's
// destination. It takes the Route's location as a prop so it can redirect back
// to it.
export default class Spash extends React.Component<SplashProps, { busy: boolean, signedIn: boolean }> {
  constructor(props: SplashProps) {
    super(props);
    this.state = {
      busy: false,
      signedIn: false,
    };

    Gapi.loadSigninButton(signInButtonId)
      .then(() => Gapi.listenForSignInChanges(signedIn => {
        this.setState({
          busy: !!signedIn,
          signedIn,
        });
      }));
  }

  public render() {
    // If the user is signed in, check to make sure we have something to
    // redirect back to, then do it.
    const { from } = this.props.location.state || { from: { pathname: '/deploy' } };
    if (this.state.signedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <div style={styles.overlay} hidden={!this.state.busy}>
          <div style={styles.spinnerContainer}>
            <CircularProgress id="sign-in-spinner" style={styles.spinner} />
          </div>
        </div>
        <img src={hero} style={styles.heroImg} />
        <div style={styles.splashText}>
          <div style={styles.signInText}>
            Sign in to deploy Kubeflow
          </div>
          <div>
            Your credentials are needed to perform GCP actions.
          </div>

          <div id={signInButtonId} style={styles.signInButton} data-theme="dark" hidden={this.state.signedIn} />
        </div>
      </div>
    );
  }
}

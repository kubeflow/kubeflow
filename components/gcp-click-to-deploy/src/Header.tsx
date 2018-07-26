import * as React from 'react';

const styles = {
  anchor: {
    color: 'inherit',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  cloudPlatform: {
    fontWeight: 300,
  },
  google: {
    fontWeight: 600,
    paddingRight: 5,
  },
  header: {
    color: '#fff',
    fontSize: '1.3em',
    padding: 20,
  },
};

export default class Header extends React.Component {
  public render() {
    return (
      <header style={styles.header}>
        <a href="/" style={styles.anchor}>
          <span style={styles.google}>Google</span>
          <span style={styles.cloudPlatform}>Cloud Platform</span>
        </a>
      </header>
    );
  }
}

import * as React from 'react';

const styles = {
  message: {
    color: '#fff',
    fontSize: '1.2em',
  }
}

export default class Page404 extends React.Component {
  public render() {
    return (
      <div style={styles.message}>
        This page was not found.
      </div>
    );
  }
}

import * as React from 'react';

const styles = {
  message: {
    fontSize: '1em',
    margin: 20,
    textAlign: 'center',
  } as React.CSSProperties
};

export default class Page404 extends React.Component {
  public render() {
    return (
      <div style={styles.message}>
        This page was not found.
      </div>
    );
  }
}

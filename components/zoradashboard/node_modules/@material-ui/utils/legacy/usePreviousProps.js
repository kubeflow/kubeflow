import * as React from 'react';

var usePreviousProps = function usePreviousProps(value) {
  var ref = React.useRef({});
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
};

export default usePreviousProps;
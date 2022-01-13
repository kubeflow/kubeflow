import * as React from 'react';
var useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
export default useEnhancedEffect;
import { useState, useEffect, useContext, useRef } from 'react';
import { getI18n, getDefaults, ReportNamespaces, I18nContext } from './context';
import { warnOnce, loadNamespaces, hasLoadedNamespace } from './utils';

export function useTranslation(ns, props = {}) {
  // assert we have the needed i18nInstance
  const { i18n: i18nFromProps } = props;
  const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k) => (Array.isArray(k) ? k[k.length - 1] : k);
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }

  if (i18n.options.react && i18n.options.react.wait !== undefined)
    warnOnce(
      'It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.',
    );

  const i18nOptions = { ...getDefaults(), ...i18n.options.react, ...props };
  const { useSuspense } = i18nOptions;

  // prepare having a namespace
  let namespaces = ns || defaultNSFromContext || (i18n.options && i18n.options.defaultNS);
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];

  // report namespaces as used
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);

  // are we ready? yes if all namespaces in first language are loaded already (either with data or empty object on failed load)
  const ready =
    (i18n.isInitialized || i18n.initializedStoreOnce) &&
    namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));

  // binding t function to namespace (acts also as rerender trigger)
  function getT() {
    return i18n.getFixedT(null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0]);
  }
  const [t, setT] = useState(getT);

  const isMounted = useRef(true);
  useEffect(() => {
    const { bindI18n, bindI18nStore } = i18nOptions;
    isMounted.current = true;

    // if not ready and not using suspense load the namespaces
    // in side effect and do not call resetT if unmounted
    if (!ready && !useSuspense) {
      loadNamespaces(i18n, namespaces, () => {
        if (isMounted.current) setT(getT);
      });
    }

    function boundReset() {
      if (isMounted.current) setT(getT);
    }

    // bind events to trigger change, like languageChanged
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);

    // unbinding on unmount
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach((e) => i18n.off(e, boundReset));
      if (bindI18nStore && i18n)
        bindI18nStore.split(' ').forEach((e) => i18n.store.off(e, boundReset));
    };
  }, [i18n, namespaces.join()]); // re-run effect whenever list of namespaces changes

  // t is correctly initialized by useState hook. We only need to update it after i18n
  // instance was replaced (for example in the provider).
  const isInitial = useRef(true);
  useEffect(() => {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }
    isInitial.current = false;
  }, [i18n]); // re-run when i18n instance was replaced

  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;

  // return hook stuff if ready
  if (ready) return ret;

  // not yet loaded namespaces -> load them -> and return if useSuspense option set false
  if (!ready && !useSuspense) return ret;

  // not yet loaded namespaces -> load them -> and trigger suspense
  throw new Promise((resolve) => {
    loadNamespaces(i18n, namespaces, () => {
      resolve();
    });
  });
}

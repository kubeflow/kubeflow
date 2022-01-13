import { useTranslation } from './useTranslation';

export function Translation(props) {
  const { ns, children, ...options } = props;
  const [t, i18n, ready] = useTranslation(ns, options);

  return children(
    t,
    {
      i18n,
      lng: i18n.language,
    },
    ready,
  );
}

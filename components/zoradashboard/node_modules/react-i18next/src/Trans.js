import React, { useContext } from 'react';
import HTML from 'html-parse-stringify';
import { getI18n, I18nContext, getDefaults } from './context';
import { warn, warnOnce } from './utils';

function hasChildren(node, checkLength) {
  if (!node) return false;
  const base = node.props ? node.props.children : node.children;
  if (checkLength) return base.length > 0;
  return !!base;
}

function getChildren(node) {
  if (!node) return [];
  return node && node.children ? node.children : node.props && node.props.children;
}

function hasValidReactChildren(children) {
  if (Object.prototype.toString.call(children) !== '[object Array]') return false;
  return children.every((child) => React.isValidElement(child));
}

function getAsArray(data) {
  return Array.isArray(data) ? data : [data];
}

function mergeProps(source, target) {
  const newTarget = { ...target };
  // overwrite source.props when target.props already set
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
}

export function nodesToString(children, i18nOptions) {
  if (!children) return '';
  let stringNode = '';

  // do not use `React.Children.toArray`, will fail at object children
  const childrenArray = getAsArray(children);
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];

  // e.g. lorem <br/> ipsum {{ messageCount, format }} dolor <strong>bold</strong> amet
  childrenArray.forEach((child, childIndex) => {
    if (typeof child === 'string') {
      // actual e.g. lorem
      // expected e.g. lorem
      stringNode += `${child}`;
    } else if (React.isValidElement(child)) {
      const childPropsCount = Object.keys(child.props).length;
      const shouldKeepChild = keepArray.indexOf(child.type) > -1;
      const childChildren = child.props.children;

      if (!childChildren && shouldKeepChild && childPropsCount === 0) {
        // actual e.g. lorem <br/> ipsum
        // expected e.g. lorem <br/> ipsum
        stringNode += `<${child.type}/>`;
      } else if (!childChildren && (!shouldKeepChild || childPropsCount !== 0)) {
        // actual e.g. lorem <hr className="test" /> ipsum
        // expected e.g. lorem <0></0> ipsum
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (child.props.i18nIsDynamicList) {
        // we got a dynamic list like
        // e.g. <ul i18nIsDynamicList>{['a', 'b'].map(item => ( <li key={item}>{item}</li> ))}</ul>
        // expected e.g. "<0></0>", not e.g. "<0><0>a</0><1>b</1></0>"
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (shouldKeepChild && childPropsCount === 1 && typeof childChildren === 'string') {
        // actual e.g. dolor <strong>bold</strong> amet
        // expected e.g. dolor <strong>bold</strong> amet
        stringNode += `<${child.type}>${childChildren}</${child.type}>`;
      } else {
        // regular case mapping the inner children
        const content = nodesToString(childChildren, i18nOptions);
        stringNode += `<${childIndex}>${content}</${childIndex}>`;
      }
    } else if (child === null) {
      warn(`Trans: the passed in value is invalid - seems you passed in a null child.`);
    } else if (typeof child === 'object') {
      // e.g. lorem {{ value, format }} ipsum
      const { format, ...clone } = child;
      const keys = Object.keys(clone);

      if (keys.length === 1) {
        const value = format ? `${keys[0]}, ${format}` : keys[0];
        stringNode += `{{${value}}}`;
      } else {
        // not a valid interpolation object (can only contain one value plus format)
        warn(
          `react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`,
          child,
        );
      }
    } else {
      warn(
        `Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`,
        child,
      );
    }
  });

  return stringNode;
}

function renderNodes(children, targetString, i18n, i18nOptions, combinedTOpts) {
  if (targetString === '') return [];

  // check if contains tags we need to replace from html string to react nodes
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  const emptyChildrenButNeedsHandling =
    targetString && new RegExp(keepArray.join('|')).test(targetString);

  // no need to replace tags in the targetstring
  if (!children && !emptyChildrenButNeedsHandling) return [targetString];

  // v2 -> interpolates upfront no need for "some <0>{{var}}</0>"" -> will be just "some {{var}}" in translation file
  const data = {};

  function getData(childs) {
    const childrenArray = getAsArray(childs);

    childrenArray.forEach((child) => {
      if (typeof child === 'string') return;
      if (hasChildren(child)) getData(getChildren(child));
      else if (typeof child === 'object' && !React.isValidElement(child))
        Object.assign(data, child);
    });
  }

  getData(children);

  // parse ast from string with additional wrapper tag
  // -> avoids issues in parser removing prepending text nodes
  const ast = HTML.parse(`<0>${targetString}</0>`);
  const opts = { ...data, ...combinedTOpts };

  function renderInner(child, node, rootReactNode) {
    const childs = getChildren(child);
    const mappedChildren = mapAST(childs, node.children, rootReactNode);
    // console.warn('INNER', node.name, node, child, childs, node.children, mappedChildren);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 ? childs : mappedChildren;
  }

  function pushTranslatedJSX(child, inner, mem, i, isVoid) {
    if (child.dummy) child.children = inner; // needed on preact!
    mem.push(React.cloneElement(child, { ...child.props, key: i }, isVoid ? undefined : inner));
  }

  // reactNode (the jsx root element or child)
  // astNode (the translation string as html ast)
  // rootReactNode (the most outer jsx children array or trans components prop)
  function mapAST(reactNode, astNode, rootReactNode) {
    const reactNodes = getAsArray(reactNode);
    const astNodes = getAsArray(astNode);

    return astNodes.reduce((mem, node, i) => {
      const translationContent =
        node.children &&
        node.children[0] &&
        node.children[0].content &&
        i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);

      if (node.type === 'tag') {
        let tmp = reactNodes[parseInt(node.name, 10)]; // regular array (components or children)
        if (!tmp && rootReactNode.length === 1 && rootReactNode[0][node.name])
          tmp = rootReactNode[0][node.name]; // trans components is an object
        if (!tmp) tmp = {};
        //  console.warn('TMP', node.name, parseInt(node.name, 10), tmp, reactNodes);
        const child =
          Object.keys(node.attrs).length !== 0 ? mergeProps({ props: node.attrs }, tmp) : tmp;

        const isElement = React.isValidElement(child);

        const isValidTranslationWithChildren =
          isElement && hasChildren(node, true) && !node.voidElement;

        const isEmptyTransWithHTML =
          emptyChildrenButNeedsHandling && typeof child === 'object' && child.dummy && !isElement;

        const isKnownComponent =
          typeof children === 'object' &&
          children !== null &&
          Object.hasOwnProperty.call(children, node.name);
        // console.warn('CHILD', node.name, node, isElement, child);

        if (typeof child === 'string') {
          const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (
          hasChildren(child) || // the jsx element has children -> loop
          isValidTranslationWithChildren // valid jsx element with no children but the translation has -> loop
        ) {
          const inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (isEmptyTransWithHTML) {
          // we have a empty Trans node (the dummy element) with a targetstring that contains html tags needing
          // conversion to react nodes
          // so we just need to map the inner stuff
          const inner = mapAST(
            reactNodes /* wrong but we need something */,
            node.children,
            rootReactNode,
          );
          mem.push(React.cloneElement(child, { ...child.props, key: i }, inner));
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            const inner = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, inner, mem, i, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push(React.createElement(node.name, { key: `${node.name}-${i}` }));
            } else {
              const inner = mapAST(
                reactNodes /* wrong but we need something */,
                node.children,
                rootReactNode,
              );

              mem.push(React.createElement(node.name, { key: `${node.name}-${i}` }, inner));
            }
          } else if (node.voidElement) {
            mem.push(`<${node.name} />`);
          } else {
            const inner = mapAST(
              reactNodes /* wrong but we need something */,
              node.children,
              rootReactNode,
            );

            mem.push(`<${node.name}>${inner}</${node.name}>`);
          }
        } else if (typeof child === 'object' && !isElement) {
          const content = node.children[0] ? translationContent : null;

          // v1
          // as interpolation was done already we just have a regular content node
          // in the translation AST while having an object in reactNodes
          // -> push the content no need to interpolate again
          if (content) mem.push(content);
        } else if (node.children.length === 1 && translationContent) {
          // If component does not have children, but translation - has
          // with this in component could be components={[<span class='make-beautiful'/>]} and in translation - 'some text <0>some highlighted message</0>'
          mem.push(React.cloneElement(child, { ...child.props, key: i }, translationContent));
        } else {
          mem.push(React.cloneElement(child, { ...child.props, key: i }));
        }
      } else if (node.type === 'text') {
        const wrapTextNodes = i18nOptions.transWrapTextNodes;
        const content = i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push(React.createElement(wrapTextNodes, { key: `${node.name}-${i}` }, content));
        } else {
          mem.push(content);
        }
      }
      return mem;
    }, []);
  }

  // call mapAST with having react nodes nested into additional node like
  // we did for the string ast from translation
  // return the children of that extra node to get expected result
  const result = mapAST([{ dummy: true, children }], ast, getAsArray(children || []));
  return getChildren(result[0]);
}

export function Trans({
  children,
  count,
  parent,
  i18nKey,
  tOptions = {},
  values,
  defaults,
  components,
  ns,
  i18n: i18nFromProps,
  t: tFromProps,
  ...additionalProps
}) {
  const { i18n: i18nFromContext, defaultNS: defaultNSFromContext } = useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();

  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using i18nextReactModule');
    return children;
  }

  const t = tFromProps || i18n.t.bind(i18n) || ((k) => k);

  const reactI18nextOptions = { ...getDefaults(), ...(i18n.options && i18n.options.react) };

  // prepare having a namespace
  let namespaces = ns || t.ns || defaultNSFromContext || (i18n.options && i18n.options.defaultNS);
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];

  const defaultValue =
    defaults ||
    nodesToString(children, reactI18nextOptions) ||
    reactI18nextOptions.transEmptyNodeValue ||
    i18nKey;
  const { hashTransKey } = reactI18nextOptions;
  const key = i18nKey || (hashTransKey ? hashTransKey(defaultValue) : defaultValue);
  const interpolationOverride = values
    ? tOptions.interpolation
    : { interpolation: { ...tOptions.interpolation, prefix: '#$?', suffix: '?$#' } };
  const combinedTOpts = {
    ...tOptions,
    count,
    ...values,
    ...interpolationOverride,
    defaultValue,
    ns: namespaces,
  };
  const translation = key ? t(key, combinedTOpts) : defaultValue;

  const content = renderNodes(
    components || children,
    translation,
    i18n,
    reactI18nextOptions,
    combinedTOpts,
  );

  // allows user to pass `null` to `parent`
  // and override `defaultTransParent` if is present
  const useAsParent = parent !== undefined ? parent : reactI18nextOptions.defaultTransParent;

  return useAsParent ? React.createElement(useAsParent, additionalProps, content) : content;
}

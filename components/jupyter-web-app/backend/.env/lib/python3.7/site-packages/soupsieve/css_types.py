"""CSS selector structure items."""
from __future__ import unicode_literals
from . import util

__all__ = (
    'Selector',
    'SelectorNull',
    'SelectorTag',
    'SelectorAttribute',
    'SelectorContains',
    'SelectorNth',
    'SelectorLang',
    'SelectorList',
    'Namespaces',
    'CustomSelectors'
)


SEL_EMPTY = 0x1
SEL_ROOT = 0x2
SEL_DEFAULT = 0x4
SEL_INDETERMINATE = 0x8
SEL_SCOPE = 0x10
SEL_DIR_LTR = 0x20
SEL_DIR_RTL = 0x40
SEL_IN_RANGE = 0x80
SEL_OUT_OF_RANGE = 0x100
SEL_DEFINED = 0x200
SEL_PLACEHOLDER_SHOWN = 0x400


class Immutable(object):
    """Immutable."""

    __slots__ = ('_hash',)

    def __init__(self, **kwargs):
        """Initialize."""

        temp = []
        for k, v in kwargs.items():
            temp.append(type(v))
            temp.append(v)
            super(Immutable, self).__setattr__(k, v)
        super(Immutable, self).__setattr__('_hash', hash(tuple(temp)))

    @classmethod
    def __base__(cls):
        """Get base class."""

        return cls

    def __eq__(self, other):
        """Equal."""

        return (
            isinstance(other, self.__base__()) and
            all([getattr(other, key) == getattr(self, key) for key in self.__slots__ if key != '_hash'])
        )

    def __ne__(self, other):
        """Equal."""

        return (
            not isinstance(other, self.__base__()) or
            any([getattr(other, key) != getattr(self, key) for key in self.__slots__ if key != '_hash'])
        )

    def __hash__(self):
        """Hash."""

        return self._hash

    def __setattr__(self, name, value):
        """Prevent mutability."""

        raise AttributeError("'{}' is immutable".format(self.__class__.__name__))

    def __repr__(self):  # pragma: no cover
        """Representation."""

        return "{}({})".format(
            self.__base__(), ', '.join(["{}={!r}".format(k, getattr(self, k)) for k in self.__slots__[:-1]])
        )

    __str__ = __repr__


class ImmutableDict(util.Mapping):
    """Hashable, immutable dictionary."""

    def __init__(self, *args, **kwargs):
        """Initialize."""

        arg = args[0] if args else kwargs
        is_dict = isinstance(arg, dict)
        if (
            is_dict and not all([isinstance(v, util.Hashable) for v in arg.values()]) or
            not is_dict and not all([isinstance(k, util.Hashable) and isinstance(v, util.Hashable) for k, v in arg])
        ):
            raise TypeError('All values must be hashable')

        self._d = dict(*args, **kwargs)
        self._hash = hash(tuple([(type(x), x, type(y), y) for x, y in sorted(self._d.items())]))

    def __iter__(self):
        """Iterator."""

        return iter(self._d)

    def __len__(self):
        """Length."""

        return len(self._d)

    def __getitem__(self, key):
        """Get item: `namespace['key']`."""
        return self._d[key]

    def __hash__(self):
        """Hash."""

        return self._hash

    def __repr__(self):  # pragma: no cover
        """Representation."""

        return "{!r}".format(self._d)

    __str__ = __repr__


class Namespaces(ImmutableDict):
    """Namespaces."""

    def __init__(self, *args, **kwargs):
        """Initialize."""

        # If there are arguments, check the first index.
        # `super` should fail if the user gave multiple arguments,
        # so don't bother checking that.
        arg = args[0] if args else kwargs
        is_dict = isinstance(arg, dict)
        if is_dict and not all([isinstance(k, util.string) and isinstance(v, util.string) for k, v in arg.items()]):
            raise TypeError('Namespace keys and values must be Unicode strings')
        elif not is_dict and not all([isinstance(k, util.string) and isinstance(v, util.string) for k, v in arg]):
            raise TypeError('Namespace keys and values must be Unicode strings')

        super(Namespaces, self).__init__(*args, **kwargs)


class CustomSelectors(ImmutableDict):
    """Custom selectors."""

    def __init__(self, *args, **kwargs):
        """Initialize."""

        # If there are arguments, check the first index.
        # `super` should fail if the user gave multiple arguments,
        # so don't bother checking that.
        arg = args[0] if args else kwargs
        is_dict = isinstance(arg, dict)
        if is_dict and not all([isinstance(k, util.string) and isinstance(v, util.string) for k, v in arg.items()]):
            raise TypeError('CustomSelectors keys and values must be Unicode strings')
        elif not is_dict and not all([isinstance(k, util.string) and isinstance(v, util.string) for k, v in arg]):
            raise TypeError('CustomSelectors keys and values must be Unicode strings')

        super(CustomSelectors, self).__init__(*args, **kwargs)


class Selector(Immutable):
    """Selector."""

    __slots__ = (
        'tag', 'ids', 'classes', 'attributes', 'nth', 'selectors',
        'relation', 'rel_type', 'contains', 'lang', 'flags', '_hash'
    )

    def __init__(
        self, tag, ids, classes, attributes, nth, selectors,
        relation, rel_type, contains, lang, flags
    ):
        """Initialize."""

        super(Selector, self).__init__(
            tag=tag,
            ids=ids,
            classes=classes,
            attributes=attributes,
            nth=nth,
            selectors=selectors,
            relation=relation,
            rel_type=rel_type,
            contains=contains,
            lang=lang,
            flags=flags
        )


class SelectorNull(Immutable):
    """Null Selector."""

    def __init__(self):
        """Initialize."""

        super(SelectorNull, self).__init__()


class SelectorTag(Immutable):
    """Selector tag."""

    __slots__ = ("name", "prefix", "_hash")

    def __init__(self, name, prefix):
        """Initialize."""

        super(SelectorTag, self).__init__(
            name=name,
            prefix=prefix
        )


class SelectorAttribute(Immutable):
    """Selector attribute rule."""

    __slots__ = ("attribute", "prefix", "pattern", "xml_type_pattern", "_hash")

    def __init__(self, attribute, prefix, pattern, xml_type_pattern):
        """Initialize."""

        super(SelectorAttribute, self).__init__(
            attribute=attribute,
            prefix=prefix,
            pattern=pattern,
            xml_type_pattern=xml_type_pattern
        )


class SelectorContains(Immutable):
    """Selector contains rule."""

    __slots__ = ("text", "_hash")

    def __init__(self, text):
        """Initialize."""

        super(SelectorContains, self).__init__(
            text=text
        )


class SelectorNth(Immutable):
    """Selector nth type."""

    __slots__ = ("a", "n", "b", "of_type", "last", "selectors", "_hash")

    def __init__(self, a, n, b, of_type, last, selectors):
        """Initialize."""

        super(SelectorNth, self).__init__(
            a=a,
            n=n,
            b=b,
            of_type=of_type,
            last=last,
            selectors=selectors
        )


class SelectorLang(Immutable):
    """Selector language rules."""

    __slots__ = ("languages", "_hash",)

    def __init__(self, languages):
        """Initialize."""

        super(SelectorLang, self).__init__(
            languages=tuple(languages)
        )

    def __iter__(self):
        """Iterator."""

        return iter(self.languages)

    def __len__(self):  # pragma: no cover
        """Length."""

        return len(self.languages)

    def __getitem__(self, index):  # pragma: no cover
        """Get item."""

        return self.languages[index]


class SelectorList(Immutable):
    """Selector list."""

    __slots__ = ("selectors", "is_not", "is_html", "_hash")

    def __init__(self, selectors=tuple(), is_not=False, is_html=False):
        """Initialize."""

        super(SelectorList, self).__init__(
            selectors=tuple(selectors),
            is_not=is_not,
            is_html=is_html
        )

    def __iter__(self):
        """Iterator."""

        return iter(self.selectors)

    def __len__(self):
        """Length."""

        return len(self.selectors)

    def __getitem__(self, index):
        """Get item."""

        return self.selectors[index]


def _pickle(p):
    return p.__base__(), tuple([getattr(p, s) for s in p.__slots__[:-1]])


def pickle_register(obj):
    """Allow object to be pickled."""

    util.copyreg.pickle(obj, _pickle)


pickle_register(Selector)
pickle_register(SelectorNull)
pickle_register(SelectorTag)
pickle_register(SelectorAttribute)
pickle_register(SelectorContains)
pickle_register(SelectorNth)
pickle_register(SelectorLang)
pickle_register(SelectorList)

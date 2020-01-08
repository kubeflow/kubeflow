"""Utility."""
from __future__ import unicode_literals
from functools import wraps
import warnings
import sys
import struct
import os
import re
MODULE = os.path.dirname(__file__)

PY3 = sys.version_info >= (3, 0)
PY35 = sys.version_info >= (3, 5)
PY37 = sys.version_info >= (3, 7)

if PY3:
    from functools import lru_cache  # noqa F401
    import copyreg  # noqa F401
    from collections.abc import Hashable, Mapping  # noqa F401

    ustr = str
    bstr = bytes
    unichar = chr
    string = str
else:
    from backports.functools_lru_cache import lru_cache  # noqa F401
    import copy_reg as copyreg  # noqa F401
    from collections import Hashable, Mapping  # noqa F401

    ustr = unicode  # noqa: F821
    bstr = str
    unichar = unichr  # noqa: F821
    string = basestring  # noqa: F821

DEBUG = 0x00001

RE_PATTERN_LINE_SPLIT = re.compile(r'(?:\r\n|(?!\r\n)[\n\r])|$')

LC_A = ord('a')
LC_Z = ord('z')
UC_A = ord('A')
UC_Z = ord('Z')


def lower(string):
    """Lower."""

    new_string = []
    for c in string:
        o = ord(c)
        new_string.append(chr(o + 32) if UC_A <= o <= UC_Z else c)
    return ''.join(new_string)


def upper(string):  # pragma: no cover
    """Lower."""

    new_string = []
    for c in string:
        o = ord(c)
        new_string.append(chr(o - 32) if LC_A <= o <= LC_Z else c)
    return ''.join(new_string)


def uchr(i):
    """Allow getting Unicode character on narrow python builds."""

    try:
        return unichar(i)
    except ValueError:  # pragma: no cover
        return struct.pack('i', i).decode('utf-32')


def uord(c):
    """Get Unicode ordinal."""

    if len(c) == 2:  # pragma: no cover
        high, low = [ord(p) for p in c]
        ordinal = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000
    else:
        ordinal = ord(c)

    return ordinal


class SelectorSyntaxError(SyntaxError):
    """Syntax error in a CSS selector."""

    def __init__(self, msg, pattern=None, index=None):
        """Initialize."""

        self.line = None
        self.col = None
        self.context = None

        if pattern is not None and index is not None:
            # Format pattern to show line and column position
            self.context, self.line, self.col = get_pattern_context(pattern, index)
            msg = '{}\n  line {}:\n{}'.format(msg, self.line, self.context)

        super(SelectorSyntaxError, self).__init__(msg)


def deprecated(message, stacklevel=2):  # pragma: no cover
    """
    Raise a `DeprecationWarning` when wrapped function/method is called.

    Borrowed from https://stackoverflow.com/a/48632082/866026
    """

    def _decorator(func):
        @wraps(func)
        def _func(*args, **kwargs):
            warnings.warn(
                "'{}' is deprecated. {}".format(func.__name__, message),
                category=DeprecationWarning,
                stacklevel=stacklevel
            )
            return func(*args, **kwargs)
        return _func
    return _decorator


def warn_deprecated(message, stacklevel=2):  # pragma: no cover
    """Warn deprecated."""

    warnings.warn(
        message,
        category=DeprecationWarning,
        stacklevel=stacklevel
    )


def get_pattern_context(pattern, index):
    """Get the pattern context."""

    last = 0
    current_line = 1
    col = 1
    text = []
    line = 1

    # Split pattern by newline and handle the text before the newline
    for m in RE_PATTERN_LINE_SPLIT.finditer(pattern):
        linetext = pattern[last:m.start(0)]
        if not len(m.group(0)) and not len(text):
            indent = ''
            offset = -1
            col = index - last + 1
        elif last <= index < m.end(0):
            indent = '--> '
            offset = (-1 if index > m.start(0) else 0) + 3
            col = index - last + 1
        else:
            indent = '    '
            offset = None
        if len(text):
            # Regardless of whether we are presented with `\r\n`, `\r`, or `\n`,
            # we will render the output with just `\n`. We will still log the column
            # correctly though.
            text.append('\n')
        text.append('{}{}'.format(indent, linetext))
        if offset is not None:
            text.append('\n')
            text.append(' ' * (col + offset) + '^')
            line = current_line

        current_line += 1
        last = m.end(0)

    return ''.join(text), line, col

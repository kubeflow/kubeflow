"""
Soup Sieve.

A CSS selector filter for BeautifulSoup4.

MIT License

Copyright (c) 2018 Isaac Muse

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
from __future__ import unicode_literals
from .__meta__ import __version__, __version_info__  # noqa: F401
from . import css_parser as cp
from . import css_match as cm
from . import css_types as ct
from .util import DEBUG, deprecated, SelectorSyntaxError  # noqa: F401

__all__ = (
    'DEBUG', 'SelectorSyntaxError', 'SoupSieve',
    'closest', 'comments', 'compile', 'filter', 'icomments',
    'iselect', 'match', 'select', 'select_one'
)

SoupSieve = cm.SoupSieve


def compile(pattern, namespaces=None, flags=0, **kwargs):  # noqa: A001
    """Compile CSS pattern."""

    if namespaces is not None:
        namespaces = ct.Namespaces(**namespaces)

    custom = kwargs.get('custom')
    if custom is not None:
        custom = ct.CustomSelectors(**custom)

    if isinstance(pattern, SoupSieve):
        if flags:
            raise ValueError("Cannot process 'flags' argument on a compiled selector list")
        elif namespaces is not None:
            raise ValueError("Cannot process 'namespaces' argument on a compiled selector list")
        elif custom is not None:
            raise ValueError("Cannot process 'custom' argument on a compiled selector list")
        return pattern

    return cp._cached_css_compile(pattern, namespaces, custom, flags)


def purge():
    """Purge cached patterns."""

    cp._purge_cache()


def closest(select, tag, namespaces=None, flags=0, **kwargs):
    """Match closest ancestor."""

    return compile(select, namespaces, flags, **kwargs).closest(tag)


def match(select, tag, namespaces=None, flags=0, **kwargs):
    """Match node."""

    return compile(select, namespaces, flags, **kwargs).match(tag)


def filter(select, iterable, namespaces=None, flags=0, **kwargs):  # noqa: A001
    """Filter list of nodes."""

    return compile(select, namespaces, flags, **kwargs).filter(iterable)


@deprecated("'comments' is not related to CSS selectors and will be removed in the future.")
def comments(tag, limit=0, flags=0, **kwargs):
    """Get comments only."""

    return [comment for comment in cm.CommentsMatch(tag).get_comments(limit)]


@deprecated("'icomments' is not related to CSS selectors and will be removed in the future.")
def icomments(tag, limit=0, flags=0, **kwargs):
    """Iterate comments only."""

    for comment in cm.CommentsMatch(tag).get_comments(limit):
        yield comment


def select_one(select, tag, namespaces=None, flags=0, **kwargs):
    """Select a single tag."""

    return compile(select, namespaces, flags, **kwargs).select_one(tag)


def select(select, tag, namespaces=None, limit=0, flags=0, **kwargs):
    """Select the specified tags."""

    return compile(select, namespaces, flags, **kwargs).select(tag, limit)


def iselect(select, tag, namespaces=None, limit=0, flags=0, **kwargs):
    """Iterate the specified tags."""

    for el in compile(select, namespaces, flags, **kwargs).iselect(tag, limit):
        yield el


def escape(ident):
    """Escape identifier."""

    return cp.escape(ident)

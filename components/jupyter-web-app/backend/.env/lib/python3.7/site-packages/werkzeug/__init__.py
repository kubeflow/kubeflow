"""
werkzeug
~~~~~~~~

Werkzeug is the Swiss Army knife of Python web development.

It provides useful classes and functions for any WSGI application to
make the life of a Python web developer much easier. All of the provided
classes are independent from each other so you can mix it with any other
library.

:copyright: 2007 Pallets
:license: BSD-3-Clause
"""
from types import ModuleType

__version__ = "0.16.0"

__all__ = ["run_simple", "Client", "Request", "Response", "__version__"]


class _DeprecatedImportModule(ModuleType):
    """Wrap a module in order to raise """

    def __init__(self, name, available, removed_in):
        import sys

        super(_DeprecatedImportModule, self).__init__(name)  # noqa F821
        self._real_module = sys.modules[name]  # noqa F821
        sys.modules[name] = self
        self._removed_in = removed_in
        self._origin = {item: mod for mod, items in available.items() for item in items}
        mod_all = getattr(self._real_module, "__all__", dir(self._real_module))
        self.__all__ = sorted(mod_all + list(self._origin))

    def __getattr__(self, item):
        # Don't export internal variables.
        if item in {"_real_module", "_origin", "_removed_in"}:
            raise AttributeError(item)

        if item in self._origin:
            from importlib import import_module

            origin = self._origin[item]

            if origin == ".":
                # No warning for the "submodule as attribute" case, it's way too messy
                # and unreliable to try to distinguish 'from werkzueug import
                # exceptions' and 'import werkzeug; werkzeug.exceptions'.
                value = import_module(origin + item, self.__name__)
            else:
                from warnings import warn

                # Import the module, get the attribute, and show a warning about where
                # to correctly import it from.
                mod = import_module(origin, self.__name__.rsplit(".")[0])
                value = getattr(mod, item)
                warn(
                    "The import '{name}.{item}' is deprecated and will be removed in"
                    " {removed_in}. Use 'from {name}{origin} import {item}'"
                    " instead.".format(
                        name=self.__name__,
                        item=item,
                        removed_in=self._removed_in,
                        origin=origin,
                    ),
                    DeprecationWarning,
                    stacklevel=2,
                )
        else:
            value = getattr(self._real_module, item)

        # Cache the value so it won't go through this process on subsequent accesses.
        setattr(self, item, value)
        return value

    def __dir__(self):
        return sorted(dir(self._real_module) + list(self._origin))


del ModuleType

_DeprecatedImportModule(
    __name__,
    {
        ".": ["exceptions", "routing"],
        "._internal": ["_easteregg"],
        ".datastructures": [
            "Accept",
            "Authorization",
            "CallbackDict",
            "CharsetAccept",
            "CombinedMultiDict",
            "EnvironHeaders",
            "ETags",
            "FileMultiDict",
            "FileStorage",
            "Headers",
            "HeaderSet",
            "ImmutableDict",
            "ImmutableList",
            "ImmutableMultiDict",
            "ImmutableOrderedMultiDict",
            "ImmutableTypeConversionDict",
            "LanguageAccept",
            "MIMEAccept",
            "MultiDict",
            "OrderedMultiDict",
            "RequestCacheControl",
            "ResponseCacheControl",
            "TypeConversionDict",
            "WWWAuthenticate",
        ],
        ".debug": ["DebuggedApplication"],
        ".exceptions": ["abort", "Aborter"],
        ".formparser": ["parse_form_data"],
        ".http": [
            "cookie_date",
            "dump_cookie",
            "dump_header",
            "dump_options_header",
            "generate_etag",
            "http_date",
            "HTTP_STATUS_CODES",
            "is_entity_header",
            "is_hop_by_hop_header",
            "is_resource_modified",
            "parse_accept_header",
            "parse_authorization_header",
            "parse_cache_control_header",
            "parse_cookie",
            "parse_date",
            "parse_dict_header",
            "parse_etags",
            "parse_list_header",
            "parse_options_header",
            "parse_set_header",
            "parse_www_authenticate_header",
            "quote_etag",
            "quote_header_value",
            "remove_entity_headers",
            "remove_hop_by_hop_headers",
            "unquote_etag",
            "unquote_header_value",
        ],
        ".local": [
            "Local",
            "LocalManager",
            "LocalProxy",
            "LocalStack",
            "release_local",
        ],
        ".middleware.dispatcher": ["DispatcherMiddleware"],
        ".middleware.shared_data": ["SharedDataMiddleware"],
        ".security": ["check_password_hash", "generate_password_hash"],
        ".test": ["create_environ", "EnvironBuilder", "run_wsgi_app"],
        ".testapp": ["test_app"],
        ".urls": [
            "Href",
            "iri_to_uri",
            "uri_to_iri",
            "url_decode",
            "url_encode",
            "url_fix",
            "url_quote",
            "url_quote_plus",
            "url_unquote",
            "url_unquote_plus",
        ],
        ".useragents": ["UserAgent"],
        ".utils": [
            "append_slash_redirect",
            "ArgumentValidationError",
            "bind_arguments",
            "cached_property",
            "environ_property",
            "escape",
            "find_modules",
            "format_string",
            "header_property",
            "html",
            "HTMLBuilder",
            "import_string",
            "redirect",
            "secure_filename",
            "unescape",
            "validate_arguments",
            "xhtml",
        ],
        ".wrappers.accept": ["AcceptMixin"],
        ".wrappers.auth": ["AuthorizationMixin", "WWWAuthenticateMixin"],
        ".wrappers.base_request": ["BaseRequest"],
        ".wrappers.base_response": ["BaseResponse"],
        ".wrappers.common_descriptors": [
            "CommonRequestDescriptorsMixin",
            "CommonResponseDescriptorsMixin",
        ],
        ".wrappers.etag": ["ETagRequestMixin", "ETagResponseMixin"],
        ".wrappers.response": ["ResponseStreamMixin"],
        ".wrappers.user_agent": ["UserAgentMixin"],
        ".wsgi": [
            "ClosingIterator",
            "extract_path_info",
            "FileWrapper",
            "get_current_url",
            "get_host",
            "LimitedStream",
            "make_line_iter",
            "peek_path_info",
            "pop_path_info",
            "responder",
            "wrap_file",
        ],
    },
    "Werkzeug 1.0",
)

from .serving import run_simple
from .test import Client
from .wrappers import Request
from .wrappers import Response

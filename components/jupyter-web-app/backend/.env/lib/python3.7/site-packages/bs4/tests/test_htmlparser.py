"""Tests to ensure that the html.parser tree builder generates good
trees."""

from pdb import set_trace
import pickle
from bs4.testing import SoupTest, HTMLTreeBuilderSmokeTest
from bs4.builder import HTMLParserTreeBuilder
from bs4.builder._htmlparser import BeautifulSoupHTMLParser

class HTMLParserTreeBuilderSmokeTest(SoupTest, HTMLTreeBuilderSmokeTest):

    default_builder = HTMLParserTreeBuilder

    def test_namespaced_system_doctype(self):
        # html.parser can't handle namespaced doctypes, so skip this one.
        pass

    def test_namespaced_public_doctype(self):
        # html.parser can't handle namespaced doctypes, so skip this one.
        pass

    def test_builder_is_pickled(self):
        """Unlike most tree builders, HTMLParserTreeBuilder and will
        be restored after pickling.
        """
        tree = self.soup("<a><b>foo</a>")
        dumped = pickle.dumps(tree, 2)
        loaded = pickle.loads(dumped)
        self.assertTrue(isinstance(loaded.builder, type(tree.builder)))

    def test_redundant_empty_element_closing_tags(self):
        self.assertSoupEquals('<br></br><br></br><br></br>', "<br/><br/><br/>")
        self.assertSoupEquals('</br></br></br>', "")

    def test_empty_element(self):
        # This verifies that any buffered data present when the parser
        # finishes working is handled.
        self.assertSoupEquals("foo &# bar", "foo &amp;# bar")

    def test_tracking_line_numbers(self):
        # The html.parser TreeBuilder keeps track of line number and
        # position of each element.
        markup = "\n   <p>\n\n<sourceline>\n<b>text</b></sourceline><sourcepos></p>"
        soup = self.soup(markup)
        self.assertEqual(2, soup.p.sourceline)
        self.assertEqual(3, soup.p.sourcepos)
        self.assertEqual("sourceline", soup.p.find('sourceline').name)

        # You can deactivate this behavior.
        soup = self.soup(markup, store_line_numbers=False)
        self.assertEqual("sourceline", soup.p.sourceline.name)
        self.assertEqual("sourcepos", soup.p.sourcepos.name)

        
class TestHTMLParserSubclass(SoupTest):
    def test_error(self):
        """Verify that our HTMLParser subclass implements error() in a way
        that doesn't cause a crash.
        """
        parser = BeautifulSoupHTMLParser()
        parser.error("don't crash")

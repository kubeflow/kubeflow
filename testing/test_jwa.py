import datetime
import logging
import os
from time import sleep
from urllib import parse

from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import pytest
from seleniumwire import webdriver

from . import auth

KUBEFLOW_URL = os.environ.get("KUBEFLOW_URL", "http://localhost:8081")
KF_NAMESPACE = os.environ.get("KF_NAMESPACE", "kimwnasptd")
AUTH_METHOD = os.environ.get("AUTH_METHOD", "dex")  # dex, iap

STATE_READY = "READY"
STATE_WAITING = "WAITING"
STATE_WARNING = "WARNING"
STATE_ERROR = "ERROR"

logging.basicConfig(
    level=logging.INFO,
    format=("%(levelname)s | %(lineno)d | E2E TEST | %(message)s"),
)


def login_to_kubeflow(driver):
    if AUTH_METHOD == "dex":
        username = os.environ.get("DEX_USERNAME", "kimwnasptd@kubeflow.org")
        password = os.environ.get("DEX_PASSWORD", "asdf")
        auth.login_to_kubeflow_dex(driver, KUBEFLOW_URL, username, password)
    elif AUTH_METHOD == "iap":
        auth.login_to_kubeflow_iap(driver, KUBEFLOW_URL)
    else:
        logging.warning("No authentication method for: '{AUTH_METHOD}'")


@pytest.fixture(scope="class")
def tests_setup(request):
    """
    Create a driver to use for all the test cases. Also handle to login to
    kubeflow
    """
    logging.info("Initializing the Selenium Driver")
    driver = webdriver.Firefox()
    driver.maximize_window()

    # use the same driver for all the test cases
    request.cls.driver = driver

    login_to_kubeflow(driver)

    # Run the test cases
    yield driver
    # After all the test cases where run

    logging.info("Closing the Selenium Driver")
    driver.close()


def create_selector_query(selectors_list):
    """
    Get a list of selectors and append them to a whole one liner that will get
    the element by combining the querySelector function with the provided
    selectors

    If the value `shadowRoot` is given, then the shadow-root element will be
    used in the query
    """
    query = "return document"
    for selector in selectors_list:
        if selector == "shadowRoot":
            query += ".shadowRoot"
            continue

        query += f".querySelector('{selector}')"

    return query


# Return the Status depending on the material icon
def icon_to_status(icon_text):
    if icon_text == "check_circle":
        return STATE_READY

    if icon_text == "clear":
        return STATE_ERROR

    if icon_text == "warning":
        return STATE_WARNING

    raise ValueError(f"Got unexpected state icon '{icon_text}'")


# --- Page Classes
class CentralDashboard:
    driver = None
    jwa = None

    iframe_selector = [
        "main-page",
        "shadowRoot",
        "app-drawer-layout",
        "app-header-layout",
        "main",
        "neon-animated-pages",
        'neon-animatable[page="iframe"]',
        "iframe-container",
        "shadowRoot",
        "#iframe",
    ]

    namespace_button_selector = [
        "main-page",
        "shadowRoot",
        "app-drawer-layout",
        "app-header-layout",
        "app-header",
        "app-toolbar",
        "namespace-selector",
        "shadowRoot",
        "paper-menu-button",
        'paper-button[id="dropdown-trigger"]',
    ]

    namespaces_list_selector = [
        "main-page",
        "shadowRoot",
        "app-drawer-layout",
        "app-header-layout",
        "app-header",
        "app-toolbar",
        "namespace-selector",
        "shadowRoot",
        "paper-menu-button",
        "paper-listbox",
    ]

    def __init__(self, driver):
        self.driver = driver
        self.jwa = JWA(self)

    def switch_selenium_context(self):
        self.driver.switch_to.default_content()

    def navigate_to_home(self):
        logging.info("Navigating to CentralDashboard")
        self.driver.get(parse.urljoin(KUBEFLOW_URL, "/"))

    def get_iframe(self):
        self.switch_selenium_context()
        iframe_script = create_selector_query(self.iframe_selector)
        return self.driver.execute_script(iframe_script)

    def select_namespace(self, namespace):
        logging.info(f"Switching to namespace '{namespace}'")

        # Open the namespace select
        ns_btn = self.driver.execute_script(
            create_selector_query(self.namespace_button_selector)
        )
        ns_btn.click()

        # Choose the namespace
        ns_list = self.driver.execute_script(
            create_selector_query(self.namespaces_list_selector)
        )

        namespaces = ns_list.find_elements_by_tag_name("paper-item")
        for ns in namespaces:
            if ns.text == namespace:
                self.driver.execute_script("arguments[0].click()", ns)
                logging.info(f"Switched to {namespace}")
                return

        logging.error(f"Couldn't locate namespace '{namespace}'")
        assert False


class NotebookRow:
    STATUS_COL = 0
    NAME_COL = 1
    IMAGE_COL = 2

    def __init__(self, row):
        self.row = row
        self.tds = row.find_elements_by_tag_name("td")

    def get_status(self):
        """
        Return a STATE_ value depending on the html element for the status
        """
        status_elem = self.tds[self.STATUS_COL]
        status_icon = status_elem.find_element_by_tag("mat-icon")
        if status_icon is None:
            # Check for spinner
            if status_elem.find_element_by_tag("mat-spinner") is None:
                raise ValueError("Status should be a spinner")

            return STATE_WAITING

        return icon_to_status(status_icon)

    def get_name(self):
        """
        Return the name of the Notebook from the corresponding td
        """
        return self.tds[self.NAME_COL].text

    def get_image(self):
        """
        Return the image of the Notebook from the corresponding td
        """
        return self.tds[self.IMAGE_COL].text


class JWAIndexPage:
    nb_table_selector = [
        "app-root",
        "app-main-table-router",
        "app-main-table",
        "div",
        "app-resource-table",
    ]

    def __init__(self, driver):
        self.driver = driver

    def navigate(self):
        logging.info("Navigating to JWA's index page")
        self.driver.get(parse.urljoin(KUBEFLOW_URL, "/_/jupyter/"))

    def appeared(self):
        try:
            WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located(
                    (By.TAG_NAME, "app-resource-table")
                )
            )

            return True
        except TimeoutException:
            logging.warning("Couldn't locate the Notebooks Table")
            return False

        return False

    def get_notebook_rows(self):
        table = self.driver.execute_script(
            create_selector_query(
                self.nb_table_selector + ["div", "table", "tbody"]
            )
        )

        trs = table.find_elements_by_tag_name("tr")
        return [NotebookRow(tr) for tr in trs]

    def wait_for_notebook_state(self, notebook, state, max_waiting_seconds=3):
        """
        Wait until the requested notebook becomes the specified state in the
        index page. If the Notebook doesn't yet appear, the function will retry
        to find it.
        """
        end_time = datetime.datetime.now() + datetime.timedelta(
            seconds=max_waiting_seconds
        )
        while datetime.datetime.now() < end_time:
            notebook_rows = self.get_notebook_rows()
            for nb in notebook_rows:
                name = nb.get_name()
                if name != notebook:
                    continue

                logging.info(f"Located Notebook {name} in the table")
                if nb.get_status() != state:
                    continue

                logging.info(f"Notebook '{name}' is in state {state}")
                return True

            sleep(1)

        logging.warning(f"Notebook '{notebook}' isn't in state {state}")
        return False


class JWAFormPage:
    def __init__(self, driver):
        self.driver = driver

    def navigate(self):
        logging.info("Navigating to JWA's form page")
        self.driver.get(parse.urljoin(KUBEFLOW_URL, "/_/jupyter/new"))

    def appeared(self):
        try:
            WebDriverWait(self.driver, 3).until(
                EC.presence_of_element_located((By.TAG_NAME, "form"))
            )

            return True
        except TimeoutException:
            logging.warning("Couldn't locate the form")
            return False

        return False


class JWA:
    driver = None
    dashboard = None
    iframe = None

    index_page = None
    form_page = None

    snack_bar_selector = [
        ".cdk-overlay-container",
        "div",
        "div",
        "snack-bar-container",
        "app-snack-bar",
        "div",
    ]

    def __init__(self, dashboard):
        self.driver = dashboard.driver
        self.iframe = dashboard.get_iframe()
        self.dashboard = dashboard
        self.driver.switch_to.frame(self.iframe)

        self.index_page = JWAIndexPage(self.driver)
        self.form_page = JWAFormPage(self.driver)

    def switch_selenium_context(self):
        self.iframe = self.dashboard.get_iframe()
        self.driver.switch_to.frame(self.iframe)

    def wait_for_snack_bar(self, max_wait_seconds=3):
        """
        Check if the snack bar shows up with the specific status.

        Returns: snack_status: string, snack_log: string
        """
        try:
            WebDriverWait(self.driver, max_wait_seconds).until(
                EC.presence_of_element_located((By.TAG_NAME, "app-snack-bar"))
            )

            popup_icon = self.driver.execute_script(
                create_selector_query(self.snack_bar_selector + ["mat-icon"])
            ).text

            popup_text = self.driver.execute_script(
                create_selector_query(self.snack_bar_selector + ["span"])
            ).text

            status = icon_to_status(popup_icon)
            logging.info(f"Located snackbar with status '{status}'")
            return status, popup_text
        except TimeoutException:
            logging.warning("Timeout reached waiting for snackbar to appear")
            return "", ""

        logging.warning("Couldn't locate the snackbar")
        return "", ""


# --- Test Classes ---
class TestJWA:
    def test_jwa_index_loaded_without_errors(self, tests_setup):
        """
        Ensure that the UI is loaded AND no pop-up error has appeared
        """
        dashboard = CentralDashboard(self.driver)
        jwa = dashboard.jwa
        jwa.index_page.navigate()

        dashboard.switch_selenium_context()
        dashboard.select_namespace(KF_NAMESPACE)

        # Test if the index page has loaded
        jwa.switch_selenium_context()
        assert jwa.index_page.appeared()
        logging.info("JWA's index page successfully rendered")

        # Test if an error appeared as a snackbar
        snack_type, snack_log = jwa.wait_for_snack_bar()
        if snack_type == STATE_ERROR or snack_type == STATE_WARNING:
            logging.error(f"An error occured on index page: '{snack_log}'")
            assert False

        logging.info("JWA's index page loaded without errors")

    def test_jwa_form_loaded_without_errors(self, tests_setup):
        """
        Ensure that the New Notebook Form is loaded without error popups
        """
        dashboard = CentralDashboard(self.driver)
        jwa = dashboard.jwa
        jwa.form_page.navigate()

        dashboard.switch_selenium_context()
        dashboard.select_namespace(KF_NAMESPACE)

        # Test if the index page has loaded
        jwa.form_page.navigate()
        jwa.switch_selenium_context()
        assert jwa.form_page.appeared()
        logging.info("JWA's form page successfully rendered")

        # Test if an error appeared as a snackbar
        snack_type, snack_log = jwa.wait_for_snack_bar(5)
        if snack_type == STATE_ERROR or snack_type == STATE_WARNING:
            logging.error(f"An error occured on form page: '{snack_log}'")
            assert False

        logging.info("JWA's form page loaded without errors")

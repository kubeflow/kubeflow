import logging

from . import gcp_util as gcp

logging.basicConfig(
    level=logging.INFO,
    format=("%(levelname)s | %(lineno)d | AUTH | %(message)s"),
)


def login_to_kubeflow_iap(driver, kubeflow_url):
    """
    This function logs in to the kubeflow cluster via IAP
    """
    service_account_credentials = gcp.get_service_account_credentials(
        "CLIENT_ID"
    )
    google_open_id_connect_token = gcp.get_google_open_id_connect_token(
        service_account_credentials
    )

    driver.header_overrides = {
        "Authorization": "Bearer {}".format(google_open_id_connect_token)
    }

    driver.get(kubeflow_url)


def login_to_kubeflow_dex(driver, kubeflow_url, username, password):
    """
    This function logs in to the kubeflow cluster via DEX
    """
    driver.get(kubeflow_url)
    username_input = driver.find_element_by_id("login")
    password_input = driver.find_element_by_id("password")
    login_button = driver.find_element_by_id("submit-login")

    username_input.send_keys(username)
    password_input.send_keys(password)
    login_button.click()

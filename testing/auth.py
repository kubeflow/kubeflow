import logging

logging.basicConfig(
    level=logging.INFO, format=("%(levelname)s|%(lineno)d| %(message)s"),
)


def login_to_kubeflow_iap(driver):
    """
    This function logs in to the kubeflow cluster via IAP
    """
    pass


def login_to_kubeflow_dex(driver, username, password):
    """
    This function logs in to the kubeflow cluster via DEX
    """
    username_input = driver.find_element_by_id("login")
    password_input = driver.find_element_by_id("password")
    login_button = driver.find_element_by_id("submit-login")

    username_input.send_keys(username)
    password_input.send_keys(password)
    login_button.click()

export declare enum AuthErrorStrings {
    DEFAULT_MSG = "Authentication Error",
    EMPTY_EMAIL = "Email cannot be empty",
    EMPTY_PHONE = "Phone number cannot be empty",
    EMPTY_USERNAME = "Username cannot be empty",
    INVALID_USERNAME = "The username should either be a string or one of the sign in types",
    EMPTY_PASSWORD = "Password cannot be empty",
    EMPTY_CODE = "Confirmation code cannot be empty",
    SIGN_UP_ERROR = "Error creating account",
    NO_MFA = "No valid MFA method provided",
    INVALID_MFA = "Invalid MFA type",
    EMPTY_CHALLENGE = "Challenge response cannot be empty",
    NO_USER_SESSION = "Failed to get the session because the user is empty",
    NETWORK_ERROR = "Network Error",
    DEVICE_CONFIG = "Device tracking has not been configured in this User Pool"
}

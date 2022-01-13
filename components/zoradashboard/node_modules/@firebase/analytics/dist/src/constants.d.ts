/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export declare const GA_FID_KEY = "firebase_id";
export declare const ORIGIN_KEY = "origin";
export declare const FETCH_TIMEOUT_MILLIS: number;
export declare const DYNAMIC_CONFIG_URL = "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig";
export declare const GTAG_URL = "https://www.googletagmanager.com/gtag/js";
export declare enum GtagCommand {
    EVENT = "event",
    SET = "set",
    CONFIG = "config"
}
/**
 * Officially recommended event names for gtag.js
 * Any other string is also allowed.
 *
 * @public
 */
export declare enum EventName {
    ADD_SHIPPING_INFO = "add_shipping_info",
    ADD_PAYMENT_INFO = "add_payment_info",
    ADD_TO_CART = "add_to_cart",
    ADD_TO_WISHLIST = "add_to_wishlist",
    BEGIN_CHECKOUT = "begin_checkout",
    /**
     * @deprecated
     * This event name is deprecated and is unsupported in updated
     * Enhanced Ecommerce reports.
     */
    CHECKOUT_PROGRESS = "checkout_progress",
    EXCEPTION = "exception",
    GENERATE_LEAD = "generate_lead",
    LOGIN = "login",
    PAGE_VIEW = "page_view",
    PURCHASE = "purchase",
    REFUND = "refund",
    REMOVE_FROM_CART = "remove_from_cart",
    SCREEN_VIEW = "screen_view",
    SEARCH = "search",
    SELECT_CONTENT = "select_content",
    SELECT_ITEM = "select_item",
    SELECT_PROMOTION = "select_promotion",
    /** @deprecated */
    SET_CHECKOUT_OPTION = "set_checkout_option",
    SHARE = "share",
    SIGN_UP = "sign_up",
    TIMING_COMPLETE = "timing_complete",
    VIEW_CART = "view_cart",
    VIEW_ITEM = "view_item",
    VIEW_ITEM_LIST = "view_item_list",
    VIEW_PROMOTION = "view_promotion",
    VIEW_SEARCH_RESULTS = "view_search_results"
}

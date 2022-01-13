(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@aws-amplify/core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_xr", ["@aws-amplify/core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_xr"] = factory(require("@aws-amplify/core"));
	else
		root["aws_amplify_xr"] = factory(root["@aws-amplify/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib-esm/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib-esm/Errors.js":
/*!***************************!*\
  !*** ./lib-esm/Errors.js ***!
  \***************************/
/*! exports provided: XRError, XRNoSceneConfiguredError, XRSceneNotFoundError, XRSceneNotLoadedError, XRNoDomElement, XRSceneLoadFailure, XRProviderNotConfigured */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRError", function() { return XRError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRNoSceneConfiguredError", function() { return XRNoSceneConfiguredError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRSceneNotFoundError", function() { return XRSceneNotFoundError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRSceneNotLoadedError", function() { return XRSceneNotLoadedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRNoDomElement", function() { return XRNoDomElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRSceneLoadFailure", function() { return XRSceneLoadFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRProviderNotConfigured", function() { return XRProviderNotConfigured; });
/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var XRError = function (_super) {
  __extends(XRError, _super);

  function XRError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRError;
}(Error);



var XRNoSceneConfiguredError = function (_super) {
  __extends(XRNoSceneConfiguredError, _super);

  function XRNoSceneConfiguredError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRNoSceneConfiguredError;
}(XRError);



var XRSceneNotFoundError = function (_super) {
  __extends(XRSceneNotFoundError, _super);

  function XRSceneNotFoundError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRSceneNotFoundError;
}(XRError);



var XRSceneNotLoadedError = function (_super) {
  __extends(XRSceneNotLoadedError, _super);

  function XRSceneNotLoadedError() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRSceneNotLoadedError;
}(XRError);



var XRNoDomElement = function (_super) {
  __extends(XRNoDomElement, _super);

  function XRNoDomElement() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRNoDomElement;
}(XRError);



var XRSceneLoadFailure = function (_super) {
  __extends(XRSceneLoadFailure, _super);

  function XRSceneLoadFailure() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRSceneLoadFailure;
}(XRError);



var XRProviderNotConfigured = function (_super) {
  __extends(XRProviderNotConfigured, _super);

  function XRProviderNotConfigured() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return XRProviderNotConfigured;
}(XRError);



/***/ }),

/***/ "./lib-esm/Providers/SumerianProvider.js":
/*!***********************************************!*\
  !*** ./lib-esm/Providers/SumerianProvider.js ***!
  \***********************************************/
/*! exports provided: SumerianProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SumerianProvider", function() { return SumerianProvider; });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _XRProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./XRProvider */ "./lib-esm/Providers/XRProvider.js");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Errors */ "./lib-esm/Errors.js");
var __extends = undefined && undefined.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __values = undefined && undefined.__values || function (o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */





var SUMERIAN_SERVICE_NAME = 'sumerian';
var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["ConsoleLogger"]('SumerianProvider');

var SumerianProvider = function (_super) {
  __extends(SumerianProvider, _super);

  function SumerianProvider(options) {
    if (options === void 0) {
      options = {};
    }

    return _super.call(this, options) || this;
  }

  SumerianProvider.prototype.getProviderName = function () {
    return 'SumerianProvider';
  };

  SumerianProvider.prototype.loadScript = function (url) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , new Promise(function (resolve, reject) {
          var scriptElement = document.createElement('script');
          scriptElement.src = url;
          scriptElement.addEventListener('load', function (event) {
            resolve();
          });
          scriptElement.addEventListener('error', function (event) {
            reject(new Error("Failed to load script: " + url));
          });
          document.head.appendChild(scriptElement);
        })];
      });
    });
  };

  SumerianProvider.prototype.loadScene = function (sceneName, domElementId, sceneOptions) {
    return __awaiter(this, void 0, void 0, function () {
      var errorMsg, errorMsg, element, errorMsg, scene, errorMsg, sceneUrl, sceneId, sceneRegion, errorMsg, awsSDKConfigOverride, fetchOptions, url, credentials, accessInfo, serviceInfo, request, e_1, apiResponse, apiResponseJson, sceneBundleData, sceneBundle, sceneBundleJson, error_1, progressCallback, publishParamOverrides, sceneLoadParams, sceneController, _a, _b, warning;

      var e_2, _c;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!sceneName) {
              errorMsg = 'No scene name passed into loadScene';
              logger.error(errorMsg);
              throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"](errorMsg);
            }

            if (!domElementId) {
              errorMsg = 'No dom element id passed into loadScene';
              logger.error(errorMsg);
              throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoDomElement"](errorMsg);
            }

            element = document.getElementById(domElementId);

            if (!element) {
              errorMsg = "DOM element id, " + domElementId + " not found";
              logger.error(errorMsg);
              throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoDomElement"](errorMsg);
            }

            scene = this.getScene(sceneName);

            if (!scene.sceneConfig) {
              errorMsg = "No scene config configured for scene: " + sceneName;
              logger.error(errorMsg);
              throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"](errorMsg);
            }

            sceneUrl = scene.sceneConfig.url;
            sceneId = scene.sceneConfig.sceneId;

            if (scene.sceneConfig.hasOwnProperty('region')) {
              // Use the scene region on the Sumerian scene configuration
              sceneRegion = scene.sceneConfig.region;
            } else if (this.options.hasOwnProperty('region')) {
              // Use the scene region on the XR category configuration
              sceneRegion = this.options.region;
            } else {
              errorMsg = "No region configured for scene: " + sceneName;
              logger.error(errorMsg);
              throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"](errorMsg);
            }

            awsSDKConfigOverride = {
              region: sceneRegion,
              // This is passed to the AWS clients created in
              // Sumerian's AwsSystem
              // This helps other services(like Lex and Polly) to track
              // traffic coming from Sumerian scenes embedded with Amplify
              customUserAgent: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Constants"].userAgent + "-SumerianScene"
            };
            fetchOptions = {
              headers: {
                // This sets the AWS user agent string
                // So the Sumerian service knows this request is
                // from Amplify
                'X-Amz-User-Agent': _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Constants"].userAgent
              }
            };
            url = sceneUrl;
            _d.label = 1;

          case 1:
            _d.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Credentials"].get()];

          case 2:
            credentials = _d.sent();
            awsSDKConfigOverride['credentials'] = credentials;
            accessInfo = {
              secret_key: credentials.secretAccessKey,
              access_key: credentials.accessKeyId,
              session_token: credentials.sessionToken
            };
            serviceInfo = {
              region: sceneRegion,
              service: SUMERIAN_SERVICE_NAME
            };
            request = _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Signer"].sign({
              method: 'GET',
              url: sceneUrl
            }, accessInfo, serviceInfo);
            fetchOptions.headers = __assign(__assign({}, fetchOptions.headers), request.headers);
            url = request.url;
            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _d.sent();
            logger.debug('No credentials available, the request will be unsigned');
            return [3
            /*break*/
            , 4];

          case 4:
            return [4
            /*yield*/
            , fetch(url, fetchOptions)];

          case 5:
            apiResponse = _d.sent();
            return [4
            /*yield*/
            , apiResponse.json()];

          case 6:
            apiResponseJson = _d.sent();

            if (apiResponse.status === 403) {
              if (apiResponseJson.message) {
                logger.error("Failure to authenticate user: " + apiResponseJson.message);
                throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"]("Failure to authenticate user: " + apiResponseJson.message);
              } else {
                logger.error("Failure to authenticate user");
                throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"]("Failure to authenticate user");
              }
            }

            sceneBundleData = apiResponseJson.bundleData[sceneId];
            return [4
            /*yield*/
            , fetch(sceneBundleData.url, {
              headers: sceneBundleData.headers
            })];

          case 7:
            sceneBundle = _d.sent();
            return [4
            /*yield*/
            , sceneBundle.json()];

          case 8:
            sceneBundleJson = _d.sent();
            _d.label = 9;

          case 9:
            _d.trys.push([9, 11,, 12]); // Load the Sumerian bootstrapper script into the DOM


            return [4
            /*yield*/
            , this.loadScript(sceneBundleJson[sceneId].bootstrapperUrl)];

          case 10:
            // Load the Sumerian bootstrapper script into the DOM
            _d.sent();

            return [3
            /*break*/
            , 12];

          case 11:
            error_1 = _d.sent();
            logger.error(error_1);
            throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"](error_1);

          case 12:
            progressCallback = sceneOptions.progressCallback ? sceneOptions.progressCallback : undefined;
            publishParamOverrides = scene.publishParamOverrides ? scene.publishParamOverrides : undefined;
            sceneLoadParams = {
              element: element,
              sceneId: sceneId,
              sceneBundle: sceneBundleJson,
              apiResponse: apiResponseJson,
              progressCallback: progressCallback,
              publishParamOverrides: publishParamOverrides,
              awsSDKConfigOverride: awsSDKConfigOverride
            };
            return [4
            /*yield*/
            , window.SumerianBootstrapper.loadScene(sceneLoadParams)];

          case 13:
            sceneController = _d.sent();
            scene.sceneController = sceneController;
            scene.isLoaded = true;

            try {
              // Log scene warnings
              for (_a = __values(sceneController.sceneLoadWarnings), _b = _a.next(); !_b.done; _b = _a.next()) {
                warning = _b.value;
                logger.warn("loadScene warning: " + warning);
              }
            } catch (e_2_1) {
              e_2 = {
                error: e_2_1
              };
            } finally {
              try {
                if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
              } finally {
                if (e_2) throw e_2.error;
              }
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  SumerianProvider.prototype.isSceneLoaded = function (sceneName) {
    var scene = this.getScene(sceneName);
    return scene.isLoaded || false;
  };

  SumerianProvider.prototype.getScene = function (sceneName) {
    if (!this.options.scenes) {
      var errorMsg = 'No scenes were defined in the configuration';
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoSceneConfiguredError"](errorMsg);
    }

    if (!sceneName) {
      var errorMsg = 'No scene name was passed';
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotFoundError"](errorMsg);
    }

    if (!this.options.scenes[sceneName]) {
      var errorMsg = "Scene '" + sceneName + "' is not configured";
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotFoundError"](errorMsg);
    }

    return this.options.scenes[sceneName];
  };

  SumerianProvider.prototype.getSceneController = function (sceneName) {
    if (!this.options.scenes) {
      var errorMsg = 'No scenes were defined in the configuration';
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoSceneConfiguredError"](errorMsg);
    }

    var scene = this.options.scenes[sceneName];

    if (!scene) {
      var errorMsg = "Scene '" + sceneName + "' is not configured";
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotFoundError"](errorMsg);
    }

    var sceneController = scene.sceneController;

    if (!sceneController) {
      var errorMsg = "Scene controller for '" + sceneName + "' has not been loaded";
      logger.error(errorMsg);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotLoadedError"](errorMsg);
    }

    return sceneController;
  };

  SumerianProvider.prototype.isVRCapable = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    return sceneController.vrCapable;
  };

  SumerianProvider.prototype.isVRPresentationActive = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    return sceneController.vrPresentationActive;
  };

  SumerianProvider.prototype.start = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.start();
  };

  SumerianProvider.prototype.enterVR = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.enterVR();
  };

  SumerianProvider.prototype.exitVR = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.exitVR();
  };

  SumerianProvider.prototype.isMuted = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    return sceneController.muted;
  };

  SumerianProvider.prototype.setMuted = function (sceneName, muted) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.muted = muted;
  };

  SumerianProvider.prototype.onSceneEvent = function (sceneName, eventName, eventHandler) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.on(eventName, eventHandler);
  };

  SumerianProvider.prototype.enableAudio = function (sceneName) {
    var sceneController = this.getSceneController(sceneName);
    sceneController.enableAudio();
  };

  return SumerianProvider;
}(_XRProvider__WEBPACK_IMPORTED_MODULE_1__["AbstractXRProvider"]);



/***/ }),

/***/ "./lib-esm/Providers/XRProvider.js":
/*!*****************************************!*\
  !*** ./lib-esm/Providers/XRProvider.js ***!
  \*****************************************/
/*! exports provided: AbstractXRProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractXRProvider", function() { return AbstractXRProvider; });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};


var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["ConsoleLogger"]('AbstractXRProvider');

var AbstractXRProvider = function () {
  function AbstractXRProvider(options) {
    if (options === void 0) {
      options = {};
    }

    this._config = options;
  }

  AbstractXRProvider.prototype.configure = function (config) {
    if (config === void 0) {
      config = {};
    }

    this._config = __assign(__assign({}, config), this._config);
    logger.debug("configure " + this.getProviderName(), this._config);
    return this.options;
  };

  AbstractXRProvider.prototype.getCategory = function () {
    return 'XR';
  };

  Object.defineProperty(AbstractXRProvider.prototype, "options", {
    get: function get() {
      return __assign({}, this._config);
    },
    enumerable: true,
    configurable: true
  });
  return AbstractXRProvider;
}();



/***/ }),

/***/ "./lib-esm/XR.js":
/*!***********************!*\
  !*** ./lib-esm/XR.js ***!
  \***********************/
/*! exports provided: XRClass, XR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XRClass", function() { return XRClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XR", function() { return XR; });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Providers_SumerianProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Providers/SumerianProvider */ "./lib-esm/Providers/SumerianProvider.js");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Errors */ "./lib-esm/Errors.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __read = undefined && undefined.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */





var logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["ConsoleLogger"]('XR');
var DEFAULT_PROVIDER_NAME = 'SumerianProvider';

var XRClass = function () {
  /**
   * Initialize XR with AWS configurations
   *
   * @param {XROptions} options - Configuration object for XR
   */
  function XRClass(options) {
    this._options = options;
    logger.debug('XR Options', this._options);
    this._defaultProvider = DEFAULT_PROVIDER_NAME;
    this._pluggables = {}; // Add default provider

    this.addPluggable(new _Providers_SumerianProvider__WEBPACK_IMPORTED_MODULE_1__["SumerianProvider"]());
  }
  /**
   * Configure XR part with configurations
   *
   * @param {XROptions} config - Configuration for XR
   * @return {Object} - The current configuration
   */


  XRClass.prototype.configure = function (options) {
    var _this = this;

    var opt = options ? options.XR || options : {};
    logger.debug('configure XR', {
      opt: opt
    });
    this._options = Object.assign({}, this._options, opt);
    Object.entries(this._pluggables).map(function (_a) {
      var _b = __read(_a, 2),
          name = _b[0],
          provider = _b[1];

      if (name === _this._defaultProvider && !opt[_this._defaultProvider]) {
        provider.configure(_this._options);
      } else {
        provider.configure(_this._options[name]);
      }
    });
    return this._options;
  };
  /**
   * add plugin into XR category
   * @param {Object} pluggable - an instance of the plugin
   */


  XRClass.prototype.addPluggable = function (pluggable) {
    return __awaiter(this, void 0, void 0, function () {
      var config;
      return __generator(this, function (_a) {
        if (pluggable && pluggable.getCategory() === 'XR') {
          this._pluggables[pluggable.getProviderName()] = pluggable;
          config = pluggable.configure(this._options);
          return [2
          /*return*/
          , config];
        }

        return [2
        /*return*/
        ];
      });
    });
  };

  XRClass.prototype.loadScene = function (sceneName, domElementId, sceneOptions, provider) {
    if (sceneOptions === void 0) {
      sceneOptions = {};
    }

    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
            return [4
            /*yield*/
            , this._pluggables[provider].loadScene(sceneName, domElementId, sceneOptions)];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  XRClass.prototype.isSceneLoaded = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].isSceneLoaded(sceneName);
  };

  XRClass.prototype.getSceneController = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].getSceneController(sceneName);
  };

  XRClass.prototype.isVRCapable = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].isVRCapable(sceneName);
  };

  XRClass.prototype.isVRPresentationActive = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].isVRPresentationActive(sceneName);
  };

  XRClass.prototype.start = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].start(sceneName);
  };

  XRClass.prototype.enterVR = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].enterVR(sceneName);
  };

  XRClass.prototype.exitVR = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].exitVR(sceneName);
  };

  XRClass.prototype.isMuted = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].isMuted(sceneName);
  };

  XRClass.prototype.setMuted = function (sceneName, muted, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].setMuted(sceneName, muted);
  };

  XRClass.prototype.onSceneEvent = function (sceneName, eventName, eventHandler, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].onSceneEvent(sceneName, eventName, eventHandler);
  };

  XRClass.prototype.enableAudio = function (sceneName, provider) {
    if (provider === void 0) {
      provider = this._defaultProvider;
    }

    if (!this._pluggables[provider]) throw new _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]("Provider '" + provider + "' not configured");
    return this._pluggables[provider].enableAudio(sceneName);
  };

  return XRClass;
}();


var XR = new XRClass(null);
_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__["Amplify"].register(XR);

/***/ }),

/***/ "./lib-esm/index.js":
/*!**************************!*\
  !*** ./lib-esm/index.js ***!
  \**************************/
/*! exports provided: XR, default, SumerianProvider, XRError, XRNoSceneConfiguredError, XRSceneNotFoundError, XRSceneNotLoadedError, XRNoDomElement, XRSceneLoadFailure, XRProviderNotConfigured */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _XR__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./XR */ "./lib-esm/XR.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XR", function() { return _XR__WEBPACK_IMPORTED_MODULE_0__["XR"]; });

/* harmony import */ var _Providers_SumerianProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Providers/SumerianProvider */ "./lib-esm/Providers/SumerianProvider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SumerianProvider", function() { return _Providers_SumerianProvider__WEBPACK_IMPORTED_MODULE_1__["SumerianProvider"]; });

/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Errors */ "./lib-esm/Errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRNoSceneConfiguredError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoSceneConfiguredError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRSceneNotFoundError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotFoundError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRSceneNotLoadedError", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneNotLoadedError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRNoDomElement", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRNoDomElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRSceneLoadFailure", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRSceneLoadFailure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "XRProviderNotConfigured", function() { return _Errors__WEBPACK_IMPORTED_MODULE_2__["XRProviderNotConfigured"]; });

/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */


/**
 * @deprecated use named import
 */

/* harmony default export */ __webpack_exports__["default"] = (_XR__WEBPACK_IMPORTED_MODULE_0__["XR"]);



/***/ }),

/***/ "@aws-amplify/core":
/*!************************************!*\
  !*** external "@aws-amplify/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ })

/******/ });
});
//# sourceMappingURL=aws-amplify-xr.js.map
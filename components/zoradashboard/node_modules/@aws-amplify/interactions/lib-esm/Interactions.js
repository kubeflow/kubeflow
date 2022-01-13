var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';
import { AWSLexProvider } from './Providers';
var logger = new Logger('Interactions');
var InteractionsClass = /** @class */ (function () {
    /**
     * Initialize PubSub with AWS configurations
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     */
    function InteractionsClass(options) {
        this._options = options;
        logger.debug('Interactions Options', this._options);
        this._pluggables = {};
    }
    InteractionsClass.prototype.getModuleName = function () {
        return 'Interactions';
    };
    /**
     *
     * @param {InteractionsOptions} options - Configuration object for Interactions
     * @return {Object} - The current configuration
     */
    InteractionsClass.prototype.configure = function (options) {
        var _this = this;
        var opt = options ? options.Interactions || options : {};
        logger.debug('configure Interactions', { opt: opt });
        this._options = __assign(__assign({ bots: {} }, opt), opt.Interactions);
        var aws_bots_config = this._options.aws_bots_config;
        var bots_config = this._options.bots;
        if (!Object.keys(bots_config).length && aws_bots_config) {
            // Convert aws_bots_config to bots object
            if (Array.isArray(aws_bots_config)) {
                aws_bots_config.forEach(function (bot) {
                    _this._options.bots[bot.name] = bot;
                });
            }
        }
        // Check if AWSLex provider is already on pluggables
        if (!this._pluggables.AWSLexProvider &&
            bots_config &&
            Object.keys(bots_config)
                .map(function (key) { return bots_config[key]; })
                .find(function (bot) { return !bot.providerName || bot.providerName === 'AWSLexProvider'; })) {
            this._pluggables.AWSLexProvider = new AWSLexProvider();
        }
        Object.keys(this._pluggables).map(function (key) {
            _this._pluggables[key].configure(_this._options.bots);
        });
        return this._options;
    };
    InteractionsClass.prototype.addPluggable = function (pluggable) {
        if (pluggable && pluggable.getCategory() === 'Interactions') {
            if (!this._pluggables[pluggable.getProviderName()]) {
                pluggable.configure(this._options.bots);
                this._pluggables[pluggable.getProviderName()] = pluggable;
                return;
            }
            else {
                throw new Error('Bot ' + pluggable.getProviderName() + ' already plugged');
            }
        }
    };
    InteractionsClass.prototype.send = function (botname, message) {
        return __awaiter(this, void 0, void 0, function () {
            var botProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._options.bots || !this._options.bots[botname]) {
                            throw new Error('Bot ' + botname + ' does not exist');
                        }
                        botProvider = this._options.bots[botname].providerName || 'AWSLexProvider';
                        if (!this._pluggables[botProvider]) {
                            throw new Error('Bot ' +
                                botProvider +
                                ' does not have valid pluggin did you try addPluggable first?');
                        }
                        return [4 /*yield*/, this._pluggables[botProvider].sendMessage(botname, message)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    InteractionsClass.prototype.onComplete = function (botname, callback) {
        if (!this._options.bots || !this._options.bots[botname]) {
            throw new Error('Bot ' + botname + ' does not exist');
        }
        var botProvider = this._options.bots[botname].providerName || 'AWSLexProvider';
        if (!this._pluggables[botProvider]) {
            throw new Error('Bot ' +
                botProvider +
                ' does not have valid pluggin did you try addPluggable first?');
        }
        this._pluggables[botProvider].onComplete(botname, callback);
    };
    return InteractionsClass;
}());
export { InteractionsClass };
export var Interactions = new InteractionsClass(null);
Amplify.register(Interactions);
//# sourceMappingURL=Interactions.js.map
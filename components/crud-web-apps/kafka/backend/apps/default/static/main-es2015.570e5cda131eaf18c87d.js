(self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || []).push([["main"],{

/***/ 8255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ (function(module) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 8255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": function() { return /* binding */ AppRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _pages_index_index_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/index/index.component */ 7479);
/* harmony import */ var _pages_form_form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/form/form.component */ 5804);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);





const routes = [
    { path: '', component: _pages_index_index_component__WEBPACK_IMPORTED_MODULE_0__.IndexComponent },
    { path: 'new', component: _pages_form_form_component__WEBPACK_IMPORTED_MODULE_1__.FormComponent },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": function() { return /* binding */ AppComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 9895);


class AppComponent {
    constructor() {
        this.title = 'frontend';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": function() { return /* binding */ AppModule; }
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _pages_index_index_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/index/index.module */ 1023);
/* harmony import */ var _pages_form_form_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/form/form.module */ 9552);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 1841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);









class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
            _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_8__.KubeflowModule,
            _pages_index_index_module__WEBPACK_IMPORTED_MODULE_2__.IndexModule,
            _pages_form_form_module__WEBPACK_IMPORTED_MODULE_3__.FormModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent], imports: [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule,
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_8__.KubeflowModule,
        _pages_index_index_module__WEBPACK_IMPORTED_MODULE_2__.IndexModule,
        _pages_form_form_module__WEBPACK_IMPORTED_MODULE_3__.FormModule] }); })();


/***/ }),

/***/ 5905:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-advanced-options/form-advanced-options.component.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormAdvancedOptionsComponent": function() { return /* binding */ FormAdvancedOptionsComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/slide-toggle */ 5396);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);




class FormAdvancedOptionsComponent {
    constructor() { }
    ngOnInit() { }
}
FormAdvancedOptionsComponent.ɵfac = function FormAdvancedOptionsComponent_Factory(t) { return new (t || FormAdvancedOptionsComponent)(); };
FormAdvancedOptionsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormAdvancedOptionsComponent, selectors: [["app-form-advanced-options"]], inputs: { parentForm: "parentForm" }, decls: 3, vars: 1, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3590993217621889922$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_1 = goog.getMsg("Miscellaneous Settings");
        i18n_0 = MSG_EXTERNAL_3590993217621889922$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟ac184ad5119488375c501e04e46b79dbb6079cc7␟3590993217621889922:Miscellaneous Settings`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2083240096863134960$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_3 = goog.getMsg("Other possible settings to be applied to the Notebook Server.");
        i18n_2 = MSG_EXTERNAL_2083240096863134960$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟aa98eb3757f779bf6bce68192b5c93831570c9ea␟2083240096863134960:Other possible settings to be applied to the Notebook Server.`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4678403269921893493$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_5 = goog.getMsg(" Enable Shared Memory ");
        i18n_4 = MSG_EXTERNAL_4678403269921893493$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_ADVANCED_OPTIONS_FORM_ADVANCED_OPTIONS_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟4f9350429574d4118ef3709016039f34a0785466␟4678403269921893493: Enable Shared Memory `;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:cogs"], [3, "formControl"], i18n_4]; }, template: function FormAdvancedOptionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-slide-toggle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](2, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.parentForm.get("shm"));
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_1__.FormSectionComponent, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_2__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective], styles: ["mat-slide-toggle[_ngcontent-%COMP%] {\n  margin-bottom: 0.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tYWR2YW5jZWQtb3B0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0YiLCJmaWxlIjoiZm9ybS1hZHZhbmNlZC1vcHRpb25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LXNsaWRlLXRvZ2dsZSB7XG4gIG1hcmdpbi1ib3R0b206IDAuNnJlbTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 6440:
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-affinity-tolerations/form-affinity-tolerations.component.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormAffinityTolerationsComponent": function() { return /* binding */ FormAffinityTolerationsComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8583);







function FormAffinityTolerationsComponent_mat_option_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const affinityConfig_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", affinityConfig_r2.configKey);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", affinityConfig_r2.displayName, " ");
} }
function FormAffinityTolerationsComponent_mat_option_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tolerationGroup_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", tolerationGroup_r3.groupKey);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", tolerationGroup_r3.displayName, " ");
} }
class FormAffinityTolerationsComponent {
    constructor() { }
    ngOnInit() { }
}
FormAffinityTolerationsComponent.ɵfac = function FormAffinityTolerationsComponent_Factory(t) { return new (t || FormAffinityTolerationsComponent)(); };
FormAffinityTolerationsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormAffinityTolerationsComponent, selectors: [["app-form-affinity-tolerations"]], inputs: { parentForm: "parentForm", tolerationGroups: "tolerationGroups", affinityConfigs: "affinityConfigs" }, decls: 16, vars: 4, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8653055932362710932$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_1 = goog.getMsg("Affinity / Tolerations");
        i18n_0 = MSG_EXTERNAL_8653055932362710932$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟e0a31a4739749d022f9c0265ef0db1779daf3bad␟8653055932362710932:Affinity / Tolerations`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_7337798300900345155$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_3 = goog.getMsg("Configure the Notebook's Affinity and Tolerations.");
        i18n_2 = MSG_EXTERNAL_7337798300900345155$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟d3f8def051f09bcd2b129a7cd61bb993fe206bce␟7337798300900345155:Configure the Notebook's Affinity and Tolerations.`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6515390795205468481$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_5 = goog.getMsg(" Affinity Config ");
        i18n_4 = MSG_EXTERNAL_6515390795205468481$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟633ab3500af3e54a7519377f4b6e5bc100737123␟6515390795205468481: Affinity Config `;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc option None
         */
        const MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_7 = goog.getMsg("None");
        i18n_6 = MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:option None␟a2f14a73f7a6e94479f67423cc51102da8d6f524␟6252070156626006029:None`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_1171476011848522716$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_9 = goog.getMsg(" Tolerations Group ");
        i18n_8 = MSG_EXTERNAL_1171476011848522716$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:␟26316693d7df543784a554fb79d00771f79a2865␟1171476011848522716: Tolerations Group `;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc option None
         */
        const MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_11 = goog.getMsg("None");
        i18n_10 = MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_AFFINITY_TOLERATIONS_FORM_AFFINITY_TOLERATIONS_COMPONENT_TS_11;
    }
    else {
        i18n_10 = $localize `:option None␟a2f14a73f7a6e94479f67423cc51102da8d6f524␟6252070156626006029:None`;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:bullseye"], [1, "row"], ["appearance", "outline", 1, "wide", "column"], i18n_4, [3, "formControl"], ["value", ""], i18n_6, [3, "value", 4, "ngFor", "ngForOf"], i18n_8, i18n_10, [3, "value"]]; }, template: function FormAffinityTolerationsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](4, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](7, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, FormAffinityTolerationsComponent_mat_option_8_Template, 2, 2, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](11, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](14, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, FormAffinityTolerationsComponent_mat_option_15_Template, 2, 2, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.parentForm.get("affinityConfig"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.affinityConfigs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.parentForm.get("tolerationGroup"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tolerationGroups);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_1__.FormSectionComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_2__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_3__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlDirective, _angular_material_core__WEBPACK_IMPORTED_MODULE_5__.MatOption, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLWFmZmluaXR5LXRvbGVyYXRpb25zLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 4999:
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-configurations/form-configurations.component.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormConfigurationsComponent": function() { return /* binding */ FormConfigurationsComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 7817);









function FormConfigurationsComponent_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const config_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", config_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", config_r1.desc, " ");
} }
class FormConfigurationsComponent {
    constructor(ns, backend) {
        this.ns = ns;
        this.backend = backend;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
    }
    ngOnInit() {
        // Keep track of the selected namespace
        const nsSub = this.ns.getSelectedNamespace().subscribe(namespace => {
            // Get the PodDefaults of the new Namespace
            this.backend.getPodDefaults(namespace).subscribe(pds => {
                this.podDefaults = pds;
            });
        });
        this.subscriptions.add(nsSub);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
FormConfigurationsComponent.ɵfac = function FormConfigurationsComponent_Factory(t) { return new (t || FormConfigurationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__.JWABackendService)); };
FormConfigurationsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormConfigurationsComponent, selectors: [["app-form-configurations"]], inputs: { parentForm: "parentForm" }, decls: 6, vars: 2, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_9147549536677777412$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_1 = goog.getMsg("Configurations");
        i18n_0 = MSG_EXTERNAL_9147549536677777412$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟edd04e579025543c017d80558217d1e2788708df␟9147549536677777412:Configurations`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_7834035184707254021$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_3 = goog.getMsg("Extra layers of configurations that will be applied to the new Notebook. \n        (e.g. Insert credentials as Secrets, set Environment Variables.)");
        i18n_2 = MSG_EXTERNAL_7834035184707254021$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟63220bf4b545f3ca1f7b5215f1953b95dc3645e0␟7834035184707254021:Extra layers of configurations that will be applied to the new Notebook. 
        (e.g. Insert credentials as Secrets, set Environment Variables.)`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5115994784318532749$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_5 = goog.getMsg(" Configurations ");
        i18n_4 = MSG_EXTERNAL_5115994784318532749$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CONFIGURATIONS_FORM_CONFIGURATIONS_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟a76f7ebd6eb4f4afd7109e574dc617f858cd2d80␟5115994784318532749: Configurations `;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:sliders-h"], ["appearance", "outline", 1, "wide"], i18n_4, ["multiple", "", 3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]]; }, template: function FormConfigurationsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](3, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FormConfigurationsComponent_mat_option_5_Template, 2, 2, "mat-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("configurations"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.podDefaults);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_3__.FormSectionComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_5__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatOption], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLWNvbmZpZ3VyYXRpb25zLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 9492:
/*!********************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-cpu-ram/form-cpu-ram.component.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormCpuRamComponent": function() { return /* binding */ FormCpuRamComponent; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 3261);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ 3166);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);






class FormCpuRamComponent {
    constructor() { }
    ngOnInit() {
        this.parentForm.get('cpu').valueChanges.subscribe(val => {
            // set cpu limit when value of the cpu request changes
            if (this.parentForm.get('cpuLimit').dirty) {
                return;
            }
            const cpu = this.parentForm.get('cpu').value;
            this.parentForm
                .get('cpuLimit')
                .setValue((0,_utils__WEBPACK_IMPORTED_MODULE_0__.calculateLimits)(cpu, this.cpuLimitFactor));
        });
        this.parentForm.get('memory').valueChanges.subscribe(val => {
            // set memory limit when value of the memory request changes
            if (this.parentForm.get('memoryLimit').dirty) {
                return;
            }
            const memory = this.parentForm.get('memory').value;
            this.parentForm
                .get('memoryLimit')
                .setValue((0,_utils__WEBPACK_IMPORTED_MODULE_0__.calculateLimits)(memory, this.memoryLimitFactor));
        });
    }
    getCPUError() { }
    getRAMError() { }
}
FormCpuRamComponent.ɵfac = function FormCpuRamComponent_Factory(t) { return new (t || FormCpuRamComponent)(); };
FormCpuRamComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormCpuRamComponent, selectors: [["app-form-cpu-ram"]], inputs: { parentForm: "parentForm", readonlyCPU: "readonlyCPU", readonlyMemory: "readonlyMemory", cpuLimitFactor: "cpuLimitFactor", memoryLimitFactor: "memoryLimitFactor" }, decls: 16, vars: 4, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc Title for the CPU/RAM form section
         */
        const MSG_EXTERNAL_456502051508651798$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_1 = goog.getMsg("CPU / RAM");
        i18n_0 = MSG_EXTERNAL_456502051508651798$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:Title for the CPU/RAM form section␟f22f0cf2e9846ef910c72864e8d5b62b36b81c86␟456502051508651798:CPU / RAM`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc Text for the CPU/RAM form section
         */
        const MSG_EXTERNAL_3253449456938659379$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_3 = goog.getMsg("Specify the total amount of CPU and RAM reserved by your Notebook Server.\n         For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).");
        i18n_2 = MSG_EXTERNAL_3253449456938659379$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:Text for the CPU/RAM form section␟6af244dea6f7d8f929b45cd8226522d0e35d7110␟3253449456938659379:Specify the total amount of CPU and RAM reserved by your Notebook Server.
         For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4944039245822888012$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_5 = goog.getMsg("Requested CPUs");
        i18n_4 = MSG_EXTERNAL_4944039245822888012$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟01817bd08ce56cd2966da83498f862a5c3984cc8␟4944039245822888012:Requested CPUs`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6062130950224244266$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_7 = goog.getMsg("Requested memory in Gi");
        i18n_6 = MSG_EXTERNAL_6062130950224244266$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:␟c35a751936ff43637e90b7a97c69939364e32a2f␟6062130950224244266:Requested memory in Gi`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_1642621628416517504$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_9 = goog.getMsg("CPU limit");
        i18n_8 = MSG_EXTERNAL_1642621628416517504$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:␟b236d0d38ab7c46409b041002e008f28ade48e54␟1642621628416517504:CPU limit`;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5340799198017063091$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_11 = goog.getMsg(" Memory limit in Gi ");
        i18n_10 = MSG_EXTERNAL_5340799198017063091$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_CPU_RAM_FORM_CPU_RAM_COMPONENT_TS_11;
    }
    else {
        i18n_10 = $localize `:␟393e204f9358a7b2bb54c23a1dd6fda2d3a20fe0␟5340799198017063091: Memory limit in Gi `;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:microchip"], [1, "row"], ["min", "0.1", "step", "0.1", "label", i18n_4, 1, "column", 3, "sizeControl"], ["min", "0.1", "step", "0.1", "label", i18n_6, 1, "column", 3, "sizeControl"], [1, "column"], ["appearance", "outline", 1, "wide"], i18n_8, ["matInput", "", "type", "number", "min", "0.1", "step", "0.1", 3, "formControl"], i18n_10]; }, template: function FormCpuRamComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "lib-positive-number-input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "lib-positive-number-input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "lib-advanced-options");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](9, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](14, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("sizeControl", ctx.parentForm.get("cpu"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("sizeControl", ctx.parentForm.get("memory"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("cpuLimit"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("memoryLimit"));
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_2__.FormSectionComponent, kubeflow__WEBPACK_IMPORTED_MODULE_2__.PositiveNumberInputComponent, kubeflow__WEBPACK_IMPORTED_MODULE_2__.AdvancedOptionsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_4__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlDirective], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLWNwdS1yYW0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 5524:
/*!******************************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-data-volumes/form-data-volumes.component.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormDataVolumesComponent": function() { return /* binding */ FormDataVolumesComponent; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 3261);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 1095);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _volume_volume_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../volume/volume.component */ 4060);








function FormDataVolumesComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-volume", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FormDataVolumesComponent_div_5_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const i_r2 = restoredCtx.index; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r3.deleteVol(i_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vol_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("volume", vol_r1)("notebookName", ctx_r0.parentForm.get("name").value)("namespace", ctx_r0.parentForm.get("namespace").value)("pvcs", ctx_r0.pvcs)("ephemeral", false)("defaultStorageClass", ctx_r0.defaultStorageClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r0.readonly);
} }
class FormDataVolumesComponent {
    constructor() { }
    get datavols() {
        const vols = this.parentForm.get('datavols');
        return vols.controls;
    }
    ngOnInit() { }
    addVol() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addDataVolume)(this.parentForm);
    }
    deleteVol(idx) {
        const vols = this.parentForm.get('datavols');
        vols.removeAt(idx);
        this.parentForm.updateValueAndValidity();
    }
}
FormDataVolumesComponent.ɵfac = function FormDataVolumesComponent_Factory(t) { return new (t || FormDataVolumesComponent)(); };
FormDataVolumesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: FormDataVolumesComponent, selectors: [["app-form-data-volumes"]], inputs: { parentForm: "parentForm", readonly: "readonly", pvcs: "pvcs", defaultStorageClass: "defaultStorageClass" }, decls: 6, vars: 3, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc Add data volume button text
         */
        const MSG_EXTERNAL_931963400310375020$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DATA_VOLUMES_FORM_DATA_VOLUMES_COMPONENT_TS_1 = goog.getMsg("{$startTagMatIcon}add{$closeTagMatIcon} ADD VOLUME ", { "startTagMatIcon": "\uFFFD#4\uFFFD", "closeTagMatIcon": "\uFFFD/#4\uFFFD" });
        i18n_0 = MSG_EXTERNAL_931963400310375020$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DATA_VOLUMES_FORM_DATA_VOLUMES_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:Add data volume button text␟1d41bb5873bf9a2c9cfa0176d4637258953cad24␟931963400310375020:${"\uFFFD#4\uFFFD"}:START_TAG_MAT_ICON:add${"\uFFFD/#4\uFFFD"}:CLOSE_TAG_MAT_ICON: ADD VOLUME `;
    } return [["title", "Data Volumes", "text", "Configure the Volumes to be mounted as your Datasets.", "icon", "fa:fas:hdd"], [3, "formGroup"], ["mat-stroked-button", "", "color", "accent", "type", "button", 1, "add-data-vol-button", 3, "disabled", "click"], i18n_0, ["class", "volume-wrapper", 4, "ngFor", "ngForOf"], [1, "volume-wrapper"], [3, "volume", "notebookName", "namespace", "pvcs", "ephemeral", "defaultStorageClass"], [1, "del-btn"], ["mat-icon-button", "", "color", "warn", "type", "button", 3, "disabled", "click"]]; }, template: function FormDataVolumesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function FormDataVolumesComponent_Template_button_click_2_listener() { return ctx.addVol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵi18nStart"](3, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵi18nEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, FormDataVolumesComponent_div_5_Template, 6, 7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.parentForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.readonly);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.datavols);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_3__.FormSectionComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _volume_volume_component__WEBPACK_IMPORTED_MODULE_1__.VolumeComponent], styles: [".add-data-vol-button[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.volume-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.volume-wrapper[_ngcontent-%COMP%]    > app-volume[_ngcontent-%COMP%] {\n  flex: 1 1 0px;\n  min-width: 0;\n  min-width: initial;\n  max-width: 93%;\n}\n\n.volume-wrapper[_ngcontent-%COMP%]    > .del-btn[_ngcontent-%COMP%] {\n  flex: 1 1 0px;\n  margin-top: 0.8rem;\n  margin-left: 1.5rem;\n  width: 7%;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tZGF0YS12b2x1bWVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUFBLGtCQUFBO0VBQ0EsY0FBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFBRiIsImZpbGUiOiJmb3JtLWRhdGEtdm9sdW1lcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERhdGEgVm9sdW1lcyB3aXRoIHRoZSBEZWxldGUgYnV0dG9uXG4uYWRkLWRhdGEtdm9sLWJ1dHRvbiB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG59XG5cbi52b2x1bWUtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udm9sdW1lLXdyYXBwZXIgPiBhcHAtdm9sdW1lIHtcbiAgZmxleDogMSAxIDBweDtcbiAgbWluLXdpZHRoOiBpbml0aWFsO1xuICBtYXgtd2lkdGg6IDkzJTtcbn1cblxuLnZvbHVtZS13cmFwcGVyID4gLmRlbC1idG4ge1xuICBmbGV4OiAxIDEgMHB4O1xuICBtYXJnaW4tdG9wOiAwLjhyZW07XG4gIG1hcmdpbi1sZWZ0OiAxLjVyZW07XG4gIHdpZHRoOiA3JTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuIl19 */"] });


/***/ }),

/***/ 849:
/*!*******************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-default.component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormDefaultComponent": function() { return /* binding */ FormDefaultComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ 3261);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _form_name_form_name_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-name/form-name.component */ 4249);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 1095);









class FormDefaultComponent {
    constructor(namespaceService, backend, router, popup) {
        this.namespaceService = namespaceService;
        this.backend = backend;
        this.router = router;
        this.popup = popup;
        this.currNamespace = '';
        this.ephemeral = false;
        this.defaultStorageclass = false;
        this.blockSubmit = false;
        this.formReady = false;
        this.pvcs = [];
        this.existingNotebooks = new Set();
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
    }
    ngOnInit() {
        // Initialize the form control
        this.formCtrl = this.getFormDefaults();
        // Update the form Values from the default ones
        this.backend.getConfig().subscribe(config => {
            if (Object.keys(config).length === 0) {
                // Don't fire on empty config
                return;
            }
            this.config = config;
            this.initFormControls(this.formCtrl, config);
        });
        // Keep track of the selected namespace
        this.subscriptions.add(this.namespaceService.getSelectedNamespace().subscribe(namespace => {
            this.currNamespace = namespace;
            this.formCtrl.controls.namespace.setValue(this.currNamespace);
            // Get the PVCs of the new Namespace
            this.backend.getVolumes(namespace).subscribe(pvcs => {
                this.pvcs = pvcs;
            });
        }));
        // // Check if a default StorageClass is set
        // this.backend.getDefaultStorageClass().subscribe(defaultClass => {
        //   if (defaultClass.length === 0) {
        //     this.defaultStorageclass = false;
        //     this.popup.open(
        //       $localize`No default Storage Class is set. Can't create new Disks for the new Notebook. Please use an Existing Disk.`,
        //       SnackType.Warning,
        //       0,
        //     );
        //   } else {
        //     this.defaultStorageclass = true;
        //   }
        // });
    }
    ngOnDestroy() {
        // Unsubscriptions
        this.subscriptions.unsubscribe();
    }
    // Functions for handling the Form Group of the entire Form
    getFormDefaults() {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getFormDefaults)();
    }
    initFormControls(formCtrl, config) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.initFormControls)(formCtrl, config);
    }
    // Form Actions
    getSubmitNotebook() {
        const notebookCopy = this.formCtrl.value;
        const notebook = JSON.parse(JSON.stringify(notebookCopy));
        // // Use the custom image instead
        // if (notebook.customImageCheck) {
        //   notebook.image = notebook.customImage;
        // } else if (notebook.serverType === 'group-one') {
        //   // Set notebook image from imageGroupOne
        //   notebook.image = notebook.imageGroupOne;
        // } else if (notebook.serverType === 'group-two') {
        //   // Set notebook image from imageGroupTwo
        //   notebook.image = notebook.imageGroupTwo;
        // }
        // // Remove unnecessary images from the request sent to the backend
        // delete notebook.imageGroupOne;
        // delete notebook.imageGroupTwo;
        // // Ensure CPU input is a string
        // if (typeof notebook.cpu === 'number') {
        //   notebook.cpu = notebook.cpu.toString();
        // }
        // // Ensure GPU input is a string
        // if (typeof notebook.gpus.num === 'number') {
        //   notebook.gpus.num = notebook.gpus.num.toString();
        // }
        // // Remove cpuLimit from request if null
        // if (notebook.cpuLimit == null) {
        //   delete notebook.cpuLimit;
        //   // Ensure CPU Limit input is a string
        // } else if (typeof notebook.cpuLimit === 'number') {
        //   notebook.cpuLimit = notebook.cpuLimit.toString();
        // }
        // // Remove memoryLimit from request if null
        // if (notebook.memoryLimit == null) {
        //   delete notebook.memoryLimit;
        //   // Add Gi to memoryLimit
        // } else if (notebook.memoryLimit) {
        //   notebook.memoryLimit = notebook.memoryLimit.toString() + 'Gi';
        // }
        // // Add Gi to all sizes
        // if (notebook.memory) {
        //   notebook.memory = notebook.memory.toString() + 'Gi';
        // }
        // if (notebook.workspace.size) {
        //   notebook.workspace.size = notebook.workspace.size.toString() + 'Gi';
        // }
        // for (const vol of notebook.datavols) {
        //   if (vol.size) {
        //     vol.size = vol.size + 'Gi';
        //   }
        // }
        // console.log(notebook)
        return notebook;
    }
    onSubmit() {
        const notebook = this.getSubmitNotebook();
        // console.log(notebook)
        this.backend.createEphemeralKafka(notebook).subscribe(() => {
            this.popup.close();
            this.router.navigate(['/']);
        });
    }
    onCancel() {
        this.router.navigate(['/']);
    }
}
FormDefaultComponent.ɵfac = function FormDefaultComponent_Factory(t) { return new (t || FormDefaultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_5__.NamespaceService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_1__.JWABackendService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_5__.SnackBarService)); };
FormDefaultComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FormDefaultComponent, selectors: [["app-form-default"]], decls: 9, vars: 3, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6723260713871643987$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DEFAULT_COMPONENT_TS_1 = goog.getMsg(" CREATE ");
        i18n_0 = MSG_EXTERNAL_6723260713871643987$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DEFAULT_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟577ff450cd8d905a75bf92dad2457515d3a49b3b␟6723260713871643987: CREATE `;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4224268807144446140$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DEFAULT_COMPONENT_TS_3 = goog.getMsg(" CANCEL ");
        i18n_2 = MSG_EXTERNAL_4224268807144446140$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_DEFAULT_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟ae582a9312e4bcbb32a62d84e47e6b1b73ffd06a␟4224268807144446140: CANCEL `;
    } return [[1, "center-flex"], [1, "form-with-buttons"], [1, "form--card-container", "mat-elevation-z2"], ["novalidate", "", 3, "formGroup", "ngSubmit"], [3, "parentForm"], ["mat-raised-button", "", "color", "primary", 1, "form--button-margin", 3, "disabled", "click"], i18n_0, ["mat-raised-button", "", "type", "button", 3, "click"], i18n_2]; }, template: function FormDefaultComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function FormDefaultComponent_Template_form_ngSubmit_3_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "app-form-name-namespace", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FormDefaultComponent_Template_button_click_5_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](6, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FormDefaultComponent_Template_button_click_7_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](8, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.formCtrl.valid || ctx.blockSubmit);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _form_name_form_name_component__WEBPACK_IMPORTED_MODULE_2__.FormNameComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton], styles: [".form--card-container[_ngcontent-%COMP%] {\n  width: 900px;\n  padding: 16px;\n  border-radius: 5px;\n  background: white;\n  margin-bottom: 12px;\n}\n\n.form-with-buttons[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tZGVmYXVsdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0YiLCJmaWxlIjoiZm9ybS1kZWZhdWx0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tLWNhcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDkwMHB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uZm9ybS13aXRoLWJ1dHRvbnMge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuIl19 */"] });


/***/ }),

/***/ 5903:
/*!****************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-default.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormDefaultModule": function() { return /* binding */ FormDefaultModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/slide-toggle */ 5396);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button-toggle */ 2542);
/* harmony import */ var _form_default_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-default.component */ 849);
/* harmony import */ var _form_name_form_name_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-name/form-name.component */ 4249);
/* harmony import */ var _form_image_form_image_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-image/form-image.component */ 1330);
/* harmony import */ var _form_cpu_ram_form_cpu_ram_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form-cpu-ram/form-cpu-ram.component */ 9492);
/* harmony import */ var _form_gpus_form_gpus_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-gpus/form-gpus.component */ 184);
/* harmony import */ var _form_advanced_options_form_advanced_options_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form-advanced-options/form-advanced-options.component */ 5905);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _form_workspace_volume_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./form-workspace-volume/form-workspace-volume.component */ 4537);
/* harmony import */ var _volume_volume_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./volume/volume.component */ 4060);
/* harmony import */ var _form_data_volumes_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./form-data-volumes/form-data-volumes.component */ 5524);
/* harmony import */ var _form_configurations_form_configurations_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./form-configurations/form-configurations.component */ 4999);
/* harmony import */ var _form_affinity_tolerations_form_affinity_tolerations_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./form-affinity-tolerations/form-affinity-tolerations.component */ 6440);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 7716);


















class FormDefaultModule {
}
FormDefaultModule.ɵfac = function FormDefaultModule_Factory(t) { return new (t || FormDefaultModule)(); };
FormDefaultModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: FormDefaultModule });
FormDefaultModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_13__.FormModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule,
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__.MatSlideToggleModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule,
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_17__.MatButtonToggleModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](FormDefaultModule, { declarations: [_form_default_component__WEBPACK_IMPORTED_MODULE_0__.FormDefaultComponent,
        _form_name_form_name_component__WEBPACK_IMPORTED_MODULE_1__.FormNameComponent,
        _form_image_form_image_component__WEBPACK_IMPORTED_MODULE_2__.FormImageComponent,
        _form_cpu_ram_form_cpu_ram_component__WEBPACK_IMPORTED_MODULE_3__.FormCpuRamComponent,
        _form_workspace_volume_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_6__.FormWorkspaceVolumeComponent,
        _form_data_volumes_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_8__.FormDataVolumesComponent,
        _volume_volume_component__WEBPACK_IMPORTED_MODULE_7__.VolumeComponent,
        _form_gpus_form_gpus_component__WEBPACK_IMPORTED_MODULE_4__.FormGpusComponent,
        _form_advanced_options_form_advanced_options_component__WEBPACK_IMPORTED_MODULE_5__.FormAdvancedOptionsComponent,
        _form_configurations_form_configurations_component__WEBPACK_IMPORTED_MODULE_9__.FormConfigurationsComponent,
        _form_affinity_tolerations_form_affinity_tolerations_component__WEBPACK_IMPORTED_MODULE_10__.FormAffinityTolerationsComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.CommonModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_13__.FormModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__.MatCheckboxModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_15__.MatSlideToggleModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_17__.MatButtonToggleModule], exports: [_form_default_component__WEBPACK_IMPORTED_MODULE_0__.FormDefaultComponent,
        _form_name_form_name_component__WEBPACK_IMPORTED_MODULE_1__.FormNameComponent,
        _form_image_form_image_component__WEBPACK_IMPORTED_MODULE_2__.FormImageComponent,
        _form_cpu_ram_form_cpu_ram_component__WEBPACK_IMPORTED_MODULE_3__.FormCpuRamComponent,
        _form_workspace_volume_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_6__.FormWorkspaceVolumeComponent,
        _form_data_volumes_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_8__.FormDataVolumesComponent,
        _volume_volume_component__WEBPACK_IMPORTED_MODULE_7__.VolumeComponent,
        _form_gpus_form_gpus_component__WEBPACK_IMPORTED_MODULE_4__.FormGpusComponent,
        _form_advanced_options_form_advanced_options_component__WEBPACK_IMPORTED_MODULE_5__.FormAdvancedOptionsComponent,
        _form_configurations_form_configurations_component__WEBPACK_IMPORTED_MODULE_9__.FormConfigurationsComponent,
        _form_affinity_tolerations_form_affinity_tolerations_component__WEBPACK_IMPORTED_MODULE_10__.FormAffinityTolerationsComponent] }); })();


/***/ }),

/***/ 184:
/*!**************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-gpus/form-gpus.component.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormGpusComponent": function() { return /* binding */ FormGpusComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tooltip */ 1436);










function FormGpusComponent_mat_option_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", v_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", v_r2, " ");
} }
function FormGpusComponent_mat_option_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", v_r3.limitsKey)("matTooltip", ctx_r1.vendorTooltip(v_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", v_r3.uiName, " ");
} }
class FormGpusComponent {
    constructor(backend) {
        this.backend = backend;
        this.vendors = [];
        this.installedVendors = new Set();
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
        this.maxGPUs = 16;
        this.gpusCount = ['1', '2', '4', '8'];
    }
    ngOnInit() {
        this.gpuCtrl = this.parentForm.get('gpus');
        // Vendor should not be empty if the user selects GPUs num
        this.parentForm
            .get('gpus')
            .get('vendor')
            .setValidators([this.vendorWithNum()]);
        this.subscriptions.add(this.gpuCtrl.get('num').valueChanges.subscribe((n) => {
            if (n === 'none') {
                this.gpuCtrl.get('vendor').disable();
            }
            else {
                this.gpuCtrl.get('vendor').enable();
            }
        }));
        this.backend.getGPUVendors().subscribe(vendors => {
            this.installedVendors = new Set(vendors);
        });
    }
    // Vendor handling
    vendorTooltip(vendor) {
        return !this.installedVendors.has(vendor.limitsKey)
            ? $localize `There are currently no ${vendor.uiName} GPUs in you cluster.`
            : '';
    }
    // Custom Validation
    getVendorError() {
        const vendorCtrl = this.parentForm.get('gpus').get('vendor');
        if (vendorCtrl.hasError('vendorNullName')) {
            return $localize `You must also specify the GPU Vendor for the assigned GPUs`;
        }
    }
    vendorWithNum() {
        // Make sure that if the user has specified a number of GPUs
        // that they also specify the GPU vendor
        return (control) => {
            const num = this.parentForm.get('gpus').get('num').value;
            const vendor = this.parentForm.get('gpus').get('vendor').value;
            if (num !== 'none' && vendor === '') {
                return { vendorNullName: true };
            }
            else {
                return null;
            }
        };
    }
}
FormGpusComponent.ɵfac = function FormGpusComponent_Factory(t) { return new (t || FormGpusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__.JWABackendService)); };
FormGpusComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormGpusComponent, selectors: [["app-form-gpus"]], inputs: { parentForm: "parentForm", vendors: "vendors" }, decls: 16, vars: 4, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3840111939816305457$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_1 = goog.getMsg("GPUs");
        i18n_0 = MSG_EXTERNAL_3840111939816305457$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟126c1d5ce9129e10a0328764227f045806ab0e50␟3840111939816305457:GPUs`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5317450464826945402$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_3 = goog.getMsg("Specify the number and Vendor of GPUs that will be assigned to the \n        Notebook Server's Container.");
        i18n_2 = MSG_EXTERNAL_5317450464826945402$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟9e62d063b88fdd89761c29f791e7655ce93e0aef␟5317450464826945402:Specify the number and Vendor of GPUs that will be assigned to the 
        Notebook Server's Container.`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2175421158486456021$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_5 = goog.getMsg("Number of GPUs");
        i18n_4 = MSG_EXTERNAL_2175421158486456021$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟6bc1c2ef4d2045c6f6a152e10bb00365a381c804␟2175421158486456021:Number of GPUs`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc option None
         */
        const MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_7 = goog.getMsg("None");
        i18n_6 = MSG_EXTERNAL_6252070156626006029$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:option None␟a2f14a73f7a6e94479f67423cc51102da8d6f524␟6252070156626006029:None`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4636121350345035366$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_9 = goog.getMsg("GPU Vendor");
        i18n_8 = MSG_EXTERNAL_4636121350345035366$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_GPUS_FORM_GPUS_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:␟f49d3e9fe3286f0f5d07d5323db3cd6333331489␟4636121350345035366:GPU Vendor`;
    } return [["title", i18n_0, "text", i18n_2, "icon", "custom:gpuSectionIcon"], [1, "row", 3, "formGroup"], ["appearance", "outline", 1, "column"], i18n_4, ["matNativeControl", "", "formControlName", "num"], ["value", "none"], i18n_6, [3, "value", 4, "ngFor", "ngForOf"], i18n_8, ["matNativeControl", "", "formControlName", "vendor", "id", "gpu-vendor"], [3, "value", "matTooltip", 4, "ngFor", "ngForOf"], [3, "value"], [3, "value", "matTooltip"]]; }, template: function FormGpusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](4, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-option", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](7, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, FormGpusComponent_mat_option_8_Template, 2, 2, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-form-field", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](11, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-select", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, FormGpusComponent_mat_option_13_Template, 2, 3, "mat-option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.parentForm.get("gpus"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.gpusCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.vendors);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.getVendorError());
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_3__.FormSectionComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatError, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltip], styles: [".mat-slide-toggle[_ngcontent-%COMP%] {\n  margin-bottom: 0.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tZ3B1cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0YiLCJmaWxlIjoiZm9ybS1ncHVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1zbGlkZS10b2dnbGUge1xuICBtYXJnaW4tYm90dG9tOiAwLjZyZW07XG59XG4iXX0= */"] });


/***/ }),

/***/ 1330:
/*!****************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-image/form-image.component.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormImageComponent": function() { return /* binding */ FormImageComponent; }
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button-toggle */ 2542);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tooltip */ 1436);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 3166);
















function FormImageComponent_mat_checkbox_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-checkbox", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](1, 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r0.parentForm.get("customImageCheck"));
} }
function FormImageComponent_mat_form_field_10_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const img_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", img_r6)("matTooltip", img_r6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r5.imageDisplayName(img_r6), " ");
} }
function FormImageComponent_mat_form_field_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](2, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, FormImageComponent_mat_form_field_10_mat_option_4_Template, 2, 3, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](6, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r1.parentForm.get("image"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.images);
} }
function FormImageComponent_mat_form_field_11_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const img_r8 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", img_r8)("matTooltip", img_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r7.imageDisplayName(img_r8), " ");
} }
function FormImageComponent_mat_form_field_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](2, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, FormImageComponent_mat_form_field_11_mat_option_4_Template, 2, 3, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](6, 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r2.parentForm.get("imageGroupOne"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.imagesGroupOne);
} }
function FormImageComponent_mat_form_field_12_mat_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const img_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", img_r10)("matTooltip", img_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r9.imageDisplayName(img_r10), " ");
} }
function FormImageComponent_mat_form_field_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](2, 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-select", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, FormImageComponent_mat_form_field_12_mat_option_4_Template, 2, 3, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](6, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r3.parentForm.get("imageGroupTwo"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.imagesGroupTwo);
} }
function FormImageComponent_mat_form_field_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](2, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "input", 35, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](6, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r4.parentForm.get("customImage"));
} }
class FormImageComponent {
    constructor(iconRegistry, sanitizer) {
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
        iconRegistry.addSvgIcon('jupyterlab', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.jupyterlabLogo));
        iconRegistry.addSvgIcon('group-one', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.groupOneLogo));
        iconRegistry.addSvgIcon('group-two', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.groupTwoLogo));
    }
    ngOnInit() {
        this.subs.add(this.parentForm.get('customImageCheck').valueChanges.subscribe(check => {
            // Make sure that the use will insert and Image value
            if (check) {
                this.parentForm.get('customImage').setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required);
                this.parentForm.get('image').setValidators([]);
                this.parentForm.get('imageGroupOne').setValidators([]);
                this.parentForm.get('imageGroupTwo').setValidators([]);
            }
            this.parentForm.get('serverType').valueChanges.subscribe(selection => {
                if (selection === 'jupyter') {
                    this.parentForm.get('customImage').setValidators([]);
                    this.parentForm.get('image').setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required);
                    this.parentForm.get('imageGroupOne').setValidators([]);
                    this.parentForm.get('imageGroupTwo').setValidators([]);
                }
                else if (selection === 'group-one') {
                    this.parentForm.get('customImage').setValidators([]);
                    this.parentForm.get('image').setValidators([]);
                    this.parentForm
                        .get('imageGroupOne')
                        .setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required);
                    this.parentForm.get('imageGroupTwo').setValidators([]);
                }
                else if (selection === 'group-two') {
                    this.parentForm.get('customImage').setValidators([]);
                    this.parentForm.get('image').setValidators([]);
                    this.parentForm.get('imageGroupOne').setValidators([]);
                    this.parentForm
                        .get('imageGroupTwo')
                        .setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required);
                }
                this.parentForm.get('image').updateValueAndValidity();
                this.parentForm.get('imageGroupOne').updateValueAndValidity();
                this.parentForm.get('imageGroupTwo').updateValueAndValidity();
            });
            this.parentForm.get('customImage').updateValueAndValidity();
            this.parentForm.get('serverType').updateValueAndValidity();
        }));
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
    }
    imageDisplayName(image) {
        const [name, tag = null] = image.split(':');
        let tokens = name.split('/');
        if (this.hideRegistry && tokens.length > 1 && tokens[0].includes('.')) {
            tokens.shift();
        }
        let displayName = tokens.join('/');
        if (!this.hideTag && tag !== null) {
            displayName = `${displayName}:${tag}`;
        }
        return displayName;
    }
}
FormImageComponent.ɵfac = function FormImageComponent_Factory(t) { return new (t || FormImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer)); };
FormImageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormImageComponent, selectors: [["app-form-image"]], inputs: { parentForm: "parentForm", images: "images", imagesGroupOne: "imagesGroupOne", imagesGroupTwo: "imagesGroupTwo", allowCustomImage: "allowCustomImage", hideRegistry: "hideRegistry", hideTag: "hideTag" }, decls: 26, vars: 7, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc Title for the Image section of the form
         */
        const MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_1 = goog.getMsg("Image");
        i18n_0 = MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:Title for the Image section of the form␟a5f9ba9bb9faa8284bcadb1cdbc6aaf969e9c4bb␟3012906865384504293:Image`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc Text for the Image section of the form
         */
        const MSG_EXTERNAL_850361239280923184$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_3 = goog.getMsg("A starter Jupyter Docker Image with a baseline deployment and typical\n        ML packages");
        i18n_2 = MSG_EXTERNAL_850361239280923184$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:Text for the Image section of the form␟1e8059172dc79be0273478003dd2e2ae465fd41b␟850361239280923184:A starter Jupyter Docker Image with a baseline deployment and typical
        ML packages`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_939934962370125405$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_5 = goog.getMsg("Image pull policy");
        i18n_4 = MSG_EXTERNAL_939934962370125405$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟d8aa5559daf4007f0eff2ea4e5ea28d1ac49e105␟939934962370125405:Image pull policy`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc ImagePullPolicy: Always
         */
        const MSG_EXTERNAL_4040404765739455767$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_7 = goog.getMsg(" Always ");
        i18n_6 = MSG_EXTERNAL_4040404765739455767$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_7;
    }
    else {
        i18n_6 = $localize `:ImagePullPolicy\: Always␟6408a210e22cb458fc925aad796666f5a1198662␟4040404765739455767: Always `;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc ImagePullPolicy: IfNotPresent
         */
        const MSG_EXTERNAL_419294875390109671$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_9 = goog.getMsg(" IfNotPresent ");
        i18n_8 = MSG_EXTERNAL_419294875390109671$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_9;
    }
    else {
        i18n_8 = $localize `:ImagePullPolicy\: IfNotPresent␟7a084ea40b1b4313d812cfc6c7f41333f5021c45␟419294875390109671: IfNotPresent `;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @desc ImagePullPolicy: Never
         */
        const MSG_EXTERNAL_1115993704646362951$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_11 = goog.getMsg(" Never ");
        i18n_10 = MSG_EXTERNAL_1115993704646362951$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS_11;
    }
    else {
        i18n_10 = $localize `:ImagePullPolicy\: Never␟414e175f751673aebbcac9ac0ee64fb16c508e8d␟1115993704646362951: Never `;
    } let i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6395134205563672303$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__13 = goog.getMsg(" Custom Image ");
        i18n_12 = MSG_EXTERNAL_6395134205563672303$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__13;
    }
    else {
        i18n_12 = $localize `:␟059242c0f52aaeff3ed373739d818de15acc9751␟6395134205563672303: Custom Image `;
    } let i18n_14; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__15 = goog.getMsg("Image");
        i18n_14 = MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__15;
    }
    else {
        i18n_14 = $localize `:␟a5f9ba9bb9faa8284bcadb1cdbc6aaf969e9c4bb␟3012906865384504293:Image`;
    } let i18n_16; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__17 = goog.getMsg("Docker Image");
        i18n_16 = MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__17;
    }
    else {
        i18n_16 = $localize `:␟1f35754236a77f283c76f144f8ca55a2590b2897␟5875415455432432790:Docker Image`;
    } let i18n_18; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__19 = goog.getMsg("Please provide an Image to use");
        i18n_18 = MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__19;
    }
    else {
        i18n_18 = $localize `:␟817830b30c16a82f008858d8f7a6d64e7826a2b2␟3095176897800627036:Please provide an Image to use`;
    } let i18n_20; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__21 = goog.getMsg("Image");
        i18n_20 = MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__21;
    }
    else {
        i18n_20 = $localize `:␟a5f9ba9bb9faa8284bcadb1cdbc6aaf969e9c4bb␟3012906865384504293:Image`;
    } let i18n_22; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__23 = goog.getMsg("Docker Image");
        i18n_22 = MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__23;
    }
    else {
        i18n_22 = $localize `:␟1f35754236a77f283c76f144f8ca55a2590b2897␟5875415455432432790:Docker Image`;
    } let i18n_24; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__25 = goog.getMsg("Please provide an Image to use");
        i18n_24 = MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__25;
    }
    else {
        i18n_24 = $localize `:␟817830b30c16a82f008858d8f7a6d64e7826a2b2␟3095176897800627036:Please provide an Image to use`;
    } let i18n_26; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__27 = goog.getMsg("Image");
        i18n_26 = MSG_EXTERNAL_3012906865384504293$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__27;
    }
    else {
        i18n_26 = $localize `:␟a5f9ba9bb9faa8284bcadb1cdbc6aaf969e9c4bb␟3012906865384504293:Image`;
    } let i18n_28; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__29 = goog.getMsg("Docker Image");
        i18n_28 = MSG_EXTERNAL_5875415455432432790$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__29;
    }
    else {
        i18n_28 = $localize `:␟1f35754236a77f283c76f144f8ca55a2590b2897␟5875415455432432790:Docker Image`;
    } let i18n_30; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__31 = goog.getMsg("Please provide an Image to use");
        i18n_30 = MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__31;
    }
    else {
        i18n_30 = $localize `:␟817830b30c16a82f008858d8f7a6d64e7826a2b2␟3095176897800627036:Please provide an Image to use`;
    } let i18n_32; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6572562220695316082$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__33 = goog.getMsg("Custom Image");
        i18n_32 = MSG_EXTERNAL_6572562220695316082$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__33;
    }
    else {
        i18n_32 = $localize `:␟2f0e016d5caf4e42f1b6f60dc9fe80e2b98f5287␟6572562220695316082:Custom Image`;
    } let i18n_34; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__35 = goog.getMsg("Please provide an Image to use");
        i18n_34 = MSG_EXTERNAL_3095176897800627036$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_IMAGE_FORM_IMAGE_COMPONENT_TS__35;
    }
    else {
        i18n_34 = $localize `:␟817830b30c16a82f008858d8f7a6d64e7826a2b2␟3095176897800627036:Please provide an Image to use`;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fab:docker"], [1, "flex-column"], [3, "formControl", 4, "ngIf"], ["attr.aria-label", "Server Type", 1, "server-type-wrapper", 3, "formControl"], ["value", "jupyter", "attr.aria-label", "Use JupyterLab based server"], ["svgIcon", "jupyterlab", 1, "server-type"], ["value", "group-one", "attr.aria-label", "Use Group One based server"], ["svgIcon", "group-one", 1, "server-type"], ["value", "group-two", "attr.aria-label", "Use Group Two based server"], ["svgIcon", "group-two", 1, "server-type"], ["class", "wide", "appearance", "outline", 4, "ngIf"], [1, "row"], ["appearance", "outline", 1, "column"], i18n_4, [3, "formControl"], ["value", "Always"], i18n_6, ["value", "IfNotPresent"], i18n_8, ["value", "Never"], i18n_10, i18n_12, ["appearance", "outline", 1, "wide"], i18n_14, ["placeholder", i18n_16, 3, "formControl"], [3, "value", "matTooltip", 4, "ngFor", "ngForOf"], i18n_18, [3, "value", "matTooltip"], i18n_20, ["placeholder", i18n_22, 3, "formControl"], i18n_24, i18n_26, ["placeholder", i18n_28, 3, "formControl"], i18n_30, i18n_32, ["matInput", "", "placeholder", "Provide a custom Image", 3, "formControl"], ["cstmimg", ""], i18n_34]; }, template: function FormImageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, FormImageComponent_mat_checkbox_2_Template, 2, 1, "mat-checkbox", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-button-toggle-group", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-button-toggle", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-button-toggle", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "mat-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, FormImageComponent_mat_form_field_10_Template, 7, 2, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, FormImageComponent_mat_form_field_11_Template, 7, 2, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, FormImageComponent_mat_form_field_12_Template, 7, 2, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, FormImageComponent_mat_form_field_13_Template, 7, 1, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "lib-advanced-options");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-form-field", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](18, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-select", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "mat-option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](21, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "mat-option", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](23, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](25, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.allowCustomImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("serverType"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(ctx.parentForm == null ? null : ctx.parentForm.value.customImageCheck) && (ctx.parentForm == null ? null : ctx.parentForm.value.serverType) === "jupyter");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(ctx.parentForm == null ? null : ctx.parentForm.value.customImageCheck) && (ctx.parentForm == null ? null : ctx.parentForm.value.serverType) === "group-one");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(ctx.parentForm == null ? null : ctx.parentForm.value.customImageCheck) && (ctx.parentForm == null ? null : ctx.parentForm.value.serverType) === "group-two");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.parentForm == null ? null : ctx.parentForm.value.customImageCheck);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("imagePullPolicy"));
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_6__.FormSectionComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__.MatButtonToggleGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__.MatButtonToggle, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, kubeflow__WEBPACK_IMPORTED_MODULE_6__.AdvancedOptionsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__.MatCheckbox, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_13__.MatTooltip, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor], styles: [".server-type[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 150px;\n}\n\n.server-type-wrapper[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0taW1hZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSwwQkFBQTtFQUFBLHVCQUFBO0VBQUEsa0JBQUE7QUFDRiIsImZpbGUiOiJmb3JtLWltYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlcnZlci10eXBlIHtcbiAgaGVpZ2h0OiAzMnB4O1xuICB3aWR0aDogMTUwcHg7XG59XG5cbi5zZXJ2ZXItdHlwZS13cmFwcGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xufVxuIl19 */"] });


/***/ }),

/***/ 4249:
/*!**************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-name/form-name.component.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormNameComponent": function() { return /* binding */ FormNameComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);




class FormNameComponent {
    constructor(backend, ns) {
        this.backend = backend;
        this.ns = ns;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
        this.existingNotebooks = new Set();
    }
    ngOnInit() {
        // Keep track of the existing Notebooks in the selected Namespace
        // Use these names to check if the input name exists
        const nsSub = this.ns.getSelectedNamespace().subscribe(ns => {
            this.backend.getNotebooks(ns).subscribe(notebooks => {
                this.existingNotebooks.clear();
                notebooks.map(nb => this.existingNotebooks.add(nb.name));
            });
        });
        this.subscriptions.add(nsSub);
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
FormNameComponent.ɵfac = function FormNameComponent_Factory(t) { return new (t || FormNameComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_0__.JWABackendService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceService)); };
FormNameComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: FormNameComponent, selectors: [["app-form-name-namespace"]], inputs: { parentForm: "parentForm" }, decls: 2, vars: 3, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8953033926734869941$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_NAME_FORM_NAME_COMPONENT_TS_1 = goog.getMsg("Name");
        i18n_0 = MSG_EXTERNAL_8953033926734869941$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_NAME_FORM_NAME_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟cff1428d10d59d14e45edec3c735a27b5482db59␟8953033926734869941:Name`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_1949657987617460313$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_NAME_FORM_NAME_COMPONENT_TS_3 = goog.getMsg("Specify the name of the Kafka cluster and the Namespace it will belong to.");
        i18n_2 = MSG_EXTERNAL_1949657987617460313$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_NAME_FORM_NAME_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟0ea2eeff9871fe2b0ee1110587665ffea4279ebd␟1949657987617460313:Specify the name of the Kafka cluster and the Namespace it will belong to.`;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:book"], ["maxLength", "40", "resourceName", "Notebook Server", 3, "nameControl", "namespaceControl", "existingNames"]]; }, template: function FormNameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "lib-form-name-namespace-inputs", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("nameControl", ctx.parentForm.get("name"))("namespaceControl", ctx.parentForm.get("namespace"))("existingNames", ctx.existingNotebooks);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_3__.FormSectionComponent, kubeflow__WEBPACK_IMPORTED_MODULE_3__.NameNamespaceInputsComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLW5hbWUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 4537:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/form/form-default/form-workspace-volume/form-workspace-volume.component.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormWorkspaceVolumeComponent": function() { return /* binding */ FormWorkspaceVolumeComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _volume_volume_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../volume/volume.component */ 4060);







class FormWorkspaceVolumeComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
        this.readOnlyPrv = false;
    }
    get readonly() {
        return this.readOnlyPrv;
    }
    set readonly(b) {
        this.readOnlyPrv = b;
    }
    ngOnInit() {
        // Show a warning if no persistent storage is provided
        this.subscriptions.add(this.parentForm
            .get('noWorkspace')
            .valueChanges.subscribe((b) => {
            // close the snackbar if deselected
            if (!b) {
                this.snackBar.close();
            }
            else {
                const msg = $localize `Your workspace will not be persistent. You will lose all data in it, if your notebook is terminated for any reason.`;
                this.snackBar.open(msg, kubeflow__WEBPACK_IMPORTED_MODULE_2__.SnackType.Warning, 0);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.snackBar.close();
    }
}
FormWorkspaceVolumeComponent.ɵfac = function FormWorkspaceVolumeComponent_Factory(t) { return new (t || FormWorkspaceVolumeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_2__.SnackBarService)); };
FormWorkspaceVolumeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormWorkspaceVolumeComponent, selectors: [["app-form-workspace-volume"]], inputs: { parentForm: "parentForm", pvcs: "pvcs", storageClasses: "storageClasses", defaultStorageClass: "defaultStorageClass", readonly: "readonly" }, decls: 5, vars: 7, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3398373965382400215$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_1 = goog.getMsg("Workspace Volume");
        i18n_0 = MSG_EXTERNAL_3398373965382400215$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_1;
    }
    else {
        i18n_0 = $localize `:␟5f02a6412cf09bf5dd273aeb77215ce0ef343716␟3398373965382400215:Workspace Volume`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2834783561652615956$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_3 = goog.getMsg("Configure the Volume to be mounted as your personal Workspace.");
        i18n_2 = MSG_EXTERNAL_2834783561652615956$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_3;
    }
    else {
        i18n_2 = $localize `:␟752dfb855b4c8a9210e3d24477995a2371eab64f␟2834783561652615956:Configure the Volume to be mounted as your personal Workspace.`;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2077826561998922203$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_5 = goog.getMsg(" Don't use Persistent Storage for User's home ");
        i18n_4 = MSG_EXTERNAL_2077826561998922203$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_FORM_WORKSPACE_VOLUME_FORM_WORKSPACE_VOLUME_COMPONENT_TS_5;
    }
    else {
        i18n_4 = $localize `:␟3fcd8eaf3f795a406ca8d2418b7c0251b5ba4f31␟2077826561998922203: Don't use Persistent Storage for User's home `;
    } return [["title", i18n_0, "text", i18n_2, "icon", "fa:fas:laptop-code"], [3, "formGroup"], ["formControlName", "noWorkspace"], i18n_4, [3, "volume", "notebookName", "pvcs", "ephemeral", "namespace", "defaultStorageClass"]]; }, template: function FormWorkspaceVolumeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-checkbox", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](3, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "app-volume", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.parentForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("volume", ctx.parentForm.get("workspace"))("notebookName", ctx.parentForm.value.name)("pvcs", ctx.pvcs)("ephemeral", ctx.parentForm.value.noWorkspace)("namespace", ctx.parentForm.value.namespace)("defaultStorageClass", ctx.defaultStorageClass);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_2__.FormSectionComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _volume_volume_component__WEBPACK_IMPORTED_MODULE_0__.VolumeComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLXdvcmtzcGFjZS12b2x1bWUuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 3261:
/*!**************************************************!*\
  !*** ./src/app/pages/form/form-default/utils.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormDefaults": function() { return /* binding */ getFormDefaults; },
/* harmony export */   "createVolumeControl": function() { return /* binding */ createVolumeControl; },
/* harmony export */   "updateVolumeControl": function() { return /* binding */ updateVolumeControl; },
/* harmony export */   "addDataVolume": function() { return /* binding */ addDataVolume; },
/* harmony export */   "updateGPUControl": function() { return /* binding */ updateGPUControl; },
/* harmony export */   "calculateLimits": function() { return /* binding */ calculateLimits; },
/* harmony export */   "initCpuFormControls": function() { return /* binding */ initCpuFormControls; },
/* harmony export */   "initMemoryFormControls": function() { return /* binding */ initMemoryFormControls; },
/* harmony export */   "initFormControls": function() { return /* binding */ initFormControls; },
/* harmony export */   "configSizeToNumber": function() { return /* binding */ configSizeToNumber; }
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kubeflow */ 872);


function getFormDefaults() {
    const fb = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormBuilder();
    return fb.group({
        name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        namespace: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        // image: ['', [Validators.required]],
        // imageGroupOne: ['', [Validators.required]],
        // imageGroupTwo: ['', [Validators.required]],
        // allowCustomImage: [true, []],
        // imagePullPolicy: ['IfNotPresent', [Validators.required]],
        // customImage: ['', []],
        // customImageCheck: [false, []],
        // serverType: ['jupyter', [Validators.required]],
        // cpu: [1, [Validators.required]],
        // cpuLimit: ['', []],
        // memory: [1, [Validators.required]],
        // memoryLimit: ['', []],
        // gpus: fb.group({
        //   vendor: ['', []],
        //   num: ['', []],
        // }),
        // noWorkspace: [false, []],
        // workspace: fb.group({
        //   type: ['', [Validators.required]],
        //   name: ['', getNameSyncValidators(), getNameAsyncValidators()],
        //   templatedName: ['', []],
        //   size: [1, [Validators.required]],
        //   path: [{ value: '', disabled: true }, [Validators.required]],
        //   templatedPath: ['', []],
        //   mode: ['', [Validators.required]],
        //   class: ['{none}', [Validators.required]],
        //   extraFields: fb.group({}),
        // }),
        // affinityConfig: ['', []],
        // tolerationGroup: ['', []],
        // datavols: fb.array([]),
        // shm: [true, []],
        // configurations: [[], []],
    });
}
function createVolumeControl(vol, readonly = false) {
    const fb = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormBuilder();
    const ctrl = fb.group({
        type: [vol.type.value, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        name: ['volume', (0,kubeflow__WEBPACK_IMPORTED_MODULE_1__.getNameSyncValidators)(), (0,kubeflow__WEBPACK_IMPORTED_MODULE_1__.getNameAsyncValidators)()],
        templatedName: [vol.name.value, []],
        templatedPath: [vol.mountPath.value, []],
        size: [configSizeToNumber(vol.size.value), [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        path: [vol.mountPath.value, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        mode: [vol.accessModes.value, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]],
        class: ['{none}', []],
        extraFields: fb.group({}),
    });
    if (readonly) {
        ctrl.disable();
    }
    return ctrl;
}
function updateVolumeControl(volCtrl, vol, readonly = false) {
    volCtrl.get('name').setValue(vol.name.value);
    volCtrl.get('type').setValue(vol.type.value);
    volCtrl.get('size').setValue(configSizeToNumber(vol.size.value));
    volCtrl.get('mode').setValue(vol.accessModes.value);
    volCtrl.get('path').setValue(vol.mountPath.value);
    volCtrl.get('templatedName').setValue(vol.name.value);
    volCtrl.get('templatedPath').setValue(vol.mountPath.value);
    if (readonly) {
        volCtrl.disable();
    }
}
function addDataVolume(formCtrl, vol = null, readonly = false) {
    // If no vol is provided create one with default values
    if (vol === null) {
        const l = formCtrl.value.datavols.length;
        const name = '{notebook-name}-vol-' + (l + 1);
        vol = {
            type: {
                value: 'New',
            },
            name: {
                value: '{notebook-name}-vol-' + (l + 1),
            },
            size: {
                value: '5',
            },
            mountPath: {
                value: '/home/jovyan/{volume-name}',
            },
            accessModes: {
                value: 'ReadWriteOnce',
            },
        };
    }
    // Push it to the control
    const ctrl = createVolumeControl(vol, readonly);
    const vols = formCtrl.get('datavols');
    vols.push(ctrl);
}
function updateGPUControl(formCtrl, gpuConf) {
    // If the backend didn't send the value, default to none
    if (gpuConf == null) {
        formCtrl.get('num').setValue('none');
        return;
    }
    // Set the values
    const gpu = gpuConf.value;
    formCtrl.get('num').setValue(gpu.num);
    formCtrl.get('vendor').setValue(gpu.vendor);
    // Don't allow the user to edit them if the admin does not allow it
    if (gpuConf.readOnly) {
        formCtrl.get('num').disable();
        formCtrl.get('vendor').disable();
    }
}
function calculateLimits(requests, factor) {
    const limit = configSizeToNumber(requests) * configSizeToNumber(factor);
    if (isNaN(limit)) {
        return null;
    }
    return limit.toFixed(1);
}
function initCpuFormControls(formCtrl, config) {
    const cpu = Number(config.cpu.value);
    if (!isNaN(cpu)) {
        formCtrl.controls.cpu.setValue(cpu);
    }
    if (config.cpu.readOnly) {
        formCtrl.controls.cpu.disable();
        formCtrl.controls.cpuLimit.disable();
    }
    formCtrl.controls.cpuLimit.setValue(calculateLimits(cpu, config.cpu.limitFactor));
}
function initMemoryFormControls(formCtrl, config) {
    const memory = configSizeToNumber(config.memory.value);
    if (!isNaN(memory)) {
        formCtrl.controls.memory.setValue(memory);
    }
    if (config.memory.readOnly) {
        formCtrl.controls.memory.disable();
        formCtrl.controls.memoryLimit.disable();
    }
    formCtrl.controls.memoryLimit.setValue(calculateLimits(memory, config.memory.limitFactor));
}
function initFormControls(formCtrl, config) {
    initCpuFormControls(formCtrl, config);
    initMemoryFormControls(formCtrl, config);
    formCtrl.controls.image.setValue(config.image.value);
    formCtrl.controls.imageGroupOne.setValue(config.imageGroupOne.value);
    formCtrl.controls.imageGroupTwo.setValue(config.imageGroupTwo.value);
    formCtrl.controls.imagePullPolicy.setValue(config.imagePullPolicy.value);
    if (config.imagePullPolicy.readOnly) {
        formCtrl.controls.imagePullPolicy.disable();
    }
    const wsCtrl = formCtrl.get('workspace');
    updateVolumeControl(wsCtrl, config.workspaceVolume.value, config.workspaceVolume.readOnly);
    // Disable the mount path by default
    const ws = formCtrl.controls.workspace;
    ws.controls.path.disable();
    // Add the data volumes
    config.dataVolumes.value.forEach(vol => {
        // Create a new FormControl to append to the array
        addDataVolume(formCtrl, vol.value, config.dataVolumes.readOnly);
    });
    // Affinity
    formCtrl.controls.affinityConfig.setValue(config.affinityConfig.value);
    if (config.affinityConfig.readOnly) {
        formCtrl.controls.affinityConfig.disable();
    }
    // Tolerations
    formCtrl.controls.tolerationGroup.setValue(config.tolerationGroup.value);
    if (config.tolerationGroup.readOnly) {
        formCtrl.controls.tolerationGroup.disable();
    }
    // GPUs
    updateGPUControl(formCtrl.get('gpus'), config.gpus);
    formCtrl.controls.shm.setValue(config.shm.value);
    if (config.shm.readOnly) {
        formCtrl.controls.shm.disable();
    }
    // PodDefaults / Configurations. Set the pre selected labels
    formCtrl.controls.configurations.setValue(config.configurations.value);
    if (config.configurations.readOnly) {
        formCtrl.controls.configurations.disable();
    }
}
function configSizeToNumber(size) {
    if (size == null) {
        return NaN;
    }
    if (typeof size === 'number') {
        return size;
    }
    return Number(size.replace('Gi', ''));
}


/***/ }),

/***/ 4060:
/*!********************************************************************!*\
  !*** ./src/app/pages/form/form-default/volume/volume.component.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VolumeComponent": function() { return /* binding */ VolumeComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 3166);










function VolumeComponent_div_0_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](1, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function VolumeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](3, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-select", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, VolumeComponent_div_0_mat_option_5_Template, 2, 0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-option", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](7, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "lib-name-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "lib-positive-number-input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-form-field", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](12, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](15, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](17, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](19, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-form-field", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](22, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r0.volume);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.defaultStorageClass);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("nameControl", ctx_r0.volume.get("name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("sizeControl", ctx_r0.volume.get("size"));
} }
class VolumeComponent {
    // ----- Component Functions -----
    constructor() {
        this.notebookNamePrv = '';
        this.existingPVCs = new Set();
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
    }
    get notebookName() {
        return this.notebookNamePrv;
    }
    set notebookName(nm) {
        if (!this.volume.disabled) {
            this.notebookNameChanged(nm);
        }
    }
    set ephemeral(b) {
        if (!this.volume.disabled) {
            this.storageOptionChanged(b);
        }
    }
    set pvcs(data) {
        if (!this.volume.disabled) {
            this.pvcsChanged(data);
        }
    }
    get defaultStorageClass() {
        return this.defaultStorageClassPrv;
    }
    set defaultStorageClass(s) {
        // Update the current pvc type
        this.defaultStorageClassPrv = s;
        if (!this.volume.disabled) {
            this.updateVolInputFields();
        }
    }
    // ----- Get macros -----
    get selectedVolIsExistingType() {
        return (this.existingPVCs.has(this.volume.value.name) || !this.defaultStorageClass);
    }
    get currentVolName() {
        // Change volume name on notebook-name change, if user hasn't changed it already
        if (!this.volume.controls.name.dirty) {
            return this.volume
                .get('templatedName')
                .value.replace('{notebook-name}', this.notebookName);
        }
        else {
            return this.volume.get('name').value;
        }
    }
    // ----- utility functions -----
    setVolumeType(type) {
        if (type === 'Existing') {
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
        }
        else {
            this.volume.controls.size.enable();
            this.volume.controls.mode.enable();
        }
    }
    updateVolInputFields() {
        // Disable input fields according to volume type
        if (this.selectedVolIsExistingType) {
            // Disable all fields
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
            this.volume.controls.type.setValue('Existing');
        }
        else {
            this.volume.controls.size.enable();
            this.volume.controls.mode.enable();
            this.volume.controls.type.setValue('New');
        }
        // Fix mount point if user hasn't changed it and it's not workspace volume
        (0,kubeflow__WEBPACK_IMPORTED_MODULE_2__.updateNonDirtyControl)(this.volume.get('path'), this.volume
            .get('templatedPath')
            .value.replace('{volume-name}', this.currentVolName));
    }
    ngOnInit() {
        // type
        this.subscriptions.add(this.volume.get('type').valueChanges.subscribe((type) => {
            this.setVolumeType(type);
        }));
        // name
        this.subscriptions.add(this.volume.get('name').valueChanges.subscribe((name) => {
            // Update the fields if the volume is an existing one
            this.volume.get('name').setValue(name, { emitEvent: false });
            this.updateVolInputFields();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    // ----- @Input change handling functions -----
    notebookNameChanged(nm) {
        if (this.volume.disabled) {
            return;
        }
        this.notebookNamePrv = nm;
        setTimeout(() => {
            (0,kubeflow__WEBPACK_IMPORTED_MODULE_2__.updateNonDirtyControl)(this.volume.controls.name, this.currentVolName);
        });
    }
    storageOptionChanged(ephemeral) {
        if (ephemeral) {
            // Disable all fields
            this.volume.controls.type.disable();
            this.volume.controls.name.disable();
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
        }
        else {
            this.volume.controls.type.enable();
            this.volume.controls.name.enable();
            this.updateVolInputFields();
        }
    }
    pvcsChanged(pvcs) {
        this.existingPVCs.clear();
        pvcs.map(pvc => this.existingPVCs.add(pvc.name));
        if (!this.existingPVCs.has(this.currentVolName)) {
            this.updateVolInputFields();
        }
        else {
            // Also set the selected volume
            this.volume.controls.name.setValue(this.currentVolName);
        }
    }
}
VolumeComponent.ɵfac = function VolumeComponent_Factory(t) { return new (t || VolumeComponent)(); };
VolumeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VolumeComponent, selectors: [["app-volume"]], inputs: { volume: "volume", namespace: "namespace", notebookName: "notebookName", ephemeral: "ephemeral", pvcs: "pvcs", defaultStorageClass: "defaultStorageClass" }, decls: 1, vars: 1, consts: function () { let i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8650499415827640724$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__1 = goog.getMsg("Type");
        i18n_0 = MSG_EXTERNAL_8650499415827640724$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__1;
    }
    else {
        i18n_0 = $localize `:␟f61c6867295f3b53d23557021f2f4e0aa1d0b8fc␟8650499415827640724:Type`;
    } let i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2723452166862787347$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__3 = goog.getMsg(" Existing ");
        i18n_2 = MSG_EXTERNAL_2723452166862787347$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__3;
    }
    else {
        i18n_2 = $localize `:␟694e11ff8cc8b070c82c65b5eaa118b4e4f3f169␟2723452166862787347: Existing `;
    } let i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2772330728479814494$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__5 = goog.getMsg("Size in Gi");
        i18n_4 = MSG_EXTERNAL_2772330728479814494$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__5;
    }
    else {
        i18n_4 = $localize `:␟e1b3e1dca04b54d87b5a7ff9593676dacaf6dce0␟2772330728479814494:Size in Gi`;
    } let i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_1713271461473302108$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__7 = goog.getMsg("Mode");
        i18n_6 = MSG_EXTERNAL_1713271461473302108$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__7;
    }
    else {
        i18n_6 = $localize `:␟37e10df2d9c0c25ef04ac112c9c9a7723e8efae0␟1713271461473302108:Mode`;
    } let i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_438106569717487631$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__9 = goog.getMsg("ReadWriteOnce");
        i18n_8 = MSG_EXTERNAL_438106569717487631$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__9;
    }
    else {
        i18n_8 = $localize `:␟3ecda4b04c618776ed92e6436ff5f0fc8a58b17a␟438106569717487631:ReadWriteOnce`;
    } let i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8343619288781213033$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__11 = goog.getMsg("ReadOnlyMany ");
        i18n_10 = MSG_EXTERNAL_8343619288781213033$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__11;
    }
    else {
        i18n_10 = $localize `:␟134b8b6d344324352f2e3c4c6cd37c0a69f13294␟8343619288781213033:ReadOnlyMany `;
    } let i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8128010211627552417$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__13 = goog.getMsg("ReadWriteMany ");
        i18n_12 = MSG_EXTERNAL_8128010211627552417$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__13;
    }
    else {
        i18n_12 = $localize `:␟5b20b7812eb6056ee343b25ecc21dd87da6cc261␟8128010211627552417:ReadWriteMany `;
    } let i18n_14; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3540855333738137929$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__15 = goog.getMsg("Mount Point");
        i18n_14 = MSG_EXTERNAL_3540855333738137929$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS__15;
    }
    else {
        i18n_14 = $localize `:␟145eca4aa8d12853efaf9a1e27004e3238232eff␟3540855333738137929:Mount Point`;
    } let i18n_16; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_7122010347255310427$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS___17 = goog.getMsg(" New ");
        i18n_16 = MSG_EXTERNAL_7122010347255310427$$________________________USERS_ALLAN_CHEPKOY_CLOUD_KUBEFLOW_COMPONENTS_CRUD_WEB_APPS_KAFKA_FRONTEND_SRC_APP_PAGES_FORM_FORM_DEFAULT_VOLUME_VOLUME_COMPONENT_TS___17;
    }
    else {
        i18n_16 = $localize `:␟6aa0944e1e88f326f92278269c69175ca0b8683e␟7122010347255310427: New `;
    } return [["class", "row", 3, "formGroup", 4, "ngIf"], [1, "row", 3, "formGroup"], ["appearance", "outline", "id", "type", 1, "column"], i18n_0, ["formControlName", "type"], ["value", "New", 4, "ngIf"], ["value", "Existing"], i18n_2, ["id", "name", 1, "column", 3, "nameControl"], ["id", "size", "min", "1", "step", "1", "label", i18n_4, 1, "column", 3, "sizeControl"], ["appearance", "outline", "id", "mode", 1, "column"], i18n_6, ["formControlName", "mode"], ["value", "ReadWriteOnce"], i18n_8, ["value", "ReadOnlyMany"], i18n_10, ["value", "ReadWriteMany"], i18n_12, ["appearance", "outline", "id", "path", 1, "column"], i18n_14, ["matInput", "", "formControlName", "path"], ["value", "New"], i18n_16]; }, template: function VolumeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, VolumeComponent_div_0_Template, 24, 4, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.volume);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption, kubeflow__WEBPACK_IMPORTED_MODULE_2__.NameInputComponent, kubeflow__WEBPACK_IMPORTED_MODULE_2__.PositiveNumberInputComponent, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor], styles: ["#type[_ngcontent-%COMP%] {\n  max-width: 15%;\n}\n\n#size[_ngcontent-%COMP%] {\n  max-width: 10%;\n}\n\n#mode[_ngcontent-%COMP%] {\n  max-width: 20%;\n}\n\n#name[_ngcontent-%COMP%] {\n  max-width: 30%;\n}\n\n#path[_ngcontent-%COMP%] {\n  max-width: 25%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZvbHVtZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7QUFDRiIsImZpbGUiOiJ2b2x1bWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjdHlwZSB7XG4gIG1heC13aWR0aDogMTUlO1xufVxuXG4jc2l6ZSB7XG4gIG1heC13aWR0aDogMTAlO1xufVxuXG4jbW9kZSB7XG4gIG1heC13aWR0aDogMjAlO1xufVxuXG4jbmFtZSB7XG4gIG1heC13aWR0aDogMzAlO1xufVxuXG4jcGF0aCB7XG4gIG1heC13aWR0aDogMjUlO1xufVxuIl19 */"] });


/***/ }),

/***/ 5215:
/*!***********************************************************!*\
  !*** ./src/app/pages/form/form-rok/form-rok.component.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormRokComponent": function() { return /* binding */ FormRokComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _form_default_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-default/utils */ 3261);
/* harmony import */ var _form_default_form_default_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form-default/form-default.component */ 849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _rok_jupyter_lab_selector_rok_jupyter_lab_selector_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rok-jupyter-lab-selector/rok-jupyter-lab-selector.component */ 4373);
/* harmony import */ var _form_default_form_name_form_name_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../form-default/form-name/form-name.component */ 4249);
/* harmony import */ var _form_default_form_image_form_image_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../form-default/form-image/form-image.component */ 1330);
/* harmony import */ var _form_default_form_cpu_ram_form_cpu_ram_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../form-default/form-cpu-ram/form-cpu-ram.component */ 9492);
/* harmony import */ var _form_default_form_gpus_form_gpus_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../form-default/form-gpus/form-gpus.component */ 184);
/* harmony import */ var _rok_form_workspace_volume_rok_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rok-form-workspace-volume/rok-form-workspace-volume.component */ 1694);
/* harmony import */ var _rok_form_data_volumes_rok_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rok-form-data-volumes/rok-form-data-volumes.component */ 5483);
/* harmony import */ var _rok_form_configurations_rok_form_configurations_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rok-form-configurations/rok-form-configurations.component */ 936);
/* harmony import */ var _form_default_form_affinity_tolerations_form_affinity_tolerations_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../form-default/form-affinity-tolerations/form-affinity-tolerations.component */ 6440);
/* harmony import */ var _form_default_form_advanced_options_form_advanced_options_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../form-default/form-advanced-options/form-advanced-options.component */ 5905);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 1095);




















class FormRokComponent extends _form_default_form_default_component__WEBPACK_IMPORTED_MODULE_2__.FormDefaultComponent {
    constructor(ns, backend, router, popup, rok) {
        super(ns, backend, router, popup);
        this.ns = ns;
        this.backend = backend;
        this.router = router;
        this.popup = popup;
        this.rok = rok;
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() {
        super.ngOnInit();
        this.rok.initCSRF();
    }
    // Form handling functions
    getFormDefaults() {
        // Init the form
        const formCtrl = (0,_form_default_utils__WEBPACK_IMPORTED_MODULE_1__.getFormDefaults)();
        // Add labUrl control
        formCtrl.addControl('environment', new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required]));
        // Add the rokUrl control
        const wsExtras = formCtrl.get('workspace.extraFields');
        wsExtras.addControl('rokUrl', new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl('', []));
        return formCtrl;
    }
    initFormControls(formCtrl, config) {
        // Sets the values from our internal dict. This is an initialization step
        // that should be only run once
        (0,_form_default_utils__WEBPACK_IMPORTED_MODULE_1__.initFormControls)(formCtrl, config);
        // Handle the Pod environment
        if (config.environment && config.environment.value) {
            const envVal = JSON.stringify(config.environment.value);
            formCtrl.controls.environment.setValue(envVal);
        }
        else {
            formCtrl.controls.environment.setValue('{}');
        }
        if (config.environment && config.environment.readOnly) {
            formCtrl.controls.environment.disable();
        }
        // Configure workspace control with rokUrl
        const extraFields = formCtrl
            .get('workspace')
            .get('extraFields');
        extraFields.addControl('rokUrl', new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl('', []));
        // Add rok url control to the data volumes
        const array = formCtrl.get('datavols');
        for (let i = 0; i < this.config.dataVolumes.value.length; i++) {
            const extra = array.at(i).get('extraFields');
            extra.addControl('rokUrl', new _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormControl('', []));
        }
    }
}
FormRokComponent.ɵfac = function FormRokComponent_Factory(t) { return new (t || FormRokComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_16__.NamespaceService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_3__.JWABackendService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_16__.SnackBarService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_16__.RokService)); };
FormRokComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({ type: FormRokComponent, selectors: [["app-form-rok"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 23, consts: [[1, "center-flex"], [1, "form-with-buttons"], [1, "form--card-container", "mat-elevation-z2"], ["novalidate", "", 3, "formGroup", "ngSubmit"], [3, "parentForm"], [3, "parentForm", "images", "imagesGroupOne", "imagesGroupTwo", "allowCustomImage"], [3, "parentForm", "vendors"], [3, "parentForm", "pvcs", "readonly"], [3, "parentForm", "affinityConfigs", "tolerationGroups"], ["mat-raised-button", "", "color", "primary", 1, "form--button-margin", 3, "disabled", "click"], ["mat-raised-button", "", "type", "button", 3, "click"]], template: function FormRokComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngSubmit", function FormRokComponent_Template_form_ngSubmit_3_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "app-rok-jupyter-lab-selector", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](5, "app-form-name-namespace", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](6, "app-form-image", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](7, "app-form-cpu-ram", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](8, "app-form-gpus", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](9, "app-rok-form-workspace-volume", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "app-rok-form-data-volumes", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](11, "app-rok-form-configurations", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](12, "app-form-affinity-tolerations", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](13, "app-form-advanced-options", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function FormRokComponent_Template_button_click_14_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](15, " LAUNCH ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function FormRokComponent_Template_button_click_16_listener() { return ctx.onCancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](17, "CANCEL");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("formGroup", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl)("images", ctx.config == null ? null : ctx.config.image == null ? null : ctx.config.image.options)("imagesGroupOne", ctx.config == null ? null : ctx.config.imageGroupOne == null ? null : ctx.config.imageGroupOne.options)("imagesGroupTwo", ctx.config == null ? null : ctx.config.imageGroupTwo == null ? null : ctx.config.imageGroupTwo.options)("allowCustomImage", ctx.config == null ? null : ctx.config.allowCustomImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl)("vendors", ctx.config == null ? null : ctx.config.gpus == null ? null : ctx.config.gpus.value.vendors);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl)("pvcs", ctx.pvcs)("readonly", ctx.config == null ? null : ctx.config.workspaceVolume == null ? null : ctx.config.workspaceVolume.readOnly);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl)("pvcs", ctx.pvcs)("readonly", ctx.config == null ? null : ctx.config.dataVolumes == null ? null : ctx.config.dataVolumes.readOnly);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl)("affinityConfigs", ctx.config == null ? null : ctx.config.affinityConfig == null ? null : ctx.config.affinityConfig.options)("tolerationGroups", ctx.config == null ? null : ctx.config.tolerationGroup == null ? null : ctx.config.tolerationGroup.options);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("parentForm", ctx.formCtrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", !ctx.formCtrl.valid || ctx.blockSubmit);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormGroupDirective, _rok_jupyter_lab_selector_rok_jupyter_lab_selector_component__WEBPACK_IMPORTED_MODULE_4__.RokJupyterLabSelectorComponent, _form_default_form_name_form_name_component__WEBPACK_IMPORTED_MODULE_5__.FormNameComponent, _form_default_form_image_form_image_component__WEBPACK_IMPORTED_MODULE_6__.FormImageComponent, _form_default_form_cpu_ram_form_cpu_ram_component__WEBPACK_IMPORTED_MODULE_7__.FormCpuRamComponent, _form_default_form_gpus_form_gpus_component__WEBPACK_IMPORTED_MODULE_8__.FormGpusComponent, _rok_form_workspace_volume_rok_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_9__.RokFormWorkspaceVolumeComponent, _rok_form_data_volumes_rok_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_10__.RokFormDataVolumesComponent, _rok_form_configurations_rok_form_configurations_component__WEBPACK_IMPORTED_MODULE_11__.RokFormConfigurationsComponent, _form_default_form_affinity_tolerations_form_affinity_tolerations_component__WEBPACK_IMPORTED_MODULE_12__.FormAffinityTolerationsComponent, _form_default_form_advanced_options_form_advanced_options_component__WEBPACK_IMPORTED_MODULE_13__.FormAdvancedOptionsComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLXJvay5jb21wb25lbnQuc2NzcyJ9 */", ".form--card-container[_ngcontent-%COMP%] {\n  width: 900px;\n  padding: 16px;\n  border-radius: 5px;\n  background: white;\n  margin-bottom: 12px;\n}\n\n.form-with-buttons[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  margin-bottom: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0tZGVmYXVsdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FBQ0YiLCJmaWxlIjoiZm9ybS1kZWZhdWx0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tLWNhcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDkwMHB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uZm9ybS13aXRoLWJ1dHRvbnMge1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuIl19 */"] });


/***/ }),

/***/ 5052:
/*!********************************************************!*\
  !*** ./src/app/pages/form/form-rok/form-rok.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormRokModule": function() { return /* binding */ FormRokModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slide-toggle */ 5396);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _form_rok_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-rok.component */ 5215);
/* harmony import */ var _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-default/form-default.module */ 5903);
/* harmony import */ var _rok_jupyter_lab_selector_rok_jupyter_lab_selector_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rok-jupyter-lab-selector/rok-jupyter-lab-selector.component */ 4373);
/* harmony import */ var _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rok-volume/rok-volume.component */ 7995);
/* harmony import */ var _rok_form_workspace_volume_rok_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rok-form-workspace-volume/rok-form-workspace-volume.component */ 1694);
/* harmony import */ var _rok_form_data_volumes_rok_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rok-form-data-volumes/rok-form-data-volumes.component */ 5483);
/* harmony import */ var _rok_form_configurations_rok_form_configurations_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rok-form-configurations/rok-form-configurations.component */ 936);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);













class FormRokModule {
}
FormRokModule.ɵfac = function FormRokModule_Factory(t) { return new (t || FormRokModule)(); };
FormRokModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: FormRokModule });
FormRokModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_9__.FormModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__.MatCheckboxModule,
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggleModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
            _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_1__.FormDefaultModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](FormRokModule, { declarations: [_form_rok_component__WEBPACK_IMPORTED_MODULE_0__.FormRokComponent,
        _rok_jupyter_lab_selector_rok_jupyter_lab_selector_component__WEBPACK_IMPORTED_MODULE_2__.RokJupyterLabSelectorComponent,
        _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_3__.RokVolumeComponent,
        _rok_form_workspace_volume_rok_form_workspace_volume_component__WEBPACK_IMPORTED_MODULE_4__.RokFormWorkspaceVolumeComponent,
        _rok_form_data_volumes_rok_form_data_volumes_component__WEBPACK_IMPORTED_MODULE_5__.RokFormDataVolumesComponent,
        _rok_form_configurations_rok_form_configurations_component__WEBPACK_IMPORTED_MODULE_6__.RokFormConfigurationsComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_9__.FormModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__.MatCheckboxModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__.MatSlideToggleModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_1__.FormDefaultModule], exports: [_form_rok_component__WEBPACK_IMPORTED_MODULE_0__.FormRokComponent] }); })();


/***/ }),

/***/ 936:
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/form/form-rok/rok-form-configurations/rok-form-configurations.component.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RokFormConfigurationsComponent": function() { return /* binding */ RokFormConfigurationsComponent; }
/* harmony export */ });
/* harmony import */ var _form_default_form_configurations_form_configurations_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../form-default/form-configurations/form-configurations.component */ 4999);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 3166);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 7817);









function RokFormConfigurationsComponent_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const config_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", config_r1.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", config_r1.desc, " ");
} }
class RokFormConfigurationsComponent extends _form_default_form_configurations_form_configurations_component__WEBPACK_IMPORTED_MODULE_0__.FormConfigurationsComponent {
}
RokFormConfigurationsComponent.ɵfac = /*@__PURE__*/ function () { let ɵRokFormConfigurationsComponent_BaseFactory; return function RokFormConfigurationsComponent_Factory(t) { return (ɵRokFormConfigurationsComponent_BaseFactory || (ɵRokFormConfigurationsComponent_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](RokFormConfigurationsComponent)))(t || RokFormConfigurationsComponent); }; }();
RokFormConfigurationsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RokFormConfigurationsComponent, selectors: [["app-rok-form-configurations"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 12, vars: 3, consts: [["title", "Configurations", "text", "\n    Extra layers of configurations that will be applied to the new Notebook.\n    (e.g. Insert credentials as Secrets, set Environment Variables.)\n  ", "icon", "fa:fas:sliders-h"], ["appearance", "outline", 1, "wide"], ["multiple", "", 3, "formControl"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", "placeholder", "Environment variables in JSON", 3, "formControl"], [3, "value"]], template: function RokFormConfigurationsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Configurations");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, RokFormConfigurationsComponent_mat_option_5_Template, 2, 2, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-form-field", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Environment");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Environment is invalid");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("configurations"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.podDefaults);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.parentForm.get("environment"));
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_2__.FormSectionComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_4__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlDirective, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__.MatError, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatOption], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2stZm9ybS1jb25maWd1cmF0aW9ucy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 5483:
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/form/form-rok/rok-form-data-volumes/rok-form-data-volumes.component.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RokFormDataVolumesComponent": function() { return /* binding */ RokFormDataVolumesComponent; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 4933);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 1095);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rok-volume/rok-volume.component */ 7995);








function RokFormDataVolumesComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-rok-volume", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RokFormDataVolumesComponent_div_5_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r4); const i_r2 = restoredCtx.index; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r3.deleteVol(i_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vol_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("volume", vol_r1)("notebookName", ctx_r0.parentForm.get("name").value)("namespace", ctx_r0.parentForm.get("namespace").value)("pvcs", ctx_r0.pvcs)("ephemeral", false)("storageClasses", ctx_r0.storageClasses);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r0.readonly);
} }
class RokFormDataVolumesComponent {
    constructor(fb) {
        this.fb = fb;
    }
    get datavols() {
        const vols = this.parentForm.get('datavols');
        return vols.controls;
    }
    ngOnInit() { }
    addVol() {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.addRokDataVolume)(this.parentForm);
    }
    deleteVol(idx) {
        const vols = this.parentForm.get('datavols');
        vols.removeAt(idx);
        this.parentForm.updateValueAndValidity();
    }
}
RokFormDataVolumesComponent.ɵfac = function RokFormDataVolumesComponent_Factory(t) { return new (t || RokFormDataVolumesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder)); };
RokFormDataVolumesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RokFormDataVolumesComponent, selectors: [["app-rok-form-data-volumes"]], inputs: { parentForm: "parentForm", readonly: "readonly", pvcs: "pvcs", storageClasses: "storageClasses", token: "token" }, decls: 6, vars: 2, consts: [["title", "Data Volumes", "text", "\n    Configure the Volumes to be mounted as your Datasets.\n  ", "icon", "fa:fas:hdd"], ["mat-stroked-button", "", "color", "accent", "type", "button", 1, "add-data-vol-button", 3, "disabled", "click"], ["class", "volume-wrapper", 4, "ngFor", "ngForOf"], [1, "volume-wrapper"], [3, "volume", "notebookName", "namespace", "pvcs", "ephemeral", "storageClasses"], [1, "del-btn"], ["mat-icon-button", "", "color", "warn", "type", "button", 3, "disabled", "click"]], template: function RokFormDataVolumesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RokFormDataVolumesComponent_Template_button_click_1_listener() { return ctx.addVol(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "add");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "ADD VOLUME ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, RokFormDataVolumesComponent_div_5_Template, 6, 7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.readonly);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.datavols);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_4__.FormSectionComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_1__.RokVolumeComponent], styles: [".add-data-vol-button[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\n.volume-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n}\n\n.volume-wrapper[_ngcontent-%COMP%]    > app-rok-volume[_ngcontent-%COMP%] {\n  flex: 1 1 0px;\n  min-width: 0;\n  min-width: initial;\n  max-width: 93%;\n}\n\n.volume-wrapper[_ngcontent-%COMP%]    > .del-btn[_ngcontent-%COMP%] {\n  flex: 1 1 0px;\n  margin-top: 0.8rem;\n  margin-left: 1.5rem;\n  width: 7%;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvay1mb3JtLWRhdGEtdm9sdW1lcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLG1CQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFBQSxrQkFBQTtFQUNBLGNBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBQUYiLCJmaWxlIjoicm9rLWZvcm0tZGF0YS12b2x1bWVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGF0YSBWb2x1bWVzIHdpdGggdGhlIERlbGV0ZSBidXR0b25cbi5hZGQtZGF0YS12b2wtYnV0dG9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cblxuLnZvbHVtZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi52b2x1bWUtd3JhcHBlciA+IGFwcC1yb2stdm9sdW1lIHtcbiAgZmxleDogMSAxIDBweDtcbiAgbWluLXdpZHRoOiBpbml0aWFsO1xuICBtYXgtd2lkdGg6IDkzJTtcbn1cblxuLnZvbHVtZS13cmFwcGVyID4gLmRlbC1idG4ge1xuICBmbGV4OiAxIDEgMHB4O1xuICBtYXJnaW4tdG9wOiAwLjhyZW07XG4gIG1hcmdpbi1sZWZ0OiAxLjVyZW07XG4gIHdpZHRoOiA3JTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuIl19 */"] });


/***/ }),

/***/ 1694:
/*!******************************************************************************************************!*\
  !*** ./src/app/pages/form/form-rok/rok-form-workspace-volume/rok-form-workspace-volume.component.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RokFormWorkspaceVolumeComponent": function() { return /* binding */ RokFormWorkspaceVolumeComponent; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rok-volume/rok-volume.component */ 7995);







class RokFormWorkspaceVolumeComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subscription();
    }
    ngOnInit() {
        // Show a warning if no persistent storage is provided
        this.subscriptions.add(this.parentForm
            .get('noWorkspace')
            .valueChanges.subscribe((b) => {
            // close the snackbar if deselected
            if (!b) {
                this.snackBar.close();
            }
            else {
                const msg = 'Your workspace will not be persistent. You will lose all ' +
                    'data in it, if your notebook is terminated for any reason.';
                this.snackBar.open(msg, kubeflow__WEBPACK_IMPORTED_MODULE_2__.SnackType.Warning, 0);
            }
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
RokFormWorkspaceVolumeComponent.ɵfac = function RokFormWorkspaceVolumeComponent_Factory(t) { return new (t || RokFormWorkspaceVolumeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_2__.SnackBarService)); };
RokFormWorkspaceVolumeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RokFormWorkspaceVolumeComponent, selectors: [["app-rok-form-workspace-volume"]], inputs: { parentForm: "parentForm", readonly: "readonly", pvcs: "pvcs", storageClasses: "storageClasses", token: "token" }, decls: 4, vars: 7, consts: [["title", "Workspace Volume", "text", "\n    Configure the Volume to be mounted as your personal Workspace.\n  ", "icon", "fa:fas:laptop-code"], [3, "formControl"], [3, "volume", "notebookName", "pvcs", "ephemeral", "namespace", "storageClasses"]], template: function RokFormWorkspaceVolumeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-checkbox", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, " Don't use Persistent Storage for User's home ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "app-rok-volume", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControl", ctx.parentForm.get("noWorkspace"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("volume", ctx.parentForm.get("workspace"))("notebookName", ctx.parentForm.value.name)("pvcs", ctx.pvcs)("ephemeral", ctx.parentForm.value.noWorkspace)("namespace", ctx.parentForm.value.namespace)("storageClasses", ctx.storageClasses);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_2__.FormSectionComponent, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckbox, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlDirective, _rok_volume_rok_volume_component__WEBPACK_IMPORTED_MODULE_0__.RokVolumeComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2stZm9ybS13b3Jrc3BhY2Utdm9sdW1lLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 4373:
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/form/form-rok/rok-jupyter-lab-selector/rok-jupyter-lab-selector.component.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RokJupyterLabSelectorComponent": function() { return /* binding */ RokJupyterLabSelectorComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ 4933);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);






class RokJupyterLabSelectorComponent {
    constructor(rok, popup) {
        this.rok = rok;
        this.popup = popup;
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
        this.ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('', [], [(0,kubeflow__WEBPACK_IMPORTED_MODULE_3__.rokUrlValidator)(this.rok)]);
    }
    ngOnInit() { }
    labAutofillClicked(url) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getJupyterLabFromRokURL)(url, this.rok).subscribe(lab => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setLabValues)(lab, this.parentForm);
            // Autofill the workspace volume
            const wsUrl = this.parentForm.get('workspace.extraFields.rokUrl').value;
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getVolumeFromRokURL)(wsUrl, this.rok).subscribe(vol => {
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setVolumeValues)(vol, this.parentForm.get('workspace'));
            });
            // Autofill the data volumes
            const dataVols = this.parentForm.get('datavols');
            for (const volCtrl of dataVols.controls) {
                const volUrl = volCtrl.get('extraFields.rokUrl').value;
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getVolumeFromRokURL)(volUrl, this.rok).subscribe(vol => {
                    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setVolumeValues)(vol, volCtrl);
                });
            }
            this.popup.open('Successfully retrieved details from Rok Jupyter Lab URL', kubeflow__WEBPACK_IMPORTED_MODULE_3__.SnackType.Success, 4000);
        });
    }
}
RokJupyterLabSelectorComponent.ɵfac = function RokJupyterLabSelectorComponent_Factory(t) { return new (t || RokJupyterLabSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.RokService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.SnackBarService)); };
RokJupyterLabSelectorComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: RokJupyterLabSelectorComponent, selectors: [["app-rok-jupyter-lab-selector"]], inputs: { parentForm: "parentForm" }, decls: 2, vars: 1, consts: [["title", "Rok JupyterLab URL", "text", "\n    Load an existing Jupyter Lab by providing a valid Rok URL.\n  ", "icon", "fa:fas:link"], [3, "control", "urlEntered"]], template: function RokJupyterLabSelectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "lib-form-section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "lib-rok-url-input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("urlEntered", function RokJupyterLabSelectorComponent_Template_lib_rok_url_input_urlEntered_1_listener($event) { return ctx.labAutofillClicked($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("control", ctx.ctrl);
    } }, directives: [kubeflow__WEBPACK_IMPORTED_MODULE_3__.FormSectionComponent, kubeflow__WEBPACK_IMPORTED_MODULE_3__.RokUrlInputComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2stanVweXRlci1sYWItc2VsZWN0b3IuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 7995:
/*!************************************************************************!*\
  !*** ./src/app/pages/form/form-rok/rok-volume/rok-volume.component.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RokVolumeComponent": function() { return /* binding */ RokVolumeComponent; }
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ 4933);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 8295);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 7441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 3166);













function RokVolumeComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-form-field", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-select", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "New");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Existing");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "lib-rok-url-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("urlPasted", function RokVolumeComponent_div_0_Template_lib_rok_url_input_urlPasted_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r1.autofillVolume($event); })("urlEntered", function RokVolumeComponent_div_0_Template_lib_rok_url_input_urlEntered_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r3.autofillVolume($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "lib-name-input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "lib-positive-number-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-form-field", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Mount Point");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r0.volume);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("control", ctx_r0.volume.get("extraFields.rokUrl"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("nameControl", ctx_r0.volume.get("name"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("sizeControl", ctx_r0.volume.get("size"));
} }
class RokVolumeComponent {
    // ----- Component Functions -----
    constructor(rok) {
        this.rok = rok;
        this.nbName = '';
        this.origin = window.location.origin;
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
        this.existingPVCs = [];
        this.readOnly = false;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
        this.storageClasses = [];
    }
    get notebookName() {
        return this.nbName;
    }
    set notebookName(nm) {
        if (!this.volume.disabled) {
            this.notebookNameChanged(nm);
        }
    }
    set ephemeral(b) {
        if (!this.volume.disabled) {
            this.storageOptionChanged(b);
        }
    }
    // ----- Get macros -----
    get selectedVolIsExistingType() {
        return this.volume.value.type === 'Existing';
    }
    get currentVolName() {
        // Change volume name on notebook-name change, if user hasn't changed it already
        if (!this.volume.get('name').dirty) {
            return this.volume
                .get('templatedName')
                .value.replace('{notebook-name}', this.notebookName || '');
        }
        else {
            return this.volume.get('name').value;
        }
    }
    // ----- utility functions -----
    updateVolPath() {
        // Change volume path on volume-name change, if user hasn't changed it already
        (0,kubeflow__WEBPACK_IMPORTED_MODULE_4__.updateNonDirtyControl)(this.volume.get('path'), this.volume
            .get('templatedPath')
            .value.replace('{volume-name}', this.currentVolName));
    }
    updateVolType(type) {
        const rokUrl = this.volume.get('extraFields.rokUrl');
        if (type === 'Existing') {
            // Enable rokUrl
            rokUrl.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required);
            rokUrl.setAsyncValidators((0,kubeflow__WEBPACK_IMPORTED_MODULE_4__.rokUrlValidator)(this.rok));
            rokUrl.enable();
        }
        else {
            rokUrl.setValidators([]);
            rokUrl.setAsyncValidators([]);
            rokUrl.disable();
        }
    }
    autofillVolume(url) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getVolumeFromRokURL)(url, this.rok).subscribe(vol => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setVolumeValues)(vol, this.volume);
        });
    }
    ngOnInit() {
        // type
        this.subscriptions.add(this.volume.get('type').valueChanges.subscribe((type) => {
            this.updateVolType(type);
        }));
        // name
        this.subscriptions.add(this.volume.get('name').valueChanges.subscribe((name) => {
            this.volume.get('name').setValue(name, { emitEvent: false });
            // Fix mount point if user hasn't changed it and it's not workspace volume
            this.updateVolPath();
        }));
        this.updateVolPath();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    // ----- @Input change handling functions -----
    notebookNameChanged(nm) {
        if (this.volume.disabled) {
            return;
        }
        this.nbName = nm;
        setTimeout(() => {
            (0,kubeflow__WEBPACK_IMPORTED_MODULE_4__.updateNonDirtyControl)(this.volume.get('name'), this.currentVolName);
        });
    }
    storageOptionChanged(ephemeral) {
        if (ephemeral) {
            // Disable all fields
            this.volume.controls.type.disable();
            this.volume.controls.extraFields.get('rokUrl').disable();
            this.volume.controls.name.disable();
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
        }
        else if (!ephemeral && !this.selectedVolIsExistingType) {
            // New
            this.volume.controls.type.enable();
            this.volume.controls.name.enable();
            this.volume.controls.size.enable();
            this.volume.controls.mode.enable();
            this.volume.controls.extraFields.get('rokUrl').disable();
        }
        else {
            // Existing
            this.volume.controls.extraFields.get('rokUrl').enable();
        }
    }
}
RokVolumeComponent.ɵfac = function RokVolumeComponent_Factory(t) { return new (t || RokVolumeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_4__.RokService)); };
RokVolumeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RokVolumeComponent, selectors: [["app-rok-volume"]], inputs: { volume: "volume", notebookName: "notebookName", ephemeral: "ephemeral", pvcs: "pvcs", namespace: "namespace", storageClasses: "storageClasses", token: "token" }, decls: 1, vars: 1, consts: [["class", "row", 3, "formGroup", 4, "ngIf"], [1, "row", 3, "formGroup"], ["appearance", "outline", "id", "type", 1, "column"], ["formControlName", "type"], ["value", "New"], ["value", "Existing"], ["id", "rokUrl", "mode", "file", 1, "column", 3, "control", "urlPasted", "urlEntered"], ["id", "name", 1, "column", 3, "nameControl"], ["id", "size", "min", "1", "step", "1", "label", "Size in Gi", 1, "column", 3, "sizeControl"], ["appearance", "outline", "id", "path", 1, "column"], ["matInput", "", "formControlName", "path"]], template: function RokVolumeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, RokVolumeComponent_div_0_Template, 16, 4, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.volume);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatOption, kubeflow__WEBPACK_IMPORTED_MODULE_4__.RokUrlInputComponent, kubeflow__WEBPACK_IMPORTED_MODULE_4__.NameInputComponent, kubeflow__WEBPACK_IMPORTED_MODULE_4__.PositiveNumberInputComponent, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor], styles: ["#type[_ngcontent-%COMP%] {\n  max-width: 15%;\n}\n\n#size[_ngcontent-%COMP%] {\n  max-width: 10%;\n}\n\n#rokUrl[_ngcontent-%COMP%] {\n  max-width: 20%;\n}\n\n#name[_ngcontent-%COMP%] {\n  max-width: 30%;\n}\n\n#path[_ngcontent-%COMP%] {\n  max-width: 25%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvay12b2x1bWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoicm9rLXZvbHVtZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiN0eXBlIHtcbiAgbWF4LXdpZHRoOiAxNSU7XG59XG5cbiNzaXplIHtcbiAgbWF4LXdpZHRoOiAxMCU7XG59XG5cbiNyb2tVcmwge1xuICBtYXgtd2lkdGg6IDIwJTtcbn1cblxuI25hbWUge1xuICBtYXgtd2lkdGg6IDMwJTtcbn1cblxuI3BhdGgge1xuICBtYXgtd2lkdGg6IDI1JTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 5438:
/*!**********************************************!*\
  !*** ./src/app/pages/form/form-rok/types.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyJupyterLab": function() { return /* binding */ emptyJupyterLab; }
/* harmony export */ });
function emptyJupyterLab() {
    return {
        namespace: '',
        images: [],
        image: '',
        cpu: '',
        memory: '',
        workspace: {
            type: '',
            name: '',
            size: 1,
            path: '',
            mode: '',
            extraFields: {},
        },
        datavols: [],
        extra: '{}',
    };
}


/***/ }),

/***/ 4933:
/*!**********************************************!*\
  !*** ./src/app/pages/form/form-rok/utils.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRokVolumeControl": function() { return /* binding */ createRokVolumeControl; },
/* harmony export */   "addRokDataVolume": function() { return /* binding */ addRokDataVolume; },
/* harmony export */   "getJupyterLabFromRokURL": function() { return /* binding */ getJupyterLabFromRokURL; },
/* harmony export */   "getVolumeFromRokURL": function() { return /* binding */ getVolumeFromRokURL; },
/* harmony export */   "setLabValues": function() { return /* binding */ setLabValues; },
/* harmony export */   "setVolumeValues": function() { return /* binding */ setVolumeValues; }
/* harmony export */ });
/* harmony import */ var src_app_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/types */ 705);
/* harmony import */ var _form_default_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-default/utils */ 3261);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8002);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ 5438);






function createRokVolumeControl(vol) {
    const volCtrl = (0,_form_default_utils__WEBPACK_IMPORTED_MODULE_1__.createVolumeControl)(vol);
    // Set the rokUrl in extraFields
    const extraFields = volCtrl.get('extraFields');
    extraFields.addControl('rokUrl', new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('', []));
    extraFields.disable();
    return volCtrl;
}
function addRokDataVolume(formCtrl, vol = null) {
    // If no vol is provided create one with default values
    if (vol === null) {
        const l = formCtrl.value.datavols.length;
        const name = '{notebook-name}-vol-' + (l + 1);
        vol = {
            type: {
                value: 'New',
            },
            name: {
                value: name,
            },
            size: {
                value: '5',
            },
            mountPath: {
                value: '/home/jovyan/{volume-name}',
            },
            accessModes: {
                value: 'ReadWriteOnce',
            },
        };
    }
    // Push it to the control
    const vols = formCtrl.get('datavols');
    vols.push(createRokVolumeControl(vol));
}
// Functions to create Autofilled Rok Objects
function getJupyterLabFromRokURL(url, rok) {
    return rok.getObjectMetadata(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((headers) => {
        const notebook = (0,_types__WEBPACK_IMPORTED_MODULE_2__.emptyJupyterLab)();
        // Fill the notebook with the info from the response
        notebook.namespace = headers.get('X-Object-Meta-namespace');
        notebook.image = headers.get('X-Object-Meta-image');
        // Convert CPU to number
        notebook.cpu = headers.get('X-Object-Meta-cpu');
        if (typeof notebook.cpu === 'number') {
        }
        else if (notebook.cpu.includes('m')) {
            const cpu = parseInt(notebook.cpu.replace('m', ''), 10);
            notebook.cpu = cpu / 1000;
        }
        // Convert memory to Gi
        const memory = headers.get('X-Object-Meta-memory');
        if (memory.includes('G')) {
            notebook.memory = parseInt(memory.replace('G', ''), 10);
        }
        else if (memory.includes('M')) {
            notebook.memory = parseInt(memory.replace('M', ''), 10) / 1000;
        }
        else {
            notebook.memory = parseInt(memory, 10);
        }
        notebook.environment = headers.get('X-Object-Meta-environment');
        // Workspace Volume
        const workspaceRokUrl = headers.get('X-Object-Group-Member-0-URL');
        notebook.workspace.extraFields = {
            // rokUrl: baseUrl + obj + '?version=' + version,
            rokUrl: workspaceRokUrl,
        };
        // Data Volumes
        const volsNum = headers.get('X-Object-Group-Member-Count');
        for (let i = 1; i < parseInt(volsNum, 10); i++) {
            const volRokUrl = headers.get('X-Object-Group-Member-' + i + '-URL');
            const vol = (0,src_app_types__WEBPACK_IMPORTED_MODULE_0__.emptyVolume)();
            vol.extraFields = {
                // rokUrl: baseUrl + obj + '?version=' + version,
                rokUrl: volRokUrl,
            };
            notebook.datavols.push(vol);
        }
        return notebook;
    }));
}
function getVolumeFromRokURL(url, rok) {
    return rok.getObjectMetadata(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((headers) => {
        console.log(`Creating volume object from return metadata`);
        const volume = (0,src_app_types__WEBPACK_IMPORTED_MODULE_0__.emptyVolume)();
        // Fill the notebook with the info from the response
        volume.name = headers.get('X-Object-Meta-dataset');
        if (volume.name === null) {
            volume.name = headers.get('X-Object-Meta-workspace');
        }
        const size = parseInt(headers.get('Content-Length'), 10);
        volume.size = size / Math.pow(1024, 3);
        volume.path = headers.get('X-Object-Meta-mountpoint');
        console.log(`Created volume object: ${JSON.stringify(volume)}`);
        return volume;
    }));
}
// Functions for autofilling control values
function setLabValues(lab, formCtrl) {
    console.log(`Setting Jupyter Lab form values based on object: ${JSON.stringify(lab)}`);
    formCtrl.get('customImage').setValue(lab.image);
    formCtrl.get('customImageCheck').setValue(true);
    formCtrl.get('cpu').setValue(lab.cpu);
    formCtrl.get('memory').setValue(lab.memory);
    // Change env only if it exists
    if (lab.environment !== null) {
        formCtrl.get('environment').setValue(lab.environment);
    }
    // Set the workspace volume
    formCtrl
        .get('workspace')
        .get('extraFields')
        .get('rokUrl')
        .setValue(lab.workspace.extraFields.rokUrl);
    formCtrl.get('workspace').get('type').setValue('Existing');
    // Clear the existing Data Volumes array
    const dataVols = formCtrl.get('datavols');
    while (dataVols.length !== 0) {
        dataVols.removeAt(0);
    }
    for (const vol of lab.datavols) {
        addRokDataVolume(formCtrl);
    }
    // Set each volume to existing type
    const volsArr = formCtrl.get('datavols');
    for (let i = 0; i < lab.datavols.length; i++) {
        volsArr
            .at(i)
            .get('extraFields')
            .get('rokUrl')
            .setValue(lab.datavols[i].extraFields.rokUrl);
        volsArr.at(i).get('type').setValue('Existing');
    }
}
function setVolumeValues(vol, volCtrl) {
    console.log(`Setting Volume form values based on object: ${JSON.stringify(vol)}`);
    const volProps = { size: vol.size, name: vol.name, path: vol.path };
    for (const prop in volProps) {
        if (volProps.hasOwnProperty(prop)) {
            (0,kubeflow__WEBPACK_IMPORTED_MODULE_5__.updateControlNonNullValue)(volCtrl.get(prop), volProps[prop], `Provided volume has null value for property '${prop}'. ` +
                `Will NOT override the current value.`);
        }
    }
}


/***/ }),

/***/ 5804:
/*!**********************************************!*\
  !*** ./src/app/pages/form/form.component.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormComponent": function() { return /* binding */ FormComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _form_default_form_default_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-default/form-default.component */ 849);
/* harmony import */ var _form_rok_form_rok_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-rok/form-rok.component */ 5215);





function FormComponent_app_form_default_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-form-default");
} }
function FormComponent_app_form_rok_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-form-rok");
} }
class FormComponent {
    constructor() {
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() { }
}
FormComponent.ɵfac = function FormComponent_Factory(t) { return new (t || FormComponent)(); };
FormComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: FormComponent, selectors: [["app-form"]], decls: 2, vars: 2, consts: [[4, "ngIf"]], template: function FormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, FormComponent_app_form_default_0_Template, 1, 0, "app-form-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, FormComponent_app_form_rok_1_Template, 1, 0, "app-form-rok", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.env.ui === "default");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.env.ui === "rok");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _form_default_form_default_component__WEBPACK_IMPORTED_MODULE_1__.FormDefaultComponent, _form_rok_form_rok_component__WEBPACK_IMPORTED_MODULE_2__.FormRokComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 9552:
/*!*******************************************!*\
  !*** ./src/app/pages/form/form.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormModule": function() { return /* binding */ FormModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ 7817);
/* harmony import */ var _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-default/form-default.module */ 5903);
/* harmony import */ var _form_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form.component */ 5804);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _form_rok_form_rok_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-rok/form-rok.module */ 5052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);







class FormModule {
}
FormModule.ɵfac = function FormModule_Factory(t) { return new (t || FormModule)(); };
FormModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: FormModule });
FormModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher, useClass: kubeflow__WEBPACK_IMPORTED_MODULE_5__.ImmediateErrorStateMatcher },
    ], imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_0__.FormDefaultModule, _form_rok_form_rok_module__WEBPACK_IMPORTED_MODULE_2__.FormRokModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](FormModule, { declarations: [_form_component__WEBPACK_IMPORTED_MODULE_1__.FormComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _form_default_form_default_module__WEBPACK_IMPORTED_MODULE_0__.FormDefaultModule, _form_rok_form_rok_module__WEBPACK_IMPORTED_MODULE_2__.FormRokModule] }); })();


/***/ }),

/***/ 4295:
/*!*****************************************************!*\
  !*** ./src/app/pages/index/index-default/config.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDeleteDialogConfig": function() { return /* binding */ getDeleteDialogConfig; },
/* harmony export */   "getStopDialogConfig": function() { return /* binding */ getStopDialogConfig; },
/* harmony export */   "defaultConfig": function() { return /* binding */ defaultConfig; }
/* harmony export */ });
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _server_type_server_type_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server-type/server-type.component */ 1610);


// --- Configs for the Confirm Dialogs ---
function getDeleteDialogConfig(name) {
    return {
        title: $localize `Are you sure you want to delete this notebook server? ${name}`,
        message: $localize `Warning: Your data might be lost if the notebook server
                       is not backed by persistent storage`,
        accept: $localize `DELETE`,
        confirmColor: 'warn',
        cancel: $localize `CANCEL`,
        error: '',
        applying: $localize `DELETING`,
        width: '600px',
    };
}
function getStopDialogConfig(name) {
    return {
        title: $localize `Are you sure you want to stop this notebook server? ${name}`,
        message: $localize `Warning: Your data might be lost if the notebook server
                       is not backed by persistent storage.`,
        accept: $localize `STOP`,
        confirmColor: 'primary',
        cancel: $localize `CANCEL`,
        error: '',
        applying: $localize `STOPPING`,
        width: '600px',
    };
}
// --- Config for the Resource Table ---
const defaultConfig = {
    title: $localize `Kafka Clusters`,
    newButtonText: $localize `NEW CLUSTER`,
    columns: [
        {
            matHeaderCellDef: $localize `Status`,
            matColumnDef: 'status',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.StatusValue(),
        },
        {
            matHeaderCellDef: $localize `Name`,
            matColumnDef: 'name',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({
                field: 'name',
                truncate: kubeflow__WEBPACK_IMPORTED_MODULE_1__.TRUNCATE_TEXT_SIZE.SMALL,
                tooltipField: 'name',
            }),
        },
        {
            matHeaderCellDef: $localize `Type`,
            matColumnDef: 'type',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.ComponentValue({
                component: _server_type_server_type_component__WEBPACK_IMPORTED_MODULE_0__.ServerTypeComponent,
            }),
        },
        {
            matHeaderCellDef: $localize `Age`,
            matColumnDef: 'age',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({ field: 'age' }),
        },
        {
            matHeaderCellDef: $localize `Image`,
            matColumnDef: 'image',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({
                field: 'shortImage',
                tooltipField: 'image',
                truncate: kubeflow__WEBPACK_IMPORTED_MODULE_1__.TRUNCATE_TEXT_SIZE.MEDIUM,
            }),
        },
        {
            matHeaderCellDef: $localize `GPUs`,
            matColumnDef: 'gpus',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({
                field: 'gpus.count',
                tooltipField: 'gpus.message',
            }),
        },
        {
            matHeaderCellDef: $localize `CPUs`,
            matColumnDef: 'cpu',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({ field: 'cpu' }),
        },
        {
            matHeaderCellDef: $localize `Memory`,
            matColumnDef: 'memory',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.PropertyValue({ field: 'memory' }),
        },
        {
            matHeaderCellDef: $localize `Volumes`,
            matColumnDef: 'volumes',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.MenuValue({ field: 'volumes', itemsIcon: 'storage' }),
        },
        {
            matHeaderCellDef: '',
            matColumnDef: 'actions',
            value: new kubeflow__WEBPACK_IMPORTED_MODULE_1__.ActionListValue([
                new kubeflow__WEBPACK_IMPORTED_MODULE_1__.ActionButtonValue({
                    name: 'connect',
                    tooltip: $localize `Connect to this notebook server`,
                    color: 'primary',
                    field: 'connectAction',
                    text: $localize `CONNECT`,
                }),
                new kubeflow__WEBPACK_IMPORTED_MODULE_1__.ActionIconValue({
                    name: 'start-stop',
                    tooltipInit: $localize `Stop this notebook server`,
                    tooltipReady: $localize `Start this notebook server`,
                    color: '',
                    field: 'startStopAction',
                    iconInit: 'material:stop',
                    iconReady: 'material:play_arrow',
                }),
                new kubeflow__WEBPACK_IMPORTED_MODULE_1__.ActionIconValue({
                    name: 'delete',
                    tooltip: $localize `Delete this notebook server`,
                    color: '',
                    field: 'deleteAction',
                    iconReady: 'material:delete',
                }),
            ]),
        },
    ],
};


/***/ }),

/***/ 946:
/*!**********************************************************************!*\
  !*** ./src/app/pages/index/index-default/index-default.component.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexDefaultComponent": function() { return /* binding */ IndexDefaultComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 826);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ 4295);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 3815);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 8583);










function IndexDefaultComponent_lib_namespace_select_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "lib-namespace-select");
} }
class IndexDefaultComponent {
    constructor(ns, backend, confirmDialog, snackBar, router) {
        this.ns = ns;
        this.backend = backend;
        this.confirmDialog = confirmDialog;
        this.snackBar = snackBar;
        this.router = router;
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
        this.currNamespace = '';
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription();
        this.config = _config__WEBPACK_IMPORTED_MODULE_1__.defaultConfig;
        this.rawData = [];
        this.processedData = [];
    }
    ngOnInit() {
        this.poller = new kubeflow__WEBPACK_IMPORTED_MODULE_6__.ExponentialBackoff({ interval: 1000, retries: 3 });
        // Poll for new data and reset the poller if different data is found
        this.subs.add(this.poller.start().subscribe(() => {
            if (!this.currNamespace) {
                return;
            }
            this.backend.getNotebooks(this.currNamespace).subscribe(notebooks => {
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEqual)(this.rawData, notebooks)) {
                    this.rawData = notebooks;
                    // Update the frontend's state
                    this.processedData = this.processIncomingData(notebooks);
                    this.poller.reset();
                }
            });
        }));
        // Reset the poller whenever the selected namespace changes
        this.subs.add(this.ns.getSelectedNamespace().subscribe(ns => {
            this.currNamespace = ns;
            this.poller.reset();
        }));
    }
    ngOnDestroy() {
        this.subs.unsubscribe();
        this.poller.stop();
    }
    // Event handling functions
    reactToAction(a) {
        switch (a.action) {
            case 'newResourceButton': // TODO: could also use enums here
                this.newResourceClicked();
                break;
            case 'delete':
                this.deleteVolumeClicked(a.data);
                break;
            case 'connect':
                this.connectClicked(a.data);
                break;
            case 'start-stop':
                this.startStopClicked(a.data);
                break;
        }
    }
    newResourceClicked() {
        // Redirect to form page
        this.router.navigate(['/new']);
    }
    deleteVolumeClicked(notebook) {
        const deleteDialogConfig = (0,_config__WEBPACK_IMPORTED_MODULE_1__.getDeleteDialogConfig)(notebook.name);
        const ref = this.confirmDialog.open(notebook.name, deleteDialogConfig);
        const delSub = ref.componentInstance.applying$.subscribe(applying => {
            if (!applying) {
                return;
            }
            // Close the open dialog only if the DELETE request succeeded
            this.backend.deleteNotebook(this.currNamespace, notebook.name).subscribe({
                next: _ => {
                    this.poller.reset();
                    ref.close(kubeflow__WEBPACK_IMPORTED_MODULE_6__.DIALOG_RESP.ACCEPT);
                },
                error: err => {
                    const errorMsg = err;
                    deleteDialogConfig.error = errorMsg;
                    ref.componentInstance.applying$.next(false);
                },
            });
            // DELETE request has succeeded
            ref.afterClosed().subscribe(res => {
                delSub.unsubscribe();
                if (res !== kubeflow__WEBPACK_IMPORTED_MODULE_6__.DIALOG_RESP.ACCEPT) {
                    return;
                }
                notebook.status.phase = kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.TERMINATING;
                notebook.status.message = 'Preparing to delete the Notebook...';
                this.updateNotebookFields(notebook);
            });
        });
    }
    connectClicked(notebook) {
        // Open new tab to work on the Notebook
        window.open(`/notebook/${notebook.namespace}/${notebook.name}/`);
    }
    startStopClicked(notebook) {
        if (notebook.status.phase === kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.STOPPED) {
            this.startNotebook(notebook);
        }
        else {
            this.stopNotebook(notebook);
        }
    }
    startNotebook(notebook) {
        this.snackBar.open($localize `Starting Notebook server '${notebook.name}'...`, kubeflow__WEBPACK_IMPORTED_MODULE_6__.SnackType.Info, 3000);
        notebook.status.phase = kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.WAITING;
        notebook.status.message = 'Starting the Notebook Server...';
        this.updateNotebookFields(notebook);
        this.backend.startNotebook(notebook).subscribe(() => {
            this.poller.reset();
        });
    }
    stopNotebook(notebook) {
        const stopDialogConfig = (0,_config__WEBPACK_IMPORTED_MODULE_1__.getStopDialogConfig)(notebook.name);
        const ref = this.confirmDialog.open(notebook.name, stopDialogConfig);
        const stopSub = ref.componentInstance.applying$.subscribe(applying => {
            if (!applying) {
                return;
            }
            // Close the open dialog only if the request succeeded
            this.backend.stopNotebook(notebook).subscribe({
                next: _ => {
                    this.poller.reset();
                    ref.close(kubeflow__WEBPACK_IMPORTED_MODULE_6__.DIALOG_RESP.ACCEPT);
                },
                error: err => {
                    const errorMsg = err;
                    stopDialogConfig.error = errorMsg;
                    ref.componentInstance.applying$.next(false);
                },
            });
            // request has succeeded
            ref.afterClosed().subscribe(res => {
                stopSub.unsubscribe();
                if (res !== kubeflow__WEBPACK_IMPORTED_MODULE_6__.DIALOG_RESP.ACCEPT) {
                    return;
                }
                this.snackBar.open($localize `Stopping Notebook server '${notebook.name}'...`, kubeflow__WEBPACK_IMPORTED_MODULE_6__.SnackType.Info, 3000);
                notebook.status.phase = kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.TERMINATING;
                notebook.status.message = 'Preparing to stop the Notebook Server...';
                this.updateNotebookFields(notebook);
            });
        });
    }
    // Data processing functions
    updateNotebookFields(notebook) {
        notebook.deleteAction = this.processDeletionActionStatus(notebook);
        notebook.connectAction = this.processConnectActionStatus(notebook);
        notebook.startStopAction = this.processStartStopActionStatus(notebook);
    }
    processIncomingData(notebooks) {
        const notebooksCopy = JSON.parse(JSON.stringify(notebooks));
        for (const nb of notebooksCopy) {
            this.updateNotebookFields(nb);
        }
        return notebooksCopy;
    }
    // Action handling functions
    processDeletionActionStatus(notebook) {
        if (notebook.status.phase !== kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.TERMINATING) {
            return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.READY;
        }
        return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.TERMINATING;
    }
    processStartStopActionStatus(notebook) {
        // Stop button
        if (notebook.status.phase === kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.READY) {
            return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.UNINITIALIZED;
        }
        // Start button
        if (notebook.status.phase === kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.STOPPED) {
            return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.READY;
        }
        // If it is terminating, then the action should be disabled
        if (notebook.status.phase === kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.TERMINATING) {
            return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.UNAVAILABLE;
        }
        // If the Notebook is not Terminating, then always allow the stop action
        return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.UNINITIALIZED;
    }
    processConnectActionStatus(notebook) {
        if (notebook.status.phase !== kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.READY) {
            return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.UNAVAILABLE;
        }
        return kubeflow__WEBPACK_IMPORTED_MODULE_6__.STATUS_TYPE.READY;
    }
    notebookTrackByFn(index, notebook) {
        return `${notebook.name}/${notebook.image}`;
    }
}
IndexDefaultComponent.ɵfac = function IndexDefaultComponent_Factory(t) { return new (t || IndexDefaultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_6__.NamespaceService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_3__.JWABackendService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_6__.ConfirmDialogService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_6__.SnackBarService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router)); };
IndexDefaultComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: IndexDefaultComponent, selectors: [["app-index-default"]], decls: 2, vars: 4, consts: [[4, "ngIf"], [3, "config", "data", "trackByFn", "actionsEmitter"]], template: function IndexDefaultComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, IndexDefaultComponent_lib_namespace_select_0_Template, 1, 0, "lib-namespace-select", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "lib-resource-table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("actionsEmitter", function IndexDefaultComponent_Template_lib_resource_table_actionsEmitter_1_listener($event) { return ctx.reactToAction($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.env.production);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("config", ctx.config)("data", ctx.processedData)("trackByFn", ctx.notebookTrackByFn);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, kubeflow__WEBPACK_IMPORTED_MODULE_6__.ResourceTableComponent, kubeflow__WEBPACK_IMPORTED_MODULE_6__.NamespaceSelectComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmRleC1kZWZhdWx0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 7390:
/*!*******************************************************************!*\
  !*** ./src/app/pages/index/index-default/index-default.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexDefaultModule": function() { return /* binding */ IndexDefaultModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _index_default_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-default.component */ 946);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);




class IndexDefaultModule {
}
IndexDefaultModule.ɵfac = function IndexDefaultModule_Factory(t) { return new (t || IndexDefaultModule)(); };
IndexDefaultModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: IndexDefaultModule });
IndexDefaultModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_3__.ResourceTableModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceSelectModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_3__.ConfirmDialogModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](IndexDefaultModule, { declarations: [_index_default_component__WEBPACK_IMPORTED_MODULE_0__.IndexDefaultComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_3__.ResourceTableModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceSelectModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_3__.ConfirmDialogModule], exports: [_index_default_component__WEBPACK_IMPORTED_MODULE_0__.IndexDefaultComponent] }); })();


/***/ }),

/***/ 1610:
/*!********************************************************************************!*\
  !*** ./src/app/pages/index/index-default/server-type/server-type.component.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerTypeComponent": function() { return /* binding */ ServerTypeComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);





function ServerTypeComponent_mat_icon_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 3);
} }
function ServerTypeComponent_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 4);
} }
function ServerTypeComponent_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-icon", 5);
} }
class ServerTypeComponent {
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('jupyterlab-icon', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.jupyterIcon));
        iconRegistry.addSvgIcon('group-one-icon', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.groupOneIcon));
        iconRegistry.addSvgIcon('group-two-icon', sanitizer.bypassSecurityTrustResourceUrl(_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.groupTwoIcon));
    }
    set element(notebook) {
        this.notebookServerType = notebook.serverType;
    }
}
ServerTypeComponent.ɵfac = function ServerTypeComponent_Factory(t) { return new (t || ServerTypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIconRegistry), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.DomSanitizer)); };
ServerTypeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ServerTypeComponent, selectors: [["app-server-type"]], decls: 3, vars: 3, consts: [["svgIcon", "jupyterlab-icon", "aria-hidden", "false", "aria-label", "JupyterLab based server", 4, "ngIf"], ["svgIcon", "group-one-icon", "aria-hidden", "false", "aria-label", "Group One based server", 4, "ngIf"], ["svgIcon", "group-two-icon", "aria-hidden", "false", "aria-label", "Group Two based server", 4, "ngIf"], ["svgIcon", "jupyterlab-icon", "aria-hidden", "false", "aria-label", "JupyterLab based server"], ["svgIcon", "group-one-icon", "aria-hidden", "false", "aria-label", "Group One based server"], ["svgIcon", "group-two-icon", "aria-hidden", "false", "aria-label", "Group Two based server"]], template: function ServerTypeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ServerTypeComponent_mat_icon_0_Template, 1, 0, "mat-icon", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ServerTypeComponent_mat_icon_1_Template, 1, 0, "mat-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ServerTypeComponent_mat_icon_2_Template, 1, 0, "mat-icon", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.notebookServerType === "jupyter");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.notebookServerType === "group-one");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.notebookServerType === "group-two");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__.MatIcon], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXJ2ZXItdHlwZS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 3258:
/*!**************************************************************!*\
  !*** ./src/app/pages/index/index-rok/index-rok.component.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexRokComponent": function() { return /* binding */ IndexRokComponent; }
/* harmony export */ });
/* harmony import */ var _index_default_index_default_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index-default/index-default.component */ 946);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/backend.service */ 600);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8583);






function IndexRokComponent_lib_namespace_select_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "lib-namespace-select");
} }
class IndexRokComponent extends _index_default_index_default_component__WEBPACK_IMPORTED_MODULE_0__.IndexDefaultComponent {
    constructor(rok, ns, backend, confirmDialog, popup, router) {
        super(ns, backend, confirmDialog, popup, router);
        this.rok = rok;
        this.ns = ns;
        this.backend = backend;
        this.confirmDialog = confirmDialog;
        this.popup = popup;
        this.router = router;
        this.rok.initCSRF();
    }
}
IndexRokComponent.ɵfac = function IndexRokComponent_Factory(t) { return new (t || IndexRokComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.RokService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_backend_service__WEBPACK_IMPORTED_MODULE_1__.JWABackendService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.ConfirmDialogService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](kubeflow__WEBPACK_IMPORTED_MODULE_3__.SnackBarService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router)); };
IndexRokComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: IndexRokComponent, selectors: [["app-index-rok"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 4, consts: [[4, "ngIf"], [3, "config", "data", "trackByFn", "actionsEmitter"]], template: function IndexRokComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, IndexRokComponent_lib_namespace_select_0_Template, 1, 0, "lib-namespace-select", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "lib-resource-table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("actionsEmitter", function IndexRokComponent_Template_lib_resource_table_actionsEmitter_1_listener($event) { return ctx.reactToAction($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.env.production);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("config", ctx.config)("data", ctx.processedData)("trackByFn", ctx.notebookTrackByFn);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, kubeflow__WEBPACK_IMPORTED_MODULE_3__.ResourceTableComponent, kubeflow__WEBPACK_IMPORTED_MODULE_3__.NamespaceSelectComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmRleC1kZWZhdWx0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 3901:
/*!***********************************************************!*\
  !*** ./src/app/pages/index/index-rok/index-rok.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexRokModule": function() { return /* binding */ IndexRokModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _index_rok_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-rok.component */ 3258);
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index-default/index-default.module */ 7390);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);





class IndexRokModule {
}
IndexRokModule.ɵfac = function IndexRokModule_Factory(t) { return new (t || IndexRokModule)(); };
IndexRokModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: IndexRokModule });
IndexRokModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_4__.ResourceTableModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_4__.NamespaceSelectModule,
            kubeflow__WEBPACK_IMPORTED_MODULE_4__.ConfirmDialogModule,
            _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__.IndexDefaultModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](IndexRokModule, { declarations: [_index_rok_component__WEBPACK_IMPORTED_MODULE_0__.IndexRokComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_4__.ResourceTableModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_4__.NamespaceSelectModule,
        kubeflow__WEBPACK_IMPORTED_MODULE_4__.ConfirmDialogModule,
        _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__.IndexDefaultModule], exports: [_index_rok_component__WEBPACK_IMPORTED_MODULE_0__.IndexRokComponent] }); })();


/***/ }),

/***/ 7479:
/*!************************************************!*\
  !*** ./src/app/pages/index/index.component.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexComponent": function() { return /* binding */ IndexComponent; }
/* harmony export */ });
/* harmony import */ var _app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/environment */ 2340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _index_default_index_default_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-default/index-default.component */ 946);
/* harmony import */ var _index_rok_index_rok_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-rok/index-rok.component */ 3258);





function IndexComponent_app_index_default_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-index-default");
} }
function IndexComponent_app_index_rok_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-index-rok");
} }
class IndexComponent {
    constructor() {
        this.env = _app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() { }
}
IndexComponent.ɵfac = function IndexComponent_Factory(t) { return new (t || IndexComponent)(); };
IndexComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: IndexComponent, selectors: [["app-index"]], decls: 2, vars: 2, consts: [[4, "ngIf"]], template: function IndexComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, IndexComponent_app_index_default_0_Template, 1, 0, "app-index-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, IndexComponent_app_index_rok_1_Template, 1, 0, "app-index-rok", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.env.ui === "default");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.env.ui === "rok");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _index_default_index_default_component__WEBPACK_IMPORTED_MODULE_1__.IndexDefaultComponent, _index_rok_index_rok_component__WEBPACK_IMPORTED_MODULE_2__.IndexRokComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmRleC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 1023:
/*!*********************************************!*\
  !*** ./src/app/pages/index/index.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexModule": function() { return /* binding */ IndexModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 6627);
/* harmony import */ var _index_rok_index_rok_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-rok/index-rok.module */ 3901);
/* harmony import */ var _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-default/index-default.module */ 7390);
/* harmony import */ var _index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.component */ 7479);
/* harmony import */ var _index_default_server_type_server_type_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index-default/server-type/server-type.component */ 1610);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tooltip */ 1436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);








class IndexModule {
}
IndexModule.ɵfac = function IndexModule_Factory(t) { return new (t || IndexModule)(); };
IndexModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: IndexModule });
IndexModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _index_rok_index_rok_module__WEBPACK_IMPORTED_MODULE_0__.IndexRokModule,
            _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__.IndexDefaultModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__.MatTooltipModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](IndexModule, { declarations: [_index_component__WEBPACK_IMPORTED_MODULE_2__.IndexComponent, _index_default_server_type_server_type_component__WEBPACK_IMPORTED_MODULE_3__.ServerTypeComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _index_rok_index_rok_module__WEBPACK_IMPORTED_MODULE_0__.IndexRokModule,
        _index_default_index_default_module__WEBPACK_IMPORTED_MODULE_1__.IndexDefaultModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__.MatTooltipModule] }); })();


/***/ }),

/***/ 600:
/*!*********************************************!*\
  !*** ./src/app/services/backend.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JWABackendService": function() { return /* binding */ JWABackendService; }
/* harmony export */ });
/* harmony import */ var kubeflow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kubeflow */ 872);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 5304);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8002);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 1841);





class JWABackendService extends kubeflow__WEBPACK_IMPORTED_MODULE_0__.BackendService {
    constructor(http, snackBar) {
        super(http, snackBar);
        this.http = http;
        this.snackBar = snackBar;
    }
    // GET
    getNotebooks(namespace) {
        const url = `api/namespaces/${namespace}/kafkas`;
        return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((resp) => {
            return resp.notebooks;
        }));
    }
    getConfig() {
        const url = `api/config`;
        return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(data => {
            return data.config;
        }));
    }
    getVolumes(ns) {
        // Get existing PVCs in a namespace
        const url = `api/namespaces/${ns}/pvcs`;
        return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(data => {
            return data.pvcs;
        }));
    }
    getPodDefaults(ns) {
        // Get existing PodDefaults in a namespace
        const url = `api/namespaces/${ns}/poddefaults`;
        return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(data => {
            return data.poddefaults;
        }));
    }
    getGPUVendors() {
        // Get installed GPU vendors
        const url = `api/gpus`;
        return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(data => data.vendors));
    }
    // POST
    createNotebook(notebook) {
        const url = `api/namespaces/${notebook.namespace}/kafkas`;
        return this.http.post(url, notebook).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(_ => {
            return 'posted';
        }));
    }
    // POST
    createEphemeralKafka(kafka) {
        const url = `api/namespaces/${kafka.namespace}/kafkas`;
        return this.http.post(url, kafka).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(_ => {
            return 'posted';
        }));
    }
    // PATCH
    startNotebook(notebook) {
        const name = notebook.name;
        const namespace = notebook.namespace;
        const url = `api/namespaces/${namespace}/kafkas/${name}`;
        return this.http.patch(url, { stopped: false }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(_ => {
            return 'started';
        }));
    }
    stopNotebook(notebook) {
        const name = notebook.name;
        const namespace = notebook.namespace;
        const url = `api/namespaces/${namespace}/kafkas/${name}`;
        return this.http.patch(url, { stopped: true }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error, false)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(_ => {
            return 'stopped';
        }));
    }
    // DELETE
    deleteNotebook(namespace, name) {
        const url = `api/namespaces/${namespace}/kafkas/${name}`;
        return this.http
            .delete(url)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => this.handleError(error, false)));
    }
}
JWABackendService.ɵfac = function JWABackendService_Factory(t) { return new (t || JWABackendService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](kubeflow__WEBPACK_IMPORTED_MODULE_0__.SnackBarService)); };
JWABackendService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: JWABackendService, factory: JWABackendService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 705:
/*!**************************!*\
  !*** ./src/app/types.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyVolume": function() { return /* binding */ emptyVolume; }
/* harmony export */ });
function emptyVolume() {
    return {
        type: '',
        name: '',
        size: 1,
        path: '',
        mode: '',
        extraFields: {},
        templatedName: '',
    };
}


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": function() { return /* binding */ environment; }
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiUrl: 'http://127.0.0.1:5000/',
    resource: 'kafkas',
    ui: 'default',
    jupyterlabLogo: 'static/assets/logos/jupyterlab-logo.svg',
    jupyterIcon: 'static/assets/logos/jupyter-icon.svg',
    groupOneLogo: 'static/assets/logos/group-one-logo.svg',
    groupOneIcon: 'static/assets/logos/group-one-icon.svg',
    groupTwoLogo: 'static/assets/logos/group-two-logo.svg',
    groupTwoIcon: 'static/assets/logos/group-two-icon.svg',
    // Rok specifics
    rokUrl: '',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 9075);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendor"], function() { return __webpack_exec__(4431); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main-es2015.570e5cda131eaf18c87d.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _main_table_main_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-table/main-table.component */ "./src/app/main-table/main-table.component.ts");
/* harmony import */ var _resource_form_resource_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resource-form/resource-form.component */ "./src/app/resource-form/resource-form.component.ts");





var routes = [
    { path: '', component: _main_table_main_table_component__WEBPACK_IMPORTED_MODULE_3__["MainTableComponent"] },
    { path: 'new', component: _resource_form_resource_form_component__WEBPACK_IMPORTED_MODULE_4__["ResourceFormComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div>\n  <!-- <app-headbar></app-headbar> -->\n</div>\n\n<router-outlet>\n\n</router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Volumes';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "./node_modules/@fortawesome/free-brands-svg-icons/index.es.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _utils_imports__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/imports */ "./src/app/utils/imports.ts");
/* harmony import */ var _services_namespace_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/namespace.service */ "./src/app/services/namespace.service.ts");
/* harmony import */ var _services_kubernetes_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/kubernetes.service */ "./src/app/services/kubernetes.service.ts");
/* harmony import */ var _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/snack-bar.service */ "./src/app/services/snack-bar.service.ts");
/* harmony import */ var _main_table_main_table_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./main-table/main-table.component */ "./src/app/main-table/main-table.component.ts");
/* harmony import */ var _main_table_namespace_select_namespace_select_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./main-table/namespace-select/namespace-select.component */ "./src/app/main-table/namespace-select/namespace-select.component.ts");
/* harmony import */ var _main_table_resource_table_resource_table_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./main-table/resource-table/resource-table.component */ "./src/app/main-table/resource-table/resource-table.component.ts");
/* harmony import */ var _services_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/snack-bar/snack-bar.component */ "./src/app/services/snack-bar/snack-bar.component.ts");
/* harmony import */ var _resource_form_resource_form_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./resource-form/resource-form.component */ "./src/app/resource-form/resource-form.component.ts");
/* harmony import */ var _main_table_resource_table_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./main-table/resource-table/confirm-dialog/confirm-dialog.component */ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var _resource_form_volume_volume_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./resource-form/volume/volume.component */ "./src/app/resource-form/volume/volume.component.ts");
/* harmony import */ var _resource_form_volume_new_volume_form_new_volume_form_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./resource-form/volume/new-volume-form/new-volume-form.component */ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.ts");
























var AppModule = /** @class */ (function () {
    function AppModule() {
        _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_7__["library"].add(_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_9__["fab"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_8__["fas"]);
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
                _main_table_main_table_component__WEBPACK_IMPORTED_MODULE_16__["MainTableComponent"],
                _main_table_namespace_select_namespace_select_component__WEBPACK_IMPORTED_MODULE_17__["NamespaceSelectComponent"],
                _main_table_resource_table_resource_table_component__WEBPACK_IMPORTED_MODULE_18__["ResourceTableComponent"],
                _services_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_19__["SnackBarComponent"],
                _resource_form_resource_form_component__WEBPACK_IMPORTED_MODULE_20__["ResourceFormComponent"],
                _main_table_resource_table_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_21__["ConfirmDialogComponent"],
                _resource_form_volume_volume_component__WEBPACK_IMPORTED_MODULE_22__["VolumeComponent"],
                _resource_form_volume_new_volume_form_new_volume_form_component__WEBPACK_IMPORTED_MODULE_23__["NewVolumeFormComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _utils_imports__WEBPACK_IMPORTED_MODULE_12__["MaterialImportsModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            ],
            providers: [
                _services_namespace_service__WEBPACK_IMPORTED_MODULE_13__["NamespaceService"],
                _services_kubernetes_service__WEBPACK_IMPORTED_MODULE_14__["KubernetesService"],
                _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_15__["SnackBarService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"]],
            entryComponents: [
                _services_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_19__["SnackBarComponent"],
                _main_table_resource_table_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_21__["ConfirmDialogComponent"],
                _resource_form_volume_new_volume_form_new_volume_form_component__WEBPACK_IMPORTED_MODULE_23__["NewVolumeFormComponent"],
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/main-table/main-table.component.html":
/*!******************************************************!*\
  !*** ./src/app/main-table/main-table.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Namespaces Selector -->\n<div class='parent'>\n  <div class=\"spacer\"></div>\n  <app-namespace-select></app-namespace-select>\n  <div class=\"spacer\"></div>\n</div>\n\n<!-- The Table showing our Resource -->\n<div class='parent'>\n  <div class=\"spacer\"></div>\n  <app-resource-table></app-resource-table>\n  <div class=\"spacer\"></div>\n</div>"

/***/ }),

/***/ "./src/app/main-table/main-table.component.scss":
/*!******************************************************!*\
  !*** ./src/app/main-table/main-table.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".parent {\n  display: flex; }\n\n.spacer {\n  flex-grow: 1; }\n\napp-namespace-select {\n  padding-top: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9tYWluLXRhYmxlL21haW4tdGFibGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksWUFBWSxFQUFBOztBQUdoQjtFQUNJLGlCQUFpQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWFpbi10YWJsZS9tYWluLXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhcmVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLnNwYWNlciB7XG4gICAgZmxleC1ncm93OiAxO1xufVxuXG5hcHAtbmFtZXNwYWNlLXNlbGVjdCB7XG4gICAgcGFkZGluZy10b3A6IDIwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/main-table/main-table.component.ts":
/*!****************************************************!*\
  !*** ./src/app/main-table/main-table.component.ts ***!
  \****************************************************/
/*! exports provided: MainTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainTableComponent", function() { return MainTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MainTableComponent = /** @class */ (function () {
    function MainTableComponent() {
        this.namespaces = [];
    }
    MainTableComponent.prototype.ngOnInit = function () {
    };
    MainTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-main-table',
            template: __webpack_require__(/*! ./main-table.component.html */ "./src/app/main-table/main-table.component.html"),
            styles: [__webpack_require__(/*! ./main-table.component.scss */ "./src/app/main-table/main-table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MainTableComponent);
    return MainTableComponent;
}());



/***/ }),

/***/ "./src/app/main-table/namespace-select/namespace-select.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/main-table/namespace-select/namespace-select.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Namespaces Selector -->\n<mat-form-field>\n  <mat-label>Select Namespace</mat-label>\n  <mat-select [(ngModel)]=\"currNamespace\" name=\"namespacesSelect\"\n              (selectionChange)=\"namespaceChanged($event.value)\">\n    <mat-option *ngFor=\"let namespace of namespaces\" [value]=\"namespace\">\n      {{ namespace }}\n    </mat-option>\n  </mat-select>\n</mat-form-field>"

/***/ }),

/***/ "./src/app/main-table/namespace-select/namespace-select.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/main-table/namespace-select/namespace-select.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4tdGFibGUvbmFtZXNwYWNlLXNlbGVjdC9uYW1lc3BhY2Utc2VsZWN0LmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/main-table/namespace-select/namespace-select.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/main-table/namespace-select/namespace-select.component.ts ***!
  \***************************************************************************/
/*! exports provided: NamespaceSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NamespaceSelectComponent", function() { return NamespaceSelectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_services_namespace_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/namespace.service */ "./src/app/services/namespace.service.ts");
/* harmony import */ var src_app_services_kubernetes_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/kubernetes.service */ "./src/app/services/kubernetes.service.ts");
/* harmony import */ var src_app_utils_polling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/polling */ "./src/app/utils/polling.ts");






var NamespaceSelectComponent = /** @class */ (function () {
    function NamespaceSelectComponent(namespaceService, k8s) {
        this.namespaceService = namespaceService;
        this.k8s = k8s;
        this.namespaces = [];
        this.poller = new src_app_utils_polling__WEBPACK_IMPORTED_MODULE_5__["ExponentialBackoff"]();
    }
    NamespaceSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Poll untill you get existing Namespaces
        this.poller.start().subscribe(function () {
            _this.k8s.getNamespaces().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["first"])()).subscribe(function (namespaces) {
                _this.namespaces = namespaces;
                if (!_this.currNamespace || _this.currNamespace.length === 0) {
                    _this.namespaceService.updateSelectedNamespace('kubeflow');
                }
                else {
                    _this.namespaceService.updateSelectedNamespace(_this.currNamespace);
                }
                // stop polling
                _this.poller.stop();
                _this.poller.getPoller().unsubscribe();
            });
        });
        // Keep track of the selected namespace
        this.namespaceService.getSelectedNamespace().subscribe(function (namespace) {
            _this.currNamespace = namespace;
        });
    };
    NamespaceSelectComponent.prototype.namespaceChanged = function (namespace) {
        this.namespaceService.updateSelectedNamespace(namespace);
    };
    NamespaceSelectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-namespace-select',
            template: __webpack_require__(/*! ./namespace-select.component.html */ "./src/app/main-table/namespace-select/namespace-select.component.html"),
            styles: [__webpack_require__(/*! ./namespace-select.component.scss */ "./src/app/main-table/namespace-select/namespace-select.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_namespace_service__WEBPACK_IMPORTED_MODULE_3__["NamespaceService"],
            src_app_services_kubernetes_service__WEBPACK_IMPORTED_MODULE_4__["KubernetesService"]])
    ], NamespaceSelectComponent);
    return NamespaceSelectComponent;
}());



/***/ }),

/***/ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.title}}</h1>\n<div mat-dialog-content>\n  <p>{{data.message}}</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data.no\" cdkFocusInitial>{{data.no.toUpperCase()}}</button>\n  <button mat-button [mat-dialog-close]=\"data.yes\" >{{data.yes.toUpperCase()}}</button>\n</div>\n"

/***/ }),

/***/ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4tdGFibGUvcmVzb3VyY2UtdGFibGUvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ConfirmDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmDialogComponent", function() { return ConfirmDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close('no');
    };
    ConfirmDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-confirm-dialog',
            template: __webpack_require__(/*! ./confirm-dialog.component.html */ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.html"),
            styles: [__webpack_require__(/*! ./confirm-dialog.component.scss */ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], ConfirmDialogComponent);
    return ConfirmDialogComponent;
}());



/***/ }),

/***/ "./src/app/main-table/resource-table/resource-table.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/main-table/resource-table/resource-table.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"mat-elevation-z4\">\n\n  <div class=\"header\">\n    <p>Notebook Servers</p>\n\n    <div class=\"spacer\"></div>\n\n    <a routerLink=\"/new\">\n      <button mat-button id=\"add-nb\" color=primary>\n        <mat-icon>add</mat-icon>NEW SERVER\n      </button>\n    </a>\n  </div>\n\n  <mat-divider></mat-divider>\n  \n  <mat-card-content>\n    <table mat-table [dataSource]=\"dataSource\" [trackBy]=\"trackByFn\" matSort>\n      <!-- Status Column -->\n      <ng-container matColumnDef=\"status\">\n        <th mat-header-cell *matHeaderCellDef> Status </th>\n        <td mat-cell *matCellDef=\"let elem\">\n          <!-- Running -->\n          <mat-icon *ngIf=\"elem.status === 'running'\" [ngClass]=\"['running', 'status']\"\n                    [matTooltip]=\"elem.reason\">check_circle\n          </mat-icon>\n\n          <!-- Warning -->\n          <mat-icon *ngIf=\"elem.status === 'warning'\" [ngClass]=\"['warning', 'status']\"\n                    [matTooltip]=\"elem.reason\">warning\n          </mat-icon>\n\n          <!-- Error -->\n          <mat-icon *ngIf=\"elem.status === 'error'\" [ngClass]=\"['error', 'status']\"\n                    [matTooltip]=\"elem.reason\">clear\n          </mat-icon>\n\n          <!-- Waiting -->\n          <mat-spinner *ngIf=\"elem.status === 'waiting'\" [matTooltip]=\"elem.reason\"\n                       diameter=24 class='inline'>\n          </mat-spinner>\n        </td>\n      </ng-container>\n      \n      <!-- Name Column -->\n      <ng-container matColumnDef=\"name\">\n        <th mat-header-cell *matHeaderCellDef> Name </th>\n        <td mat-cell *matCellDef=\"let elem\"> {{elem.name}} </td>\n      </ng-container>\n\n      <!-- Age Column -->\n      <ng-container matColumnDef=\"age\">\n        <th mat-header-cell *matHeaderCellDef> Age </th>\n        <td mat-cell *matCellDef=\"let elem\"> {{elem.age}} </td>\n      </ng-container>\n\n      <!-- Image Column -->\n      <ng-container matColumnDef=\"image\">\n        <th mat-header-cell *matHeaderCellDef> Image </th>\n        <td mat-cell *matCellDef=\"let elem\"> \n          <span [matTooltip]=\"elem.image\">{{elem.shortImage}}</span> </td>\n      </ng-container>\n\n      <!-- CPU Column -->\n      <ng-container matColumnDef=\"cpu\">\n        <th mat-header-cell *matHeaderCellDef> CPU </th>\n        <td mat-cell *matCellDef=\"let elem\"> {{elem.cpu}} </td>\n      </ng-container>\n\n      <!-- Memory Column -->\n      <ng-container matColumnDef=\"memory\">\n        <th mat-header-cell *matHeaderCellDef> Memory </th>\n        <td mat-cell *matCellDef=\"let elem\"> {{elem.memory}} </td>\n      </ng-container>\n\n      <!-- Volumes Column -->\n      <ng-container matColumnDef=\"volumes\">\n        <th mat-header-cell *matHeaderCellDef> Volumes </th>\n        <td mat-cell *matCellDef=\"let elem\"> \n          <button mat-icon-button [matMenuTriggerFor]=\"volsMenu\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n          <mat-menu #volsMenu=\"matMenu\">\n            <button mat-menu-item *ngFor=\"let vol of elem.volumes\">\n              <mat-icon>storage</mat-icon>\n              <span>{{vol}}</span>\n            </button>\n          </mat-menu> \n        </td>\n      </ng-container>\n\n      <!-- Actions Column -->\n      <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef> Actions </th>\n        <td mat-cell *matCellDef=\"let elem\"> \n          <!-- Connect to Notevook -->\n          <button (click)=\"connectResource(elem)\" mat-button color=primary \n                  [disabled]='elem.status !== \"running\"'>\n            CONNECT\n          </button>\n\n          <button mat-icon-button [disabled]=\"elem.reason === 'Deleting Notebook Server'\"\n                  (click)=\"deleteResource(elem)\">\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n    \n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n    </table>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/main-table/resource-table/resource-table.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/main-table/resource-table/resource-table.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  min-width: 900px;\n  padding: 0px; }\n\nmat-toolbar {\n  background: white; }\n\ntable {\n  width: 100%; }\n\n.header {\n  display: flex;\n  align-items: center;\n  padding: 0px 16px 0px 16px;\n  height: 64px; }\n\n.header p {\n  font-weight: 400;\n  font-size: 20px; }\n\n.cdk-column-actions {\n  text-align: center; }\n\n.mat-icon {\n  line-height: 0.85; }\n\ntd.mat-cell:last-of-type, td.mat-footer-cell:last-of-type, th.mat-header-cell:last-of-type {\n  padding-right: 0px; }\n\n.inline {\n  display: inline-block; }\n\n.running {\n  color: green; }\n\n.warning {\n  color: orange; }\n\n.error {\n  color: red; }\n\n.status {\n  display: inline-flex;\n  vertical-align: middle; }\n\n.delete {\n  color: red; }\n\n.parent {\n  display: flex; }\n\n.spacer {\n  flex-grow: 1; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9tYWluLXRhYmxlL3Jlc291cmNlLXRhYmxlL3Jlc291cmNlLXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQWdCO0VBQ2hCLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxXQUFXLEVBQUE7O0FBR2Y7RUFDSSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQixZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksZ0JBQWdCO0VBQ2hCLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxpQkFBaUIsRUFBQTs7QUFHckI7RUFDSSxrQkFBa0IsRUFBQTs7QUFHdEI7RUFDSSxxQkFBcUIsRUFBQTs7QUFJekI7RUFDSSxZQUNKLEVBQUE7O0FBRUE7RUFDSSxhQUNKLEVBQUE7O0FBRUE7RUFDSSxVQUFVLEVBQUE7O0FBR2Q7RUFDSSxvQkFBb0I7RUFDcEIsc0JBQXNCLEVBQUE7O0FBRzFCO0VBQ0ksVUFDSixFQUFBOztBQUdBO0VBQ0ksYUFBYSxFQUFBOztBQUdqQjtFQUNJLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL21haW4tdGFibGUvcmVzb3VyY2UtdGFibGUvcmVzb3VyY2UtdGFibGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtY2FyZCB7XG4gICAgbWluLXdpZHRoOiA5MDBweDtcbiAgICBwYWRkaW5nOiAwcHg7XG59XG5cbm1hdC10b29sYmFyIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cblxudGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xufVxuXG4uaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMHB4IDE2cHggMHB4IDE2cHg7XG4gICAgaGVpZ2h0OiA2NHB4O1xufVxuXG4uaGVhZGVyIHAge1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uY2RrLWNvbHVtbi1hY3Rpb25zIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tYXQtaWNvbiB7XG4gICAgbGluZS1oZWlnaHQ6IDAuODU7XG59XG5cbnRkLm1hdC1jZWxsOmxhc3Qtb2YtdHlwZSwgdGQubWF0LWZvb3Rlci1jZWxsOmxhc3Qtb2YtdHlwZSwgdGgubWF0LWhlYWRlci1jZWxsOmxhc3Qtb2YtdHlwZSB7XG4gICAgcGFkZGluZy1yaWdodDogMHB4O1xufVxuXG4uaW5saW5lIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi8vIFN0YXR1cyBJY29uc1xuLnJ1bm5pbmcge1xuICAgIGNvbG9yOmdyZWVuXG59XG5cbi53YXJuaW5nIHtcbiAgICBjb2xvcjogb3JhbmdlXG59XG5cbi5lcnJvciB7XG4gICAgY29sb3I6IHJlZDtcbn1cblxuLnN0YXR1cyB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmRlbGV0ZSB7XG4gICAgY29sb3I6IHJlZFxufVxuXG4vLyBGbGV4XG4ucGFyZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uc3BhY2VyIHtcbiAgICBmbGV4LWdyb3c6IDE7XG59Il19 */"

/***/ }),

/***/ "./src/app/main-table/resource-table/resource-table.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/main-table/resource-table/resource-table.component.ts ***!
  \***********************************************************************/
/*! exports provided: ResourceTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceTableComponent", function() { return ResourceTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_services_namespace_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/namespace.service */ "./src/app/services/namespace.service.ts");
/* harmony import */ var src_app_services_kubernetes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/kubernetes.service */ "./src/app/services/kubernetes.service.ts");
/* harmony import */ var src_app_utils_polling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utils/polling */ "./src/app/utils/polling.ts");
/* harmony import */ var _confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./confirm-dialog/confirm-dialog.component */ "./src/app/main-table/resource-table/confirm-dialog/confirm-dialog.component.ts");









var ResourceTableComponent = /** @class */ (function () {
    function ResourceTableComponent(namespaceService, k8s, dialog) {
        this.namespaceService = namespaceService;
        this.k8s = k8s;
        this.dialog = dialog;
        // Logic data
        this.resources = [];
        this.currNamespace = '';
        // Table data
        this.displayedColumns = ['status', 'name', 'age', 'image', 'cpu', 'memory', 'volumes', 'actions'];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.showNameFilter = false;
    }
    ResourceTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataSource.sort = this.sort;
        // Create the exponential backoff poller
        this.poller = new src_app_utils_polling__WEBPACK_IMPORTED_MODULE_7__["ExponentialBackoff"]({ interval: 1000, retries: 3 });
        this.resourcesSub = this.poller.start().subscribe(function () {
            // NOTE: We are using both the 'trackBy' feature in the Table for performance
            // and also detecting with lodash if the new data is different from the old
            // one. This is because, if the data changes we want to reset the poller
            _this.k8s.getResource(_this.currNamespace).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
                .subscribe(function (resources) {
                if (!Object(lodash__WEBPACK_IMPORTED_MODULE_4__["isEqual"])(_this.resources, resources)) {
                    _this.resources = resources;
                    _this.dataSource.data = _this.resources;
                    _this.poller.reset();
                    console.log(resources);
                }
            });
        });
        // Keep track of the selected namespace
        this.namespaceSub = this.namespaceService.getSelectedNamespace().subscribe(function (namespace) {
            _this.currNamespace = namespace;
            _this.poller.reset();
        });
    };
    ResourceTableComponent.prototype.ngOnDestroy = function () {
        this.resourcesSub.unsubscribe();
        this.namespaceSub.unsubscribe();
    };
    // Resource (Notebook) Actions
    ResourceTableComponent.prototype.connectResource = function (rsrc) {
        window.open("/notebook/" + rsrc.namespace + "/" + rsrc.name + "/");
    };
    ResourceTableComponent.prototype.deleteResource = function (rsrc) {
        var _this = this;
        var dialogRef = this.dialog.open(_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_8__["ConfirmDialogComponent"], {
            width: 'fit-content',
            data: {
                title: 'You are about to delete Notebook Server: ' + rsrc.name,
                message: 'Are you sure you want to delete this Notebook Server? ' +
                    'Your data might be lost if the Server is not backed by persistent storage.',
                yes: 'delete',
                no: 'cancel',
            },
        });
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).subscribe(function (result) {
            if (!result || result !== 'delete') {
                return;
            }
            _this.k8s.deleteResource(rsrc.namespace, rsrc.name).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
                .subscribe(function (r) {
                _this.poller.reset();
            });
        });
    };
    // Misc
    ResourceTableComponent.prototype.trackByFn = function (index, r) {
        return r.name + "/" + r.namespace + "/" + r.age + "/" + r.status + "/" + r.reason;
    };
    ResourceTableComponent.prototype.toggleFilter = function () {
        this.showNameFilter = !this.showNameFilter;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ResourceTableComponent.prototype, "sort", void 0);
    ResourceTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-resource-table',
            template: __webpack_require__(/*! ./resource-table.component.html */ "./src/app/main-table/resource-table/resource-table.component.html"),
            styles: [__webpack_require__(/*! ./resource-table.component.scss */ "./src/app/main-table/resource-table/resource-table.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_namespace_service__WEBPACK_IMPORTED_MODULE_5__["NamespaceService"],
            src_app_services_kubernetes_service__WEBPACK_IMPORTED_MODULE_6__["KubernetesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ResourceTableComponent);
    return ResourceTableComponent;
}());



/***/ }),

/***/ "./src/app/resource-form/resource-form.component.html":
/*!************************************************************!*\
  !*** ./src/app/resource-form/resource-form.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n      \n    <form novalidate (ngSubmit)=\"onSubmit()\" [formGroup]=\"formCtrl\">\n      <mat-card class=\"mat-elevation-z4\">\n        <mat-card-content>\n          <!-- Name -->\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fas', 'book']\" class=\"check\"></fa-icon>\n              Name\n            </h3>\n            <p>Specify the name of the Notebook Server and the Namespace it will belong to.</p>\n\n            <div class=\"inputs-wrapper\">\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Name</mat-label>\n                <input matInput placeholder=\"Notebook Server's Name\" formControlName=\"name\"  #name>\n                <mat-error>You must enter a value</mat-error>\n              </mat-form-field>\n\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Namespace</mat-label>\n                <input matInput placeholder=\"Name of Namespace\"\n                       formControlName=\"namespace\" readonly>\n                <mat-error>You must enter a value</mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n\n          <!-- Image -->\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fab', 'docker']\" class=\"check\"></fa-icon>\n              Image\n            </h3>\n            <p>A starter Jupyter Docker Image with a baseline deployment and typical ML packages.</p>\n            <mat-checkbox formControlName=\"customImageCheck\">Custom Image</mat-checkbox>\n            \n            <mat-form-field class=\"wide\" appearance=\"outline\" *ngIf=\"!formCtrl.value.customImageCheck\">\n              <mat-label>Image</mat-label>\n              <mat-select placeholder=\"Docker Image\" formControlName=\"image\">\n                <mat-option *ngFor=\"let img of formData.images\" [value]=\"img\">\n                  {{img}}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n\n            <mat-form-field class=\"wide\" appearance=\"outline\" *ngIf=\"formCtrl.value.customImageCheck\">\n              <mat-label>Custom Image</mat-label>\n              <input matInput placeholder=\"Provide a custom Image\" formControlName=\"customImage\" #cstmimg>\n              <mat-error>Please provide and Image to use</mat-error>\n            </mat-form-field>\n          </div>\n\n          <!-- CPU -->\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fas', 'microchip']\" class=\"check\"></fa-icon>\n              CPU / RAM\n            </h3>\n            <p>Specify the total amount of CPU and RAM reserved by your Notebook Server. \n              For CPU-intensive workloads, you can choose more than 1 CPU (e.g. 1.5).\n            </p>\n\n            <div class=\"inputs-wrapper\">\n              <mat-form-field appearance=\"outline\">\n                <mat-label>CPU</mat-label>\n                <input matInput placeholder=\"# of CPU Cores\" formControlName=\"cpu\">\n                <mat-error>Please provide the CPU requirements</mat-error>\n              </mat-form-field>\n\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Memory</mat-label>\n                <input matInput placeholder=\"Amount of Memory\" formControlName=\"memory\">\n                <mat-error>Please provide the RAM requirements</mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n\n          <!-- Workspace Volume -->\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fas', 'laptop-code']\" class=\"check\"></fa-icon>\n              Workspace Volume\n            </h3>\n            <p>Configure the Volume to be mounted as your personal Workspace.</p>\n            <p *ngIf=\"formData.wsreadonly\">*The Cluster Administrator has disabled editing this Section!</p>\n            <mat-checkbox formControlName=\"noWorkspace\">Don't use Persistent Storage for User's home</mat-checkbox>\n            \n            <app-volume *ngIf=\"formReady\"\n                        [volume] =\"formCtrl.controls.workspace\"\n                        [notebookName] = \"formCtrl.value.name\"\n                        [pvcs] = \"pvcs\"\n                        [ephemeral]=\"formCtrl.value.noWorkspace\"\n                        [readonly]=\"formData.wsreadonly\"\n                        [namespace]=\"formCtrl.value.namespace\"\n                        [storageClasses]=\"storageClasses\">\n            </app-volume>\n          </div>\n\n          <!-- Data Volumes -->\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fas', 'hdd']\" class=\"check\"></fa-icon>\n              Data Volumes\n            </h3>\n            <p>Configure the Volumes to be mounted as your Datasets.</p>\n            <p *ngIf=\"formData.dtreadonly\">*The Cluster Administrator has disabled editing this Section!</p>\n            <button mat-stroked-button class=\"primary-color\" (click)=\"addVol()\" \n                    type=\"button\" [disabled]=\"formData.dtreadonly\">\n              <mat-icon>add</mat-icon>ADD VOLUME\n            </button>\n\n            <div *ngFor=\"let vol of formDatavols; let i = index\" class=\"volume-wrapper\">\n              <app-volume *ngIf=\"formReady\"\n                          [volume] =\"vol\"\n                          [notebookName] = \"formCtrl.controls.name.value\"\n                          [namespace]=\"formCtrl.controls.namespace.value\"\n                          [pvcs] = \"pvcs\"\n                          [ephemeral]=\"false\"\n                          [readonly]=\"formData.dtreadonly\"\n                          [storageClasses]=\"storageClasses\">\n              </app-volume> \n              \n              <button mat-icon-button color=\"warn\" (click)=\"deleteVol(i)\" \n                      type=\"button\" [disabled]=\"formData.dtreadonly\">\n                  <mat-icon>delete</mat-icon>\n              </button>\n\n            </div>\n          </div>\n\n          <div class=\"group-wrapper\">\n            <h3><fa-icon [icon]=\"['fas', 'cogs']\" class=\"check\"></fa-icon>\n              Extra Resources\n            </h3>\n            <mat-form-field class=\"wide\" appearance=\"outline\">\n              <mat-label>Extra Resources</mat-label>\n              <input matInput placeholder='{\"nvidia.com/gpu\": 2}' value={{formData.extra}}\n                    required>\n              <mat-hint>Extra Resources available in the cluster that are needed in the Notebook.\n              </mat-hint>\n            </mat-form-field>\n          </div>\n\n        </mat-card-content>\n      </mat-card>\n\n      <!-- Crete Button -->\n      <button mat-raised-button color=\"primary\" class=\"margin\" type=\"submit\" \n              [disabled]=\"formCtrl.invalid\">\n        LAUNCH\n      </button>\n\n      <a routerLink=\"/\">\n        <button mat-raised-button class=\"margin\">CANCEL</button>\n      </a>\n\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/resource-form/resource-form.component.scss":
/*!************************************************************!*\
  !*** ./src/app/resource-form/resource-form.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h3, p {\n  color: rgba(0, 0, 0, 0.54); }\n\n.mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.15); }\n\n.space {\n  margin-right: 1%; }\n\n.margin {\n  margin: 8px 8px 8px 0px; }\n\n.wide {\n  width: 100%; }\n\n.divider {\n  width: 5%; }\n\n.container {\n  width: 100%;\n  margin: 2em auto;\n  min-width: 900px;\n  max-width: 920px; }\n\n.group-wrapper {\n  margin-bottom: 0.5rem; }\n\n.group-wrapper > button {\n  margin-bottom: 0.5rem; }\n\n.material-icons {\n  line-height: 0.85; }\n\n.inputs-wrapper {\n  display: flex;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem; }\n\n.inputs-wrapper > .mat-form-field {\n  flex: 1 1 0px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem; }\n\n.volume-wrapper {\n  display: flex;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem; }\n\n.volume-wrapper > app-volume {\n  flex: 1 1 0px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  width: 92%; }\n\n.volume-wrapper > button {\n  flex: 1 1 0px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9yZXNvdXJjZS1mb3JtL3Jlc291cmNlLWZvcm0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQkFBeUIsRUFBQTs7QUFHM0I7RUFDRSwwQkFBMEIsRUFBQTs7QUFHNUI7RUFFRSxnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSx1QkFBdUIsRUFBQTs7QUFHekI7RUFDRSxXQUFXLEVBQUE7O0FBR2I7RUFDRSxTQUFTLEVBQUE7O0FBR1g7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxxQkFBcUIsRUFBQTs7QUFHdkI7RUFDRSxxQkFBcUIsRUFBQTs7QUFHdkI7RUFDRSxpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLHFCQUFxQixFQUFBOztBQUd2QjtFQUNFLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIscUJBQXFCLEVBQUE7O0FBSXZCO0VBQ0UsYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixxQkFBcUIsRUFBQTs7QUFHdkI7RUFDRSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixVQUFVLEVBQUE7O0FBR1o7RUFDRSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3Jlc291cmNlLWZvcm0vcmVzb3VyY2UtZm9ybS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImgzLCBwIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjU0KTtcbn1cblxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuXG4uc3BhY2Uge1xuICAvLyB3aWR0aDogMSU7XG4gIG1hcmdpbi1yaWdodDogMSU7XG59XG5cbi5tYXJnaW4ge1xuICBtYXJnaW46IDhweCA4cHggOHB4IDBweDtcbn1cblxuLndpZGUge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmRpdmlkZXIge1xuICB3aWR0aDogNSU7XG59XG5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAyZW0gYXV0bztcbiAgbWluLXdpZHRoOiA5MDBweDtcbiAgbWF4LXdpZHRoOiA5MjBweDtcbn1cblxuLmdyb3VwLXdyYXBwZXIge1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG59XG5cbi5ncm91cC13cmFwcGVyPmJ1dHRvbiB7XG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbn1cblxuLm1hdGVyaWFsLWljb25zIHtcbiAgbGluZS1oZWlnaHQ6IDAuODU7XG59XG5cbi5pbnB1dHMtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbi1sZWZ0OiAtMC41cmVtO1xuICBtYXJnaW4tcmlnaHQ6IC0wLjVyZW07XG59XG5cbi5pbnB1dHMtd3JhcHBlcj4ubWF0LWZvcm0tZmllbGR7XG4gIGZsZXg6IDEgMSAwcHg7XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59XG5cbi8vIERhdGEgVm9sdW1lcyB3aXRoIHRoZSBEZWxldGUgYnV0dG9uXG4udm9sdW1lLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW4tbGVmdDogLTAuNXJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAtMC41cmVtO1xufVxuXG4udm9sdW1lLXdyYXBwZXI+YXBwLXZvbHVtZSB7XG4gIGZsZXg6IDEgMSAwcHg7XG4gIHBhZGRpbmctbGVmdDogMC41cmVtO1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG4gIHdpZHRoOiA5MiU7XG59IFxuXG4udm9sdW1lLXdyYXBwZXI+YnV0dG9uIHtcbiAgZmxleDogMSAxIDBweDtcbiAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG4gIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbiAgbWFyZ2luLXRvcDogMTBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/resource-form/resource-form.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/resource-form/resource-form.component.ts ***!
  \**********************************************************/
/*! exports provided: ResourceFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceFormComponent", function() { return ResourceFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_namespace_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/namespace.service */ "./src/app/services/namespace.service.ts");
/* harmony import */ var _services_kubernetes_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/kubernetes.service */ "./src/app/services/kubernetes.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/types */ "./src/app/utils/types.ts");
/* harmony import */ var _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/snack-bar.service */ "./src/app/services/snack-bar.service.ts");










var ResourceFormComponent = /** @class */ (function () {
    function ResourceFormComponent(namespaceService, k8s, snackBar, fb, router) {
        this.namespaceService = namespaceService;
        this.k8s = k8s;
        this.snackBar = snackBar;
        this.fb = fb;
        this.router = router;
        this.currNamespace = '';
        this.formData = _utils_types__WEBPACK_IMPORTED_MODULE_8__["DEFAULTS"];
        this.ephemeral = false;
        this.defaultStorageclass = false;
        this.storageClasses = [];
        this.formReady = false;
        this.pvcs = [];
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subscription"]();
        // Init the form
        this.formCtrl = this.fb.group({
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            namespace: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            image: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            customImage: ['', []],
            customImageCheck: [false, []],
            cpu: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            memory: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            noWorkspace: [false, []],
            workspace: this.fb.group({
                type: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                size: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                path: [{ value: '', disabled: true }, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                mode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                class: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
                extraFields: [{}, []],
            }),
            datavols: this.fb.array([]),
            extra: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
        });
    }
    Object.defineProperty(ResourceFormComponent.prototype, "formDatavols", {
        get: function () {
            var vols = this.formCtrl.get('datavols');
            return vols.controls;
        },
        enumerable: true,
        configurable: true
    });
    ResourceFormComponent.prototype.ngOnInit = function () {
        // Read the defaults from the server
        // this.formData = DEFAULTS;
        var _this = this;
        // Update the form Values from the default ones
        this.subscriptions.add(this.k8s.getConfig().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).subscribe(function (config) {
            if (Object.keys(config).length === 0) {
                // Don't fire on empty config
                return;
            }
            _this.initDefaultValues(config);
            _this.initFormControls();
        }));
        // Keep track of the selected namespace
        this.subscriptions.add(this.namespaceService.getSelectedNamespace().subscribe(function (namespace) {
            _this.currNamespace = namespace;
            _this.formCtrl.controls.namespace.setValue(_this.currNamespace);
            _this.updatePVCs(namespace);
        }));
        // Check if a default StorageClass is set
        this.subscriptions.add(this.k8s.getDefaultStorageClass().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).subscribe(function (defaultClass) {
            if (defaultClass.length === 0) {
                _this.defaultStorageclass = false;
            }
            else {
                _this.defaultStorageclass = true;
            }
        }));
        // Check if a default StorageClass is set
        this.subscriptions.add(this.k8s.getStorageClasses().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).subscribe(function (classes) {
            _this.storageClasses = classes;
        }));
        // Show a warning if no persistent storage is provided
        this.subscriptions.add(this.formCtrl.controls.noWorkspace.valueChanges.subscribe(function (b) {
            // close the snackbar if deselected
            if (!b) {
                _this.snackBar.close();
            }
            else {
                var msg = 'Your workspace will not be persistent. You will lose all ' +
                    'data in it, if your notebook is terminated for any reason.';
                _this.snackBar.open(msg, _utils_types__WEBPACK_IMPORTED_MODULE_8__["SnackType"].Warning, 0);
            }
        }));
    };
    ResourceFormComponent.prototype.ngOnDestroy = function () {
        // Unsubscriptions
        this.subscriptions.unsubscribe();
    };
    ResourceFormComponent.prototype.updatePVCs = function (namespace) {
        var _this = this;
        this.subscriptions.add(this.k8s.getVolumes(namespace).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).subscribe(function (pvcs) {
            _this.pvcs = pvcs;
        }));
    };
    ResourceFormComponent.prototype.createVolumeControl = function (vol) {
        var ctrl = this.fb.group({
            type: [vol.type, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            name: [vol.name, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            size: [vol.size, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            path: [vol.path, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            mode: [vol.mode, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            class: [vol.class, []],
            extraFields: [{}, []],
        });
        return ctrl;
    };
    ResourceFormComponent.prototype.initDefaultValues = function (config) {
        var _this = this;
        // Put the values, from the admin config file, in our internal dict
        if (Object.keys(config).length === 0) {
            return;
        }
        if (config.cpu) {
            this.formData.cpu = config.cpu.value;
        }
        if (config.memory) {
            this.formData.memory = config.memory.value;
        }
        if (config.image) {
            this.formData.images = config.image.options;
            this.formData.image = config.image.value;
        }
        if (config.workspaceVolume) {
            var data = config.workspaceVolume.value;
            this.formData.wsvolume.type = data.type.value;
            this.formData.wsvolume.name = data.name.value;
            this.formData.wsvolume.size = data.size.value;
            this.formData.wsvolume.path = data.mountPath.value;
            this.formData.wsvolume.mode = data.accessModes.value;
            this.formData.wsvolume.class = data.class.value;
            this.formData.wsreadonly = config.workspaceVolume.readOnly;
        }
        // Add the data volumes
        this.formData.dtvolumes = [];
        if (config.dataVolumes) {
            var vols = config.dataVolumes.value;
            vols.forEach(function (vol) {
                var data = vol.value;
                var newvol = {
                    type: data.type.value,
                    name: data.name.value,
                    size: data.size.value,
                    path: data.mountPath.value,
                    mode: data.accessModes.value,
                    class: data.class.value,
                };
                // Append it
                _this.formData.dtvolumes.push(newvol);
            });
        }
        this.formData.dtreadonly = config.dataVolumes.readOnly;
        if (config.extraResources) {
            this.formData.extra = config.extraResources.value;
        }
    };
    ResourceFormComponent.prototype.initFormControls = function () {
        var _this = this;
        // Sets the values from our internal dict. This is an initialization step
        // that should be only run once
        this.formCtrl.controls.cpu.setValue(this.formData.cpu);
        this.formCtrl.controls.memory.setValue(this.formData.memory);
        this.formCtrl.controls.image.setValue(this.formData.image);
        // If no storage class is provided, don't use type New
        // if (!this.defaultStorageclass && this.formData.wsvolume.type === 'New') {
        //   this.formData.wsvolume.type = 'None';
        // }
        this.formCtrl.controls.workspace = this.createVolumeControl(this.formData.wsvolume);
        // Disable the mount path by default
        var ws = this.formCtrl.controls.workspace;
        ws.controls.path.disable();
        // Add the data volumes
        var arr = this.fb.array([]);
        this.formData.dtvolumes.forEach(function (vol) {
            // Create a new FormControl to append to the array
            if (!_this.defaultStorageclass && vol.type === 'New') {
                vol.type = 'Existing';
            }
            var ctrl = _this.createVolumeControl(vol);
            // Append it
            arr.push(ctrl);
        });
        this.formCtrl.controls.datavols = arr;
        this.formCtrl.controls.extra.setValue(this.formData.extra);
        this.formReady = true;
    };
    ResourceFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.formCtrl.updateValueAndValidity();
        // Create a deep copy of the Form's Values
        var nb = JSON.parse(JSON.stringify(this.formCtrl.value));
        // Process the volumes
        if (nb.noWorkspace) {
            nb.workspace.type = 'none';
        }
        else if (nb.workspace.name.includes('[NEW] ')) {
            nb.workspace.name = nb.workspace.name.replace('[NEW] ', '');
            nb.workspace.type = 'new';
        }
        else {
            nb.workspace.type = 'existing';
        }
        for (var _i = 0, _a = nb.datavols; _i < _a.length; _i++) {
            var dtvol = _a[_i];
            if (dtvol.name.includes('[NEW] ')) {
                dtvol.name = dtvol.name.replace('[NEW] ', '');
                dtvol.type = 'new';
            }
            else {
                dtvol.type = 'existing';
            }
        }
        console.log(nb, this.formCtrl.valid);
        this.subscriptions.add(this.k8s.postResource(nb).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])()).subscribe(function (result) {
            if (result === 'posted') {
                _this.router.navigate(['/']);
            }
            else if (result === 'error') {
                _this.updatePVCs(_this.currNamespace);
            }
        }));
    };
    ResourceFormComponent.prototype.addVol = function () {
        var l = this.formCtrl.value.datavols.length;
        // Don't create new PVCs if no default storage class exists
        var volType;
        if (!this.defaultStorageclass) {
            volType = 'Existing';
        }
        else {
            volType = 'New';
        }
        var vol = {
            type: volType,
            name: '{notebook-name}-vol-' + (l + 1),
            size: '10Gi',
            path: '/home/jovyan/data-vol-' + (l + 1),
            mode: 'ReadWriteOnce',
            class: '{empty}',
            id: l
        };
        // Push it to the control
        var vols = this.formCtrl.get('datavols');
        vols.push(this.createVolumeControl(vol));
        this.formCtrl.updateValueAndValidity();
    };
    ResourceFormComponent.prototype.deleteVol = function (idx) {
        var vols = this.formCtrl.get('datavols');
        vols.removeAt(idx);
        this.formCtrl.updateValueAndValidity();
    };
    ResourceFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-resource-form',
            template: __webpack_require__(/*! ./resource-form.component.html */ "./src/app/resource-form/resource-form.component.html"),
            styles: [__webpack_require__(/*! ./resource-form.component.scss */ "./src/app/resource-form/resource-form.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_namespace_service__WEBPACK_IMPORTED_MODULE_3__["NamespaceService"],
            _services_kubernetes_service__WEBPACK_IMPORTED_MODULE_4__["KubernetesService"],
            _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_9__["SnackBarService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ResourceFormComponent);
    return ResourceFormComponent;
}());



/***/ }),

/***/ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/resource-form/volume/new-volume-form/new-volume-form.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <iframe [src]=\"trustedUrl\" width=\"480px\" height=\"620px\" frameBorder=\"0\"\n            (load)=\"loaded()\"></iframe>\n</div>"

/***/ }),

/***/ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.scss":
/*!*************************************************************************************!*\
  !*** ./src/app/resource-form/volume/new-volume-form/new-volume-form.component.scss ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  width: -webkit-fit-content;\n  width: -moz-fit-content;\n  width: fit-content; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9yZXNvdXJjZS1mb3JtL3ZvbHVtZS9uZXctdm9sdW1lLWZvcm0vbmV3LXZvbHVtZS1mb3JtLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUksMEJBQWtCO0VBQWxCLHVCQUFrQjtFQUFsQixrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3Jlc291cmNlLWZvcm0vdm9sdW1lL25ldy12b2x1bWUtZm9ybS9uZXctdm9sdW1lLWZvcm0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcbiAgICAvLyBUT0RPXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/resource-form/volume/new-volume-form/new-volume-form.component.ts ***!
  \***********************************************************************************/
/*! exports provided: NewVolumeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewVolumeFormComponent", function() { return NewVolumeFormComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");






var NewVolumeFormComponent = /** @class */ (function () {
    function NewVolumeFormComponent(dialogRef, sanitizer, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.sanitizer = sanitizer;
        this.data = data;
        this.environment = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"];
        this.subs = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subscription"]();
        // Configure the URL with the selected namespace
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].form + '?namespace=' + data.namespace);
        // Configure the connection with the iframe
        this.msgSrc = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(window, 'message');
        this.subs.add(this.msgSrc.subscribe(function (event) { _this.handleMessage(event); }));
    }
    NewVolumeFormComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    NewVolumeFormComponent.prototype.loaded = function () {
        // console.log();
    };
    NewVolumeFormComponent.prototype.handleMessage = function (msgEvent) {
        var msg = msgEvent.data;
        if (msg === 'close') {
            this.dialogRef.close('close');
        }
        else if (msg.charAt(0) === '{') {
            // Volume Data received
            this.dialogRef.close(msg);
        }
    };
    NewVolumeFormComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-new-volume-form',
            template: __webpack_require__(/*! ./new-volume-form.component.html */ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.html"),
            styles: [__webpack_require__(/*! ./new-volume-form.component.scss */ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"], Object])
    ], NewVolumeFormComponent);
    return NewVolumeFormComponent;
}());



/***/ }),

/***/ "./src/app/resource-form/volume/volume.component.html":
/*!************************************************************!*\
  !*** ./src/app/resource-form/volume/volume.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"volume\" novalidate [formGroup]=\"volume\">\n  <div class=\"volume-wrapper\">\n    <!-- Volume Name Input -->\n    <mat-form-field appearance=\"outline\" *ngIf=\"!readonly\">\n      <mat-label>Volume</mat-label>\n      <mat-select formControlName=\"name\" (selectionChange)=\"selectionChanged($event.value)\">\n        <mat-option (click)=\"newVolume()\" value=\"_\">\n          <span>+ NEW VOLUME</span> \n        </mat-option>\n\n        <mat-option *ngFor=\"let vol of volumes\" [value]=\"vol\">\n          {{vol}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <mat-form-field appearance=\"outline\" *ngIf=\"readonly\">\n      <mat-label>volume</mat-label>\n      <input matInput formControlName=\"name\" [readonly]=\"readonly\">\n    </mat-form-field>\n\n    <!-- Size Input -->\n    <mat-form-field appearance=\"outline\" id=size>\n      <mat-label>Size</mat-label>\n      <input matInput formControlName=\"size\" [readonly]=\"readonly\">\n    </mat-form-field>\n\n    <!-- Mode Input -->\n    <mat-form-field appearance=\"outline\" id=mode *ngIf=\"readonly\">\n      <mat-label>Mode</mat-label>\n      <input matInput formControlName=\"mode\" [readonly]=\"readonly\">\n    </mat-form-field>\n\n    <mat-form-field appearance=\"outline\" id=mode *ngIf=\"!readonly\">\n      <mat-label>Mode</mat-label>\n      <mat-select formControlName=\"mode\">\n        <mat-option value=\"ReadWriteOnce\">ReadWriteOnce</mat-option>\n        <mat-option value=\"ReadOnlyMany\">ReadOnlyMany</mat-option>\n        <mat-option value=\"ReadWriteMany\">ReadWriteMany</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <!-- Class Input -->\n    <mat-form-field appearance=\"outline\" id=class *ngIf=\"!readonly\">\n      <mat-label>Mode</mat-label>\n      <mat-select formControlName=\"class\">\n        <mat-option value=\"{none}\">none (\"\")</mat-option>\n        <mat-option value=\"{empty}\">empty (omitted)</mat-option>\n        <mat-option *ngFor=\"let sc of storageClasses\" [value]=\"sc\">{{sc}}</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <mat-form-field appearance=\"outline\" id=class *ngIf=\"readonly\">\n      <mat-label>Class</mat-label>\n      <input matInput formControlName=\"class\" [readonly]=\"readonly\">\n    </mat-form-field>\n\n    <!-- Mount Input -->\n    <mat-form-field appearance=\"outline\" id=path>\n      <mat-label>Mount Point</mat-label>\n      <input matInput formControlName=\"path\" [readonly]=\"readonly\">\n    </mat-form-field>\n  </div>\n</form>"

/***/ }),

/***/ "./src/app/resource-form/volume/volume.component.scss":
/*!************************************************************!*\
  !*** ./src/app/resource-form/volume/volume.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field {\n  flex: 1 1 0px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem; }\n\n#name {\n  max-width: 20%; }\n\n#size {\n  max-width: 10%; }\n\n#mode {\n  max-width: 18%; }\n\n#class {\n  width: 15%; }\n\n.volume-wrapper {\n  display: flex;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem; }\n\n.volume-wrapper > .mat-form-field {\n  flex: 1 1 0px;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem; }\n\nspan {\n  color: #1e88e5; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9yZXNvdXJjZS1mb3JtL3ZvbHVtZS92b2x1bWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLHFCQUFxQixFQUFBOztBQUd6QjtFQUNJLGNBQ0osRUFBQTs7QUFFQTtFQUNJLGNBQWMsRUFBQTs7QUFHbEI7RUFDSSxjQUNKLEVBQUE7O0FBRUE7RUFDSSxVQUNKLEVBQUE7O0FBRUE7RUFDSSxhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLHFCQUFxQixFQUFBOztBQUd6QjtFQUNJLGFBQWE7RUFDYixvQkFBb0I7RUFDcEIscUJBQXFCLEVBQUE7O0FBR3pCO0VBQ0ksY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvcmVzb3VyY2UtZm9ybS92b2x1bWUvdm9sdW1lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWZvcm0tZmllbGQge1xuICAgIGZsZXg6IDEgMSAwcHg7XG4gICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG4gICAgcGFkZGluZy1yaWdodDogMC41cmVtO1xufVxuXG4jbmFtZSB7XG4gICAgbWF4LXdpZHRoOiAyMCVcbn1cblxuI3NpemUge1xuICAgIG1heC13aWR0aDogMTAlO1xufVxuXG4jbW9kZSB7XG4gICAgbWF4LXdpZHRoOiAxOCVcbn1cblxuI2NsYXNzIHtcbiAgICB3aWR0aDogMTUlXG59XG5cbi52b2x1bWUtd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tbGVmdDogLTAuNXJlbTtcbiAgICBtYXJnaW4tcmlnaHQ6IC0wLjVyZW07XG59XG5cbi52b2x1bWUtd3JhcHBlcj4ubWF0LWZvcm0tZmllbGR7XG4gICAgZmxleDogMSAxIDBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59XG5cbnNwYW4ge1xuICAgIGNvbG9yOiAjMWU4OGU1O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/resource-form/volume/volume.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/resource-form/volume/volume.component.ts ***!
  \**********************************************************/
/*! exports provided: VolumeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VolumeComponent", function() { return VolumeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _new_volume_form_new_volume_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./new-volume-form/new-volume-form.component */ "./src/app/resource-form/volume/new-volume-form/new-volume-form.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");







var VolumeComponent = /** @class */ (function () {
    // ----- Component Functions -----
    function VolumeComponent(dialog) {
        this.dialog = dialog;
        this.nbName = '';
        // public  = false;
        this.cancelDefaultBehavior = false;
        this.existingPVCs = [];
        this.volumes = []; // Select get values from here
        this.readOnly = false;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subscription"]();
        this.storageClasses = [];
    }
    Object.defineProperty(VolumeComponent.prototype, "volume", {
        // ----- @Input Parameters -----
        get: function () {
            return this.volumePrv;
        },
        set: function (volume) {
            this.volumeCtrlChanged(volume);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "notebookName", {
        get: function () {
            return this.nbName;
        },
        set: function (nm) {
            this.notebookNameChanged(nm);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "ephemeral", {
        set: function (b) {
            this.storageOptionChanged(b);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "readonly", {
        get: function () {
            return this.readOnly;
        },
        set: function (b) {
            this.readOnly = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "pvcs", {
        set: function (data) {
            this.pvcsChanged(data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "defaultNotebookVolume", {
        // ----- Get macros -----
        get: function () {
            return this.newPVC.name.replace('{notebook-name}', this.nbName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "selectedVolume", {
        get: function () {
            var vol;
            var volName = this.volume.controls.name.value;
            if (this.selectedVolIsExistingType) {
                vol = this.existingPVCs.find(function (v) {
                    return v.name === volName;
                });
            }
            else {
                return this.newPVC;
            }
            return vol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "selectedVolIsExistingType", {
        get: function () {
            return this.volumeNames(this.existingPVCs).includes(this.volume.value.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "newVolName", {
        get: function () {
            return this.renderVolName(this.newPVC.name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "newVolIsSelected", {
        get: function () {
            return this.volume.controls.name.value === '[NEW] ' + this.newVolName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VolumeComponent.prototype, "newVolIsExisting", {
        get: function () {
            return this.volumeIsExisting(this.newVolName);
        },
        enumerable: true,
        configurable: true
    });
    // ----- utility functions -----
    VolumeComponent.prototype.volumeNames = function (vols, prefix) {
        if (prefix === void 0) { prefix = ''; }
        var names = [];
        for (var _i = 0, vols_1 = vols; _i < vols_1.length; _i++) {
            var v = vols_1[_i];
            if (v.name.includes('{notebook-name}')) {
                names.push(prefix + v.name.replace('{notebook-name}', this.nbName));
            }
            else {
                names.push(prefix + v.name);
            }
        }
        return names;
    };
    VolumeComponent.prototype.volumeIsExisting = function (volName) {
        return this.volumeNames(this.existingPVCs).includes(volName);
    };
    VolumeComponent.prototype.renderVolName = function (name) {
        return name.replace('{notebook-name}', this.nbName);
    };
    VolumeComponent.prototype.addNewVolume = function (vol) {
        this.newPVC = vol;
        // Check if the name of the vol is in the existing ones
        if (!this.newVolIsExisting) {
            // Update the select values
            var name_1 = this.renderVolName(vol.name);
            this.volumes = ['[NEW] ' + name_1].concat(this.volumeNames(this.existingPVCs));
        }
    };
    VolumeComponent.prototype.updateVolInputFields = function () {
        // Disable input fields according to volume type
        if (this.selectedVolIsExistingType) {
            // Disable all fields
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
            this.volume.controls.class.disable();
        }
        else {
            this.volume.controls.size.enable();
            this.volume.controls.mode.enable();
            this.volume.controls.class.enable();
        }
    };
    VolumeComponent.prototype.updateVolValueFields = function () {
        this.volume.controls.size.setValue(this.selectedVolume.size);
        this.volume.controls.mode.setValue(this.selectedVolume.mode);
        this.volume.controls.class.setValue(this.selectedVolume.class);
        this.volume.controls.extraFields.setValue(this.selectedVolume.extraFields);
    };
    VolumeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // size
        this.subscriptions.add(this.volume.controls.size.valueChanges.subscribe(function (size) {
            _this.selectedVolume.size = size;
        }));
        // mode
        this.subscriptions.add(this.volume.controls.mode.valueChanges.subscribe(function (mode) {
            _this.selectedVolume.mode = mode;
        }));
        // class
        this.subscriptions.add(this.volume.controls.class.valueChanges.subscribe(function (c) {
            _this.selectedVolume.class = c;
        }));
    };
    VolumeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    // ----- @Input change handling functions -----
    VolumeComponent.prototype.notebookNameChanged = function (nm) {
        if (!this.newPVC) {
            return;
        }
        // Check if the new Name of the [Admin-New] PVC is existing
        this.nbName = nm;
        if (!this.newVolIsExisting) {
            this.volumes = ['[NEW] ' + this.newVolName].concat(this.volumeNames(this.existingPVCs));
        }
        else {
            // if the new volume is existing, we must not show the new volume
            this.volumes = this.volumeNames(this.existingPVCs);
        }
        // If the user hasn't asked for a specifig volumee, update the selection
        if (!this.cancelDefaultBehavior) {
            if (this.newVolIsExisting) {
                this.volume.controls.name.setValue(this.newVolName);
            }
            else {
                this.volume.controls.name.setValue('[NEW] ' + this.newVolName);
            }
        }
        this.updateVolValueFields();
        this.updateVolInputFields();
    };
    VolumeComponent.prototype.volumeCtrlChanged = function (vol) {
        this.volumePrv = vol;
        this.addNewVolume(vol.value);
        var name = this.renderVolName(vol.value.name);
        if (this.volumeIsExisting(name)) {
            this.volume.controls.name.setValue(name);
        }
        else {
            this.volume.controls.name.setValue(this.volumes[0]);
        }
        this.specificVolumeAsked = name;
    };
    VolumeComponent.prototype.storageOptionChanged = function (ephemeral) {
        if (ephemeral) {
            // Disable all fields
            this.volume.controls.name.disable();
            this.volume.controls.size.disable();
            this.volume.controls.mode.disable();
            this.volume.controls.class.disable();
        }
        else if (!ephemeral && !this.selectedVolIsExistingType) {
            this.volume.controls.name.enable();
            this.volume.controls.size.enable();
            this.volume.controls.mode.enable();
            this.volume.controls.class.enable();
        }
        else {
            this.volume.controls.name.enable();
        }
    };
    VolumeComponent.prototype.selectionChanged = function (volName) {
        // _ is given when 'CREATE VOLUME' is selected, select the default volume
        if (volName === '_') {
            if (!this.cancelDefaultBehavior) {
                this.volume.controls.name.setValue('[NEW] ' + this.newVolName);
            }
            else if (this.existingPVCs.length > 0) {
                this.volume.controls.name.setValue(this.specificVolumeAsked);
            }
            return;
        }
        this.specificVolumeAsked = volName;
        // Update the values accordingly
        this.updateVolValueFields();
        // If existing PVC, then disable the options
        this.updateVolInputFields();
        if (this.selectedVolIsExistingType) {
            // If user selected an existing volume, then cancel the default behavior
            this.cancelDefaultBehavior = true;
        }
        else {
            // The user selected the PVC provided by the admin
            this.cancelDefaultBehavior = false;
        }
    };
    VolumeComponent.prototype.pvcsChanged = function (pvcs) {
        this.existingPVCs = pvcs;
        if (!this.newVolIsExisting) {
            this.volumes = ['[NEW] ' + this.newVolName].concat(this.volumeNames(this.existingPVCs));
            this.updateVolInputFields();
        }
        else {
            // Also set the selected volume
            this.volumes = this.volumeNames(this.existingPVCs);
            this.volume.controls.name.setValue(this.newVolName);
            this.updateVolValueFields();
            this.updateVolInputFields();
        }
    };
    // ----- New Volume action -----
    VolumeComponent.prototype.newVolume = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_new_volume_form_new_volume_form_component__WEBPACK_IMPORTED_MODULE_4__["NewVolumeFormComponent"], {
            width: 'fit-content',
            height: 'fit-content',
            panelClass: 'custom-dialog-container',
            data: {
                namespace: this.namespace
            }
        });
        dialogRef.afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])()).subscribe(function (resp) {
            if (!resp || resp === 'close') {
                // Dialog canceled, select the default volume
                if (!_this.cancelDefaultBehavior) {
                    _this.volume.controls.name.setValue('[NEW] ' + _this.newVolName);
                }
                else if (_this.existingPVCs.length > 0) {
                    _this.volume.controls.name.setValue(_this.specificVolumeAsked);
                }
                _this.updateVolInputFields();
                return;
            }
            // Add the new volume as an option
            var vol = JSON.parse(resp);
            if (!_this.volumeIsExisting(vol.name)) {
                _this.addNewVolume(vol);
                _this.volume.controls.name.setValue('[NEW] ' + _this.newVolName);
            }
            else {
                _this.volume.controls.name.setValue(vol.name);
            }
            _this.updateVolValueFields();
            _this.updateVolInputFields();
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]])
    ], VolumeComponent.prototype, "volume", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], VolumeComponent.prototype, "notebookName", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Boolean])
    ], VolumeComponent.prototype, "ephemeral", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Boolean])
    ], VolumeComponent.prototype, "readonly", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], VolumeComponent.prototype, "pvcs", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], VolumeComponent.prototype, "namespace", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], VolumeComponent.prototype, "storageClasses", void 0);
    VolumeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-volume',
            template: __webpack_require__(/*! ./volume.component.html */ "./src/app/resource-form/volume/volume.component.html"),
            styles: [__webpack_require__(/*! ./volume.component.scss */ "./src/app/resource-form/volume/volume.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], VolumeComponent);
    return VolumeComponent;
}());



/***/ }),

/***/ "./src/app/services/kubernetes.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/kubernetes.service.ts ***!
  \************************************************/
/*! exports provided: KubernetesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KubernetesService", function() { return KubernetesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _utils_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/types */ "./src/app/utils/types.ts");
/* harmony import */ var _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/snack-bar.service */ "./src/app/services/snack-bar.service.ts");








var KubernetesService = /** @class */ (function () {
    function KubernetesService(http, snackBar) {
        this.http = http;
        this.snackBar = snackBar;
        this.dialogState = { shown: false, msg: '' };
    }
    // GETers
    KubernetesService.prototype.getNamespaces = function () {
        var _this = this;
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + "/api/namespaces";
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            var namespaces = data.namespaces;
            src.next(namespaces);
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    KubernetesService.prototype.getResource = function (ns) {
        var _this = this;
        // Get existing PVCs in a namespace
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + ("/api/namespaces/" + ns + "/" + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].resource);
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        if (ns === '') {
            return src.asObservable();
        }
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            var notebooks = data.notebooks;
            src.next(notebooks);
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    KubernetesService.prototype.getStorageClasses = function () {
        var _this = this;
        // Get existing PVCs in a namespace
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + "/api/storageclasses";
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            var scs = data.storageclasses;
            src.next(scs);
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    KubernetesService.prototype.getDefaultStorageClass = function () {
        var _this = this;
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + "/api/storageclasses/default";
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            var sc = data.defaultStorageClass;
            src.next(sc);
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    KubernetesService.prototype.getConfig = function () {
        var _this = this;
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + "/api/config";
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            src.next(data.config);
        }, function (error) { return _this.handleError(error); });
        return src;
    };
    KubernetesService.prototype.getVolumes = function (ns) {
        var _this = this;
        // Get existing PVCs in a namespace
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + ("/api/namespaces/" + ns + "/pvcs");
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        if (ns === '') {
            return src.asObservable();
        }
        this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            src.next(data.pvcs);
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    // Delete functions
    KubernetesService.prototype.deleteResource = function (ns, nm) {
        var _this = this;
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + ("/api/namespaces/" + ns + "/" + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].resource + "/" + nm);
        this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            src.next('posted');
        }, function (error) { return _this.handleError(error); });
        return src.asObservable();
    };
    KubernetesService.prototype.deleteViewer = function (ns, nm) {
        var _this = this;
        var obs = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + ("/api/namespaces/" + ns + "/viewers/" + nm);
        this.http.delete(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            _this.handleBackendError(data);
            obs.next('posted');
        }, function (error) { return _this.handleError(error); });
        return obs.asObservable();
    };
    // Post Functions
    KubernetesService.prototype.postResource = function (rsrc) {
        var _this = this;
        var src = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + ("/api/namespaces/" + rsrc.namespace + "/" + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].resource);
        this.http.post(url, rsrc).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe(function (data) {
            if (_this.handleBackendError(data) === 'success') {
                src.next('posted');
            }
            else {
                src.next('error');
            }
        }, function (error) {
            _this.handleError(error);
            src.next('error');
        });
        return src.asObservable();
    };
    // ---------------------------Error Handling----------------------------------
    KubernetesService.prototype.handleBackendError = function (response) {
        if (!response.success) {
            this.showSnack('Warning: ' + response.log, _utils_types__WEBPACK_IMPORTED_MODULE_6__["SnackType"].Warning);
            return 'error';
        }
        return 'success';
    };
    KubernetesService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            return 'error';
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.showSnack(error.status + ": There was an error trying to connect " +
                ("to the backend API. " + error.message), _utils_types__WEBPACK_IMPORTED_MODULE_6__["SnackType"].Error);
            return 'error';
        }
    };
    KubernetesService.prototype.showSnack = function (msg, type) {
        var _this = this;
        if (this.dialogState.shown && (this.dialogState.msg === msg)) {
            return;
        }
        this.dialogState.shown = true;
        this.dialogState.msg = msg;
        this.snackBar.open(msg, type, 20000).afterDismissed().subscribe(function () {
            _this.dialogState.shown = false;
            _this.dialogState.msg = '';
        });
    };
    KubernetesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _services_snack_bar_service__WEBPACK_IMPORTED_MODULE_7__["SnackBarService"]])
    ], KubernetesService);
    return KubernetesService;
}());



/***/ }),

/***/ "./src/app/services/namespace.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/namespace.service.ts ***!
  \***********************************************/
/*! exports provided: NamespaceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NamespaceService", function() { return NamespaceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var NamespaceService = /** @class */ (function () {
    function NamespaceService() {
        // Observable string sources
        this.selectedNamespaceSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        // Observable string streams
        this.selectedNamespace$ = this.selectedNamespaceSource.asObservable();
    }
    // GETers
    NamespaceService.prototype.getSelectedNamespace = function () {
        return this.selectedNamespace$;
    };
    // Service message commands
    NamespaceService.prototype.updateSelectedNamespace = function (namespace) {
        this.selectedNamespaceSource.next(namespace);
    };
    NamespaceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], NamespaceService);
    return NamespaceService;
}());



/***/ }),

/***/ "./src/app/services/snack-bar.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/snack-bar.service.ts ***!
  \***********************************************/
/*! exports provided: SnackBarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackBarService", function() { return SnackBarService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./snack-bar/snack-bar.component */ "./src/app/services/snack-bar/snack-bar.component.ts");




var SnackBarService = /** @class */ (function () {
    function SnackBarService(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarService.prototype.open = function (message, type, dur) {
        if (dur === void 0) { dur = 8000; }
        return this.snackBar.openFromComponent(_snack_bar_snack_bar_component__WEBPACK_IMPORTED_MODULE_3__["SnackBarComponent"], {
            duration: dur,
            data: { msg: message, snackType: type }
        });
    };
    SnackBarService.prototype.close = function () {
        this.snackBar.dismiss();
    };
    SnackBarService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], SnackBarService);
    return SnackBarService;
}());



/***/ }),

/***/ "./src/app/services/snack-bar/snack-bar.component.html":
/*!*************************************************************!*\
  !*** ./src/app/services/snack-bar/snack-bar.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='data' class=\"snack-container\">\n    <mat-icon [ngClass]='[icon, \"pad\"]'>{{icon}}</mat-icon>\n    <span>{{data.msg}}</span>\n    <button mat-button color=\"accent\" (click)=\"dismiss()\">DISMISS</button>\n</div>"

/***/ }),

/***/ "./src/app/services/snack-bar/snack-bar.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/services/snack-bar/snack-bar.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".snack-container {\n  display: flex;\n  align-items: center; }\n\n.pad {\n  margin-right: 10px; }\n\n.done {\n  color: green; }\n\n.clear {\n  color: red; }\n\n.warning {\n  color: orange; }\n\nspan {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2tpbW9uYXMvY29kZS9ub3RlYm9va3MtdWkvZnJvbnRlbmQvc3JjL2FwcC9zZXJ2aWNlcy9zbmFjay1iYXIvc25hY2stYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBYTtFQUNiLG1CQUFtQixFQUFBOztBQUl2QjtFQUNJLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxVQUFVLEVBQUE7O0FBR2Q7RUFDSSxhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvc2VydmljZXMvc25hY2stYmFyL3NuYWNrLWJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zbmFjay1jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAvLyB3aWR0aDogNTAwcHg7XG59XG5cbi5wYWQge1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLmRvbmUge1xuICAgIGNvbG9yOiBncmVlbjtcbn1cblxuLmNsZWFyIHtcbiAgICBjb2xvcjogcmVkO1xufVxuXG4ud2FybmluZyB7XG4gICAgY29sb3I6IG9yYW5nZTtcbn1cblxuc3BhbiB7XG4gICAgd2lkdGg6IDkwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/services/snack-bar/snack-bar.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/services/snack-bar/snack-bar.component.ts ***!
  \***********************************************************/
/*! exports provided: SnackBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackBarComponent", function() { return SnackBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_utils_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/types */ "./src/app/utils/types.ts");




var SnackBarComponent = /** @class */ (function () {
    function SnackBarComponent(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    Object.defineProperty(SnackBarComponent.prototype, "icon", {
        get: function () {
            switch (this.data.snackType) {
                case src_app_utils_types__WEBPACK_IMPORTED_MODULE_3__["SnackType"].Success:
                    return 'done';
                case src_app_utils_types__WEBPACK_IMPORTED_MODULE_3__["SnackType"].Error:
                    return 'clear';
                case src_app_utils_types__WEBPACK_IMPORTED_MODULE_3__["SnackType"].Warning:
                    return 'warning';
                case src_app_utils_types__WEBPACK_IMPORTED_MODULE_3__["SnackType"].Info:
                    return 'info';
            }
        },
        enumerable: true,
        configurable: true
    });
    SnackBarComponent.prototype.dismiss = function () {
        this.snackBarRef.dismiss();
    };
    SnackBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-snack-bar',
            template: __webpack_require__(/*! ./snack-bar.component.html */ "./src/app/services/snack-bar/snack-bar.component.html"),
            styles: [__webpack_require__(/*! ./snack-bar.component.scss */ "./src/app/services/snack-bar/snack-bar.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_SNACK_BAR_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarRef"], Object])
    ], SnackBarComponent);
    return SnackBarComponent;
}());



/***/ }),

/***/ "./src/app/utils/imports.ts":
/*!**********************************!*\
  !*** ./src/app/utils/imports.ts ***!
  \**********************************/
/*! exports provided: MaterialImportsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialImportsModule", function() { return MaterialImportsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var MaterialImportsModule = /** @class */ (function () {
    function MaterialImportsModule() {
    }
    MaterialImportsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
            ]
        })
    ], MaterialImportsModule);
    return MaterialImportsModule;
}());



/***/ }),

/***/ "./src/app/utils/polling.ts":
/*!**********************************!*\
  !*** ./src/app/utils/polling.ts ***!
  \**********************************/
/*! exports provided: ExponentialBackoff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExponentialBackoff", function() { return ExponentialBackoff; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");


var defaultConfig = {
    retries: 1,
    interval: 1000,
    maxInterval: 16000,
};
var ExponentialBackoff = /** @class */ (function () {
    function ExponentialBackoff(config) {
        if (config === void 0) { config = defaultConfig; }
        var conf = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultConfig, config);
        console.log(conf);
        this.retries = conf.retries;
        this.interval = conf.interval;
        this.maxInterval = conf.maxInterval;
        this.poller = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.n = 0;
        this.remainingTries = this.retries + 1;
        this.currInterval = this.interval;
    }
    ExponentialBackoff.prototype.start = function () {
        var _this = this;
        // Reset the shceduler
        if (this.scheduler) {
            this.scheduler.unsubscribe();
        }
        // Start the Exponential Backoff. All the logic is in iterate()
        this.scheduler = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0, this.interval).subscribe(function () {
            _this.iterate();
        });
        return this.poller;
    };
    ExponentialBackoff.prototype.iterate = function () {
        var _this = this;
        // Emit a new value
        this.n++;
        this.poller.next(this.n);
        // Cancel the previous subscription and reduce the retries
        // If no more retries, then double the interval
        this.scheduler.unsubscribe();
        this.remainingTries--;
        if (this.remainingTries === 0) {
            this.remainingTries = this.retries;
            this.currInterval = Math.min(this.currInterval * 2, this.maxInterval);
        }
        this.scheduler = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.currInterval).subscribe(function () {
            _this.iterate();
        });
    };
    ExponentialBackoff.prototype.reset = function () {
        this.n = 0;
        this.currInterval = this.interval;
        this.remainingTries = this.retries + 1;
        this.start();
    };
    ExponentialBackoff.prototype.stop = function () {
        if (this.scheduler) {
            this.scheduler.unsubscribe();
        }
    };
    ExponentialBackoff.prototype.getPoller = function () {
        return this.poller;
    };
    return ExponentialBackoff;
}());



/***/ }),

/***/ "./src/app/utils/types.ts":
/*!********************************!*\
  !*** ./src/app/utils/types.ts ***!
  \********************************/
/*! exports provided: DEFAULTS, SnackType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULTS", function() { return DEFAULTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackType", function() { return SnackType; });
var DEFAULTS = {
    images: [],
    image: '',
    cpu: '',
    memory: '',
    wsvolume: {
        type: '',
        name: '',
        size: '',
        path: '',
        mode: ''
    },
    wsreadonly: false,
    dtvolumes: [],
    dtreadonly: false,
    extra: '{}'
};
var SnackType;
(function (SnackType) {
    SnackType[SnackType["Success"] = 0] = "Success";
    SnackType[SnackType["Error"] = 1] = "Error";
    SnackType[SnackType["Warning"] = 2] = "Warning";
    SnackType[SnackType["Info"] = 3] = "Info";
})(SnackType || (SnackType = {}));


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    apiUrl: 'http://localhost:5000',
    resource: 'notebooks',
    form: 'http://localhost:4444/volumes/new'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/kimonas/code/notebooks-ui/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
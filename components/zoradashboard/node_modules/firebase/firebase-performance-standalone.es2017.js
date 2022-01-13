!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).firebase=e()}(this,(function(){"use strict";
/**
     * @license
     * Copyright 2017 Google LLC
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
/**
     * @license
     * Copyright 2017 Google LLC
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
     */function t(e,n){if(!(n instanceof Object))return n;switch(n.constructor){case Date:return new Date(n.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return n}for(const r in n)n.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=t(e[r],n[r]));return e}
/**
     * @license
     * Copyright 2017 Google LLC
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
class e{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}class n extends Error{constructor(t,e,i){super(e),this.code=t,this.customData=i,this.name="FirebaseError",Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,r.prototype.create)}}class r{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const r=e[0]||{},o=`${this.service}/${t}`,s=this.errors[t],a=s?function(t,e){return t.replace(i,((t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`}))}(s,r):"Error",c=`${this.serviceName}: ${a} (${o}).`;return new n(o,c,r)}}const i=/\{\$([^}]+)}/g;
/**
     * @license
     * Copyright 2017 Google LLC
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
     */function o(t,e){return Object.prototype.hasOwnProperty.call(t,e)}class s{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
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
     */const a="[DEFAULT]";
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
     */class c{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const t=new e;if(this.instancesDeferred.set(n,t),this.isInitialized(n)||this.shouldAutoInitialize())try{const e=this.getOrInitializeService({instanceIdentifier:n});e&&t.resolve(e)}catch(t){}}return this.instancesDeferred.get(n).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(t){if(r)return null;throw t}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
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
     */(t))try{this.getOrInitializeService({instanceIdentifier:a})}catch(t){}for(const[t,e]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:n});e.resolve(t)}catch(t){}}}}clearInstance(t="[DEFAULT]"){this.instancesDeferred.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter((t=>"INTERNAL"in t)).map((t=>t.INTERNAL.delete())),...t.filter((t=>"_delete"in t)).map((t=>t._delete()))])}isComponentSet(){return null!=this.component}isInitialized(t="[DEFAULT]"){return this.instances.has(t)}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[t,e]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(t)&&e.resolve(r)}return r}onInit(t,e){var n;const r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch(t){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=t,r===a?void 0:r),options:e}),this.instances.set(t,n),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(t){}var r;return n||null}normalizeInstanceIdentifier(t="[DEFAULT]"){return this.component?this.component.multipleInstances?t:a:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class u{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new c(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}
/**
     * @license
     * Copyright 2017 Google LLC
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
     */const l=[];var p;!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(p||(p={}));const f={debug:p.DEBUG,verbose:p.VERBOSE,info:p.INFO,warn:p.WARN,error:p.ERROR,silent:p.SILENT},h=p.INFO,d={[p.DEBUG]:"log",[p.VERBOSE]:"log",[p.INFO]:"info",[p.WARN]:"warn",[p.ERROR]:"error"},g=(t,e,...n)=>{if(e<t.logLevel)return;const r=(new Date).toISOString(),i=d[e];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);console[i](`[${r}]  ${t.name}:`,...n)};class m{constructor(t){this.name=t,this._logLevel=h,this._logHandler=g,this._userLogHandler=null,l.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in p))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?f[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,p.DEBUG,...t),this._logHandler(this,p.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,p.VERBOSE,...t),this._logHandler(this,p.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,p.INFO,...t),this._logHandler(this,p.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,p.WARN,...t),this._logHandler(this,p.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,p.ERROR,...t),this._logHandler(this,p.ERROR,...t)}}function v(t){l.forEach((e=>{e.setLogLevel(t)}))}
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
const b=new r("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."}),I="@firebase/app",w="[DEFAULT]",y={[I]:"fire-core","@firebase/analytics":"fire-analytics","@firebase/app-check":"fire-app-check","@firebase/auth":"fire-auth","@firebase/database":"fire-rtdb","@firebase/functions":"fire-fn","@firebase/installations":"fire-iid","@firebase/messaging":"fire-fcm","@firebase/performance":"fire-perf","@firebase/remote-config":"fire-rc","@firebase/storage":"fire-gcs","@firebase/firestore":"fire-fst","fire-js":"fire-js","firebase-wrapper":"fire-js-all"};
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
class _{constructor(e,n,r){this.firebase_=r,this.isDeleted_=!1,this.INTERNAL={},this.name_=n.name,this.automaticDataCollectionEnabled_=n.automaticDataCollectionEnabled||!1,this.options_=t(void 0,e),this.container=new u(n.name),this.container.addComponent(new s("app",(()=>this),"PUBLIC")),this.firebase_.INTERNAL.components.forEach((t=>this.container.addComponent(t)))}get automaticDataCollectionEnabled(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_}set automaticDataCollectionEnabled(t){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=t}get name(){return this.checkDestroyed_(),this.name_}get options(){return this.checkDestroyed_(),this.options_}delete(){return new Promise((t=>{this.checkDestroyed_(),t()})).then((()=>(this.firebase_.INTERNAL.removeApp(this.name_),Promise.all(this.container.getProviders().map((t=>t.delete())))))).then((()=>{this.isDeleted_=!0}))}_getService(t,e="[DEFAULT]"){return this.checkDestroyed_(),this.container.getProvider(t).getImmediate({identifier:e})}checkDestroyed_(){if(this.isDeleted_)throw b.create("app-deleted",{appName:this.name_})}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}const E=new m("@firebase/app");
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
function S(e){const n={},r=new Map,i={__esModule:!0,initializeApp:function(t,r={}){if("object"!=typeof r||null===r){r={name:r}}const s=r;void 0===s.name&&(s.name=w);const{name:a}=s;if("string"!=typeof a||!a)throw b.create("bad-app-name",{appName:String(a)});if(o(n,a))throw b.create("duplicate-app",{appName:a});const c=new e(t,s,i);return n[a]=c,c},app:a,registerVersion:function(t,e,n){var r;let i=null!==(r=y[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const o=i.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const t=[`Unable to register library "${i}" with version "${e}":`];return o&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&a&&t.push("and"),a&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void E.warn(t.join(" "))}c(new s(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))},setLogLevel:v,onLog:function(t,e){if(null!==t&&"function"!=typeof t)throw b.create("invalid-log-argument");!function(t,e){for(const n of l){let r=null;e&&e.level&&(r=f[e.level]),n.userLogHandler=null===t?null:(e,n,...i)=>{const o=i.map((t=>{if(null==t)return null;if("string"==typeof t)return t;if("number"==typeof t||"boolean"==typeof t)return t.toString();if(t instanceof Error)return t.message;try{return JSON.stringify(t)}catch(t){return null}})).filter((t=>t)).join(" ");n>=(null!=r?r:e.logLevel)&&t({level:p[n].toLowerCase(),message:o,args:i,type:e.name})}}}(t,e)},apps:null,SDK_VERSION:"8.8.0",INTERNAL:{registerComponent:c,removeApp:function(t){delete n[t]},components:r,useAsService:function(t,e){if("serverAuth"===e)return null;return e}}};function a(t){if(!o(n,t=t||w))throw b.create("no-app",{appName:t});return n[t]}function c(o){const s=o.name;if(r.has(s))return E.debug(`There were multiple attempts to register component ${s}.`),"PUBLIC"===o.type?i[s]:null;if(r.set(s,o),"PUBLIC"===o.type){const n=(t=a())=>{if("function"!=typeof t[s])throw b.create("invalid-app-argument",{appName:s});return t[s]()};void 0!==o.serviceProps&&t(n,o.serviceProps),i[s]=n,e.prototype[s]=function(...t){return this._getService.bind(this,s).apply(this,o.multipleInstances?t:[])}}for(const t of Object.keys(n))n[t]._addComponent(o);return"PUBLIC"===o.type?i[s]:null}return i.default=i,Object.defineProperty(i,"apps",{get:function(){return Object.keys(n).map((t=>n[t]))}}),a.App=e,i}
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
class T{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}
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
     */(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}
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
const A=function(){const t=S(_);t.SDK_VERSION=`${t.SDK_VERSION}_LITE`;const e=t.INTERNAL.registerComponent;return t.INTERNAL.registerComponent=function(t){if("PUBLIC"===t.type&&"performance"!==t.name&&"installations"!==t.name)throw Error(`${t.name} cannot register with the standalone perf instance`);return e(t)},t}();function N(t){return Array.prototype.slice.call(t)}function C(t){return new Promise((function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}}))}function k(t,e,n){var r,i=new Promise((function(i,o){C(r=t[e].apply(t,n)).then(i,o)}));return i.request=r,i}function O(t,e,n){var r=k(t,e,n);return r.then((function(t){if(t)return new j(t,r.request)}))}function D(t,e,n){n.forEach((function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})}))}function L(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return k(this[e],r,arguments)})}))}function R(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})}))}function P(t,e,n,r){r.forEach((function(r){r in n.prototype&&(t.prototype[r]=function(){return O(this[e],r,arguments)})}))}function M(t){this._index=t}function j(t,e){this._cursor=t,this._request=e}function $(t){this._store=t}function B(t){this._tx=t,this.complete=new Promise((function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}}))}function U(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new B(n)}function F(t){this._db=t}!function(t,e){t.INTERNAL.registerComponent(new s("platform-logger",(t=>new T(t)),"PRIVATE")),t.registerVersion(I,"0.6.28",e),t.registerVersion("fire-js","")}(A,"lite"),D(M,"_index",["name","keyPath","multiEntry","unique"]),L(M,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),P(M,"_index",IDBIndex,["openCursor","openKeyCursor"]),D(j,"_cursor",["direction","key","primaryKey","value"]),L(j,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(t){t in IDBCursor.prototype&&(j.prototype[t]=function(){var e=this,n=arguments;return Promise.resolve().then((function(){return e._cursor[t].apply(e._cursor,n),C(e._request).then((function(t){if(t)return new j(t,e._request)}))}))})})),$.prototype.createIndex=function(){return new M(this._store.createIndex.apply(this._store,arguments))},$.prototype.index=function(){return new M(this._store.index.apply(this._store,arguments))},D($,"_store",["name","keyPath","indexNames","autoIncrement"]),L($,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),P($,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),R($,"_store",IDBObjectStore,["deleteIndex"]),B.prototype.objectStore=function(){return new $(this._tx.objectStore.apply(this._tx,arguments))},D(B,"_tx",["objectStoreNames","mode"]),R(B,"_tx",IDBTransaction,["abort"]),U.prototype.createObjectStore=function(){return new $(this._db.createObjectStore.apply(this._db,arguments))},D(U,"_db",["name","version","objectStoreNames"]),R(U,"_db",IDBDatabase,["deleteObjectStore","close"]),F.prototype.transaction=function(){return new B(this._db.transaction.apply(this._db,arguments))},D(F,"_db",["name","version","objectStoreNames"]),R(F,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(t){[$,M].forEach((function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var e=N(arguments),n=e[e.length-1],r=this._store||this._index,i=r[t].apply(r,e.slice(0,-1));i.onsuccess=function(){n(i.result)}})}))})),[M,$].forEach((function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise((function(i){n.iterateCursor(t,(function(t){t?(r.push(t.value),void 0===e||r.length!=e?t.continue():i(r)):i(r)}))}))})}));const x="0.4.30",q=1e4,V="w:0.4.30",z="FIS_v2",H=36e5,K=new r("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function W(t){return t instanceof n&&t.code.includes("request-failed")}
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
     */function J({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function G(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}async function X(t,e){const n=(await e.json()).error;return K.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Y({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Z(t,{refreshToken:e}){const n=Y(t);return n.append("Authorization",function(t){return`FIS_v2 ${t}`}
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
     */(e)),n}async function Q(t){const e=await t();return e.status>=500&&e.status<600?t():e}
/**
     * @license
     * Copyright 2020 Google LLC
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
function tt(t){return new Promise((e=>{setTimeout(e,t)}))}
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
const et=/^[cdef][\w-]{21}$/;function nt(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=function(t){return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var e}
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
     */(t);return et.test(e)?e:""}catch(t){return""}}function rt(t){return`${t.appName}!${t.appId}`}
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
     */const it=new Map;function ot(t,e){const n=rt(t);st(n,e),function(t,e){const n=ct();n&&n.postMessage({key:t,fid:e});ut()}(n,e)}function st(t,e){const n=it.get(t);if(n)for(const t of n)t(e)}let at=null;function ct(){return!at&&"BroadcastChannel"in self&&(at=new BroadcastChannel("[Firebase] FID Change"),at.onmessage=t=>{st(t.data.key,t.data.fid)}),at}function ut(){0===it.size&&at&&(at.close(),at=null)}
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
     */const lt="firebase-installations-store";let pt=null;function ft(){return pt||(pt=function(t,e,n){var r=k(indexedDB,"open",[t,e]),i=r.request;return i&&(i.onupgradeneeded=function(t){n&&n(new U(i.result,t.oldVersion,i.transaction))}),r.then((function(t){return new F(t)}))}("firebase-installations-database",1,(t=>{switch(t.oldVersion){case 0:t.createObjectStore(lt)}}))),pt}async function ht(t,e){const n=rt(t),r=(await ft()).transaction(lt,"readwrite"),i=r.objectStore(lt),o=await i.get(n);return await i.put(e,n),await r.complete,o&&o.fid===e.fid||ot(t,e.fid),e}async function dt(t){const e=rt(t),n=(await ft()).transaction(lt,"readwrite");await n.objectStore(lt).delete(e),await n.complete}async function gt(t,e){const n=rt(t),r=(await ft()).transaction(lt,"readwrite"),i=r.objectStore(lt),o=await i.get(n),s=e(o);return void 0===s?await i.delete(n):await i.put(s,n),await r.complete,!s||o&&o.fid===s.fid||ot(t,s.fid),s}
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
     */async function mt(t){let e;const n=await gt(t,(n=>{const r=function(t){return It(t||{fid:nt(),registrationStatus:0})}(n),i=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine){return{installationEntry:e,registrationPromise:Promise.reject(K.create("app-offline"))}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:async function(t,e){try{return ht(t,await async function(t,{fid:e}){const n=J(t),r=Y(t),i={fid:e,authVersion:z,appId:t.appId,sdkVersion:V},o={method:"POST",headers:r,body:JSON.stringify(i)},s=await Q((()=>fetch(n,o)));if(s.ok){const t=await s.json();return{fid:t.fid||e,registrationStatus:2,refreshToken:t.refreshToken,authToken:G(t.authToken)}}throw await X("Create Installation",s)}(t,e))}catch(n){throw W(n)&&409===n.customData.serverCode?await dt(t):await ht(t,{fid:e.fid,registrationStatus:0}),n}}(t,n)}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:vt(t)}:{installationEntry:e}}(t,r);return e=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}async function vt(t){let e=await bt(t);for(;1===e.registrationStatus;)await tt(100),e=await bt(t);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:n}=await mt(t);return n||e}return e}function bt(t){return gt(t,(t=>{if(!t)throw K.create("installation-not-found");return It(t)}))}function It(t){return 1===(e=t).registrationStatus&&e.registrationTime+q<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e;
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
     */}async function wt({appConfig:t,platformLoggerProvider:e},n){const r=function(t,{fid:e}){return`${J(t)}/${e}/authTokens:generate`}
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
     */(t,n),i=Z(t,n),o=e.getImmediate({optional:!0});o&&i.append("x-firebase-client",o.getPlatformInfoString());const s={installation:{sdkVersion:V}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await Q((()=>fetch(r,a)));if(c.ok){return G(await c.json())}throw await X("Generate Auth Token",c)}async function yt(t,e=!1){let n;const r=await gt(t.appConfig,(r=>{if(!Et(r))throw K.create("not-registered");const i=r.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+H}(t)}(i))return r;if(1===i.requestStatus)return n=async function(t,e){let n=await _t(t.appConfig);for(;1===n.authToken.requestStatus;)await tt(100),n=await _t(t.appConfig);const r=n.authToken;return 0===r.requestStatus?yt(t,e):r}(t,e),r;{if(!navigator.onLine)throw K.create("app-offline");const e=function(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}(r);return n=async function(t,e){try{const n=await wt(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await ht(t.appConfig,r),n}catch(n){if(!W(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await ht(t.appConfig,n)}else await dt(t.appConfig);throw n}}(t,e),e}}));return n?await n:r.authToken}function _t(t){return gt(t,(t=>{if(!Et(t))throw K.create("not-registered");const e=t.authToken;return 1===(n=e).requestStatus&&n.requestTime+q<Date.now()?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t;var n;
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
     */}))}function Et(t){return void 0!==t&&2===t.registrationStatus}
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
async function St(t,e=!1){await async function(t){const{registrationPromise:e}=await mt(t);e&&await e}
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
     */(t.appConfig);return(await yt(t,e)).token}async function Tt(t,e){const n=function(t,{fid:e}){return`${J(t)}/${e}`}
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
     */(t,e),r={method:"DELETE",headers:Z(t,e)},i=await Q((()=>fetch(n,r)));if(!i.ok)throw await X("Delete Installation",i)}
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
function At({appConfig:t},e){return function(t,e){ct();const n=rt(t);let r=it.get(n);r||(r=new Set,it.set(n,r)),r.add(e)}(t,e),()=>{!function(t,e){const n=rt(t),r=it.get(n);r&&(r.delete(e),0===r.size&&it.delete(n),ut())}(t,e)}}
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
     */function Nt(t){return K.create("missing-app-config-values",{valueName:t})}
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
     */var Ct;(Ct=A).INTERNAL.registerComponent(new s("installations",(t=>{const e=t.getProvider("app").getImmediate(),n={appConfig:function(t){if(!t||!t.options)throw Nt("App Configuration");if(!t.name)throw Nt("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Nt(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e),platformLoggerProvider:t.getProvider("platform-logger")};return{app:e,getId:()=>async function(t){const{installationEntry:e,registrationPromise:n}=await mt(t.appConfig);return n?n.catch(console.error):yt(t).catch(console.error),e.fid}(n),getToken:t=>St(n,t),delete:()=>async function(t){const{appConfig:e}=t,n=await gt(e,(t=>{if(!t||0!==t.registrationStatus)return t}));if(n){if(1===n.registrationStatus)throw K.create("delete-pending-registration");if(2===n.registrationStatus){if(!navigator.onLine)throw K.create("app-offline");await Tt(e,n),await dt(e)}}}(n),onIdChange:t=>At(n,t)}}),"PUBLIC")),Ct.registerVersion("@firebase/installations",x);const kt="0.4.16",Ot=kt,Dt="FB-PERF-TRACE-MEASURE",Lt="_wt_",Rt="_fcp",Pt="_fid",Mt="@firebase/performance/config",jt="@firebase/performance/configexpire",$t="Performance",Bt=new r("performance",$t,{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve."}),Ut=new m($t);
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
let Ft,xt,qt,Vt;Ut.logLevel=p.INFO;class zt{constructor(t){if(this.window=t,!t)throw Bt.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=t.localStorage),t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(t){this.performance&&this.performance.mark&&this.performance.mark(t)}measure(t,e,n){this.performance&&this.performance.measure&&this.performance.measure(t,e,n)}getEntriesByType(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]}getEntriesByName(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&this.navigator&&this.navigator.cookieEnabled?"indexedDB"in self&&null!=indexedDB||(Ut.info("IndexedDB is not supported by current browswer"),!1):(Ut.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(t,e){if(!this.PerformanceObserver)return;new this.PerformanceObserver((t=>{for(const n of t.getEntries())e(n)})).observe({entryTypes:[t]})}static getInstance(){return void 0===Ft&&(Ft=new zt(xt)),Ft}}
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
function Ht(t,e){const n=t.length-e.length;if(n<0||n>1)throw Bt.create("invalid String merger input");const r=[];for(let n=0;n<t.length;n++)r.push(t.charAt(n)),e.length>n&&r.push(e.charAt(n));return r.join("")}
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
     */class Kt{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=Ht("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=Ht("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getAppId(){const t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!t)throw Bt.create("no app id");return t}getProjectId(){const t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!t)throw Bt.create("no project id");return t}getApiKey(){const t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!t)throw Bt.create("no api key");return t}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===qt&&(qt=new Kt),qt}}
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
     */function Wt(){return Vt}
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
var Jt;!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.VISIBLE=1]="VISIBLE",t[t.HIDDEN=2]="HIDDEN"}(Jt||(Jt={}));const Gt=["firebase_","google_","ga_"],Xt=new RegExp("^[a-zA-Z]\\w*$");function Yt(){const t=zt.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function Zt(){switch(zt.getInstance().document.visibilityState){case"visible":return Jt.VISIBLE;case"hidden":return Jt.HIDDEN;default:return Jt.UNKNOWN}}function Qt(){const t=zt.getInstance().navigator.connection;switch(t&&t.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
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
const te="0.0.1",ee=!0,ne="FIREBASE_INSTALLATIONS_AUTH";function re(t){const e=function(){const t=zt.getInstance().localStorage;if(!t)return;const e=t.getItem(jt);if(!(e&&(n=e,Number(n)>Date.now())))return;var n;const r=t.getItem(Mt);if(!r)return;try{return JSON.parse(r)}catch(t){return}}();return e?(oe(e),Promise.resolve()):function(t){return function(){const t=Kt.getInstance().installationsService.getToken();return t.then((t=>{})),t}().then((e=>{const n=`https://firebaseremoteconfig.googleapis.com/v1/projects/${Kt.getInstance().getProjectId()}/namespaces/fireperf:fetch?key=${Kt.getInstance().getApiKey()}`,r=new Request(n,{method:"POST",headers:{Authorization:`${ne} ${e}`},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:Kt.getInstance().getAppId(),app_version:Ot,sdk_version:te})});return fetch(r).then((t=>{if(t.ok)return t.json();throw Bt.create("RC response not ok")}))})).catch((()=>{Ut.info(ie)}))}(t).then(oe).then((t=>function(t){const e=zt.getInstance().localStorage;if(!t||!e)return;e.setItem(Mt,JSON.stringify(t)),e.setItem(jt,String(Date.now()+60*Kt.getInstance().configTimeToLive*60*1e3))}(t)),(()=>{}))}const ie="Could not fetch config, will use default configs";function oe(t){if(!t)return t;const e=Kt.getInstance(),n=t.entries||{};return void 0!==n.fpr_enabled?e.loggingEnabled="true"===String(n.fpr_enabled):e.loggingEnabled=ee,n.fpr_log_source&&(e.logSource=Number(n.fpr_log_source)),n.fpr_log_endpoint_url&&(e.logEndPointUrl=n.fpr_log_endpoint_url),n.fpr_log_transport_key&&(e.transportKey=n.fpr_log_transport_key),void 0!==n.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate)),void 0!==n.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=se(e.tracesSamplingRate),e.logNetworkAfterSampling=se(e.networkRequestsSamplingRate),t}function se(t){return Math.random()<=t}
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
     */let ae,ce=1;function ue(){return ce=2,ae=ae||function(){const t=zt.getInstance().document;return new Promise((e=>{if(t&&"complete"!==t.readyState){const n=()=>{"complete"===t.readyState&&(t.removeEventListener("readystatechange",n),e())};t.addEventListener("readystatechange",n)}else e()}))}().then((()=>function(){const t=Kt.getInstance().installationsService.getId();return t.then((t=>{Vt=t})),t}())).then((t=>re(t))).then((()=>le()),(()=>le())),ae}function le(){ce=3}
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
     */const pe=1e4;let fe,he=3,de=[],ge=!1;function me(t){setTimeout((()=>{if(0!==he)return de.length?void function(){const t=de.splice(0,1e3),e=t.map((t=>({source_extension_json_proto3:t.message,event_time_ms:String(t.eventTime)})));(function(t,e){return function(t){const e=Kt.getInstance().getFlTransportFullUrl();return fetch(e,{method:"POST",body:JSON.stringify(t)})}(t).then((t=>(t.ok||Ut.info("Call to Firebase backend failed."),t.json()))).then((t=>{const n=Number(t.nextRequestWaitMillis);let r=pe;isNaN(n)||(r=Math.max(n,r));const i=t.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&(de=[...e,...de],Ut.info("Retry transport request later.")),he=3,me(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:Kt.getInstance().logSource,log_event:e},t).catch((()=>{de=[...t,...de],he--,Ut.info(`Tries left: ${he}.`),me(pe)}))}():me(pe)}),t)}function ve(t){return(...e)=>{!function(t){if(!t.eventTime||!t.message)throw Bt.create("invalid cc log");de=[...de,t]}({message:t(...e),eventTime:Date.now()})}}
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
     */function be(t,e){fe||(fe=ve(ye)),fe(t,e)}function Ie(t){const e=Kt.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&zt.getInstance().requiredApisAvailable()&&(t.isAuto&&Zt()!==Jt.VISIBLE||(3===ce?we(t):ue().then((()=>we(t)),(()=>we(t)))))}function we(t){if(!Wt())return;const e=Kt.getInstance();e.loggingEnabled&&e.logTraceAfterSampling&&setTimeout((()=>be(t,1)),0)}function ye(t,e){return 0===e?function(t){const e={url:t.url,http_method:t.httpMethod||0,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},n={application_info:_e(),network_request_metric:e};return JSON.stringify(n)}(t):function(t){const e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=t.counters);const n=t.getAttributes();0!==Object.keys(n).length&&(e.custom_attributes=n);const r={application_info:_e(),trace_metric:e};return JSON.stringify(r)}(t)}function _e(){return{google_app_id:Kt.getInstance().getAppId(),app_instance_id:Wt(),web_app_info:{sdk_version:Ot,page_url:zt.getInstance().getUrl(),service_worker_status:Yt(),visibility_state:Zt(),effective_connection_type:Qt()},application_process_state:0}}
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
     */const Ee=["_fp",Rt,Pt];
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
class Se{constructor(t,e=!1,n){this.name=t,this.isAuto=e,this.state=1,this.customAttributes={},this.counters={},this.api=zt.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=n||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,n&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw Bt.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw Bt.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),Ie(this)}record(t,e,n){if(t<=0)throw Bt.create("nonpositive trace startTime",{traceName:this.name});if(e<=0)throw Bt.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const t of Object.keys(n.metrics))isNaN(Number(n.metrics[t]))||(this.counters[t]=Number(Math.floor(n.metrics[t])));Ie(this)}incrementMetric(t,e=1){void 0===this.counters[t]?this.putMetric(t,e):this.putMetric(t,this.counters[t]+e)}putMetric(t,e){if(!function(t,e){return!(0===t.length||t.length>100)&&(e&&e.startsWith(Lt)&&Ee.indexOf(t)>-1||!t.startsWith("_"))}(t,this.name))throw Bt.create("invalid custom metric name",{customMetricName:t});this.counters[t]=function(t){const e=Math.floor(t);return e<t&&Ut.info(`Metric value should be an Integer, setting the value as : ${e}.`),e}(e)}getMetric(t){return this.counters[t]||0}putAttribute(t,e){const n=function(t){return!(0===t.length||t.length>40)&&(!Gt.some((e=>t.startsWith(e)))&&!!t.match(Xt))}(t),r=function(t){return 0!==t.length&&t.length<=100}(e);if(n&&r)this.customAttributes[t]=e;else{if(!n)throw Bt.create("invalid attribute name",{attributeName:t});if(!r)throw Bt.create("invalid attribute value",{attributeValue:e})}}getAttribute(t){return this.customAttributes[t]}removeAttribute(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(t){this.startTimeUs=t}setDuration(t){this.durationUs=t}calculateTraceMetrics(){const t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))}static createOobTrace(t,e,n){const r=zt.getInstance().getUrl();if(!r)return;const i=new Se(Lt+r,!0),o=Math.floor(1e3*zt.getInstance().getTimeOrigin());i.setStartTime(o),t&&t[0]&&(i.setDuration(Math.floor(1e3*t[0].duration)),i.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),i.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),i.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd)));if(e){const t=e.find((t=>"first-paint"===t.name));t&&t.startTime&&i.putMetric("_fp",Math.floor(1e3*t.startTime));const r=e.find((t=>"first-contentful-paint"===t.name));r&&r.startTime&&i.putMetric(Rt,Math.floor(1e3*r.startTime)),n&&i.putMetric(Pt,Math.floor(1e3*n))}Ie(i)}static createUserTimingTrace(t){Ie(new Se(t,!1,t))}}
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
     */function Te(t){const e=t;if(!e||void 0===e.responseStart)return;const n=zt.getInstance().getTimeOrigin(),r=Math.floor(1e3*(e.startTime+n)),i=e.responseStart?Math.floor(1e3*(e.responseStart-e.startTime)):void 0,o=Math.floor(1e3*(e.responseEnd-e.startTime));!function(t){const e=Kt.getInstance();if(!e.instrumentationEnabled)return;const n=t.url,r=e.logEndPointUrl.split("?")[0],i=e.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout((()=>be(t,0)),0)}({url:e.name&&e.name.split("?")[0],responsePayloadBytes:e.transferSize,startTimeUs:r,timeToResponseInitiatedUs:i,timeToResponseCompletedUs:o})}
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
     */function Ae(){Wt()&&(setTimeout((()=>function(){const t=zt.getInstance(),e=t.getEntriesByType("navigation"),n=t.getEntriesByType("paint");if(t.onFirstInputDelay){let r=setTimeout((()=>{Se.createOobTrace(e,n),r=void 0}),5e3);t.onFirstInputDelay((t=>{r&&(clearTimeout(r),Se.createOobTrace(e,n,t))}))}else Se.createOobTrace(e,n)}()),0),setTimeout((()=>function(){const t=zt.getInstance(),e=t.getEntriesByType("resource");for(const t of e)Te(t);t.setupObserver("resource",Te)}()),0),setTimeout((()=>function(){const t=zt.getInstance(),e=t.getEntriesByType("measure");for(const t of e)Ne(t);t.setupObserver("measure",Ne)}()),0))}function Ne(t){const e=t.name;e.substring(0,Dt.length)!==Dt&&Se.createUserTimingTrace(e)}
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
     */class Ce{constructor(t){this.app=t,zt.getInstance().requiredApisAvailable()&&new Promise(((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((t=>{t&&(ge||(me(5500),ge=!0),ue().then(Ae,Ae))})).catch((t=>{Ut.info(`Environment doesn't support IndexedDB: ${t}`)}))}trace(t){return new Se(t)}set instrumentationEnabled(t){Kt.getInstance().instrumentationEnabled=t}get instrumentationEnabled(){return Kt.getInstance().instrumentationEnabled}set dataCollectionEnabled(t){Kt.getInstance().dataCollectionEnabled=t}get dataCollectionEnabled(){return Kt.getInstance().dataCollectionEnabled}}
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
     */!function(t){const e=(t,e)=>{if("[DEFAULT]"!==t.name)throw Bt.create("FB not default");if("undefined"==typeof window)throw Bt.create("no window");return function(t){xt=t}(window),Kt.getInstance().firebaseAppInstance=t,Kt.getInstance().installationsService=e,new Ce(t)};t.INTERNAL.registerComponent(new s("performance",(t=>{const n=t.getProvider("app").getImmediate(),r=t.getProvider("installations").getImmediate();return e(n,r)}),"PUBLIC")),t.registerVersion("@firebase/performance",kt)}(A);
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
return A.registerVersion("firebase","8.8.0","lite"),A}));
//# sourceMappingURL=firebase-performance-standalone.es2017.js.map

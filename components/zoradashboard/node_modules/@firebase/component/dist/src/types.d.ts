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
import { ComponentContainer } from './component_container';
export declare const enum InstantiationMode {
    LAZY = "LAZY",
    EAGER = "EAGER",
    EXPLICIT = "EXPLICIT"
}
/**
 * PUBLIC: A public component provides a set of public APIs to customers. A service namespace will be patched
 * onto `firebase` namespace. Assume the component name is `test`, customers will be able
 * to get the service by calling `firebase.test()` or `app.test()` where `app` is a `FirebaseApp` instance.
 *
 * PRIVATE: A private component provides a set of private APIs that are used internally by other
 * Firebase SDKs. No serivce namespace is created in `firebase` namespace and customers have no way to get them.
 */
export declare const enum ComponentType {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    VERSION = "VERSION"
}
export interface InstanceFactoryOptions {
    instanceIdentifier?: string;
    options?: {};
}
export declare type InitializeOptions = InstanceFactoryOptions;
/**
 * Factory to create an instance of type T, given a ComponentContainer.
 * ComponentContainer is the IOC container that provides {@link Provider}
 * for dependencies.
 *
 * NOTE: The container only provides {@link Provider} rather than the actual instances of dependencies.
 * It is useful for lazily loaded dependencies and optional dependencies.
 */
export declare type InstanceFactory<T extends Name> = (container: ComponentContainer, options: InstanceFactoryOptions) => NameServiceMapping[T];
export declare type onInstanceCreatedCallback<T extends Name> = (container: ComponentContainer, instanceIdentifier: string, instance: NameServiceMapping[T]) => void;
export interface Dictionary {
    [key: string]: unknown;
}
/**
 * This interface will be extended by Firebase SDKs to provide service name and service type mapping.
 * It is used as a generic constraint to ensure type safety.
 */
export interface NameServiceMapping {
}
export declare type Name = keyof NameServiceMapping;
export declare type Service = NameServiceMapping[Name];
export declare type OnInitCallBack<T extends Name> = (instance: NameServiceMapping[T], identifier: string) => void;

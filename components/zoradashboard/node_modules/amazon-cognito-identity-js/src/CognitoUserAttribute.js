/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */

/** @class */
export default class CognitoUserAttribute {
	/**
	 * Constructs a new CognitoUserAttribute object
	 * @param {string=} Name The record's name
	 * @param {string=} Value The record's value
	 */
	constructor({ Name, Value } = {}) {
		this.Name = Name || '';
		this.Value = Value || '';
	}

	/**
	 * @returns {string} the record's value.
	 */
	getValue() {
		return this.Value;
	}

	/**
	 * Sets the record's value.
	 * @param {string} value The new value.
	 * @returns {CognitoUserAttribute} The record for method chaining.
	 */
	setValue(value) {
		this.Value = value;
		return this;
	}

	/**
	 * @returns {string} the record's name.
	 */
	getName() {
		return this.Name;
	}

	/**
	 * Sets the record's name
	 * @param {string} name The new name.
	 * @returns {CognitoUserAttribute} The record for method chaining.
	 */
	setName(name) {
		this.Name = name;
		return this;
	}

	/**
	 * @returns {string} a string representation of the record.
	 */
	toString() {
		return JSON.stringify(this);
	}

	/**
	 * @returns {object} a flat object representing the record.
	 */
	toJSON() {
		return {
			Name: this.Name,
			Value: this.Value,
		};
	}
}

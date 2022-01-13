/**
 * @license
 * Copyright 2019 Google Inc.
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

const DATABASE_NAME = 'firebase-installations-database';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'firebase-installations-store';

const requestLogs = [];
let db;

window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION).onsuccess = event => {
  db = event.target.result;
  setInterval(refreshDatabase, 1000);
};

function refreshDatabase() {
  const request = db
    .transaction(OBJECT_STORE_NAME, 'readwrite')
    .objectStore(OBJECT_STORE_NAME)
    .getAll();

  request.onsuccess = () => {
    const dbElement = getElement('database');
    dbElement.innerHTML = request.result
      .map(v => `<p>${format(v)}</p>`)
      .join('');
  };
}

function clearDb() {
  const request = db
    .transaction(OBJECT_STORE_NAME, 'readwrite')
    .objectStore(OBJECT_STORE_NAME)
    .clear();
  request.onsuccess = refreshDatabase;
}

function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element not found: ${id}`);
  }
  return element;
}

function getInputValue(elementId) {
  const element = getElement(elementId);
  return element.value;
}

function getId() {
  printRequest('Get ID', FirebaseInstallations.getId(getApp()));
}

function getToken() {
  printRequest('Get Token', FirebaseInstallations.getToken(getApp()));
}

function deleteInstallation() {
  printRequest(
    'Delete Installation',
    FirebaseInstallations.deleteInstallation(getApp())
  );
}

async function printRequest(requestInfo, promise) {
  const requestsElement = getElement('requests');
  requestsElement.innerHTML = '<p><b>Loading...</b></p>' + requestLogs.join('');
  let result;
  try {
    const request = await promise;
    result = request ? format(request) : 'Completed successfully';
  } catch (e) {
    result = e.toString();
  }
  requestLogs.unshift(`<p><b>${requestInfo}:</b><br>${result}</p>`);
  requestsElement.innerHTML = requestLogs.join('');
}

function format(o) {
  const escapedString = JSON.stringify(o, null, 2);
  return `<span class="formatted-content">${escapedString}</span>`;
}

function getApp() {
  const appName = getInputValue('appName');
  const projectId = getInputValue('projectId');
  const apiKey = getInputValue('apiKey');
  const appId = getInputValue('appId');
  return {
    name: appName,
    options: { projectId, apiKey, appId }
  };
}

getElement('getId').onclick = getId;
getElement('getToken').onclick = getToken;
getElement('deleteInstallation').onclick = deleteInstallation;
getElement('clearDb').onclick = clearDb;

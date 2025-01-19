import { Injectable } from '@angular/core';
import { BackendService, SnackBarService, SnackType } from 'kubeflow';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  NotebookResponseObject,
  NotebookRawObject,
  JWABackendResponse,
  Config,
  PodDefault,
  NotebookFormObject,
  NotebookProcessedObject,
  PvcResponseObject,
  AuthorizationPolicyResponseObject
} from '../types';
import { V1Pod } from '@kubernetes/client-node';
import { EventObject } from '../types/event';
@Injectable({
  providedIn: 'root',
})
export class JWABackendService extends BackendService {
  constructor(public http: HttpClient, public snackBar: SnackBarService) {
    super(http, snackBar);
  }

  // GET
  private getNotebooksSingleNamespace(
    namespace: string,
  ): Observable<NotebookResponseObject[]> {
    const url = `api/namespaces/${namespace}/notebooks`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => resp.notebooks),
    );
  }

  private getNotebooksAllNamespaces(
    namespaces: string[],
  ): Observable<NotebookResponseObject[]> {
    return this.getObjectsAllNamespaces(
      this.getNotebooksSingleNamespace.bind(this),
      namespaces,
    );
  }

  public getNotebooks(
    ns: string | string[],
  ): Observable<NotebookResponseObject[]> {
    if (Array.isArray(ns)) {
      return this.getNotebooksAllNamespaces(ns);
    }

    return this.getNotebooksSingleNamespace(ns);
  }

  public getNotebook(
    namespace: string,
    notebookName: string,
  ): Observable<NotebookRawObject> {
    const url = `api/namespaces/${namespace}/notebooks/${notebookName}`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => resp.notebook),
    );
  }

  public getNotebookPod(notebook: NotebookRawObject): Observable<V1Pod> {
    const namespace = notebook.metadata.namespace;
    const notebookName = notebook.metadata.name;
    const url = `api/namespaces/${namespace}/notebooks/${notebookName}/pod`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleErrorExtended(error, [404])),
      map((resp: JWABackendResponse) => resp.pod),
    );
  }

  public getPodLogs(pod: V1Pod): Observable<string[]> {
    const namespace = pod.metadata.namespace;
    const notebookName = pod.metadata.labels['notebook-name'];
    const podName = pod.metadata.name;
    const url = `api/namespaces/${namespace}/notebooks/${notebookName}/pod/${podName}/logs`;
    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleErrorExtended(error, [404, 400])),
      map((resp: JWABackendResponse) => resp.logs),
    );
  }

  public getNotebookEvents(
    notebook: NotebookRawObject,
  ): Observable<EventObject[]> {
    const namespace = notebook.metadata.namespace;
    const notebookName = notebook.metadata.name;
    const url = `api/namespaces/${namespace}/notebooks/${notebookName}/events`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleErrorExtended(error, [404])),
      map((resp: JWABackendResponse) => resp.events),
    );
  }

  public getConfig(): Observable<Config> {
    const url = `api/config`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map(data => data.config),
    );
  }

  public getVolumes(ns: string): Observable<PvcResponseObject[]> {
    // Get existing PVCs in a namespace
    const url = `api/namespaces/${ns}/pvcs`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map(data => data.pvcs),
    );
  }

  public getPodDefaults(ns: string): Observable<PodDefault[]> {
    // Get existing PodDefaults in a namespace
    const url = `api/namespaces/${ns}/poddefaults`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map(data => data.poddefaults),
    );
  }

  public getGPUVendors(): Observable<string[]> {
    // Get installed GPU vendors
    const url = `api/gpus`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map(data => data.vendors),
    );
  }

  // POST
  public createNotebook(notebook: NotebookFormObject): Observable<string> {
    const url = `api/namespaces/${notebook.namespace}/notebooks`;

    return this.http.post<JWABackendResponse>(url, notebook).pipe(
      catchError(error => this.handleError(error)),
      map(_ => 'posted'),
    );
  }

  // PATCH
  public startNotebook(namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { stopped: false }).pipe(
      catchError(error => this.handleError(error)),
      map(_ => 'started'),
    );
  }

  public stopSharedNotebook(orig:string, namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${orig}/${namespace}/sharednotebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { stopped: true }).pipe(
      catchError(error => this.handleError(error, false)),
      map(_ => 'stopped'),
    );
  }

  public startSharedNotebook(orig:string, namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${orig}/${namespace}/sharednotebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { stopped: false }).pipe(
      catchError(error => this.handleError(error)),
      map(_ => 'started'),
    );
  }

  public stopNotebook(namespace: string, name: string): Observable<string> {
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { stopped: true }).pipe(
      catchError(error => this.handleError(error, false)),
      map(_ => 'stopped'),
    );
  }



  // DELETE
  public deleteNotebook(namespace: string, name: string) {
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    return this.http
      .delete<JWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }

  // ---------------------------Error Handling---------------------------------

  public handleErrorExtended(
    error: HttpErrorResponse | ErrorEvent | string,
    codes: number[] = [],
  ): Observable<never> {
    if (
      error instanceof HttpErrorResponse &&
      codes.includes(error.error.status)
    ) {
      // Error code is expected so we do not open a snackBar dialog
      return this.handleError(error, false);
    } else {
      return this.handleError(error);
    }
  }

  // Override common service's getErrorMessage
  // in order to incldue the error.status in error message
  public getErrorMessage(
    error: HttpErrorResponse | ErrorEvent | string,
  ): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (this.getBackendErrorLog(error) !== undefined) {
        return `[${error.status}] ${this.getBackendErrorLog(error)}`;
      }

      return `${error.status}: ${error.message}`;
    }

    if (error instanceof ErrorEvent) {
      return error.message;
    }

    return `Unexpected error encountered`;
  }

  // Lance
  public getManager(namespace: string): Observable<string[]> {
    const url = `api/manager/${namespace}`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map(data => data.manager),
    );
  }

  //2024 show autostart page notebook start//
  public getsharedNotebooks(orig: string, namespace: string,notebook_name:string): Observable<NotebookResponseObject[]> {
    const url = `api/namespaces/${orig}/${namespace}/sharednotebooks/${notebook_name}`;
    console.log('Requesting notebooks:', url);
    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => {
        const filteredNotebooks = resp.notebooks;
        return resp.notebooks;
      }),
    );
  }
  //2024 show autostart page notebook end//
  public getAllNotebooks(namespace: string): Observable<NotebookResponseObject[]> {
    const url = `api/namespaces/${namespace}/allnotebooks`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => {
        // console.log("resp.usery", resp.user)
        return resp.notebooks;
      }),
    );
  }
  
  // 2024/01/21 YCL authorizationPolicy start//
  public getAllAuthorizationPolicy(namespace): Observable<AuthorizationPolicyResponseObject[]> {
    const url = `api/namespaces/${namespace}/aps`;

    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => {
        console.log('xxxxxx');
        return resp.authorizationpolicy;
      }),
    );
  }
  // 2024/01/21 YCL authorizationPolicy end//

  // PATCH
  // Lance - Begin - 20230818
  public setCustomerParamNotebook(notebook: NotebookProcessedObject, jsonTag: string, jsonValue:string): Observable<string> {
    const name = notebook.name;
    const namespace = notebook.namespace;
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    var obj = {};
    obj[jsonTag] = jsonValue;
    return this.http.patch<JWABackendResponse>(url, obj).pipe(
      catchError(error => this.handleError(error)),
      map(_ => {
        return 'started';
      }),
    );
  }

  public enableTemplateNotebook(notebook: NotebookProcessedObject): Observable<string> {
    const name = notebook.name;
    const namespace = notebook.namespace;
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { istemplate: true }).pipe(
      catchError(error => this.handleError(error)),
      map(_ => {
        return 'started';
      }),
    );
  }

  public disableTemplateNotebook(notebook: NotebookProcessedObject): Observable<string> {
    const name = notebook.name;
    const namespace = notebook.namespace;
    const url = `api/namespaces/${namespace}/notebooks/${name}`;

    return this.http.patch<JWABackendResponse>(url, { istemplate: false }).pipe(
      catchError(error => this.handleError(error)),
      map(_ => {
        return 'stopped';
      }),
    );
  }
  // Lance - End - 20230818
    
  //2024/01/21 YCL createauthorizationpolicy start//
  public createAuthorization(namespace,nameValue,pathValue,userEmail): Observable<string> {
    const url2 = `api/namespaces/${namespace}/aps_vnc`;
  
    // Create an object with the 'name' parameter
    const requestBody = { name: nameValue, paths: pathValue, useremail: userEmail};
    
    return this.http.post<JWABackendResponse>(url2,requestBody).pipe(
      catchError(_ => {
        return 'error';
      }),
      map(_ => {
        return 'posted';
      }),
    );
  }
  //2024/01/21 YCL createauthorizationpolicy end//
  
  //2024/01/21 YCL deleteauthorizationpolicy start// 
  // DELETE
   public deleteauthorization(delete_name: string, namespace: string) {
    const url = `api/namespaces/${namespace}/aps_vnc/${delete_name}`;
    return this.http
      .delete<JWABackendResponse>(url)
      .pipe(catchError(error => this.handleError(error, false)));
  }
  //2024/01/21 YCL deleteauthorizationpolicy end// 
  
  // 2024/01/23 YCL add data start//
  public modify_authorizaiton(nameSpace,namevalue,adddata): Observable<string> {
    const url2 = `api/namespaces/${nameSpace}/aps_vnc/${namevalue}`;

    // Create an object with the 'name' parameter
    const requestBody = { values_to_add: adddata};
    
    return this.http.patch<JWABackendResponse>(url2,requestBody).pipe(
      catchError(_ => {
        return 'error';
      }),
      map(_ => {
        return 'posted';
      }),
    );
  }
  // 2024/01/23 YCL add data end//
  
  // 2024/01/23 YCL delete data start//
  public modify_authorizaiton_delete(nameSpace,namevalue,deletedata): Observable<string> {
    const url2 = `api/namespaces/${nameSpace}/aps_vnc_1/${namevalue}`;

    // Create an object with the 'name' parameter
    const requestBody = {values_to_delete: deletedata};
    
    return this.http.patch<JWABackendResponse>(url2,requestBody).pipe(
      catchError(_ => {
        return 'error';
      }),
      map(_ => {
        return 'posted';
      }),
    );
  }
  // 2024/01/23 YCL delete data end//

    
  public checkNotebookAccess(namespace: string, name: string): Observable<boolean> {
    const url = `api/namespaces/${namespace}/check_notebook_access`;
    const requestBody = { name };


    return this.http.post<boolean>(url, requestBody);
  }

  //2024/04/29 YC auto-start page access start//
  public getNotebooksaccess(namespace: string,notebook:string,url1:string): Observable<JWABackendResponse> {
    const url = `api/namespaces/${namespace}/aps-1/${notebook}/${url1}`;
   
    return this.http.get<JWABackendResponse>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: JWABackendResponse) => {
        return resp; // Return the entire backend response
      }),
    );
  }
  //2024/04/29 YC auto-start page access end//

  //2024/04/29 YC auto-start page get profile start//
  public getProfiles(namespace: string): Observable<string> {
    const url = `api/namespaces/${namespace}/aps-2`;
  
    return this.http.get<any>(url).pipe(
      catchError(error => this.handleError(error)),
      map((resp: any) => {
        if (resp && resp.email) {
          return resp.email; // 提取 email 字段
        } else {
          throw new Error('Failed to get email.');
        }
      }),
    );
  }
  //2024/04/29 YC auto-start page access end//

}

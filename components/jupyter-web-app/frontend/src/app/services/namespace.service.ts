import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NamespaceService {
  // Observable string sources
  private selectedNamespaceSource = new BehaviorSubject<string>("kubeflow");

  // Observable string streams
  selectedNamespace$ = this.selectedNamespaceSource.asObservable();

  // GETers
  getSelectedNamespace() {
    return this.selectedNamespace$;
  }

  // Service message commands
  updateSelectedNamespace(namespace: string) {
    this.selectedNamespaceSource.next(namespace);
  }
}

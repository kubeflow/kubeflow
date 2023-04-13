import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CDBNamespaceService } from 'src/app/services/namespace.service';
import { Namespace } from 'src/app/types/namespace';

@Component({
  selector: 'app-namespace-selector',
  templateUrl: './namespace-selector.component.html',
  styleUrls: ['./namespace-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NamespaceSelectorComponent implements OnInit {
  readonly NO_NAMESPACES = 'No namespaces';

  public namespaces: Namespace[];
  public ALL_NAMESPACES = this.ns.ALL_NAMESPACES;
  public selectedNamespace: Namespace = { namespace: this.NO_NAMESPACES };

  public get namespacesAvailable(): boolean {
    // Use ">1" because we always have the "all namespaces" option.
    return this.namespaces?.length > 1;
  }

  constructor(private ns: CDBNamespaceService) {}

  ngOnInit(): void {
    this.ns.namespaces.subscribe((namespaces: Namespace[]) => {
      this.namespaces = namespaces;
    });

    this.ns.currentNamespace.subscribe((namespace: Namespace) => {
      this.selectedNamespace = namespace;
    });
  }

  onSelectNamespace(selected: MatSelectChange) {
    if (!selected) {
      return;
    }
    this.ns.selectNamespace(selected.value as Namespace);
  }

  isSelectedNamespaceOwner(): boolean {
    const namespaceObject = this.ns.getNamespaceObject(
      this.selectedNamespace.namespace,
      this.namespaces,
    );
    return this.isOwner(namespaceObject?.role);
  }

  isOwner(role: string | undefined): boolean {
    return role === 'owner';
  }

  compareWith(o1: Namespace, o2: Namespace) {
    return o1.namespace === o2.namespace;
  }
}

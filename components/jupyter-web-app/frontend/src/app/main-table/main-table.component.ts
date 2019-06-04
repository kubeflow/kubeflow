import { Component, OnInit } from "@angular/core";
import { NamespaceSelectComponent } from "src/app/main-table/namespace-select/namespace-select.component";

@Component({
  selector: "app-main-table",
  templateUrl: "./main-table.component.html",
  styleUrls: ["./main-table.component.scss"]
})
export class MainTableComponent implements OnInit {
  namespaces = [];
  currNamespace: string;

  constructor() {}

  ngOnInit() {}
}

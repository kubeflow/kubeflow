import { Component, OnInit } from "@angular/core";

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

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-namespace-needed-page',
  templateUrl: './namespace-needed-page.component.html',
  styleUrls: ['./namespace-needed-page.component.scss'],
})
export class NamespaceNeededPageComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const queryParam = this.route.snapshot.queryParams.path;
    if (queryParam) {
      this.location.replaceState(queryParam);
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

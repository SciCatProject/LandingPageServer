import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { OAIService } from "../oai.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { PublishedData } from "../shared/sdk";

import {
  TableColumn,
  PageChangeEvent,
  SortChangeEvent
} from "../shared/modules/table/table.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  tableColumns: TableColumn[] = [
    {
      name: "doi",
      icon: "mail",
      sort: true,
      inList: true
    },
    { name: "title", icon: "bubble_chart", sort: true, inList: true },
    { name: "publisher", icon: "bubble_chart", sort: true, inList: true },

  ];
  subtitle: string;
  publications$: Observable<PublishedData[]>;
  subscriptions: Subscription[] = [];
  publications: PublishedData[];

  onClick(doi: string): void {
    this.router.navigateByUrl("/detail/" + encodeURIComponent(doi));
  }

  onPageChange(event: PageChangeEvent) {
  }

  onRowClick() {
  }

  onSortChange(event: SortChangeEvent) {
  }

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private datasetService: DatasetService,
    private oaiService: OAIService,
    private router: Router
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + " Public Dataset Access";
  }

  ngOnInit() {
    if (this.appConfig.directMongoAccess) {
      this.publications$ = this.datasetService.getDatasets();
    } else {
      this.publications$ = this.oaiService.getPublications(null);

      this.subscriptions.push(
        this.publications$.subscribe(publications => {
          this.publications = publications;
        })
      );

    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

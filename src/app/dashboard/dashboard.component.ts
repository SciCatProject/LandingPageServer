import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject, OnInit } from "@angular/core";
import { DatasetService } from "../dataset.service";
import { OAIService, Count } from "../oai.service";
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
  itemsPerPage = 5;
  currentPage = 0;
  sortColumn = "registeredTime";
  defaultSort = "registeredTime";
  sortDirection = "desc";
  get: any;
  params: any;

  tableColumns: TableColumn[] = [
    {
      name: "title",
      icon: "bubble_chart",
      sort: true,
      inList: true
    },
    {
      name: "registeredTime",
      icon: "bubble_chart",
      sort: true,
      inList: true,
      dateFormat: "yyyy-MM-dd HH:mm"
    },
    { name: "publisher", icon: "bubble_chart", sort: true, inList: true }
  ];
  subtitle: string;
  publications$: Observable<PublishedData[]>;
  subscriptions: Subscription[] = [];
  publications: PublishedData[];
  count: number;
  count$: Observable<Count>;

  onRowClick(event: any): void {
    this.router.navigateByUrl("/detail/" + encodeURIComponent(event.doi));
  }

  onPageChange(event: PageChangeEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.get(this.params()).subscribe(publications => {
      this.publications = publications;
    });
  }

  onSortChange(event: SortChangeEvent) {
    const { active: column, direction } = event;
    this.sortColumn = direction ? column : this.defaultSort;
    this.sortDirection = direction ? direction : "asc";
    this.get(this.params()).subscribe(publications => {
      this.publications = publications;
    });
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

  queryParamsJSON() {
    return {
      order: this.sortColumn + " " + this.sortDirection,
      skip: this.itemsPerPage * this.currentPage,
      limit: this.itemsPerPage
    };
  }

  queryParamsString() {
    return (
      "(" +
      "skip=" +
      this.itemsPerPage * this.currentPage +
      ",limit=" +
      this.itemsPerPage +
      ",sortField=" +
      this.sortColumn +
      ",sortDirection=" +
      this.sortDirection +
      ")"
    );
  }

  ngOnInit() {
    document.getElementById("doiValue").innerHTML = "";
    if (this.appConfig.directMongoAccess) {
      this.get = function(params: any) {
        return this.datasetService.getDatasets(params);
      };
      this.params = function() {
        return this.queryParamsJSON();
      };
      this.count$ = this.datasetService.count();
    } else {
      this.get = function(params: any) {
        return this.oaiService.getPublications(params);
      };
      this.params = function() {
        return this.queryParamsString();
      };
      this.count$ = this.oaiService.countPublications();
    }
    this.publications$ = this.get(this.params());

    this.subscriptions.push(
      this.count$.subscribe(res => {
        this.count = res.count;
      }),
      this.publications$.subscribe(publications => {
        this.publications = publications;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

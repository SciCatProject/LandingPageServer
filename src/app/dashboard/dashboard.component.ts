import { APP_CONFIG, AppConfig } from "../app-config.module";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { PublishedData } from "../shared/sdk";
import {
  TableColumn,
  PageChangeEvent,
  SortChangeEvent,
} from "../shared/modules/table/table.component";
import { DatasourceService } from "../datasource.service";

const missingSemi:string

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  subtitle: string;

  itemsPerPage = 20;
  currentPage = 0;
  sortColumn = "registeredTime";
  defaultSort = "registeredTime";
  sortDirection = "desc";
  tableColumns: TableColumn[] = [
    {
      name: "title",
      icon: "title",
      sort: true,
      inList: true,
    },
    {
      name: "registeredTime",
      icon: "calendar_today",
      sort: true,
      inList: true,
      dateFormat: "yyyy-MM-dd HH:mm",
    },
    { name: "creator", icon: "group", sort: true, inList: true },
    { name: "doi", icon: "label", sort: true, inList: true },
  ];
  itemFields = {thumbnail: false};

  params: any = this.datasourceService.queryParams(
    this.itemsPerPage,
    this.currentPage,
    this.sortColumn,
    this.sortDirection,
    this.itemFields,
  );
  publications$: Observable<
    PublishedData[]
  > = this.datasourceService.getPublications(this.params);
  count$: Observable<number> = this.datasourceService.countPublications();

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private datasourceService: DatasourceService,
    private router: Router
  ) {
    const facility = this.appConfig.facility;
    this.subtitle = facility.toUpperCase() + " Public Dataset Access";
  }

  onRowClick(event: any): void {
    this.router.navigateByUrl("/detail/" + encodeURIComponent(event.doi));
  }

  onPageChange(event: PageChangeEvent) {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex;
    this.params = this.datasourceService.queryParams(
      this.itemsPerPage,
      this.currentPage,
      this.sortColumn,
      this.sortDirection,
      this.itemFields,
    );
    this.publications$ = this.datasourceService.getPublications(this.params);
  }

  onSortChange(event: SortChangeEvent) {
    const { active: column, direction } = event;
    this.sortColumn = direction ? column : this.defaultSort;
    this.sortDirection = direction ? direction : "asc";
    this.params = this.datasourceService.queryParams(
      this.itemsPerPage,
      this.currentPage,
      this.sortColumn,
      this.sortDirection,
      this.itemFields,
    );
    this.publications$ = this.datasourceService.getPublications(this.params);
  }
}

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "./app-config.module";
import { map } from "rxjs/operators";
import { PublishedData } from "./shared/sdk/models";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { APP_DYN_CONFIG, AppConfigService, AppConfig as Config } from "./app-config.service";

@Injectable()
export class OAIService {
  private oaiServerUri: string;
  private config: Config;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {
    this.config = this.appConfigService.getConfig();
    this.oaiServerUri = this.config.oaiProviderRoute;
  }

  request<T>(url: string, params: string | null): Observable<T> {
    if (params) {
      url = url + "/" + encodeURIComponent(encodeURIComponent(params));
    }
    return this.httpClient.get(url) as Observable<T>;
  }

  countPublications(): Observable<{ count: number }> {
    console.log("OAIServerUri", this.oaiServerUri);
    return this.request<{ count: number }>(this.oaiServerUri + "/count", null);
  }

  // dont need to format date now?
  getPublications(params: string): Observable<PublishedData[]> {
    console.log("OAIServerUri", this.oaiServerUri);
    return this.request<PublishedData[]>(this.oaiServerUri, params).pipe(
      map((response: PublishedData[]) => {
        if (response) {
          return response.map((pub: PublishedData) => {
            pub.registeredTime = new Date(
              this.datePipe.transform(pub.registeredTime, "yyyy-MM-dd HH:mm")
            );
            return pub;
          });
        }
        return [];
      })
    );
  }

  findOnePublication(params: string): Observable<PublishedData> {
    console.log("OAIServerUri", this.oaiServerUri);
    return this.request<PublishedData>(this.oaiServerUri + "/detail", params);
  }
}

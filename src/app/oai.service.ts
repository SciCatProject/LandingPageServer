import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "./app-config.module";
import { map } from "rxjs/operators";
import { PublishedData } from "./shared/sdk/models";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OAIService {
  private oaiServerUri = this.appConfig.oaiProviderRoute;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {}

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

import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "./app-config.module";
import { map } from "rxjs/operators";
import { PublishedData } from "./shared/sdk/models";
import { DatePipe } from "@angular/common";

export interface Count {
  count: number;
}
@Injectable({
  providedIn: "root"
})
export class OAIService {
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private httpClient: HttpClient,
    private datePipe: DatePipe
  ) {}

  request(url, params) {
    if (params) {
      url = url + "/" + encodeURIComponent(encodeURIComponent(params));
    }
    return this.httpClient.get(url);
  }

  countPublications() {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    console.log("OAIServerUri", OAIServerUri);
    return this.request(
      OAIServerUri + "/count",
      null
    ).pipe(map((response: Count) => response));
  }

  // dont need to format date now?
  getPublications(params) {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    console.log("OAIServerUri", OAIServerUri);
    return this.request(OAIServerUri, params).pipe(
      map((response: PublishedData[]) => {
        if (response) {
          return response.map((pub: PublishedData) => {
            pub.registeredTime = new Date(
              this.datePipe.transform(
                pub.registeredTime,
                "yyyy-MM-dd HH:mm"
              )
            );
            return pub;
          });
        }
        return null;
      })
    );
  }

  findOnePublication(params) {
    const OAIServerUri = this.appConfig.oaiProviderRoute;
    console.log("OAIServerUri", OAIServerUri);
    return this.request(OAIServerUri + "/detail", params).pipe(
      map((response: PublishedData) => response)
    );
  }
}

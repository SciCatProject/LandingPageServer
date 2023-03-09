import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig, APP_CONFIG } from "./app-config.module";
import { DatasourceService } from "./datasource.service";
import { Job } from "./shared/sdk/models";

@Injectable()
export class RetrieveService {
  
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private datasourceService: DatasourceService){}

  public retrieve(
    email: string,
    datasets: string[]
  ): Observable<Job> {
    const job = {
      jobParams: {
        username: this.appConfig.retrieveToEmail?.username,
        option: this.appConfig.retrieveToEmail?.option
      },
      emailJobInitiator: email,
      creationTime: new Date(),
      datasetList: datasets.map((dataset) => ({
        pid: dataset,
        files: [],
      })),
      type: "public",
    };
    return this.datasourceService.postJob(new Job(job));
  }

  public retriveDialogOptions(): object {
    return {
      width: "auto",
      data: {
        title: this.appConfig.retrieveToEmail?.title
      },
    };
  }
}

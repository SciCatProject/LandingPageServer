import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig, APP_CONFIG } from "./app-config.module";
import { DatasourceService } from "./datasource.service";
import { Job } from "./shared/sdk/models";
import {
  AppConfigService,
  RetrieveDestinations,
  AppConfig as Config,
  APP_DYN_CONFIG,
} from "./app-config.service";

@Injectable()
export class RetrieveService {
  private retrieveToEmail: RetrieveDestinations | undefined;
  private config: Config;
  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    @Inject(APP_DYN_CONFIG) private appConfigService: AppConfigService,
    private datasourceService: DatasourceService,
  ) {
    this.config = this.appConfigService.getConfig();
    this.retrieveToEmail = this.config.retrieveToEmail;
  }

  public retrieve(email: string, datasets: string[]): Observable<Job> {
    const job = {
      jobParams: {
        username: this.retrieveToEmail.username,
        option: this.retrieveToEmail.option,
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

  public retriveDialogOptions(): any {
    return {
      width: "auto",
      data: {
        title: this.retrieveToEmail?.title,
        confirmMessage: this.retrieveToEmail?.confirmMessage,
      },
    };
  }
}

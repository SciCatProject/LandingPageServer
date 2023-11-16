import { of } from "rxjs";
import { convertToParamMap } from "@angular/router";
import { AppConfigService, AppConfig } from "../app-config.service";
import { Injectable } from "@angular/core";

export class MockActivatedRoute {
  // stub detail goes here
  snapshot = {
    queryParams: { returnUrl: "/" },
    paramMap: convertToParamMap({ name: "string" }),
    // url: [{ path: "logbooks" }],
    params: of([{ id: 1 }]),
  };
  params = of([{ id: 1 }]);
  queryParams = of([{ limit: 10 }]);
  url = of([]);
  children = [];
}

export class MockOAIService {
  getPublications() {
    return of([]);
  }

  findOnePublication() {
    return of();
  }

  countPublications() {
    return of();
  }
}

export class MockPublishedDataService {
  getPublications() {
    return of([]);
  }

  count() {
    return of(0);
  }

  getPublication() {
    return of({});
  }
}

export class MockDatasourceService {
  getPublications() {
    return of([]);
  }

  countPublications() {
    return of(0);
  }

  getPublication() {
    return of({});
  }

  queryParams() {
    return {};
  }

  postJob() {
    return of({});
  }
}

export class MockRetriveService {
  retrieve() {
    return of({});
  }

  retriveDialogOptions():object {
    return {
      width: "auto",
      data: {
        title: "",
        confirmMessage: "",
      },
    };
  }
}

export class MockDialog {
  open() {
    return {
      afterClosed: () => (of({email:"test@email.com"})),
      componentInstance: {}
    };
  };
}

export class MockMatDialogRef {
  close() {}

  updateSize() {}
}

export class MockMatDialogData {}

@Injectable()
export class MockAppConfigService extends AppConfigService {


  private testConfig ={
    doiBaseUrl: "https://doi.org/",
    production: false,
    accessDataHref: "someurl",
    directMongoAccess: true,
    facility: "ess",
    accessInstructions:
      "Instructions: Login with brightness username and password",
    scicatBaseUrl:"https://scicat.esss.se",
    lbBaseUrl: "https://scicat.esss.se",
    retrieveToEmail: {
      option: "URLs",
      username: "lp_service",
      title: "An email",
      confirmMessage:"aMessage"
      },
      showLogoBanner: true,
      oaiProviderRoute: null,
      logoBanner: "",
  };

  async loadAppConfig(): Promise<void> {

    };

    getConfig(): AppConfig {
      return this.testConfig as AppConfig

    };
};




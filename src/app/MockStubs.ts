import { of } from "rxjs";
import { Observable } from "rxjs";
import { convertToParamMap, UrlTree } from "@angular/router";

export class MockHttp {}

export class MockNgx {}

export class MockDatasetService {
  getDataset() {
    const dataset = {
      doi: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      affiliation: "ESS DG",
      creator: "Dorothea Pfeiffer",
      publisher: "ESS-DMSC",
      publicationYear: 2017,
      title: "Vanadium sample data from NMX beam line",
      url: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      abstract: "string",
      resourceType: "string",
      dataDescription: "string",
      thumbnail: "string",
      sizeOfArchive: 56782,
      numberOfFiles: 26,
      pidArray: ["x", "x"],
      authors: ["x", "x"],
      registeredTime: new Date()
    };
    return of(dataset);
  }

  getDatasets() {
    const dataset = {
      doi: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      affiliation: "ESS DG",
      creator: "Dorothea Pfeiffer",
      publisher: "ESS-DMSC",
      publicationYear: 2017,
      title: "Vanadium sample data from NMX beam line",
      url: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      abstract: "string",
      resourceType: "string",
      dataDescription: "string",
      thumbnail: "string",
      sizeOfArchive: 56782,
      numberOfFiles: 26,
      pidArray: ["x", "x"],
      authors: ["x", "x"],
      registeredTime: new Date()
    };
    return of(dataset);
  }

  searchDatasets() {
    console.log("mock search");
    const dataset = {
      doi: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      affiliation: "ESS DG",
      creator: "Dorothea Pfeiffer",
      publisher: "ESS-DMSC",
      publicationYear: 2017,
      title: "Vanadium sample data from NMX beam line",
      url: "https://doi.org/10.17199/BRIGHTNESS.NMX0001",
      abstract: "string",
      resourceType: "string",
      dataDescription: "string",
      thumbnail: "string",
      sizeOfArchive: 56782,
      numberOfFiles: 26,
      pidArray: ["x", "x"],
      authors: ["x", "x"],
      registeredTime: new Date()
    };
    return of(dataset);
  }

  deleteDataset() {
    return of([{ username: "admin" }]);
  }

  addDataset() {
    return { user: { username: "admin" } };
  }

  count() {
    return of();
  }
}

export class MockMessageService {
  messages: string[] = [];

  add() {
    return "string";
  }

  clear() {
    return of([{ username: "admin" }]);
  }
}

export class MockOAIervice {
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

export class MockActivatedRoute {
  // stub detail goes here
  snapshot = {
    queryParams: { returnUrl: "/" },
    paramMap: convertToParamMap({ name: "string" }),
    // url: [{ path: "logbooks" }],
    params: of([{ id: 1 }])
  };
  params = of([{ id: 1 }]);
  queryParams = of([{ limit: 10 }]);
  url = of([]);
  children = [];
}

export class MockRouter {
  events = new Observable(observer => {
    observer.next();
    observer.complete();
  });
  navigate = function(url, params) {};

  // jasmine.createSpy('navigate');
  navigateByUrl(url: string) {
    return url;
  }

  createUrlTree = (commands, navExtras = {}) => {};
  serializeUrl = (url: UrlTree) => "";
}

export class MockConfigService {
  getConfigFile() {
    return of([undefined]);
  }
}

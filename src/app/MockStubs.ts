import { of } from "rxjs";
import { DATASETS } from "./mock-datasets";

export class MockHttp {}

export class MockNgx {}

export class MockPublishedDataApi {
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
      sizeOfArchive: 5672623,
      numberOfFiles: 26,
      pidArray: ["x", "x"],
      authors: ["x", "x"],
      doiRegisteredSuccessfullyTime: new Date()
    };
    return of(dataset);
  }

  getDatasets() {
    return of([{ username: "admin" }]);
  }
}

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
      doiRegisteredSuccessfullyTime: new Date()
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
        doiRegisteredSuccessfullyTime: new Date()
      };
      return of(dataset);
  }

  deleteDataset() {
    return of([{ username: "admin" }]);
  }

  addDataset() {
    return { user: { username: "admin" } };
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

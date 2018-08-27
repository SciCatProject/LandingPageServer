import { of } from "rxjs";

export class MockHttp {
}

export class MockPublishedDataApi {
  getDataset() {
    return of([{ username: "admin" }]);
  }

  getDatasets() {
    return of([{ username: "admin" }]);
  }

}

export class MockDatasetService {
  getDataset() {
    return of([{ username: "admin" }]);
  }

  getDatasets() {
    return of([{ username: "admin" }]);
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

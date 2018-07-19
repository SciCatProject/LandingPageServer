import {of} from 'rxjs';

export class MockDatasetService {
  getDatasets() {
    return (of([{'username': 'admin'}]));
  }

  deleteDataset() {
    return (of([{'username': 'admin'}]));
  }

  addDataset() {
    return {'user': {'username': 'admin'}};
  }

}

export class MockMessageService {
  messages: string[] = [];

  add() {
    return 'string';
  }

  clear() {
    return (of([{'username': 'admin'}]));
  }


}

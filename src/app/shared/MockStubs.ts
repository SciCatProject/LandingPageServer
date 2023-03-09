import { of } from "rxjs";
import { convertToParamMap } from "@angular/router";

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

  retriveDialogOptions() {
    return {};
  }
}

export class MockDialog {
  open() {
    return {
      afterClosed: () => (of({email:"test@email.com"}))
    };
  };
}

export class MockMatDialogRef {
  close() {}
}

export class MockMatDialogData {}

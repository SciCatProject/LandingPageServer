import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PublisheddataDetailsComponent } from "./publisheddata-details.component";
import { APP_CONFIG } from "../app-config.module";
import { MockActivatedRoute, MockDatasourceService, MockRetriveService } from "../shared/MockStubs";
import { ActivatedRoute } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { DatasourceService } from "../datasource.service";
import { RetrieveService } from "../retrieve.service";
import { PublishedData } from "../shared/sdk";
import { DomSanitizer } from "@angular/platform-browser";
import { of } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogModule } from "../shared/modules/dialog/dialog.module";

describe("PublisheddataDetailsComponent", () => {
  let component: PublisheddataDetailsComponent;
  let fixture: ComponentFixture<PublisheddataDetailsComponent>;

  const scicatBaseUrl = "https://scicat.esss.se";

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PublisheddataDetailsComponent],
        imports: [MatCardModule, DialogModule],
        providers: [
          {
            provide: APP_CONFIG,
            useValue: {
              doiBaseUrl: "https://doi.org/",
              production: false,
              accessDataHref: null,
              directMongoAccess: true,
              facility: "ess",
              accessInstructions:
                "Instructions: Login with brightness username and password",
              scicatBaseUrl,
              retrieveToEmail: true
            },
          },
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: DatasourceService, useClass: MockDatasourceService },
          { provide: RetrieveService, useClass: MockRetriveService },
          {
            provide: DomSanitizer,
            useValue: {
              bypassSecurityTrustHtml: (val: string) => val,
            },
          }          
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisheddataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#onPidClick()", () => {
    it("should call window.open", () => {
      const openSpy = spyOn(window, "open");

      const testPid = "20.500.12269/TEST-PID";
      const encodedPid = encodeURIComponent(testPid);

      component.onPidClick(testPid);

      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(openSpy).toHaveBeenCalledWith(
        scicatBaseUrl + "/datasets/" + encodedPid,
        "_blank"
      );
    });
  });

  describe("#isUrl()", () => {
    it("should return false if dataDescription is not URL", () => {
      const dataDescription = "Not URL";

      const isUrl = component.isUrl(dataDescription);

      expect(isUrl).toEqual(false);
    });

    it("should return true if dataDescription is URL", () => {
      const dataDescription =
        "https://github.com/ess-dmsc/ess_file_formats/wiki/NeXus";

      const isUrl = component.isUrl(dataDescription);

      expect(isUrl).toEqual(true);
    });
  });

  describe("#getSafeHTML()", () => {
    it("should call sanitize and return script tag and json content", () => {
      const value = {key: "value", key1: "value"};
      const safeHTML = component.getSafeHTML(value);
      expect(safeHTML).toEqual(
        `<script type="application/ld+json">${JSON.stringify(value, null, 2)}</script>`);
    });
  });

  describe("#schemaDotOrg()", () => {
    it("should call sanitize and return script tag and json content", () => {
      const publication = new PublishedData({
        doi: "123", 
        creator: ["John Smith"], 
        title: "aTitle", 
        dataDescription: "aDescription", 
        publicationYear: 2021, 
        publisher: "aPublisher", 
        abstract: "",
        resourceType: "",
        pidArray: []
      });
      const safeHTML = component.schemaDotOrg(publication);
      expect(safeHTML).toEqual({
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": "https://doi.org/123",
        "name": "aTitle",
        "creator": {
          "name": "John Smith",
          "givenName": "John",
          "familyName": "Smith",
          "@type": "Person"
        },
        "description": "aDescription",
        "datePublished": "2021",
        "publisher": {
          "@type": "Organization",
          "name": "aPublisher"
        },
        "license": "http://creativecommons.org/licenses/by-sa/4.0/"
      });
    });
  });

  describe("#accessData()", () => {
    it("should call window open", () => {
      const publication = new PublishedData({
        doi: "123", 
        creator: ["John Smith"], 
        title: "aTitle", 
        dataDescription: "aDescription", 
        publicationYear: 2021, 
        publisher: "aPublisher", 
        abstract: "",
        resourceType: "",
        pidArray: [],
        downloadLink: "someLink"
      });
      const openSpy = spyOn(window, "open");
      component.accessData(publication);
      expect(openSpy).toHaveBeenCalledTimes(1);
      expect(openSpy).toHaveBeenCalledWith("someLink");
    });

    it("should open dialog and start a retrieve", () => {
      spyOn(component.dialog, "open")
      .and
      .returnValue({
          afterClosed: () => of({email:"test@email.com"})
      } as MatDialogRef<typeof component>);
      const retrieveSpy = spyOn(component["retrieveSrc"], "retrieve");   
      const publication = new PublishedData({
        doi: "123", 
        creator: ["John Smith"], 
        title: "aTitle", 
        dataDescription: "aDescription", 
        publicationYear: 2021, 
        publisher: "aPublisher", 
        abstract: "",
        pidArray: [
          "pid1",
          "pid2",
        ],
        resourceType: "",
      });
      component.accessData(publication);
      expect(retrieveSpy).toHaveBeenCalledWith("test@email.com", ["pid1", "pid2"]);
    });
  });
});

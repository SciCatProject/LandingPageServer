import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { DatePipe } from "@angular/common";
import {
  TableComponent,
  PageChangeEvent,
  SortChangeEvent,
  CheckboxEvent,
} from "./table.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "./table.module";
import { MatCheckboxChange } from "@angular/material/checkbox";

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, NoopAnimationsModule],
      providers: [DatePipe],
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("publication rendering", () => {
    const publication = {
      title: "A long publication title",
      registeredTime: "2026-10-07T12:00:00Z",
      creator: "A researcher",
      doi: "10.1234/example",
      hidden: "not displayed",
    };

    beforeEach(() => {
      fixture.destroy();
      fixture = TestBed.createComponent(TableComponent);
      component = fixture.componentInstance;
      component.columns = [
        { name: "title", icon: "title", sort: true, inList: true },
        {
          name: "registeredTime",
          icon: "calendar_today",
          sort: true,
          inList: true,
          dateFormat: "yyyy-MM-dd",
        },
        { name: "creator", icon: "group", sort: true, inList: true },
        { name: "doi", icon: "label", sort: true, inList: true },
        { name: "hidden", icon: "", sort: false, inList: false },
      ];
      component.data = [publication];
      component.paginate = true;
      component.select = true;
      component.currentPage = 1;
      component.dataPerPage = 5;
      component.dataCount = 15;
      fixture.detectChanges();
    });

    it("renders all compact fields with the configured date format", () => {
      const fields = fixture.nativeElement.querySelectorAll(
        ".publication-link .publication-field",
      );
      expect(fields.length).toBe(4);
      expect(fields[0].textContent).toContain(publication.title);
      expect(fields[1].textContent).toContain("2026-10-07");
      expect(fields[2].textContent).toContain(publication.creator);
      expect(fields[3].textContent).toContain(publication.doi);
    });

    it("navigates through a native button", () => {
      spyOn(component.rowClick, "emit");
      const button = fixture.nativeElement.querySelector(".publication-link");
      expect(button.tagName).toBe("BUTTON");
      expect(button.type).toBe("button");
      button.click();
      expect(component.rowClick.emit).toHaveBeenCalledWith(publication);
    });

    it("applies the configured theme to the table header", () => {
      // TestBed creates a div host; reproduce the app-table ancestor used in the app.
      const host = document.createElement("app-table");
      fixture.nativeElement.parentNode.insertBefore(
        host,
        fixture.nativeElement,
      );
      host.appendChild(fixture.nativeElement);
      fixture.nativeElement.style.setProperty(
        "--theme-primary-default",
        "rgb(12, 34, 56)",
      );
      fixture.nativeElement.style.setProperty(
        "--theme-primary-default-contrast",
        "rgb(234, 235, 236)",
      );
      const header = fixture.nativeElement.querySelector("mat-header-row");
      const cell = fixture.nativeElement.querySelector("mat-header-cell");
      expect(getComputedStyle(header).backgroundColor).toBe("rgb(12, 34, 56)");
      expect(getComputedStyle(cell).color).toBe("rgb(234, 235, 236)");
      host.replaceWith(fixture.nativeElement);
    });

    it("selects a compact entry without navigating", () => {
      spyOn(component.rowClick, "emit");
      fixture.nativeElement
        .querySelector(".publication-entry mat-checkbox input")
        .click();
      expect(component.selection.isSelected(publication)).toBe(true);
      expect(component.rowClick.emit).not.toHaveBeenCalled();
    });

    it("keeps a single paginator outside the desktop-only view", () => {
      const paginators =
        fixture.nativeElement.querySelectorAll("mat-paginator");
      expect(paginators.length).toBe(1);
      expect(paginators[0].closest(".largeData")).toBeNull();
      spyOn(component.pageChange, "emit");
      paginators[0].querySelector(".mat-mdc-paginator-navigation-next").click();
      expect(component.pageChange.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({ pageIndex: 2, pageSize: 5, length: 15 }),
      );
    });
  });

  describe("#onPageChange()", () => {
    it("should emit a PageChangeEvent", () => {
      spyOn(component.pageChange, "emit");

      const event: PageChangeEvent = {
        pageIndex: 0,
        pageSize: 25,
        length: 25,
      };
      component.onPageChange(event);

      expect(component.pageChange.emit).toHaveBeenCalledTimes(1);
      expect(component.pageChange.emit).toHaveBeenCalledWith(event);
    });
  });

  describe("#onSortChange()", () => {
    it("should emit a SortChangeEvent", () => {
      spyOn(component.sortChange, "emit");

      const event: SortChangeEvent = {
        active: "test",
        direction: "",
      };
      component.onSortChange(event);

      expect(component.sortChange.emit).toHaveBeenCalledTimes(1);
      expect(component.sortChange.emit).toHaveBeenCalledWith(event);
    });
  });

  describe("#onRowClick()", () => {
    it("should emit the data in the selected row", () => {
      spyOn(component.rowClick, "emit");

      const data = {
        id: "123",
        name: "test",
      };
      component.onRowClick(data);

      expect(component.rowClick.emit).toHaveBeenCalledTimes(1);
      expect(component.rowClick.emit).toHaveBeenCalledWith(data);
    });
  });

  describe("#onSelectAll()", () => {
    it("should emit a MatCheckboxChange event", () => {
      spyOn(component.selectAll, "emit");

      const event = new MatCheckboxChange();
      component.onSelectAll(event);

      expect(component.selectAll.emit).toHaveBeenCalledTimes(1);
      expect(component.selectAll.emit).toHaveBeenCalledWith(event);
    });
  });

  describe("#onSelectOne()", () => {
    it("should emit a CheckboxEvent", () => {
      spyOn(component.selectOne, "emit");

      const selectEvent: CheckboxEvent = {
        event: new MatCheckboxChange(),
        row: {},
      };
      component.onSelectOne(selectEvent.event, selectEvent.row);

      expect(component.selectOne.emit).toHaveBeenCalledTimes(1);
      expect(component.selectOne.emit).toHaveBeenCalledWith(selectEvent);
    });
  });

  describe("#isAllSelected()", () => {
    it("should return false if length of data array and length of selected array are not equal", () => {
      component.data = ["test1", "test2"];

      const allSelected = component.isAllSelected();

      expect(allSelected).toEqual(false);
    });

    it("should return true if length of data array and length of selected array are equal", () => {
      const allSelected = component.isAllSelected();

      expect(allSelected).toEqual(true);
    });
  });
});

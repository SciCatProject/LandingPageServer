import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DialogComponent } from "./dialog.component";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MockMatDialogRef, MockMatDialogData, MockDialog } from "../../MockStubs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe("DialogComponent", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogComponent],
        imports: [
          CommonModule,
          FormsModule,
          MatButtonModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          BrowserAnimationsModule
        ],
        providers: [
          { provide: MatDialogRef, useClass: MockMatDialogRef },
          { provide: MAT_DIALOG_DATA, useClass: MockMatDialogData },
          { provide: MatDialog, useClass: MockDialog },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#confirm()", () => {
    it("should call confirm", () => {
      spyOn(component["confirmationDialog"], "open").and.callThrough();
      const dialogRefSpy = spyOn(component.dialogRef, "close").and.callThrough();
      const value = {email: "test@email.com", confirmMessage: "aMessage"};
      component.confirm(value);
      expect(dialogRefSpy).toHaveBeenCalledOnceWith(value);
    });
  });

});

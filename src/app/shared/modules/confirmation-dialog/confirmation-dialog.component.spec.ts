import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import {
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MockMatDialogRef, MockMatDialogData } from "../../MockStubs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


describe("DialogComponent", () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfirmationDialogComponent],
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
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

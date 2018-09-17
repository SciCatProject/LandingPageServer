import { MessageService } from "../message.service";
import { MessagesComponent } from "./messages.component";
import { MockMessageService } from "../MockStubs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("MessagesComponent", () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [{ provide: MessageService, useClass: MockMessageService }]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created MC", () => {
    expect(component).toBeTruthy();
  });
});

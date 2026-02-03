import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuildPopUpComponent } from './add-guild-pop-up.component';

describe('AddGuildPopUpComponent', () => {
  let component: AddGuildPopUpComponent;
  let fixture: ComponentFixture<AddGuildPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuildPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuildPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

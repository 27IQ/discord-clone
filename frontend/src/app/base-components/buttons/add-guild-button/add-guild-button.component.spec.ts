import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuildButtonComponent } from './add-guild-button.component';

describe('AddGuildButtonComponent', () => {
  let component: AddGuildButtonComponent;
  let fixture: ComponentFixture<AddGuildButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuildButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuildButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

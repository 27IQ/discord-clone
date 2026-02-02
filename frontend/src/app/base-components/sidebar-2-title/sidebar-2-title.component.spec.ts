import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar2TitleComponent } from './sidebar-2-title.component';

describe('Sidebar2TitleComponent', () => {
  let component: Sidebar2TitleComponent;
  let fixture: ComponentFixture<Sidebar2TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar2TitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebar2TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

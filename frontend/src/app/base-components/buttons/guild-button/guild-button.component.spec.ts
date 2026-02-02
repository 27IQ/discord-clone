import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildButtonComponent } from './guild-button.component';

describe('GuildButtonComponent', () => {
  let component: GuildButtonComponent;
  let fixture: ComponentFixture<GuildButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

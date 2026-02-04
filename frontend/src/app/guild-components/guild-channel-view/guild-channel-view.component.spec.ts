import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildChannelViewComponent } from './guild-channel-view.component';

describe('GuildChannelViewComponent', () => {
  let component: GuildChannelViewComponent;
  let fixture: ComponentFixture<GuildChannelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildChannelViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildChannelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

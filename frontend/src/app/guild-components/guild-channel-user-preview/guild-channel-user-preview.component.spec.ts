import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildChannelUserPreviewComponent } from './guild-channel-user-preview.component';

describe('GuildChannelUserPreviewComponent', () => {
  let component: GuildChannelUserPreviewComponent;
  let fixture: ComponentFixture<GuildChannelUserPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildChannelUserPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildChannelUserPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildChannelComponent } from './guild-channel.component';

describe('GuildChannelComponent', () => {
  let component: GuildChannelComponent;
  let fixture: ComponentFixture<GuildChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

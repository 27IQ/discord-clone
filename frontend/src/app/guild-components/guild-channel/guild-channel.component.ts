import { Component, input } from '@angular/core';
import { Channel } from '../../classes/channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guild-channel',
  imports: [CommonModule],
  templateUrl: './guild-channel.component.html',
  styleUrl: './guild-channel.component.css',
})
export class GuildChannelComponent {
  channel = input.required<Channel>()
}

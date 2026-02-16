import { Component, input } from '@angular/core';
import { User } from '../../classes/user';

@Component({
  selector: 'app-guild-channel-user-preview',
  imports: [],
  templateUrl: './guild-channel-user-preview.component.html',
  styleUrl: './guild-channel-user-preview.component.css',
})
export class GuildChannelUserPreviewComponent {
  activeUser = input.required<User>()
}

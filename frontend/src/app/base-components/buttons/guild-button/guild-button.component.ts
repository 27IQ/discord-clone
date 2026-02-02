import { Component, input, computed } from '@angular/core';
import { Guild } from '../../../classes/guild';

@Component({
  selector: 'app-guild-button',
  imports: [],
  templateUrl: './guild-button.component.html',
  styleUrl: './guild-button.component.css',
})
export class GuildButtonComponent {
  guild = input.required<Guild>()
  displayName = computed(() => `${this.guild().name}`)
}

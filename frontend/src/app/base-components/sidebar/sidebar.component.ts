import { Component, effect, inject, signal } from '@angular/core';
import { AddGuildButtonComponent } from '../buttons/add-guild-button/add-guild-button.component';
import { GuildButtonComponent } from '../buttons/guild-button/guild-button.component';
import { GuildSummeryEntry } from '../../classes/guild';
import { CommonModule } from '@angular/common';
import { GuildService } from '../../services/guild.service';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';

@Component({
  selector: 'app-sidebar',
  imports: [AddGuildButtonComponent, GuildButtonComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private guildService = inject(GuildService)
  private sideBarDataService = inject(SidebarDataService)
  guilds = signal<GuildSummeryEntry[]>([])

  constructor() {
    this.refreshGuilds()

    effect(() => {
      this.sideBarDataService.refreshGuildButtonsEvent()
      this.refreshGuilds()
    })
  }

  refreshGuilds() {
    this.guildService.getCurrentUsersGuilds().subscribe({
      next: (response) => {
        this.guilds.set(response as GuildSummeryEntry[]);
      }
    })
  }
}

import { Component, signal } from '@angular/core';
import { AddGuildButtonComponent } from '../buttons/add-guild-button/add-guild-button.component';
import { GuildButtonComponent } from '../buttons/guild-button/guild-button.component';
import { Guild } from '../../classes/guild';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [AddGuildButtonComponent, GuildButtonComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor() {
    this.refreshGuilds()
  }

  guilds = signal<Guild[]>
    ([
      new Guild("2345", "Domba"),
      new Guild("23456", "Penis"),
      new Guild("234567", "Homo")
    ])

  refreshGuilds() {
    //TODO implement
  }
}

import { Component, inject, OnInit, Signal } from '@angular/core';
import { AddGuildButtonComponent } from '../buttons/add-guild-button/add-guild-button.component';
import { GuildButtonComponent } from '../buttons/guild-button/guild-button.component';
import { GuildData } from '../../classes/guild';
import { CommonModule } from '@angular/common';
import { GuildCacheService } from '../../services/cache/guild-cache.service';

@Component({
  selector: 'app-sidebar',
  imports: [AddGuildButtonComponent, GuildButtonComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private guildCache = inject(GuildCacheService)
  public guilds: Signal<GuildData>[] = [];

  async ngOnInit() {
    const cache = await this.guildCache.getCache()
    this.guilds = cache.getAllSignals()
  }

}

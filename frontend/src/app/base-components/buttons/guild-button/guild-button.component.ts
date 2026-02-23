import { Component, input, inject, Signal } from '@angular/core';
import { GuildData } from '../../../classes/guild';
import { SidebarDataService } from '../../../services/data-services/sidebar-data.service';
import { PageHolder } from '../../../classes/page-holder';
import { PageView } from '../../../enums/page-view';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guild-button',
  imports: [CommonModule],
  templateUrl: './guild-button.component.html',
  styleUrl: './guild-button.component.css',
})
export class GuildButtonComponent {

  sideBarDataService = inject(SidebarDataService)
  guild = input.required<Signal<GuildData>>()

  changeToGuildView() {
    this.sideBarDataService.updatePageView(new PageHolder(PageView.GUILD, this.guild()().id))
  }
}

import { Component, input, inject } from '@angular/core';
import { Guild } from '../../../classes/guild';
import { SidebarDataService } from '../../../services/data-services/sidebar-data.service';
import { PageHolder } from '../../../classes/page-holder';
import { PageView } from '../../../enums/page-view';

@Component({
  selector: 'app-guild-button',
  imports: [],
  templateUrl: './guild-button.component.html',
  styleUrl: './guild-button.component.css',
})
export class GuildButtonComponent {

  sideBarDataService = inject(SidebarDataService)
  guild = input.required<Guild>()

  changeToGuildView() {
    this.sideBarDataService.updatePageView(new PageHolder(PageView.GUILD, this.guild().id))
  }
}

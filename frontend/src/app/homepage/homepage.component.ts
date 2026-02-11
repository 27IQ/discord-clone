import { Component, inject } from '@angular/core';
import { Sidebar2Component } from '../base-components/sidebar-2/sidebar-2.component';
import { SidebarComponent } from '../base-components/sidebar/sidebar.component';
import { PageTitleComponent } from '../base-components/page-title/page-title.component';
import { Sidebar2TitleComponent } from '../base-components/sidebar-2-title/sidebar-2-title.component';
import { HomeIconComponent } from '../base-components/buttons/home-icon/home-icon.component';
import { UserStatusComponent } from '../base-components/user-status/user-status.component';
import { AddGuildPopUpComponent } from '../base-components/add-guild-pop-up/add-guild-pop-up.component';
import { SidebarDataService } from '../services/data-services/sidebar-data.service';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-homepage',
  imports: [Sidebar2Component, SidebarComponent, PageTitleComponent, Sidebar2TitleComponent, HomeIconComponent, UserStatusComponent, AddGuildPopUpComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  sideBarDataService = inject(SidebarDataService)
  webSocketService = inject(WebsocketService)

  constructor() {
    this.webSocketService.activate()
  }

}

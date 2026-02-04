import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';
import { GuildChannelViewComponent } from '../../guild-components/guild-channel-view/guild-channel-view.component';

@Component({
  selector: 'app-sidebar-2',
  imports: [CommonModule, GuildChannelViewComponent],
  templateUrl: './sidebar-2.component.html',
  styleUrl: './sidebar-2.component.css'
})
export class Sidebar2Component {
  sideBarDataService = inject(SidebarDataService)
}

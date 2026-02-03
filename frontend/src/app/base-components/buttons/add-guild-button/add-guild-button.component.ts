import { Component, inject } from '@angular/core';
import { SidebarDataService } from '../../../services/data-services/sidebar-data.service';

@Component({
  selector: 'app-add-guild-button',
  imports: [],
  templateUrl: './add-guild-button.component.html',
  styleUrl: './add-guild-button.component.css',
})
export class AddGuildButtonComponent {

  sideBarDataService = inject(SidebarDataService)

  openAddGuildPopUp() {
    this.sideBarDataService.updateShowAddGuildPopUp(true)
  }
}

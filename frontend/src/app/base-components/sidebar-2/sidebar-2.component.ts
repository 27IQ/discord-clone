import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';

@Component({
  selector: 'app-sidebar-2',
  imports: [CommonModule],
  templateUrl: './sidebar-2.component.html',
  styleUrl: './sidebar-2.component.css'
})
export class Sidebar2Component {
  sideBarDataService = inject(SidebarDataService)

}

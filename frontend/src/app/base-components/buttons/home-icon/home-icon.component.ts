import { Component, inject } from '@angular/core';
import { SidebarDataService } from '../../../services/data-services/sidebar-data.service';
import { PageHolder } from '../../../classes/page-holder';
import { PageView } from '../../../enums/page-view';

@Component({
  selector: 'app-home-icon',
  imports: [],
  templateUrl: './home-icon.component.html',
  styleUrl: './home-icon.component.css'
})
export class HomeIconComponent {
  sideBarDataService = inject(SidebarDataService)

  changeToHomeView() {
    this.sideBarDataService.updatePageView(new PageHolder(PageView.HOMEPAGE, null))
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar2Component } from './base-components/sidebar-2/sidebar-2.component';
import { SidebarComponent } from './base-components/sidebar/sidebar.component';
import { PageTitleComponent } from './base-components/page-title/page-title.component';
import { Sidebar2TitleComponent } from './base-components/sidebar-2-title/sidebar-2-title.component';
import { HomeIconComponent } from './base-components/home-icon/home-icon.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar2Component, SidebarComponent, PageTitleComponent, Sidebar2TitleComponent, HomeIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularElectronDiscordClone';
}

import { Injectable, signal } from '@angular/core';
import { PageView } from '../../enums/page-view';
import { PageHolder } from '../../classes/page-holder';

@Injectable({
  providedIn: 'root',
})
export class SidebarDataService {
  private _showAddGuildPopUp = signal<boolean>(false)
  public showAddGuildPopUp = this._showAddGuildPopUp.asReadonly()

  updateShowAddGuildPopUp(val: boolean) {
    this._showAddGuildPopUp.set(val)
  }

  private _refreshGuildButtonsEvent = signal(0)
  public refreshGuildButtonsEvent = this._refreshGuildButtonsEvent.asReadonly()

  triggerRefreshGuildButtonsEvent() {
    this._refreshGuildButtonsEvent.update(n => n + 1)
  }

  private _currentPageView = signal(new PageHolder(PageView.HOMEPAGE, null))
  public currentPageView = this._currentPageView.asReadonly()

  updatePageView(pageHolder: PageHolder) {
    this._currentPageView.set(pageHolder)
  }

  isCurrentPage(pageView: string) {
    return this._currentPageView().type === pageView
  }
}

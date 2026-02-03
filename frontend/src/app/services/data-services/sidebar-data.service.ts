import { Injectable, signal } from '@angular/core';

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
}

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarDataService } from '../../services/data-services/sidebar-data.service';
import { GuildService } from '../../services/guild.service';

@Component({
  selector: 'app-add-guild-pop-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-guild-pop-up.component.html',
  styleUrl: './add-guild-pop-up.component.css',
})
export class AddGuildPopUpComponent {

  sideBarDataService = inject(SidebarDataService)
  guildService = inject(GuildService)

  loading = signal(false)

  public form = new FormGroup({
    guildName: new FormControl('', {
      nonNullable: true,
    })
  });

  close() {
    this.sideBarDataService.updateShowAddGuildPopUp(false)
  }

  async submit() {
    console.log("submit")

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { guildName } = this.form.getRawValue();

    this.guildService.createNewGuild(guildName).subscribe({
      next: (response) => {
        console.log(`guild created: ${response}`)
        this.sideBarDataService.triggerRefreshGuildButtonsEvent()
        //TODO route to guild
        this.close()
      },
      error: (err) => {
        this.loading.set(false)
        console.error(err)
      }
    })
  }
}

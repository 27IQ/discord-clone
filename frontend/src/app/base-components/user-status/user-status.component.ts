import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-user-status',
  imports: [],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.css',
})
export class UserStatusComponent {

  user?: User
  private readonly auth = inject(AuthService);

  constructor() {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    this.auth.whoAmI().subscribe({
      next: (response) => {
        this.user = response as User;
        console.log(this.user)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}

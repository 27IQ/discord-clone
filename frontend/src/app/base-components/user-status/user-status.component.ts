import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-status',
  imports: [],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.css',
})
export class UserStatusComponent {

  user = signal<User>(new User)
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.loadCurrentUser()
  }

  loadCurrentUser() {
    this.auth.whoAmI().subscribe({
      next: (response) => {
        this.user.set(response as User)
        console.log(this.user)
      },
      error: (err) => {
        console.error(err)
        this.router.navigateByUrl('/login');
      }
    })
  }
}

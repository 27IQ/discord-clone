import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserLoginDto } from '../classes/user-login-dto';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // Simple UI state
  loading = signal(false);
  serverError = signal<string | null>(null);

  form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  async submit() {
    console.log("submit")
    this.serverError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { username, password } = this.form.getRawValue();

    this.auth.login(new UserLoginDto(username, password)).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.loading.set(false);
        const msg =
          err?.error?.message ??
          err?.message ??
          'Login failed. Please check your credentials.';
        this.serverError.set(msg);
      },
    });
  }
}

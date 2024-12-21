import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService)
  fb = inject(FormBuilder)
  loading: boolean = false
  form!: FormGroup
  constructor() {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit() {
    this.loading = true
    const formValue = this.form.getRawValue()
    this.authService.login(formValue).subscribe({
      next: (data: any) => {
        this.authService.adminLoggedIn.set(true)
        localStorage.setItem('token', data.token)
        this.authService.redirectToAdmin()
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        this.loading = false
      }
    })
  }
}

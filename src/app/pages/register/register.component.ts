import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    authService = inject(AuthService)
    fb = inject(FormBuilder)
    loading: boolean = false
    form!: FormGroup
    constructor() {
      this.form = this.fb.nonNullable.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        image: ['', Validators.required],
        role: ['admin', Validators.required]
      })
    }

    onSubmit() {
      this.loading = true
      const formValue = this.form.getRawValue()
      this.authService.register(formValue).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token)
          this.authService.adminLoggedIn.set(true)
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

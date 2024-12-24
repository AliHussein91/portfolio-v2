import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private fb = inject(FormBuilder)
  private messageService = inject(MessageService)
  isSent: boolean = false
  isError: boolean = false
  form!: FormGroup
  constructor() {
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(20)]]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.messageService.postMessage(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.isSent = true
        this.form.reset()
      },
      error: (err) => {
        this.isError = true
      },
      complete: () => {
        setTimeout(() => {
          this.isSent = false
          this.isError = false
        }, 3000)
      }
    })
  }
}

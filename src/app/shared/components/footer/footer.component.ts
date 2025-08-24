import { Component, inject, Input } from '@angular/core';
import { ContactComponent } from "../../../pages/contact/contact.component";
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() isVisible = true
  // authService = inject(AuthService)

  // logoutUser() {
  //   this.authService.logout()
  // }
}

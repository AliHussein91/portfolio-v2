import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SkillsComponent } from "../skills/skills.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe, SkillsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}

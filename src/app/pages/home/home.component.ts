import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { HeroComponent } from "../hero/hero.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ProjectsSampleComponent } from "../projects-sample/projects-sample.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, ProjectsComponent, ProjectsSampleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

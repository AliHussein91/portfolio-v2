import { inject, Injectable } from '@angular/core';
import { Project } from '../../shared/types/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_Points } from '../http/global/global.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {



  projects: Project[] = [{ id: 1, name: 'Project Name', description: 'This is a project description', image: 'img/project_1.png' }, { id: 2, name: 'Project Name', description: 'This is a project description', image: 'img/project_3.png' },]
  http = inject(HttpClient)
  projectsURL = END_Points.project
  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.projectsURL.getProjects)
  }
}

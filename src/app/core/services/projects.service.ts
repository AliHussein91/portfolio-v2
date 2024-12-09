import { inject, Injectable } from '@angular/core';
import { Project } from '../../shared/types/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [{ id: 1, name: 'Project Name', description: 'This is a project description', image: 'img/project_1.png' }, { id: 2, name: 'Project Name', description: 'This is a project description', image: 'img/project_3.png' },]
  http = inject(HttpClient)
  
  getProjects(){
    return this.http.get('')
  }
}

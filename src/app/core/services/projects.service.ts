import { inject, Injectable } from '@angular/core';
import { IProject } from '../types/project.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_Points } from '../http/global/global.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {



  projects: IProject[] = []
  http = inject(HttpClient)
  projectsURL = END_Points.projects
  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectsURL.getProjects)
  }

  getProject(id: string): Observable<IProject> {
    return this.http.get<IProject>(this.projectsURL.getProject(id))
  }
  postProject(project: IProject): Observable<IProject> {
    return this.http.post<IProject>(this.projectsURL.postProject, project)
  }
  updateProject(id: string, project: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.projectsURL.updateProject(id), project)
  }
  deleteProject(id: string): Observable<IProject> {
    return this.http.delete<IProject>(this.projectsURL.deletProject(id))
  }

}

import { inject, Injectable } from '@angular/core';
import { ISkill } from '../types/skill.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_Points } from '../http/global/global.config';
import { IProject } from '../types/project.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  skills: ISkill[] = []
  http = inject(HttpClient)
  skillsURL = END_Points.skills
  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.skillsURL.getSkills)
  }
  getSkill(id: string): Observable<ISkill> {
    return this.http.get<ISkill>(this.skillsURL.getSkill(id))
  }
  postSkill(skill: ISkill): Observable<ISkill> {
    return this.http.post<ISkill>(this.skillsURL.postSkill, skill)
  }
  updateSkill(id: string, skill: ISkill): Observable<ISkill> {
    return this.http.put<ISkill>(this.skillsURL.updateSkill(id), skill)
  }
  deleteSkill(id: string): Observable<ISkill> {
    return this.http.delete<ISkill>(this.skillsURL.deletSkill(id))
  }
}

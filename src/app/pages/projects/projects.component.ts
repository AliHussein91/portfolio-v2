import { Component, inject, OnInit } from '@angular/core';
import { IProject } from '../../core/types/project.interface';
import { ProjectCardComponent } from "../../shared/components/project-card/project-card.component";
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService } from '../../core/services/projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: IProject[] = [];
  paginatedProjects: IProject[] = [];
  projectService = inject(ProjectsService);
  isLoading = false;

  // Pagination properties
  currentPage = 1;
  pageSize = 6; // Number of projects per page
  totalPages = 1;

  ngOnInit(): void {
    this.showProjects();
  }

  async showProjects() {
    if (!localStorage.getItem('projects')) {
      this.getProjects();
    }
    const projects = await JSON.parse(localStorage.getItem('projects')!);
    this.projects = projects;
    this.setupPagination();
  }

  getProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects: IProject[]) => {
        this.projects = projects;
        localStorage.setItem('projects', JSON.stringify(projects));
        this.setupPagination();
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.projects.length / this.pageSize);
    this.setPaginatedProjects();
  }

  setPaginatedProjects() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProjects = this.projects.slice(start, end);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPaginatedProjects();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedProjects();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedProjects();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  }
}

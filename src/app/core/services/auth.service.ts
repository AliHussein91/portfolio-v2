import { inject, Injectable, signal } from '@angular/core';
import { END_Points } from '../http/global/global.config';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../types/user.interface';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminLoggedIn = signal(false)

  authURL = END_Points.auth

  http = inject(HttpClient)
  router = inject(Router)
  login(credentials: { email: string, password: string }) {
    return this.http.post(this.authURL.loginUser, credentials)
  }

  autoLogin() {
    const token = localStorage.getItem('token')
    if (token) {
      this.adminLoggedIn.set(true)
    }
  }

  logout() {
    return this.http.post(this.authURL.logout, {}).subscribe({
      next: () => {
        localStorage.removeItem('token')
        this.adminLoggedIn.set(false)
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  register(credentials: IUser) {
    return this.http.post(this.authURL.registerUser, credentials)
  }

  redirectToAdmin() {
    this.router.navigate(['/admin'])
  }
}


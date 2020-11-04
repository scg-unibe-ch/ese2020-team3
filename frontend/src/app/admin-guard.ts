import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements  CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('isAdmin') == "true") {
      return true; } else {
      this.router.navigate(['']);
      window.alert('only for Admins')
      return true;
    }
  }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (!!(localStorage.getItem('userToken'))) {
      return true; } else {
      window.alert('You have to be logged in to check your offers')
      this.router.navigate(['Login']);
      return false;
    }
  }
}

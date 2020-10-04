import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  firstName = '';
  lastName = '';
  userName = '';
  email = '';
  password = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

  register(): void {
      window.alert('Register');
  }

  /**
   * Provides Feedback for the typed in password. The password must consist of
   * small, capital, special and at least 7 characters.
   */
  passwordFeedback(): string {
    var nonSpecialCharacters = /^[A-Za-z0-9 ]+$/;
    var capitalLetters = /[A-Z]/;
    var smallLetters = /[a-z]/

    if (!capitalLetters.test(this.password))
      return 'Must include Capital Letters!'
    else if (!smallLetters.test(this.password))
      return 'Must include Small Letters!'
    else if (nonSpecialCharacters.test(this.password))
      return 'Must include Special Characters!';
    else if (this.password.length<7)
      return 'Must include 7 Characters (' + this.password.length + '/7)';
    return ''
  }

  /**
   * Provides Feedback for the typed in email.
   */
  emailFeedback(): string {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.email) ? '' : 'No valid email!';
  }

  userNameFeedback(): string {
   return 'Bad Username';
  }

  /**
   * Returns whether someone is currently logged in to hide this component.
   */
  loggedIn(): boolean {
    return !!(localStorage.getItem('userToken'));
  }
}

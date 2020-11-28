import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThemeService } from '../app.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;

  /*THEMES****************************************/
  lightTheme: Map<String, String> = new Map([
    ["--clr-primary-text", "#383838"], //Dark Gray
    ["--clr-secondary-text", "#573a3a"], //Black-ish-Red-ish
    ["--clr-tertiary-text", "#ba0000"] //Red
  ]);
  darkTheme: Map<String, String> = new Map([
    ["--clr-primary-text", "#f2f2f2"], //White-ish
    ["--clr-secondary-text", "#b3a8a8"], //A bit darker
    ["--clr-tertiary-text", "#de7878"] //Pink-ish
  ]);
  themes: Map<String, Map<String, String>> = new Map([
    ["Light", this.lightTheme],
    ["Dark", this.darkTheme]
  ]);
  /***********************************************/

  ngOnInit(): void {}

  loggedInText(): string {
    var text;
    this.isAdmin = false;
    if (!!(localStorage.getItem('userToken'))) {
      //Logged in
      text = "Logged in as: " + localStorage.getItem('userName');
      if (localStorage.getItem('isAdmin') == "false") {
        //Logged in as user
         text += " (" + localStorage.getItem('userWallet') + "  Pts.)";
      } else {
        //Logged in as admin
        this.isAdmin=true;
        text += " (Admin, "+localStorage.getItem('userWallet')+" Pts.)";
      }
    } else {
      //Not logged in
      text = "Not logged in";
    }
    return text;
  }

  changeTheme(theme: Map<String, String>) {
    theme.forEach((value: string, key: string) => {
      document.documentElement.style.setProperty(value, key);
    });
  }
}


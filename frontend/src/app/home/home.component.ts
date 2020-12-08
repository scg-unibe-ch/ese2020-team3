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
  themes: Map<String, Map<String, String>> = new Map([
    ["light", new Map([
      ["--clr-alpha", "#fafafa"],
      ["--clr-beta", "#C2CAD0"],
      ["--clr-gamma", "#cc2727"],
      ["--clr-delta", "#7E685A"],
      ["--clr-epsilon", "#ebebeb"],
      ["--clr-zeta", "#222222"]
    ])],
    ["dark", new Map([
        ["--clr-alpha", "#0C0032"],
        ["--clr-beta", "#190061"],
        ["--clr-gamma", "#240090"],
        ["--clr-delta", "#3500D3"],
        ["--clr-epsilon", "#282828"],
        ["--clr-zeta", "#DDDDDD"]
    ])],
  ]);
  themesKeys:String[] = Array.from(this.themes.keys());
  selectedTheme: String = "light";
  /***********************************************/

  ngOnInit(): void {
    this.toggleTheme();
  }

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

  toggleTheme(): void {
    const theme: Map<String, String> = this.themes.get(this.selectedTheme);
    theme.forEach((value: string, key: string) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
}


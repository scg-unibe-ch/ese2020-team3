import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin = false;

  constructor() { }

  ngOnInit(): void {
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
}

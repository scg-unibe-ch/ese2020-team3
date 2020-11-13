import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
	@Output() searchEvent = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit(searchValue: string) {
    	this.searchEvent.emit(searchValue);
  	}

}

import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
	@Output() searchEvent = new EventEmitter();

	searchForm: FormControl;

	constructor() { }

	ngOnInit(): void {
		this.searchForm = new FormControl('', []);
	}

	onSubmit(searchValue: string) {
    	this.searchEvent.emit(searchValue);
  	}

}

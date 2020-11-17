import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
	@Output() searchEvent = new EventEmitter();

	searchForm: FormControl;

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.searchForm = new FormControl('', []);
	}

	onSubmit(searchValue: string) {
		localStorage.setItem("TEMP_PRODUCT_SEARCH_TERM", searchValue);
		this.searchEvent.emit(searchValue);
		this.router.navigateByUrl('/Shop');
  	}

}

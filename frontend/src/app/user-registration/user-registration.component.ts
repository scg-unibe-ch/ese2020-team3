import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  registrationForm: FormGroup;
  ngOnInit(): void {

    this.registrationForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.{7,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$'
      )
      ]),
      confirmpassword: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      gender: new FormControl(''),
      telephonenumber: new FormControl(''),
      street: new FormControl(''),
      pincode: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl('')
    }
    );
  }
  validPassword(): boolean {
    return this.registrationForm.get('password').invalid
      ? false
      : this.registrationForm.get('password').value ===
      this.registrationForm.get('passwordconfirm').value;
  }


}


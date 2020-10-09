import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {

  }
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
      }, {validators: passwordMatchValidator}
    );
  }
}

  export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('confirmpassword').value)
      return null;
    else
      return {passwordMismatch: true};
  };


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {

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

  register():void {

    //TODO: ENSURE THAT VALUES ARE VALID

    var rf = this.registrationForm;
    this.httpClient.post(environment.endpointURL + 'user/register', {
      userEmail: rf.get("email").value,
      userFirstName: rf.get("firstname").value,
      userLastName: rf.get("lastname").value,
      userName: rf.get("username").value,
      password: rf.get("password").value,
      gender: rf.get("gender").value,
      telephoneNumber: rf.get("telephonenumber").value,
      street: rf.get("street").value,
      pinCode: rf.get("pincode").value,
      city: rf.get("city").value,
      country: rf.get("country").value,
      wallet: 1000, //Starting cash
      isAdmin: false
    }).subscribe((res: any) => {
    });
  }
}

  export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('confirmpassword').value)
      return null;
    else
      return {passwordMismatch: true};
  };


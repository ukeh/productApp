import { Component, OnInit } from '@angular/core';
import { Signup } from './signup.model';
import { ProductService } from '../ProductService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmPasswordValidator} from './confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData = new Signup(null, null, null, null, null, null, null);
  registerForm: FormGroup;
  submitted = false;
  Status: String;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(24)
      ]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      gender: ['male', Validators.required],
      country: ['India', Validators.required]
    },{ validator: ConfirmPasswordValidator.MatchPassword });
  }
  get f() { return this.registerForm.controls; }

  // mustMatch(password:String,confirmPassword:String){
  //     return(formGroup:FormGroup)=>{
  //       const control=formGroup.controls[password];
  //       const matchingControl = formGroup.controls[confirmPassword];
  //       if(matchingControl.errors && !matchingControl.errors.mustMatch){
  //         return;
  //       }
  //       if(control.value !== matchingControl.value){
  //         matchingControl.setErrors({mustMatch:true});
  //       }
  //       else{
  //         matchingControl.setErrors(null);
  //       }
  //     }
  // }




  signup() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userData.firstName=this.registerForm.get('firstName').value;
    this.userData.lastName=this.registerForm.get('lastName').value;
    this.userData.email=this.registerForm.get('email').value;
    this.userData.password=this.registerForm.get('password').value;
    this.userData.confirmPassword=this.registerForm.get('confirmPassword').value;
    this.userData.gender=this.registerForm.get('gender').value;
    this.userData.country=this.registerForm.get('country').value;

    this.productService.signup(this.userData)
      .subscribe((result) => {
        this.Status = JSON.parse(JSON.stringify(result)).Status;
        if (this.Status == "Success") {
          this.router.navigate(['']);
        }
        else {
          alert(this.Status);
        }
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}

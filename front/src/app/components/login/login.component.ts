import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {IUser, UserService} from '../../user.service';

const serverAddress = 'http://localhost:3000';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public matcher = new MyErrorStateMatcher();

  public loginFormGroup = new FormGroup({
    mail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z][a-z]{1,}$'),
    ]),
    dateOfBirth: new FormControl(null, [
      Validators.required
    ]),
    gender: new FormControl('Male', [
      Validators.required,
    ]),
  });

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {
  }

  onSubmit = () => {
    if (this.loginFormGroup.valid) {
      this.http.post(`${serverAddress}/login`, this.loginFormGroup.value)
        .subscribe((data: IUser) => {
          this.userService.user = data;
          this.router.navigate(['/main']);
        })
    }
  }

  get name() {
    return this.loginFormGroup.controls['name'];
  }

  get mail() {
    return this.loginFormGroup.controls['mail'];
  }

  get password() {
    return this.loginFormGroup.controls['password'];
  }

  get state() {
    return this.loginFormGroup.controls['state'];
  }

  get dateOfBirth() {
    return this.loginFormGroup.controls['dateOfBirth'];
  }

  get gender() {
    return this.loginFormGroup.controls['gender'];
  }

}

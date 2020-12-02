import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  model: any = {};
  registerForm: FormGroup;

  constructor( private authService: AuthService, private router: Router,
               private alertify: AlertifyService, private fb: FormBuilder) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.createRegisterForm();
  }

  // tslint:disable-next-line: typedef
  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(50)]],
      firstname: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  // tslint:disable-next-line: typedef
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true };
  }

  // tslint:disable-next-line: typedef
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.model).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/manager']);
        });
    }
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigate(['/manager']);
  }

}

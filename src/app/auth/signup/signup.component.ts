import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }
  
  onSubmit(form: NgForm) {
    const authData: AuthData = { email: form.value.email, password: form.value.password }
    this.authService.registerUser(authData);
  }

}

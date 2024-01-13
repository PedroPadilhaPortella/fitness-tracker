import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from '../../services/ui.service';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
  ) { }
  
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }
  
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const authData: AuthData = { email: form.value.email, password: form.value.password }
    this.authService.registerUser(authData).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.uiService.showStackBar(error.message, 'Dismiss');
        this.isLoading = false;
      },
    });
  }

}

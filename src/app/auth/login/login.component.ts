import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from '../../services/ui.service';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.isLoading = true;
    const authData: AuthData = { email: this.form.value.email, password: this.form.value.password }
    this.authService.login(authData).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.form.reset();
        this.uiService.showStackBar(error.message, 'Dismiss');
        this.isLoading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    const authData: AuthData = { email: this.form.value.email, password: this.form.value.password }
    this.authService.login(authData).subscribe({
      error: (error) => {
        this.form.reset();
        this.snackBar.open(error.message, 'Dismiss', { 
          horizontalPosition: 'end', 
          verticalPosition: 'bottom', 
          duration: 3000,
        })
      },
    });
  }
}

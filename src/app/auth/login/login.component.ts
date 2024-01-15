import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { AuthService } from '../../services/auth.service';
import { UIService } from '../../services/ui.service';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.store.dispatch(new UI.StartLoading());
    const authData: AuthData = { email: this.form.value.email, password: this.form.value.password }
    this.authService.login(authData).subscribe({
      next: () => {
        this.store.dispatch(new UI.StopLoading());
      },
      error: (error) => {
        this.form.reset();
        this.uiService.showStackBar(error.message, 'Dismiss');
        this.store.dispatch(new UI.StopLoading());
      }
    });
  }
}

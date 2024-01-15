import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from '../../services/ui.service';
import { AuthData } from '../../interfaces/auth-modal.interface';
import { AuthService } from '../../services/auth.service';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: any;
  isLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
  ) { }
  
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }
  
  onSubmit(form: NgForm) {
    this.store.dispatch(new UI.StartLoading());
    const authData: AuthData = { email: form.value.email, password: form.value.password }
    this.authService.registerUser(authData).subscribe({
      next: () => {
        this.store.dispatch(new UI.StopLoading());
      },
      error: (error) => {
        this.uiService.showStackBar(error.message, 'Dismiss');
        this.store.dispatch(new UI.StopLoading());
      },
    });
  }

}

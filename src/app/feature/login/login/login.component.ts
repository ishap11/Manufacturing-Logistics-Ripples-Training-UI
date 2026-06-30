import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { LoaderComponent } from '../../../common/component/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  returnUrl = '/dashboard';

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.errorMessage = 'Invalid username or password. (Hint: Use user "admin" and password "admin")';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'An error occurred during authentication. Please try again.';
      }
    });
  }
}

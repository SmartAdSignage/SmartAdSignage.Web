import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticated-response';
import { RegistrationRequest } from '../models/registration-request.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: RegistrationRequest;

  constructor(private router: Router, private http: HttpClient) {
    this.model = {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
   }

  ngOnInit(): void {
    
  }

  register = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5001/api/Auth/register", this.model, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('login');
          alert("Registration successful. Please login.");
        },
        error: (err: HttpErrorResponse) => console.log(err)
      })
    }
  }
}

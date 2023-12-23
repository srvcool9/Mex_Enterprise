import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private dataSharing: DataSharingService) { }

  ngOnInit() {
    this.createForm();
    this.dataSharing.setActiveButton('home');
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [],
      password: []
    })
  }

  login() {
    this.router.navigate(['/home'])
  }
}

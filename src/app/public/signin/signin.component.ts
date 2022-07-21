import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { JwtService } from 'src/providers/services/jwt.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _jwtService: JwtService,
    private _router: Router,
    private _httpClient: HttpClient,
    private _matSnackBar: MatSnackBar
  ) { }

  public Form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.Form = this._formBuilder.group(
      {
         Email: [null, [Validators.required, Validators.email]]
        ,Password: [null, [Validators.required]]
      }
    );
  }

  public login(): void {
    
    this._httpClient.post(environment.api.app + "/SignIn", this.Form.value).subscribe(
      (data: any) => {
        this._jwtService.saveToken(data?.Token);
        this._router.navigate(['main']);
      },(error: any) => {
        this._matSnackBar.open("Login Failed!!","undo",{duration:1000,horizontalPosition:"start"});
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { JwtService } from 'src/providers/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _httpClient: HttpClient
  ) { }

  public JwtTokenDetails: any;
  public Data: any;

  ngOnInit(): void {
    this.JwtTokenDetails = this._jwtService.decodeToken();
  }

  getData() {
    this._httpClient.get(environment.api.app + '/Data').subscribe(
      (data: any) => {
        this.Data = data;
      }
    );
  }

  logout() {
    this._jwtService.destroyToken();
    this._router.navigate(['/']);
  }

}

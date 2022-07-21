import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  
  constructor(
    private _jwtService: JwtService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = request;

    const includeJwt = url.toLowerCase().indexOf(environment.api.app) === 0 && !url.toLocaleLowerCase().includes('SignIn');

    if (!includeJwt) {
      return next.handle(request);
    }

    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token: string | null = this._jwtService.getToken();

    if (token) {
      headersConfig.Authorization = `Bearer ${token}`;
    }

    const req = request.clone({ setHeaders: headersConfig });

    return next.handle(req);
  }
}

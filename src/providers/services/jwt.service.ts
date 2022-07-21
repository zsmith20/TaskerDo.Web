import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    const token: string = window.localStorage.getItem('@app:accessToken') || '{}';
    return JSON.parse(token);
  }

  saveToken(token: string): void {
    window.localStorage.setItem('@app:accessToken', JSON.stringify(token));
  }

  decodeToken(): string {
    const token: string = window.localStorage.getItem('@app:accessToken') || '{}';
    return jwt_decode(window.localStorage.getItem('@app:accessToken') || '{}');
  }
  
  destroyToken(): void {
    window.localStorage.removeItem('@app:accessToken');
  }
}

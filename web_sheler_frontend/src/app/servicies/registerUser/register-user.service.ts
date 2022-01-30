import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../classes/User/user'

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {
  }

  authenticateUser(user: User) : Observable<object>{
    console.log(user);
    return this.httpClient.post(`${this.baseUrl}/user/registration`, user);
  }
}

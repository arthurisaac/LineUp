import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../Constants";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  url = Constants.getUrl();

  constructor(public http: HttpClient) {
  }

  register(user) {
    return this.http.post<any>(`${this.url}\\users`, user);
  }

  login(user) {
    return this.http.post<any>(`${this.url}\\users\\login`, user);
  }

  resetPassword(user) {
    return this.http.post<any>(`${this.url}\\users\\reset-password`, user);
  }

  updatePassword(user) {
    return this.http.post<any>(`${this.url}\\users\\recovery-password`, user);
  }

  updateUser(user) {
    return this.http.post<any>(`${this.url}\\users\\update`, user);
  }

}

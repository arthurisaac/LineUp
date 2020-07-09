import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../Constants";

/*
  Generated class for the BanqueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BanqueProvider {
  url = Constants.getUrl();

  constructor(public http: HttpClient) {}

  getBanks() {
    return this.http.get<any>(`${this.url}\\banques`);
  }

}

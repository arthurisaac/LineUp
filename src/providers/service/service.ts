import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient) {

  }

  read(url) {
    //return this.http.get<any>(url + 'service/ticket_service.php' );
    return this.http.get<any>(url + 'services' );
  }

  remain(url, id) {
    const params = {"service": id};
    return this.http.post<any>(url + 'services/remain', params );
  }

}

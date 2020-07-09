import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../Constants";

/*
  Generated class for the TicketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TicketProvider {

  id = null;
  constructor(public http: HttpClient) {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.id = user.id;
    }
  }

  create(service, url) {
    const data = {
      service: service,
      user: this.id
    };
    return this.http.post<any>(url + 'tickets/take', data );
  }

  readLast(service, url) {
    const data = {
      service: service,
      user: this.id
    };
    return this.http.post<any>(url + 'tickets/current-ticket', data);
  }

  verifier(url, idUser, idTMP) {
    return this.http.get<any>( url +  'tickets/check.php?idUser=' + idUser + '&idTMP=' + idTMP )
  }

  saveTicket(ticket) {
    return this.http.post<any>( `${Constants.getUrl()}/tickets/save-ticket`, ticket );
  }

  getTickets() {
    const params = { user : this.id };
    return this.http.post<any>( `${Constants.getUrl()}/tickets/my-tickets`, params );
  }

  setReservation(ticket) {
    return this.http.post<any>(`${Constants.getUrl()}/tickets/reservation`, ticket)
  }

  getNotification() {
    const params = {
      user: this.id,
    };
    return this.http.post<any>(`${Constants.getUrl()}/notifications`, params);
  }


}

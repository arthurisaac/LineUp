import {Injectable} from "@angular/core";

@Injectable()
export class Constants {
  constructor() {}

  static getUrl() {
    return "https://obscure-refuge-04005.herokuapp.com";
    // return "http://localhost:4000";
  }
}

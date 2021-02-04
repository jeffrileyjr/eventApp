import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInfo } from './eventInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  eventList: any[];

  ticketApiKey: string = 'u0GkAWD7BmZxAM9fjkaula4mnTPTQXnX';
  favorites: any[] = [];
  tempLocation: string = 'Detroit';
  arts: string = 'Arts & Theatre';
  noResults: boolean = false;

  constructor(private http: HttpClient) {}

  loadEventInfo(city: string) {
    return this.http.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${this.ticketApiKey}`
    );
  }

  preloadData() {
    return this.http.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=${this.tempLocation}&apikey=${this.ticketApiKey}`
    );
  }

  getTicketmasterData(eventSearch: string) {
    return this.http
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${eventSearch}&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
      )
      .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
  }

  // getTicketmasterData(eventSearch: string) {
  //   return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${eventSearch}&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  // }

  changeLocationData(event: string) {
    this.tempLocation = event;
    return this.tempLocation;
  }

  getComedy() {
    return this.http
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Comedy&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
      )
      .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
  }
  getMLB() {
    return this.http
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=MLB&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
      )
      .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
  }
  getNFL() {
    return this.http
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=NFL&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
      )
      .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
  }
  getMusic() {
    return this.http
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Music&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
      )
      .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
  }

  getTheatre() {
    return this.http
       .get(
         `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Theatre&city=${this.tempLocation}&apikey=${this.ticketApiKey}`
       )
       .pipe(
        map((response: any) => {
          console.log( response.page.totalElements);
          if ( response.page.totalElements === 0) {
            this.eventList = [];
            return this.eventList;
          } else {
            return response;
          }
        })
      );
       
   }

  favoriteEvent(favEvent) {
    this.favorites.push(favEvent);
  }

  listFavorites() {
    return this.favorites;
  }

  unfavoriteEvent(index: number) {
    this.favorites.splice(index, 1);
    return this.favorites;
  }
}

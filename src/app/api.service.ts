import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInfo } from './eventInfo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  eventInfo: EventInfo = {
    name: '',
    imageURL: '',
    localDate: '',
    city: '',
    country: '',
    eventURL: '',
    shouldBeHidden: true,
    isFavorite: false,
    venueName: '',
    venueAddress: '',
    priceRangeMax: 0,
    priceRangeMin: 0,
    description: '',
    seatmap: '',
  }

  ticketApiKey: string = "u0GkAWD7BmZxAM9fjkaula4mnTPTQXnX";
  favorites: any[] = [];
  tempLocation: string = "Detroit";
  arts: string = "Arts & Theatre";

  constructor(private http: HttpClient) { }

  loadEventInfo(city: string) {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${this.ticketApiKey}`);
  }

  preloadData() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }

  getTicketmasterData(eventSearch: string) {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${eventSearch}&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }

  changeLocationData(event: string) {
    this.tempLocation = event;
    return this.tempLocation;
  }

  getComedy() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Comedy&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }
    getMLB() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=MLB&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }
  getNFL() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=NFL&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }
  getMusic() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Music&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
  }
  getTheatre() {
    return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Theatre&city=${this.tempLocation}&apikey=${this.ticketApiKey}`);
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

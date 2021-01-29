import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  //Sets name of location, default is Detroit
  tempLocation: string = 'DETROIT';
  //array for eventInfo from API
  eventInfo: any[] = [];
  //boolean for trigger events
  shouldBeHidden: boolean = false;
  // boolean for favorite Icon
  isFavorite: boolean = false;
  favorites: any[] = [];
  event: {} = {
    name: 'No Upcoming Events',
    images: [{ url: '' }, { url: '../../assets/images/bucket-bg.jpg' }],
    _embedded: {
      events: {
        venues: {
          city: { name: '' },
          state: { stateCode: '' },
          country: { countryCode: '' },
        },
      },
    },
  };

  constructor(private apiService: ApiService) {}
  // preloads data on page load
  ngOnInit() {
    this.apiService.preloadData().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      return this.eventInfo;
    });
    this.favorites = this.apiService.listFavorites();
    console.log(this.favorites);
    for (let i = 0; i < this.favorites.length; i++) {
      const eventIDs = this.eventInfo.map((el) => el.id);
      let index = eventIDs.indexOf(this.favorites[i].id);
      this.eventInfo[index].isFavorite = true;
    }
  }

  //method to search API based on user input
  searchTicketmaster(form) {
    this.apiService
      .getTicketmasterData(form.value.eventSearch)
      .subscribe((response) => {
        this.eventInfo = response['_embedded'].events;
        console.log(response);
        return this.eventInfo;
      });
    form.resetForm();
  }
  //method to for user to change location based on dropdown menu
  changeLocation(event) {
    this.apiService.changeLocationData(event);
    this.apiService.preloadData().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      console.log(response);
      this.tempLocation = event;
      return this.eventInfo;
    });
  }
  //sorts eventInfo array by date
  filterByDate() {
    this.eventInfo.sort((a, b) => {
      if (a.dates.start.localDate > b.dates.start.localDate) {
        return 1;
      } else if (a.dates.start.localDate < b.dates.start.localDate) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  //pulls comedy events for current city
  fetchComedy() {
    this.apiService.getComedy().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      return this.eventInfo;
    });
  }
  //pulls MLB events for current city
  fetchMLB() {
    this.apiService.getMLB().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      return this.eventInfo;
    });
  }
  //pulls NFL events for current city
  fetchNFL() {
    this.apiService.getNFL().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      return this.eventInfo;
    });
  }
  //pulls music events for current city
  fetchMusic() {
    this.apiService.getMusic().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      return this.eventInfo;
    });
  }
  //pulls theatre events for current city
  fetchTheatre() {
    this.apiService.getTheatre().subscribe((response) => {
      this.eventInfo = response['_embedded'].events;
      console.log(response);
      return this.eventInfo;
    });
  }
  //toggles more Info to show or not
  toggleDisplay(index: number): void {
    this.eventInfo[index].shouldBeHidden = !this.eventInfo[index]
      .shouldBeHidden;
  }

  toggleFavorite(index: number): void {
    this.eventInfo[index].isFavorite = !this.eventInfo[index].isFavorite;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  showing: boolean = false;
  favorite: boolean = false;
  buttonText: string ="More Info";
  @Input() shouldBeHidden: boolean;
  @Input() favorites: any;
  @Input() isFavorite: boolean;
  @Input() eventInfo: any[];
  // @Output() onToggleFav = new EventEmitter<any>();
  @Input() filteredData: any [];
  @Output() onEventToggle = new EventEmitter<any>();
  @Output() onFavoriteToggle = new EventEmitter<any>();



  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.favorites = this.apiService.listFavorites();
  }
  // method to add favorites to favorite array
  addFavorite(favEvent) {
    this.apiService.favoriteEvent(favEvent);
  }

  // changes color of heart icon when clicked
  color (index: number) {
    this.onFavoriteToggle.emit(index);
    this.favorite = !this.favorite;
  }

  // brings up more info for user to see
  moreInfo(index: number): void {
    this.onEventToggle.emit(index);
    this.buttonText = "Go Back";
    this.showing = !this.showing;
    
  }

  removeFavorite(index) {
    this.apiService.unfavoriteEvent(index);
    this.favorites = this.apiService.listFavorites();
  }
}

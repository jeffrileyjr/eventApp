import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {

  showing: boolean = false;

  @Input() favorites: any;
  @Input() shouldBeHidden: boolean;
  @Output() onEventToggle = new EventEmitter<any>()

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

// on load, shows favorites array
ngOnInit() {
  this.favorites = this.apiService.listFavorites(); 
}
// deletes favorites
deleteFavorite(index: number) {
  this.apiService.unfavoriteEvent(index);
  this.favorites = this.apiService.listFavorites();
}
// toggles more info to show
moreInfoFav(index: number): void {
  this.favorites[index].shouldBeHidden = !this.favorites[index].shouldBeHidden;
  this.showing = !this.showing;
}
}

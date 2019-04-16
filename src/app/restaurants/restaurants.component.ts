import { Component, OnInit } from "@angular/core";

import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantsService } from "./restaurants.service";

import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  animations: [
    trigger("toggleSearch", [
      state(
        "hidden",
        style({
          opacity: 0,
          "max-height": "0px"
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          "max-height": "70px",
          "margin-top": "20px"
        })
      ),
      transition("* => *", animate("250ms 0s ease-in-out"))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  searchBarState = "hidden";
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) {}

  /* lifecycle do componente */
  ngOnInit() {
    this.searchControl = this.fb.control("");
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    /* saber o que é digitado | quando valor muda*/
    this.searchControl.valueChanges.subscribe(searchTerm =>
      console.log("searchTerm", searchTerm)
    );

    this.restaurantsService.restaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      console.log("-----data RESTAURANTES-----", restaurants);
    });
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === "visible" ? "hidden" : "visible";
  }
}

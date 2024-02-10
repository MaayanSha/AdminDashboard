import {Component, OnInit} from '@angular/core';
import {PublisherCardComponent} from "./publisher-card/publisher-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NbButtonModule, NbLayoutModule} from "@nebular/theme";
import {MatButton} from "@angular/material/button";

export type Publisher = {
  publisher: string;
  domains: Array<Domain>
};

export type Domain = {
  domain: string,
  desktopAds: number,
  mobileAds: number
};

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [
    PublisherCardComponent,
    CommonModule,
    FormsModule,
    MatButton,
  ],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css'
})
export class PublishersContainerComponent implements OnInit {
  _publisher!: Publisher;
  isAddNewPublisher: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
    this._publisher = {
      publisher: '',
      domains: []
    }
  }

  //fetch here the data from the server
  data: Array<Publisher> = [
    {
      publisher: 'publisher 1',
      domains: [
        {
          domain: "bla.com",
          desktopAds: 5,
          mobileAds: 3,
        },
        {
          domain: "bla1.com",
          desktopAds: 2,
          mobileAds: 30,
        }
      ]
    },
    {
      publisher: 'publisher 2',
      domains: [
        {
          domain: "gar.com",
          desktopAds: 0,
          mobileAds: 4,
        },
        {
          domain: "gar.com",
          desktopAds: 5,
          mobileAds: 3,
        }
      ]
    }
  ]

  toggleNewPublisher() {
    //toggle method for showing the add new publisher form
    this.isAddNewPublisher = !this.isAddNewPublisher;
  }

  addPublisher() {
    //insert method for adding a new publisher to the api
    this.data.push(this._publisher);
    this.toggleNewPublisher();
  }
}

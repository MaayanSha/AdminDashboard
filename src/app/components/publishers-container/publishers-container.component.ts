import {Component, OnInit} from '@angular/core';
import {PublisherCardComponent} from "./publisher-card/publisher-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {publisherDataServices} from "../../services/publisherDataServices";


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
  data: Publisher[] = []
  constructor() {
  }

  //on init get all publishers from the api
  ngOnInit(): void {
    this._publisher = {
      publisher: '',
      domains: []
    }
    this.getPublishers().then(res => {
      if (res.error) return console.error(res.error);
      this.data = res
    });
  }

  //get all publishers from the api
  async getPublishers() {
    return await publisherDataServices.getPublishers();
  }

  //add a new publisher to the api
  async addPublisher(publisher: Publisher) {
    return await publisherDataServices.addPublisher(publisher);
  }

  toggleNewPublisher() {
    //toggle method for showing the add new publisher form
    this.isAddNewPublisher = !this.isAddNewPublisher;
  }

  newPublisher() {
    //insert method for adding a new publisher to the api
    this.addPublisher(this._publisher).then(res => {
      if(res.error) return console.error(res.error);
      this.data.push(res)
    });
    this.toggleNewPublisher();
  }
}

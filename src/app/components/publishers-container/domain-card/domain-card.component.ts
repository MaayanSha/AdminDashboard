import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Domain} from "../publishers-container.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {publisherDataServices, requestProps} from "../../../services/publisherDataServices";

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain!: Domain;
  @Input() publisher!: string;
  @Output() deletedEvent = new EventEmitter<string>();
  isEdit: boolean = false;
  isDelete: boolean = false;
  isLoading: boolean = false;
  _domain!: Domain;

  constructor() {
  }

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  toggleEdit() {

    this.isEdit = !this.isEdit;
  }

  //update the domain using the publisherDataServices
  editDomain() {
    //create a request object to send to the server
    const request: requestProps = {
      publisher: this.publisher,
      domain: this.domain.domain,
      newDomain: this._domain.domain,
      desktopAds: this._domain.desktopAds,
      mobileAds: this._domain.mobileAds,
    }
    //set the loading mode
    this.isLoading = true;
    //send the request to the server via the service
    publisherDataServices.updateDomain(request).then(res => {
      if (res.error) {
        this.isLoading = false;
        //if there is an error, remove the domain from the publisher object
        return console.error(res.error);
      }
      this.domain = this._domain;
      this.isLoading = false;
    });
    this.toggleEdit();
  }

  //delete the domain using the publisherDataServices
  deleteDomain() {
    const request: requestProps = {
      publisher: this.publisher,
      domain: this.domain.domain,
    }
    this.isLoading = true;
    publisherDataServices.deleteDomain(request).then(res => {
      if (res.error) {
        //if there is an error, remove the domain from the publisher object
        return console.error(res.error);
      }
      //let the parent component know that the domain was deleted
      // triggers a refresh of the publisher object from the server
      this.deletedEvent.emit();
    });
  }
}

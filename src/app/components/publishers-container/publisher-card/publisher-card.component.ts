import {Component, Input} from '@angular/core';
import {Domain, Publisher} from "../publishers-container.component";
import {DomainCardComponent} from "../domain-card/domain-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {publisherDataServices, requestProps} from "../../../services/publisherDataServices";

@Component({
  selector: 'app-publisher-card',
  standalone: true,
  imports: [
    DomainCardComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './publisher-card.component.html',
  styleUrl: './publisher-card.component.css'
})
export class PublisherCardComponent {
  @Input() publisher!: Publisher;
  isEdit: boolean = false;
  isLoading: boolean = false;
  newDomain!: Domain;

  constructor() {
  }

  //initialize the new domain object
  ngOnInit(): void {
    this.newDomain = {
      domain: '',
      desktopAds: 0,
      mobileAds: 0
    }
  }

  //add the new domain to the database using the publisherDataServices
  async addDomainAPI(publisher:string, newDomain:Domain){
    const APIRequest: requestProps = {
      publisher: publisher,
      domain: newDomain.domain,
      desktopAds: newDomain.desktopAds,
      mobileAds: newDomain.mobileAds,
    }
    return await publisherDataServices.addDomain(APIRequest);
  }

  //add the new domain to the publisher
  addDomain() {
    this.isLoading = true
    //add the new domain to the publisher object on loading mode
    //add the new domain to the database
    this.addDomainAPI(this.publisher.publisher, this.newDomain).then(res => {
      //if the domain was added successfully, update the publisher object locally
      this.publisher.domains.push(res);
      this.isLoading = false;
    }).catch(err => {
      if (err.response.status === 409){
        alert('Falied adding domain. Name already exists!')
        this.isLoading = false;
      }
    })
    this.newDomain = {
      domain: '',
      desktopAds: 0,
      mobileAds: 0
    }
    this.toggleEdit()
  }

  //when receiving an event signal from domain card, re-fetch the publisher's domains
  updateList = () => {
    const request: requestProps = {
      publisher: this.publisher.publisher,
    }
    publisherDataServices.getPublishersDomains(request).then(res => {
      if (res.error) {
        return console.error(res.error);
      }
      this.publisher = res;
    });
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

}

import {Component, Input} from '@angular/core';
import {Domain, Publisher} from "../publishers-container.component";
import {DomainCardComponent} from "../domain-card/domain-card.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  //add the new domain to the publisher
  addDomain() {
    this.publisher.domains.push(this.newDomain);
    this.newDomain = {
      domain: '',
      desktopAds: 0,
      mobileAds: 0
    }
    this.toggleEdit()
  }
}

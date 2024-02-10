import {Component, Input} from '@angular/core';
import {Domain} from "../publishers-container.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain!: Domain;
  isEdit: boolean = false;
  isDelete: boolean = false;
  _domain!: Domain;

  constructor() {
  }

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  toggleDelete() {
    this.isDelete = !this.isDelete;
  }

  editDomain() {
    this.domain = JSON.parse(JSON.stringify(this._domain));
    this.toggleEdit()

  }

  deleteDomain() {
    // delete domain
  }
}

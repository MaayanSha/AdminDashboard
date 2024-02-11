import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Publisher} from "../components/publishers-container/publishers-container.component";
import {Observable} from "rxjs";

@Injectable(
  {providedIn: 'root'}
)

export class PublishersService {
  constructor(private http: HttpClient) {
  }
  haveaccess() {
    return true;
}
  getPublishers():Observable<Publisher[]> {
    return this.http.get<Publisher[]>('http://localhost:3000/publishers');
  }

  addPublisher(publisher: Publisher):Observable<Publisher> {
    return this.http.post<Publisher>('http://localhost:3000', publisher);
  }

  addDomain(publisher: Publisher):Observable<Publisher> {
    return this.http.post<Publisher>('http://localhost:3000/publishers', publisher);
  }

  updateDomain(publisher: Publisher, newDomain:string):Observable<Publisher> {
    return this.http.put<Publisher>('http://localhost:3000/publishers', {publisher, 'newDomain': newDomain});
  }

  deleteDomain(publisher: Publisher, domain: string):Observable<Publisher> {
    return this.http.delete<Publisher>('http://localhost:3000/publishers', {headers: {'publisher': publisher.publisher, 'domain': domain}});
  }

}

import axios from 'axios';
import {API_URL} from "../Constants/API";

//all request should have at least a publisher
//other request properties are optional, but should be added as needed
export interface requestProps {
  publisher: string;
  domain?: string;
  desktopAds?: Number;
  mobileAds?: Number;
  newDomain?: string;
}

export const publisherDataServices = {
  //get all publishers
  getPublishers: () => {
    return axios.get(API_URL)
      .then(response => response.data)
  },

  //add a new publisher
  addPublisher: (publisher: any) => {
    return axios.post(API_URL, publisher,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.data)
  },

  //get all domains under a publisher
  getPublishersDomains: (request:requestProps) => {
    return axios.get(API_URL + "/publishers", {
      headers: {
        'Content-Type': 'application/json',
        'publisher': request.publisher
      }
    })
      .then(response => response.data)
    },

  //add a new domain to a publisher
  addDomain: (request:requestProps) => {
    return axios.post(API_URL + "/publishers", request, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.data)
  },
  //delete a domain from a publisher
  deleteDomain: (request:requestProps) => {
    return axios.delete(API_URL + "/publishers", {
      headers: {
        'Content-Type': 'application/json',
        'publisher': request.publisher,
        'domain': request.domain
      },
    })
      .then(response => response.data)
  },
  //update a domain from a publisher
  updateDomain: (request:requestProps) => {
    return axios.patch(API_URL + "/publishers", request,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.data)
  }
}

import { Injectable } from '@angular/core';
import contactsData from '../assets/contactsJson.json';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor() {}

  addJsonToStorage() {
    localStorage.setItem('firstRun', 'true');
    localStorage.setItem('savedContacts', JSON.stringify(contactsData));
  }

  getJsonData() {
    console.log(JSON.parse(localStorage.getItem('savedContacts')!).contacts);
    return JSON.parse(localStorage.getItem('savedContacts')!).contacts;
  }

  getContacts() {
    return contactsData;
  }
}

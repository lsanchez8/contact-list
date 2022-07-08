import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profileForm = this.fb.group({
    id: uuid.v4(),
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    city: [''],
    phones: this.fb.array([this.fb.control('')]),
  });
  isEdit: boolean = false;
  contactId: any = null;

  get phones() {
    return this.profileForm.get('phones') as FormArray;
  }

  contacts: any;
  isHome: boolean = true;
  active: number = -1;

  constructor(
    public contactsService: ContactsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('firstRun')) {
      this.contactsService.addJsonToStorage();
    }
    this.contacts = this.contactsService.getJsonData();
  }

  onHomeClick() {
    this.profileForm.setControl('phones', new FormArray([this.fb.control('')]));
    this.profileForm.reset(this.profileForm.value);
    this.isHome = true;
    this.active = -1;
    this.contactId = null;
  }

  addContact() {
    this.isEdit = false;
    this.isHome = false;
    this.profileForm.reset();
    this.active = -1;

    this.profileForm = this.fb.group({
      id: uuid.v4(),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      city: [''],
      phones: this.fb.array([this.fb.control('')]),
    });
  }

  onClick(index: number, contact: any) {
    this.active = index;
    this.isHome = false;
    console.log(contact);
    this.isEdit = true;
    this.contactId = contact.id;

    this.profileForm = this.fb.group({
      id: contact.id,
      firstName: [contact.firstName, Validators.required],
      lastName: [contact.lastName, Validators.required],
      email: [contact.email, Validators.required],
      city: [contact.city],
      phones: this.fb.array(contact.phones),
    });

    console.log(this.profileForm.value);
  }

  editContact() {
    let retrievedObject = JSON.parse(localStorage.getItem('savedContacts')!);
    retrievedObject.contacts.forEach((contact: any) => {
      if (contact.id === this.contactId) {
        contact.firstName = this.profileForm.value.firstName;
        contact.lastName = this.profileForm.value.lastName;
        contact.email = this.profileForm.value.email;
        contact.city = this.profileForm.value.city;
        contact.phones = this.profileForm.value.phones;

        localStorage.setItem('savedContacts', JSON.stringify(retrievedObject));
        alert('Contact edit successful!');
        window.location.reload();
      }
    });
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  goBack() {
    this.onHomeClick();
  }

  onSubmit() {
    let retrievedObject = localStorage.getItem('savedContacts');
    let newContactsArray: any = JSON.parse(retrievedObject!);
    newContactsArray.contacts.push(this.profileForm.value);

    localStorage.setItem('savedContacts', JSON.stringify(newContactsArray));
    alert('Contact added successfully!');
    window.location.reload();
  }
}

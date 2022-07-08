import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  clearStorage() {
    localStorage.clear();
    alert('JSON deleted successfully!');
  }
}

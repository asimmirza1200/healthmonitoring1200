import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxToastComponent, IgxListComponent, IgxFilterOptions } from 'igniteui-angular';

@Component({
  selector: 'app-assigndoctor',
  templateUrl: './assigndoctor.component.html',
  styleUrls: ['./assigndoctor.component.css']
})
export class AssigndoctorComponent implements OnInit {
  public searchContact: string;

  public contacts = [
    {
      isFavorite: false,
      name: "Asim Mirza",
      phone: "03438851054",
      photo: "assets/IMG-20190401-WA0000.jpg"
    },
    {
      isFavorite: false,
      name: "Atif Mehmood",
      phone: "423-676-2869",
      photo: "https://www.infragistics.com/angular-demos/assets/images/men/1.jpg"
    },
    {
      isFavorite: false,
      name: "Haider Ali",
      phone: "859-496-2817",
      photo: "https://www.infragistics.com/angular-demos/assets/images/women/50.jpg"
    },
    {
      isFavorite: false,
      name: "Faisal Mehmood",
      phone: "901-747-3428",
      photo: "https://www.infragistics.com/angular-demos/assets/images/women/3.jpg"
    },
    {
      isFavorite: false,
      name: "Bilal Ahmed ",
      phone: "573-394-9254",
      photo: "https://www.infragistics.com/angular-demos/assets/images/women/67.jpg"
    }
  ];

  public density = "comfortable";
  public displayDensities;

  constructor() { }

  public ngOnInit() {

     

    this.displayDensities = [
        { label: "comfortable", selected: this.density === "comfortable", togglable: true },
        { label: "cosy", selected: this.density === "cosy", togglable: true },
        { label: "compact", selected: this.density === "compact", togglable: true }
    ];
  }

  public selectDensity(event) {
    this.density = this.displayDensities[event.index].label;
  }

  public toggleFavorite(contact: any) {
    contact.isFavorite = !contact.isFavorite;
  }

  get filterContacts() {
    const fo = new IgxFilterOptions();
    fo.key = "name";
    fo.inputValue = this.searchContact;
    return fo;
  }
}

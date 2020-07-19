import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  doctors: any;
  patients: any;

  getDoctors() {
    this._apiService.getDashboardData().subscribe(
      // the first argument is a function which runs on success
      data => { console.log("Data:"+data.response)   
              this.doctors=data.doctors
              this.patients=data.patients

    },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

  constructor(private _apiService: ApiService) { 
this.getDoctors()
  }

  ngOnInit(): void {
   
  }

}

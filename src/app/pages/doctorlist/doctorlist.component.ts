import { Component, OnInit, Inject  } from '@angular/core';
import { IgxToastComponent, IgxListComponent, IgxFilterOptions } from 'igniteui-angular';
import {ApiService} from './api.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
export class DoctorlistComponent implements OnInit {
  public searchdoctor: string;
  public image="https://www.uidownload.com/files/802/144/19/vector-doctor-design-elements-set-thumb.jpg"
  public doctors = [
    
  ];
  public static clicked=false;

  public density = "comfortable";
  public displayDensities;
  deleteDoctor(body) {

    this._apiService.deleteDoctor(body).subscribe(
       data => {
        console.log(data);
        this.document.location.reload();    
             DoctorlistComponent.clicked=false

         // refresh the list
         return true;
       },
       error => {
        alert('Error!! :-)\n\n' +error)
        DoctorlistComponent.clicked=false

         console.error(error);
         return false;
       }
    );
  }
  getDoctors() {
    this._apiService.getDoctors().subscribe(
      // the first argument is a function which runs on success
      data => { console.log("Data:"+data.response)   
              this.doctors=data.response
    },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

 constructor(private _apiService: ApiService, private _router: Router, @Inject(DOCUMENT) private document: Document){
this.getDoctors()
 }
 
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

  public toggleFavorite(doctor: any) {
    DoctorlistComponent.clicked=true
    //this._router.navigateByUrl('/doctorlist');

    this.deleteDoctor({docotrId:doctor._id})
  }
  public click() {
    if(!DoctorlistComponent.clicked)
        this._router.navigateByUrl('/showdoctor');

  }
  get filterdoctors() {
    const fo = new IgxFilterOptions();
    fo.key = "doctorname";

    fo.inputValue = this.searchdoctor;
    return fo;
  }
}

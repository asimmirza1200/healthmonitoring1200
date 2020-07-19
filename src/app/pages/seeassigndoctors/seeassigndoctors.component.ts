import { Component, OnInit, Inject  } from '@angular/core';
import { IgxToastComponent, IgxListComponent, IgxFilterOptions } from 'igniteui-angular';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-seeassigndoctors',
  templateUrl: './seeassigndoctors.component.html',
  styleUrls: ['./seeassigndoctors.component.css']
})
export class SeeassigndoctorsComponent implements OnInit {

  public searchdoctor: string;
  public image="https://i.pinimg.com/originals/17/91/2d/17912d51f20769919ecce69a17db976f.png"
  public doctors;
  public static clicked=false;

  public density = "comfortable";
  public displayDensities;
  


 constructor( private _router: Router, @Inject(DOCUMENT) private document: Document){
  this. doctors=history.state.doctors;

  if(this.doctors==null){
    this._router.navigateByUrl('/patientlist');

  }
  console.log(this.doctors)

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

  
  public click(doctor: any) {
    if(!SeeassigndoctorsComponent.clicked)
        this._router.navigateByUrl('/showdoctor',{state: {doctor: doctor}});

  }
  get filterdoctors() {
    const fo = new IgxFilterOptions();
    fo.key = "doctorname";

    fo.inputValue = this.searchdoctor;
    return fo;
  }

}

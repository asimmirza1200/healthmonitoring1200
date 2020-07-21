import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label,BaseChartDirective } from 'ng2-charts';
import * as Chart from 'chart.js';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
export const snapshotToArraydht = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item.temp);
  });

  return returnArr;
};
export const snapshotToArrayecg= (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item.ecg);
  });

  return returnArr;
};
export const snapshotToArraybpm= (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item.BPM);
  });

  return returnArr;
};
export const snapshotToArray2 = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item.time);
  });

  return returnArr;
};
export const snapshotToArray3 = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item.Time);
  });

  return returnArr;
};
@Component({
  selector: 'app-showpatient',
  templateUrl: './showpatient.component.html',
  styleUrls: ['./showpatient.component.css']
})
export class ShowpatientComponent implements OnInit {

  

  public canvas : any;
  public ctx1;
  public ctx3;
  public ctx2;

  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  patient: any;
  totaldoctors: any;
  assigndoctors: any;
  public toggleFavorite() {
    // alert('Error!! :-)\n\n' )
      if(confirm("Are you sure to delete "+this.patient._id)) {
        this.deletePatient({patientId:this.patient._id})
      }
  }
  public selectDoctor() {
    this._router.navigateByUrl('/assigndoctor',{state: {patient: this.patient}});

  }
  public seeAssignDoctors() {
    this._router.navigateByUrl('/seeassigndoctors',{state: {doctors: this.assigndoctors}});

  }
  getAssignDoctor(body) {

    this._apiService.getAssignDoctor(body).subscribe(
       data => {
        console.log(data);
         this. totaldoctors=data.result.length>0?data.result.length:0
         this.assigndoctors=data.result;
         // refresh the list
         return true;
       },
       error => {
        alert('Error!! :-)\n\n' +error)

         console.error(error);
         return false;
       }
    );
  }
  deletePatient(body) {

    this._apiService.deletePatient(body).subscribe(
       data => {
        console.log(data);
           this._router.navigateByUrl('/patientlist');

         // refresh the list
         return true;
       },
       error => {
        alert('Error!! :-)\n\n' +error)

         console.error(error);
         return false;
       }
    );
  }
  constructor( private _router: Router,private _apiService: ApiService,private db: AngularFireDatabase){
    this. patient=history.state.patient;
    if(this.patient==null){
      this._router.navigateByUrl('/patientlist');

    }else{
      this.getAssignDoctor({patient_id:this.patient._id})

    }
   
    // console.log(this.patient+"vcbvcbvcb")
  }
  
  ngOnInit() {
    this.db.database.ref('sensor/dht/').on('value', resp => {
      console.log(resp)
      let sensordata=snapshotToArraydht(resp)
      let sensordatalabel=snapshotToArray2(resp)

      var gradientChartOptionsConfigurationWithTooltipRed: any = {
        maintainAspectRatio: true,
        legend: {
          display: false
        },
  
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 0.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "rgba(29,140,248,0.0)",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],
  
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "rgba(29,140,248,0.0)",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };
  
  

      this.canvas = document.getElementById("chartLineRed2");
      this.ctx1 = this.canvas.getContext("2d");
  
      
  
      var gradientStroke = this.ctx1.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors
  
      var dhtdata = {
        labels:sensordatalabel,
        
        datasets: [{
          label: "readings",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 1,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 2,
          pointHoverBorderWidth: 30,
          pointRadius: 5,
          data: sensordata,
        }]
      };
  
      this.myChartData = new Chart(this.ctx1, {
        type: 'line',
        data: dhtdata,
        options: gradientChartOptionsConfigurationWithTooltipRed
      });
  
     
   });
   this.db.database.ref('sensor/BMP/').on('value', resp => {
    console.log(resp)
    let sensordata=snapshotToArraybpm(resp)
    let sensordatalabel=snapshotToArray3(resp)

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: true,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 0.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "rgba(29,140,248,0.0)",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "rgba(29,140,248,0.0)",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };



    this.canvas = document.getElementById("chartLineRed1");
    this.ctx2 = this.canvas.getContext("2d");

    

    var gradientStroke = this.ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    var bpmdata = {
      labels:sensordatalabel,
      
      datasets: [{
        label: "readings",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#ec250d',
        borderWidth: 1,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#ec250d',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#ec250d',
        pointBorderWidth: 20,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 30,
        pointRadius: 5,
        data: sensordata,
      }]
    };

    var myChart = new Chart(this.ctx2, {
      type: 'line',
      data: bpmdata,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

   
 });

 this.db.database.ref('sensor/ecg/').on('value', resp => {
  console.log(snapshotToArrayecg(resp))
  let sensordata=snapshotToArrayecg(resp)
  let sensordatalabel=snapshotToArray2(resp)

  var gradientChartOptionsConfigurationWithTooltipRed: any = {
    maintainAspectRatio: true,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [{
        barPercentage: 0.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.0)',
          zeroLineColor: "rgba(29,140,248,0.0)",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }],

      xAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(233,32,16,0.1)',
          zeroLineColor: "rgba(29,140,248,0.0)",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }]
    }
  };



  
  this.canvas = document.getElementById("chartLineRed3");
  this.ctx3 = this.canvas.getContext("2d");

  

  var gradientStroke = this.ctx3.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
  gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
  gradientStroke.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

  var ecgdata = {
    labels:sensordatalabel,
    
    datasets: [{
      label: "readings",
      fill: true,
      backgroundColor: gradientStroke,
      borderColor: '#ec250d',
      borderWidth: 1,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: '#ec250d',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#ec250d',
      pointBorderWidth: 20,
      pointHoverRadius: 2,
      pointHoverBorderWidth: 30,
      pointRadius: 5,
      data: sensordata,
    }]
  };

  var myChart = new Chart(this.ctx3, {
    type: 'line',
    data: ecgdata,
    options: gradientChartOptionsConfigurationWithTooltipRed
  });

 
});



  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}

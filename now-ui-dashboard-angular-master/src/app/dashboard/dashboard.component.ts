import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HttpClient } from '@angular/common/http';
import { Bubble2 } from './Bubble';
import Chart from 'chart.js';


 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
/** public interface Bubble2 {
  analytical: Array<any>;
  confident: Array<any>;
  joy: Array<any>;
  sadness: Array<any>;
  tentative: Array<any>;
}*/
export class DashboardComponent implements OnInit {
  serverData: JSON;
  tweetData: JSON;
  // tweetDataString: string;
  public obj: Bubble2;
  public analytical: Array<any> = [];
  public confident: Array<any> = [];
  public joy: Array<any> = [];
  public sadness: Array<any> = [];
  public data: Array<any> = [];
  public colors: Array<any> = [];
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>;

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>;

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>;

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/').subscribe(data => {
      this.tweetData = data as JSON;
      console.log(typeof this.tweetData);
      // console.log(this.tweetData);
      this.obj = JSON.parse(JSON.stringify(this.tweetData));
      this.sadness = this.obj.sadness;
      this.joy = this.obj.joy;
      this.confident = this.obj.confident;
      this.analytical = this.obj.analytical;
      console.log(this.analytical);
      console.log(this.tweetData);

      for (let i = 0; i < this.analytical.length; i++) {
        let x = Math.random() * -50 - 1;
        let y = Math.random() * 100 + 1;
        let r = this.analytical[i] * 50;
        this.data.push({x: x, y: y, r: r});
        this.colors.push('rgba(255, 185, 97, 0.6)');
      }
      for (let i = 0; i < this.joy.length; i++) {
        let x = Math.random() * 50 + 1;
        let y = Math.random() * 100 + 1;
        let r = this.joy[i] * 50;
        this.data.push({x: x, y: y, r: r});
        this.colors.push('rgba(192, 92, 126, 0.5');
      }
      for (let i = 0; i < this.sadness.length; i++) {
        let x = Math.random() * -50 - 1;
        let y = Math.random() * -100 - 1;
        let r = this.sadness[i] * 50;
        this.data.push({x: x, y: y, r: r});
        this.colors.push('rgba(61, 71, 219, 0.6)');
      }
      for (let i = 0; i < this.confident.length; i++) {
        let x = Math.random() * 50 + 1;
        let y = Math.random() * -100 - 1;
        let r = this.confident[i] * 50;
        this.data.push({x: x, y: y, r: r});
        this.colors.push('rgba(83, 219, 194, 0.6)');
      }

      console.log("Hi : " + this.data.slice(0, this.analytical.length))
      var ctx = <HTMLCanvasElement> document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bubble',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: 'Analytical',
                  backgroundColor: this.colors.slice(0, this.analytical.length),
                  data: this.data.slice(0, this.analytical.length),
                  borderWidth: 1
              },
              {
                label: 'Joy',
                backgroundColor: this.colors.slice(this.analytical.length, this.analytical.length + this.joy.length),
                data: this.data.slice(this.analytical.length, this.analytical.length + this.joy.length),
                borderWidth: 1
              },
              {
                label: 'Sadness',
                backgroundColor: this.colors.slice(this.analytical.length + this.joy.length, this.analytical.length + this.joy.length + this.sadness.length),
                data: this.data.slice(this.analytical.length + this.joy.length, this.analytical.length + this.joy.length + this.sadness.length),
                borderWidth: 1
              },
              {
                label: 'Confident',
                backgroundColor: this.colors.slice(this.analytical.length + this.joy.length + this.sadness.length, this.colors.length),
                data: this.data.slice(this.analytical.length + this.joy.length + this.sadness.length, this.colors.length),
                borderWidth: 1
              }
            ]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

    });
    
    // this.chartColor = '#000022';
    // this.canvas = document.getElementById('bigDashboardChart');
    // this.ctx = this.canvas.getContext('2d');
    // this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    // this.gradientStroke.addColorStop(0, '#80b6f4');
    // this.gradientStroke.addColorStop(1, this.chartColor);

    // this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    // this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    // this.gradientFill.addColorStop(1, 'rgba(400, 0, 0, 0.24)');
    // this.lineBigDashboardChartData = [
    //     {
    //       label: 'Data',
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 7,
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 10,
    //       fill: true,

    //       borderWidth: 2,
    //       data: this.data
    //     }
    //   ];
    //   this.lineBigDashboardChartColors = [
    //    {
    //      backgroundColor: this.gradientFill,
    //      borderColor: this.chartColor,
    //      pointBorderColor: this.chartColor,
    //      pointBackgroundColor: "#2c2c2c",
    //      pointHoverBackgroundColor: "#2c2c2c",
    //      pointHoverBorderColor: this.chartColor,
    //    }
    //  ];
    // this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    // this.lineBigDashboardChartOptions = {

    //       layout: {
    //           padding: {
    //               left: 20,
    //               right: 20,
    //               top: 0,
    //               bottom: 50
    //           }
    //       },
    //       maintainAspectRatio: false,
    //       tooltips: {
    //         backgroundColor: '#fff',
    //         titleFontColor: '#333',
    //         bodyFontColor: '#666',
    //         bodySpacing: 4,
    //         xPadding: 12,
    //         mode: "nearest",
    //         intersect: 0,
    //         position: "nearest"
    //       },
    //       legend: {
    //           position: "bottom",
    //           fillStyle: "#FFF",
    //           display: false
    //       },
    //       scales: {
    //           yAxes: [{
    //               ticks: {
    //                   fontColor: "rgba(255,255,255,0.9)",
    //                   fontStyle: "bold",
    //                   beginAtZero: false,
    //                   maxTicksLimit: 5,
    //                   padding: 10
    //               },
    //               gridLines: {
    //                   drawTicks: true,
    //                   drawBorder: true,
    //                   display: true,
    //                   color: "rgba(255,255,255,0.4)",
    //                   zeroLineColor: "white"
    //               }

    //           }],
    //           xAxes: [{
    //               gridLines: {
    //                   zeroLineColor: "white",
    //                   display: true,

    //               },
    //               ticks: {
    //                   padding: 10,
    //                   fontColor: "rgba(255,255,255,.9)",
    //                   fontStyle: "bold"
    //               }
    //           }]
    //       }
    // };

  //   this.lineBigDashboardChartType = 'bubble';


  //   this.gradientChartOptionsConfiguration = {
  //     maintainAspectRatio: false,
  //     legend: {
  //       display: false
  //     },
  //     tooltips: {
  //       bodySpacing: 4,
  //       mode: "nearest",
  //       intersect: 0,
  //       position: "nearest",
  //       xPadding: 10,
  //       yPadding: 10,
  //       caretPadding: 10
  //     },
  //     responsive: 1,
  //     scales: {
  //       yAxes: [{
  //         display: 0,
  //         ticks: {
  //           display: false
  //         },
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawTicks: false,
  //           display: false,
  //           drawBorder: false
  //         }
  //       }],
  //       xAxes: [{
  //         display: 0,
  //         ticks: {
  //           display: false
  //         },
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawTicks: false,
  //           display: false,
  //           drawBorder: false
  //         }
  //       }]
  //     },
  //     layout: {
  //       padding: {
  //         left: 0,
  //         right: 0,
  //         top: 15,
  //         bottom: 15
  //       }
  //     }
  //   };

  //   this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
  //     maintainAspectRatio: false,
  //     legend: {
  //       display: false
  //     },
  //     tooltips: {
  //       bodySpacing: 4,
  //       mode: "nearest",
  //       intersect: 0,
  //       position: "nearest",
  //       xPadding: 10,
  //       yPadding: 10,
  //       caretPadding: 10
  //     },
  //     responsive: true,
  //     scales: {
  //       yAxes: [{
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawBorder: false
  //         }
  //       }],
  //       xAxes: [{
  //         display: 0,
  //         ticks: {
  //           display: false
  //         },
  //         gridLines: {
  //           zeroLineColor: "transparent",
  //           drawTicks: false,
  //           display: false,
  //           drawBorder: false
  //         }
  //       }]
  //     },
  //     layout: {
  //       padding: {
  //         left: 0,
  //         right: 0,
  //         top: 15,
  //         bottom: 15
  //       }
  //     }
  //   };

  //   this.canvas = document.getElementById("lineChartExample");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#80b6f4');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

  //   this.lineChartData = [
  //       {
  //         label: "Active Users",
  //         pointBorderWidth: 2,
  //         pointHoverRadius: 4,
  //         pointHoverBorderWidth: 1,
  //         pointRadius: 4,
  //         fill: true,
  //         borderWidth: 2,
  //         data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
  //       }
  //     ];
  //     this.lineChartColors = [
  //      {
  //        borderColor: "#f96332",
  //        pointBorderColor: "#FFF",
  //        pointBackgroundColor: "#f96332",
  //        backgroundColor: this.gradientFill
  //      }
  //    ];
  //   this.lineChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   this.lineChartOptions = this.gradientChartOptionsConfiguration;

  //   this.lineChartType = 'bubble';

  //   this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
  //   this.gradientStroke.addColorStop(0, '#18ce0f');
  //   this.gradientStroke.addColorStop(1, this.chartColor);

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

  //   this.lineChartWithNumbersAndGridData = [
  //       {
  //         label: "Email Stats",
  //          pointBorderWidth: 2,
  //          pointHoverRadius: 4,
  //          pointHoverBorderWidth: 1,
  //          pointRadius: 4,
  //          fill: true,
  //          borderWidth: 2,
  //         data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
  //       }
  //     ];
  //     this.lineChartWithNumbersAndGridColors = [
  //      {
  //        borderColor: "#18ce0f",
  //        pointBorderColor: "#FFF",
  //        pointBackgroundColor: "#18ce0f",
  //        backgroundColor: this.gradientFill
  //      }
  //    ];
  //   this.lineChartWithNumbersAndGridLabels = ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"];
  //   this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

  //   this.lineChartWithNumbersAndGridType = 'line';




  //   this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
  //   this.ctx = this.canvas.getContext("2d");

  //   this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
  //   this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  //   this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


  //   this.lineChartGradientsNumbersData = [
  //       {
  //         label: "Active Countries",
  //         pointBorderWidth: 2,
  //         pointHoverRadius: 4,
  //         pointHoverBorderWidth: 1,
  //         pointRadius: 4,
  //         fill: true,
  //         borderWidth: 1,
  //         data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
  //       }
  //     ];
  //   this.lineChartGradientsNumbersColors = [
  //    {
  //      backgroundColor: this.gradientFill,
  //      borderColor: "#2CA8FF",
  //      pointBorderColor: "#FFF",
  //      pointBackgroundColor: "#2CA8FF",
  //    }
  //  ];
  //   this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   this.lineChartGradientsNumbersOptions = {
  //       maintainAspectRatio: false,
  //       legend: {
  //         display: false
  //       },
  //       tooltips: {
  //         bodySpacing: 4,
  //         mode: "nearest",
  //         intersect: 0,
  //         position: "nearest",
  //         xPadding: 10,
  //         yPadding: 10,
  //         caretPadding: 10
  //       },
  //       responsive: 1,
  //       scales: {
  //         yAxes: [{
  //           gridLines: {
  //             zeroLineColor: "transparent",
  //             drawBorder: false
  //           }
  //         }],
  //         xAxes: [{
  //           display: 0,
  //           ticks: {
  //             display: false
  //           },
  //           gridLines: {
  //             zeroLineColor: "transparent",
  //             drawTicks: false,
  //             display: false,
  //             drawBorder: false
  //           }
  //         }]
  //       },
  //       layout: {
  //         padding: {
  //           left: 0,
  //           right: 0,
  //           top: 15,
  //           bottom: 15
  //         }
  //       }
  //     }

  //   this.lineChartGradientsNumbersType = 'bar';
   }

//    updateData(data) {
//     console.log('In UPDATEDATA!');
//     this.tweetData = data as JSON;
//     console.log(typeof this.tweetData);
//     // console.log(this.tweetData);
//     this.obj = JSON.parse(JSON.stringify(this.tweetData));
//     this.sadness = this.obj.sadness;
//     this.joy = this.obj.joy;
//     this.confident = this.obj.confident;
//     this.analytical = this.obj.analytical;
//     console.log(this.analytical);
//     console.log(this.tweetData);

//     for (let i = 0; i < this.analytical.length; i++) {
//       let x = Math.random() * -50 - 1;
//       let y = Math.random() * 100 + 1;
//       let r = this.analytical[i] * 50;
//       this.data.push({x: x, y: y, r: r});
//       this.colors.push('rgba(255, 185, 97, 0.6)');
//     }
//     for (let i = 0; i < this.joy.length; i++) {
//       let x = Math.random() * 50 + 1;
//       let y = Math.random() * 100 + 1;
//       let r = this.joy[i] * 50;
//       this.data.push({x: x, y: y, r: r});
//       this.colors.push('rgba(192, 92, 126, 0.5');
//     }
//     for (let i = 0; i < this.sadness.length; i++) {
//       let x = Math.random() * -50 - 1;
//       let y = Math.random() * -100 - 1;
//       let r = this.sadness[i] * 50;
//       this.data.push({x: x, y: y, r: r});
//       this.colors.push('rgba(61, 71, 219, 0.6)');
//     }
//     for (let i = 0; i < this.confident.length; i++) {
//       let x = Math.random() * 50 + 1;
//       let y = Math.random() * -100 - 1;
//       let r = this.confident[i] * 50;
//       this.data.push({x: x, y: y, r: r});
//       this.colors.push('rgba(83, 219, 194, 0.6)');
//     }

//     console.log("Hi : " + this.data.slice(0, this.analytical.length))
//     var ctx = <HTMLCanvasElement> document.getElementById('myChart').getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'bubble',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: 'Analytical',
//                 backgroundColor: this.colors.slice(0, this.analytical.length),
//                 data: this.data.slice(0, this.analytical.length),
//                 borderWidth: 1
//             },
//             {
//               label: 'Joy',
//               backgroundColor: this.colors.slice(this.analytical.length, this.analytical.length + this.joy.length),
//               data: this.data.slice(this.analytical.length, this.analytical.length + this.joy.length),
//               borderWidth: 1
//             },
//             {
//               label: 'Sadness',
//               backgroundColor: this.colors.slice(this.analytical.length + this.joy.length, this.analytical.length + this.joy.length + this.sadness.length),
//               data: this.data.slice(this.analytical.length + this.joy.length, this.analytical.length + this.joy.length + this.sadness.length),
//               borderWidth: 1
//             },
//             {
//               label: 'Confident',
//               backgroundColor: this.colors.slice(this.analytical.length + this.joy.length + this.sadness.length, this.colors.length),
//               data: this.data.slice(this.analytical.length + this.joy.length + this.sadness.length, this.colors.length),
//               borderWidth: 1
//             }
//           ]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });
//   }
// }
  }

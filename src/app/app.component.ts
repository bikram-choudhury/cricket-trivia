import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cricket Trivia';
  style = {};
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 10,
          stepSize: 1,
        }
      }]
    }
  };
  public barChartLabels: string[] = ['Test Status'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0], label: 'In Correct' },
    { data: [0], label: 'Correct' }
  ];
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public showChart(result: any[]): void {
    const correct = result.length && result.filter(r => r.status === 'pass') || [];
    const incorrect = result.length && result.filter(r => r.status === 'fail') || [];

    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = [incorrect.length];
    clone[1].data = [correct.length];
    this.barChartData = clone;
    this.style = {"position": "fixed"};
    window.scrollTo(0,0);
  }

  ngOnInit() {

  }
}

import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { chart } from 'highcharts';

@Component({
    selector: 'plm-dashboard',
    templateUrl: './dashboard.component.html',
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  @ViewChild('chartTarget1') chartTarget1: ElementRef;
  @ViewChild('chartTarget2') chartTarget2: ElementRef;
  @ViewChild('chartTarget3') chartTarget3: ElementRef;
  chart: Highcharts.ChartObject;
  role: string;


  constructor() { }

  ngOnInit() {

  }

 // Create the Project Status chart

  ngAfterContentInit() {


    const options: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Project Status'
      },
      xAxis: {
        categories: ['New Offer Creation','Offer Extension','Offer Expiration','Offer Attributes','Offer Pricing Change']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
     series: [{
        name: 'NEW',
        data: [{
            name: 'New Offer Creation',
            y: 5,
            drilldown: 'New Offer Creation'
        }, {
            name: 'Offer Extension',
            y: 2,
            drilldown: 'Offer Extension'
        }, {
            name: 'Offer Expiration',
            y: 3,
            drilldown: 'Offer Expiration'
        }, {
            name: 'Offer Attributes Modification',
            y: 8,
            drilldown: 'Offer Attributes Modification'
        }, {
            name: 'Offer Pricing Change',
            y: 6,
            drilldown: 'Offer Pricing Change'
        }]
    }, {
        name: 'WIP',
        data: [{
            name: 'New Offer Creation',
            y: 8,
            drilldown: 'New Offer Creation'
        }, {
            name: 'Offer Extension',
            y: 3,
            drilldown: 'Offer Extension'
        }, {
            name: 'Offer Expiration',
            y: 6,
            drilldown: 'Offer Expiration'
        }, {
            name: 'Offer Attributes Modification',
            y: 2,
            drilldown: 'Offer Attributes Modification'
        }, {
            name: 'Offer Pricing Change',
            y: 4,
            drilldown: 'Offer Pricing Change'
        }]
    }, {
        name: 'WIP-Configurator-Distributor',
        data: [{
            name: 'New Offer Creation',
            y: 8,
            drilldown: 'New Offer Creation'
        }, {
            name: 'Offer Extension',
            y: 4,
            drilldown: 'Offer Extension'
        }, {
            name: 'Offer Expiration',
            y: 6,
            drilldown: 'Offer Expiration'
        }, {
            name: 'Offer Attributes Modification',
            y: 5,
            drilldown: 'Offer Attributes Modification'
        }, {
            name: 'Offer Pricing Change',
            y: 2,
            drilldown: 'Offer Pricing Change'
        }]
    },
    {
        name: 'COMPLETED',
        data: [{
            name: 'New Offer Creation',
            y: 5,
            drilldown: 'New Offer Creation'
        }, {
            name: 'Offer Extension',
            y: 4,
            drilldown: 'Offer Extension'
        }, {
            name: 'Offer Expiration',
            y: 8,
            drilldown: 'Offer Expiration'
        }, {
            name: 'Offer Attributes Modification',
            y: 2,
            drilldown: 'Offer Attributes Modification'
        }, {
            name: 'Offer Pricing Change',
            y: 3,
            drilldown: 'Offer Pricing Change'
        }]
    }]
    };

    this.chart = chart(this.chartTarget.nativeElement, options);

 // Pie Chart Offer Status
   const option: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Offers Status'
      },
    series: [{
        name: 'Offers',
        data: [{
            name: 'Draft',
            y: 56
        }, {
            name: 'Ready For Test',
            y: 24,
            sliced: true,
            selected: true
        }, {
            name: 'Ready For Publish',
            y: 10
        }, {
            name: 'Published',
            y: 4
        }]
    }]
    };

    this.chart = chart(this.chartTarget1.nativeElement, option);

 // Pie Chart Discount Status
   const optionDiscount: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Discount Status'
      },

    series: [{
        name: 'Discount',
        data: [{
            name: 'Draft',
            y: 56
        }, {
            name: 'ICOMS WIP',
            y: 24,
            sliced: true,
            selected: true
        }, {
            name: 'ICOMS Confirmed',
            y: 10
        }, {
            name: 'Completed',
            y: 4
        }]
    }]
    };

    this.chart = chart(this.chartTarget2.nativeElement, optionDiscount);

   // Pie Chart Campaign Status
   const optionCampaign: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Product Status'
      },

      series: [{
        name: 'Product',
        data: [{
            name: 'Draft',
            y: 56
        }, {
            name: 'Completed',
            y: 4
        }]
    }]
    };
    this.chart = chart(this.chartTarget3.nativeElement, optionCampaign);
  }
  ngOnDestroy() {
    this.chart = null;
  }
}

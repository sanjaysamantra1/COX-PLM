import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardButtonService } from '../dashboard-button.service';

@Component({
  selector: 'plm-actors',
  templateUrl: './actors.component.html',
  providers: [DashboardButtonService]
})

export class ActorsComponent implements OnInit {
  constructor(private _router: Router, private dashboardButtonService: DashboardButtonService) { }

  @Input() role: string;
  title: string;
  count: number;
  buttonClass: string;
  jsonData: string;

  ngOnInit() {
    this.dashboardButtonService.getRoleJSONData().subscribe(
      // handle Success
      (data) => {
        this.populateButtonData(data);
      },
      // handle Error
      (err) => {
        console.log('Error Occured!!!');
      },
      // handle Complete
      () => {
        console.log('HTTP Client Request Completed!!!');
      }
    );
  }

  populateButtonData = function(data){
    switch(this.role) {
        case 'requestor':
            this.title = 'Requestor';
            this.buttonPanelClass ='panel panel-primary';
            this.buttonClass = 'fa fa-folder-open fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'configurator':
            this.title = 'Configurator';
            this.buttonPanelClass ='panel panel-yellow';
            this.buttonClass = 'fa fa-cogs fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'distributor':
            this.title = 'Distributor';
            this.buttonPanelClass ='panel panel-info';
            this.buttonClass = 'fa fa-user fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'icoms':
            this.title = 'ICOMS';
            this.buttonPanelClass = 'panel panel-green';
            this.buttonClass = 'fa fa-pie-chart fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'omc':
            this.title = 'OMC';
            this.buttonPanelClass = 'panel panel-green';
            this.buttonClass = 'fa fa-bars fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'pinpoint':
            this.title = 'PinPoint';
            this.buttonPanelClass = 'panel panel-green';
            this.buttonClass = 'fa fa-thumb-tack fa-3x';
            this.count = data[this.role]['count'];
            break;
        case 'ecom':
            this.title = 'E-COM';
            this.buttonPanelClass = 'panel panel-green';
            this.buttonClass = 'fa fa-shopping-cart fa-3x';
            this.count = data[this.role]['count'];
            break;
        default:
            console.log('Default Call.');
    }
    if (this.role === 'requestor') {
        this.title = 'Requestor';
        this.buttonClass = 'fa fa-folder-open fa-3x';
        this.count = data[this.role]['count'];
    }
};

showDetails = function(roleName) {
    switch(roleName) {
        case 'requestor':
            this._router.navigate(['/plm-work-flow/requestor']);
            break;
        case 'configurator':
            this._router.navigate(['/plm-work-flow/configurator/offer/project-list']);
            break;
        case 'distributor':
            this._router.navigate(['/plm-work-flow/distributor/omc-test']);
            break;
        case 'icoms':
            this._router.navigate(['/plm-work-flow/technology-systems/icoms']);
            break;
        case 'omc':
            this._router.navigate(['/plm-work-flow/technology-systems/omc']);
            break;
        case 'pinpoint':
            this._router.navigate(['/plm-work-flow/technology-systems/pin-point']);
            break;
        case 'ecom':
            this._router.navigate(['/plm-work-flow/technology-systems/e-com']);
            break;
        default:
            console.log('Default Call.');
    }
};

}

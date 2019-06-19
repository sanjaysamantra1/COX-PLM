import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GetofferFromProjectResponse } from '../add-offer-interface';
import { AddOfferService } from '../add-offer.service';

@Component({
  selector: 'plm-offer-from-project',
  templateUrl: './offer-from-project.component.html'
})
export class OfferFromProjectComponent implements OnInit, OnChanges {

  @Input() offerFromProject: GetofferFromProjectResponse;
  private dataProductVal: string;
  private phoneProductVal: string;
  private showOfferInformation: Boolean;

  constructor() { 
    this.showOfferInformation = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const offerFromProject: SimpleChange = changes.offerFromProject;
    this.offerFromProject = ((typeof offerFromProject.currentValue !== 'undefined')) ? JSON.parse(JSON.stringify(offerFromProject.currentValue)) : [];
    this.showOfferInformation = true;
  }

}

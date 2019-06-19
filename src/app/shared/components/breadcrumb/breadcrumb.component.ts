import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumb } from '../../services/bread-crumb';

@Component({
  selector: 'plm-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadCrumbs: BreadCrumb[];
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectTo(url: string) {
    if (url === 'dashboard') {
      url = '';
    }
    this._router.navigate([url]);
  }

}

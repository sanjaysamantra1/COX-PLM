import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { AuthGuardService } from '../../shared/guard/auth-guard.service';
import { AuthGuardDataService } from '../../shared/guard/auth-guard-data.service';
import { Observable } from 'rxjs/Observable';
import { AppConfigService } from '../../shared/services/app-config.service';
import { LoginServiceService } from '../../login/login-service.service';

@Component({
    selector: 'plm-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    providers: [LoginServiceService]
})
export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    currentUser: any;
    selectedIndex: number;
    private show_sidebar_plmWorkFlow_requestor: boolean;
    private show_sidebar_plmWorkFlow_configurator: boolean;

    constructor(private loginService: LoginServiceService, private http: HttpClient, private router: Router, private authGuardService: AuthGuardService, private authGuardDataService: AuthGuardDataService, private appConfigService: AppConfigService) {
        this.currentUser = sessionStorage.getItem('userName');
        this.showHideSideBarComponents();
    }

    ngOnInit() {

    }

    showHideSideBarComponents() {
        const showHideComponentArray = [
            'sidebar_plmWorkFlow_requestor',
            'sidebar_plmWorkFlow_configurator',
            'sidebar_userAdmin',
            'sidebar_userAdmin_addUser',
            'sidebar_userAdmin_userViewModify',
            'sidebar_businessCatalog',
            'sidebar_businessCatalog_offer',
            'sidebar_businessCatalog_products',
            'sidebar_businessCatalog_discounts',
            'sidebar_plmWorkFlow_requestor',
            'sidebar_plmWorkFlow_configurator',
            'sidebar_plmWorkFlow_configurator_offers',
            'sidebar_plmWorkFlow_configurator_discounts',
            'sidebar_plmWorkFlow_distributor',
            'sidebar_plmWorkFlow_distributor_omcTestQueue',
            'sidebar_plmWorkFlow_distributor_omcProdQueue',
            'sidebar_plmWorkFlow_distributor_products',
            'sidebar_plmWorkFlow_distributor_discounts',
            'sidebar_plmWorkFlow_technologySystems_uatUsers',
            'sidebar_plmWorkFlow_technologySystems_icoms',
            'sidebar_plmWorkFlow_technologySystems_omc',
            'sidebar_plmWorkFlow_technologySystems_pinPoint',
            'sidebar_plmWorkFlow_technologySystems_eCOM'
        ];
        for (let i = 0; i < showHideComponentArray.length; i++) {
            this['show_' + showHideComponentArray[i]] = this.authGuardService.checkForAuthentication(showHideComponentArray[i]);
        }
        if (sessionStorage.getItem('roleName') === 'Administrator') {
            this['show_sidebar_userAdmin'] = true;
            this['show_sidebar_userAdmin_addUser'] = true;
            this['show_sidebar_userAdmin_userViewModify'] = true;
        }
    }

    select(index: number) {
        this.selectedIndex = index;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    sidebarExpand() {
        const dom: Element = document.querySelector('body.push-right');
        dom.classList.remove('push-right');
    }

    onLoggedout() {
        this.loginService.logout()
        .subscribe(
          data => {
            if (data.actionStatus === 'SUCCESS') {
              sessionStorage.removeItem('isLoggedIn');
              sessionStorage.removeItem('sessionKey');
              sessionStorage.removeItem('userId');
              sessionStorage.removeItem('roleName');
              sessionStorage.removeItem('userName');
              sessionStorage.removeItem('workGroups');
              this.router.navigate(['']);
            } else if (data.actionStatus === 'Fail') {
              return false;
            }
          },
          error => {
            console.log("Error :: " + error)
          }
        );

    }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchUserRequest } from '../search-user.interface';

@Component({
  selector: 'plm-search-user-criteria',
  templateUrl: './search-user-criteria.component.html'
})
export class SearchUserCriteriaComponent implements OnInit {
  @Input() searchInFilter:String[];
  @Output() searchUser: EventEmitter<SearchUserRequest> = new EventEmitter<SearchUserRequest>();
  @ViewChild('searchUserForm') public searchUserForm: NgForm;
  private searchInput: string;
  private searchIn: string;

  constructor() {
    this.initializeForm();
    this.searchInput = '';
    this.searchIn = '';
  }

  ngOnInit() {
    this.searchUserByCriteria();
  }
  
  initializeForm(){
    this.searchInput = '';
    this.searchIn = '';
  }

  searchUserByCriteria(){
      const reqObj = {
        'searchCriteria': this.searchUserForm.value.searchInput,
        'searchType': this.searchUserForm.value.searchIn
      }
      this.searchUserForm.resetForm({searchIn: ''});
      this.searchUser.emit(reqObj);
  }

}

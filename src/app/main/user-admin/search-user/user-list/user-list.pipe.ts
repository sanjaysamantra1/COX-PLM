import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userList',
  pure: false
})
export class UserListPipe implements PipeTransform {
  
  transform(items: any[], filter: Object): any {
      if (!items || !this.checkEmptyFilter(filter)) {
        return items;
      }
      return items.filter(item => {
          const itemVal = item, filterVal = filter;
          return this.checkIsValueExists(itemVal, filterVal);
      });
  }

  checkIsValueExists(item, filter){
    let count = 0, result = false;
    const filterKeys = Object.keys(filter);
    for (const key of filterKeys) {
        const itemCheckValue = item[key].toLowerCase();
        const filterCheckValue = filter[key].toLowerCase();
        if (itemCheckValue.indexOf(filterCheckValue) > -1) {
          count++;
          if (Number(count) === Number(filterKeys.length)) {
            result = true;
          }
        }
    }
    return result;
  }

  checkEmptyFilter(filter) {
    const filterKeys = Object.keys(filter);
    let count =0;
    for (const key of filterKeys) {
      if (filter[key] === '') {
        count++;
      }
    }
    if (count === filterKeys.length) {
      return false;
    }
    return true;
  }
}

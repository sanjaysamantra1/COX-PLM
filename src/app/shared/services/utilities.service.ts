import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }

  isEmailAddress(str) {
    const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const testResult = (pattern.test(str));
    if (pattern.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  getDateInFormat(date) {
    // const currentDate = new Date(date);
    const result =  (date.split('-')[1]) + '/' + (date.split('-')[2]) + '/' + date.split('-')[0];
    return result;
  }

  capitalizeFirstLetter(string) {
    string = (typeof string != 'undefined') ? string : '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
   getServerMessage(data, oldMessage) {
    let result = '';
    if ((typeof data.actionResult !== 'undefined') && (data.actionResult !== null) && (data.actionResult !== '') &&
      (typeof data.actionResult.errors !== 'undefined') && (data.actionResult.errors !== null) &&  (data.actionResult.errors !== '') && 
      (data.actionResult.errors.length > 0) && 
      (typeof data.actionResult.errors[0] !== 'undefined') && (data.actionResult.errors[0] !== null) && (data.actionResult.errors[0] !== '') &&    
      (typeof data.actionResult.errors[0].description !== 'undefined') && (data.actionResult.errors[0].description !== null) && (data.actionResult.errors[0].description !== '')
    ) {
      result = data.actionResult.errors[0].description;
    } else {
      result = oldMessage;
    }
    return result;
  }

  getSingleSelectID(selectedItems) {
    return (selectedItems[0]['id']);
  }
  
  getMultiSelectID(selectedItems) {
      let result = [];
      for(let i=0; i< selectedItems.length; i++) {
      result.push((selectedItems[i]['id']));
      }
      return result;
  }


  getDropDownList(masterData, dropDownKey) {
    let result = [];
    for (let i = 0; i < masterData[dropDownKey].length; i++) {
        result.push({
            'id': masterData[dropDownKey][i]['key'],
            'itemName': masterData[dropDownKey][i]['value']
        });
    }
    return result;
}

getSelectedItemsObject(masterData, dropDownKey, dropDownList) {
    let result = [];
    for (let i = 0; i < masterData[dropDownKey].length; i++) {
        if ((dropDownList instanceof Array) && (dropDownList.length > 0) && (dropDownList.indexOf(masterData[dropDownKey][i]['key']) > -1)) {
            result.push({
                'id': masterData[dropDownKey][i]['key'],
                'itemName': masterData[dropDownKey][i]['value']
            });
        } else if (masterData[dropDownKey][i]['key'] == dropDownList) {
            result.push({
                'id': masterData[dropDownKey][i]['key'],
                'itemName': masterData[dropDownKey][i]['value']
            });
        }
    }
    return result;
}


}

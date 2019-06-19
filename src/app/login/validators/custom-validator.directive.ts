import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static vaildEmail(c: FormControl): ValidationErrors {
        const email = c.value;
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var isValid = true;
        const message = {
            'vaildEmail': {
                'message': 'Required!'
            }
        };
        if (reg.test(email)){
            isValid = true;
        }
        else{
            isValid = false;
        }
        return isValid ? null : message;
    }
}

import { LightningElement , api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD  from '@salesforce/schema/Account.Industry';
 
export default class RecordIdExampleLWC extends LightningElement {
   
    @api recordId;

    viewMode = 'readonly';

    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, REVENUE_FIELD ,INDUSTRY_FIELD ];
    NAME_FIELD = NAME_FIELD;
    REVENUE_FIELD = REVENUE_FIELD; 
    INDUSTRY_FIELD = INDUSTRY_FIELD; 


    handleSuccess(event) {
        this.viewMode = 'readonly';
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }


    ChangeView(){
       this.viewMode = 'edit';
    }

    checkmethod(){
        this.viewMode = 'readonly';
    }
}
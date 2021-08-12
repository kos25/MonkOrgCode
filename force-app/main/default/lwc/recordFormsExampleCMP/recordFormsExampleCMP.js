import { LightningElement , api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD  from '@salesforce/schema/Account.Industry';
import  {getRecord} from 'lightning/uiRecordApi';

export default class LWCRecordFroms extends LightningElement {
     
    @api recordId;

    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, REVENUE_FIELD ,INDUSTRY_FIELD ];

    connectedCallback(){
      // alert(recordId);
       console.log('Hi I am at console via connected call back ');
       //console.log(recordId);
    }

    renderedCallback(){
       // alert(recordId);
        console.log('Hi I am at console via rendered call back ');
       // console.log(recordId);
    }

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}
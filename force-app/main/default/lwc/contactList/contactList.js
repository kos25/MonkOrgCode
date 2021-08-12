import { LightningElement, wire, api } from 'lwc';
import returnInput from '@salesforce/apex/LWCManegerController.returnInput'

export default class ContactList extends LightningElement {
    searchkey;
    resultValue; 
    error;
    @api inputMessage;
    handleChange(event){
      this.searchkey = event.target.value;
    }

    @wire(returnInput,{str : '$searchkey'})
    resultValue;
    // string({error,data}){
    //  if(data){
    //      this.resultValue = data;
    //  }else if(error){
    //    this.error = error;
    //    console.log(this.error);
    //  }
    // }


    handlevenet(event){
      alert('event handled in grand parent');
    }



}
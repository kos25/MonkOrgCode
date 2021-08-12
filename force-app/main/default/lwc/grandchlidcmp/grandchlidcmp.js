import { LightningElement } from 'lwc';

export default class Grandchlidcmp extends LightningElement {
    
    handleclick(){
        alert('grand chlid cliked');
        const csevent = new CustomEvent('notify', {bubbles : true}); 
        this.dispatchEvent(csevent);
    }
}
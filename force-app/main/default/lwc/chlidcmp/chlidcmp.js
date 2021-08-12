import { LightningElement } from 'lwc';

export default class Chlidcmp extends LightningElement {
    handlevenet(event){
        alert('event handled in chlid');
    }

    handlevenetdiv(event){
        alert('event handled in chlid in div');
    }
}
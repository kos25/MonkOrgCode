import { LightningElement } from 'lwc';

export default class Demochatbot extends LightningElement {
    showHideChatPopup = true;
    chatpopupClass = 'chat-popupHide';

    toggleForm(){
        this.showHideChatPopup = !this.showHideChatPopup;
        this.chatpopupClass = this.showHideChatPopup ? 'chat-popupHide' : 'chat-popupShow';
    }
}
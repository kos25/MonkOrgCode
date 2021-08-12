import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { EXAMPLES_COLUMNS_DEFINITION_BASIC, EXAMPLES_DATA_BASIC, DATA_BASIC, SELECTED_ROWS_BASIC } from './sampleData';
import { refreshApex } from '@salesforce/apex';

export default class Treegriddemo extends LightningElement {

    @track selectedRows = [];

    gridColumns = EXAMPLES_COLUMNS_DEFINITION_BASIC;
    @track  gridData = DATA_BASIC;

    

   
    connectedCallback(e){ 
       
        
    }

    renderedCallback(e){
        const grid =  this.template.querySelector( 'lightning-tree-grid' );
        grid.expandAll();

        // var ch = this.template.querySelectorAll('tr');
        // console.log('test=' + ch);
        // ch.forEach(element => {
        //     console.log(element);
        // });
    }

  

    handleRowSelction(event){
         this.selectedRows  = event.detail.selectedRows.map(row => {
            if(!row.isDisabled) {
                return  row.name;
            }else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Info',
                        message: 'Row selection is not allowed for parent record', 
                        variant: 'info',
                        mode: 'pester'
                    })
                );
            }
        });
        event.detail.selectedRows = event.detail.selectedRows.filter(row => row.isDisabled !== true);
    }

    handleRowClick(event){
        const recId =  event.detail.row.name; 
        var gData = this.gridData
        gData.forEach(element => {
           if(element._children){
                element._children.forEach(ele => {
                    if(recId === ele.name ){
                        ele.displayIconName = 'utility:close';
                        ele.phone = '7898';
                    }
                });
           } 
        });
        this.gridData = gData;
        return refreshApex(this.gridData);

        //console.log(JSON.stringify(this.gridData));

    }
}
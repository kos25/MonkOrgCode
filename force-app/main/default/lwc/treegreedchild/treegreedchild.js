import { LightningElement , track , wire , api } from 'lwc';
import fetchAccounts from '@salesforce/apex/ExampleController.fetchAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {loadStyle} from 'lightning/platformResourceLoader'
import COLORS from '@salesforce/resourceUrl/colors'


export default class Treegreedchild extends LightningElement {
    @api recordId;
    @track selectedRows  = [] ;    
    @track testVar = false; 

    @track testEvent ; 
     
    selectedRecordParentId = ''; 

    isCssLoaded = false

    @track gridColumns = [
        
    {
        type: 'button-icon',
          typeAttributes:
          {
              size : "xx-small",
              iconName: {fieldName : "displayIconName" },
              name: 'edit',
              class: {fieldName: 'isbutton'}
             
              
             
          },
          cellAttributes:{
              class:{fieldName:'cellCss'}
          }
      } ,
  
        
        
        
        {
        type: 'text',   
        fieldName: 'Name',
        label: 'Name',
        cellAttributes:{
            class:{fieldName:'cellCss'}
        }
    },
    {
        type: 'text',
        fieldName: 'Industry',
        label: 'Industry' ,
        cellAttributes:{
            class:{fieldName:'cellCss'}
        }
    },
    {
        type: 'text',
        fieldName: 'FirstName',
        label: 'FirstName',
        cellAttributes:{
            class:{fieldName:'cellCss'}
        }
    },
    {
        type: 'text',
        fieldName: 'LastName',
        label: 'LastName',
        cellAttributes:{
            class:{fieldName:'cellCss'}
        }
    },
    



];
    @track gridData;

      


    renderedCallback(){
        
        if(this.gridData){
            const grid =  this.template.querySelector( 'lightning-tree-grid' );
            grid.expandAll();
        }

        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLORS).then(()=>{
            console.log("Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }









    @wire(fetchAccounts)
    accountTreeData({ error, data }) {
        if ( data ) {
            var tempData = JSON.parse( JSON.stringify( data ));
            for ( var i = 0; i < tempData.length; i++ ) {
                tempData[ i ].isDisabled = true; 
                tempData[i].isbutton = 'slds-hide';    
                tempData[i].cellCss = '';
                tempData[ i ]._children = tempData[ i ][ 'Contacts' ];
                tempData[ i ]._children.forEach(element => {
                    element.isDisabled = false; 
                    element.displayIconName = '';
                    element.isbutton = 'scaled-down';
                    element.cellCss = '';
                });
                delete tempData[ i ].Contacts;
            }
            this.gridData = tempData;

        } else if ( error ) {
            if ( Array.isArray( error.body ) )
                console.log( 'Error is ' + error.body.map( e => e.message ).join( ', ' ) );
            else if ( typeof error.body.message === 'string' )
                console.log( 'Error is ' + error.body.message );
        }

    }

    handleRowClick(event){
        const recId =  event.detail.row.Id; 
        var datalist = [] ; 
        datalist = this.gridData; 
        datalist.forEach(element => {
           if(element._children){
                element._children.forEach(ele => {
                    if(recId === ele.Id ){
                        this.selectedRecordParentId = this.selectedRecordParentId === '' ?  element.Id : this.selectedRecordParentId;
                        if(this.selectedRecordParentId === ele.AccountId){
                            ele.Id = ele.Id ; 
                            ele.displayIconName = ele.displayIconName == 'utility:check' ? '' : 'utility:check';
                        }else{
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'error',
                                    message: 'You cannot select child record from different parent record', 
                                    variant: 'error',
                                    mode: 'dismissible'
                                })
                            ); 
                        }
                    }
                });
           } 


        });
        this.gridData =  [] ; 
        this.gridData = datalist;
    }




    handleSelect(){

        var datalist = [] ; 
        datalist = this.gridData; 
        datalist.forEach(element => {
            if(element._children && element._children.filter(ele => ele.displayIconName == 'utility:check').length){
                    element._children.forEach(ele => {
                    ele.isbutton  = 'slds-hide';   
                    this.selectedRecordParentId = '';
                    ele.cellCss = 'disabled-cell';
                    element.cellCss = 'disabled-cell';
                });
            }
        });

        console.log('this.selectedRecordParentId ===' + this.selectedRecordParentId);
        this.gridData = [];
        this.gridData = datalist; 

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record Selected', 
                variant: 'Success',
                mode: 'dismissible'
            })
        );
    }




    handleRowSelction(event){
        var recentlyselctedrow ; 
        this.selectedRows  = event.detail.selectedRows.map(row => {
            recentlyselctedrow = row;
            if(!row.isDisabled) {
                return  row.Id;
            }else{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Info',
                        message: 'Row selection is not allowed on parent record', 
                        variant: 'info',
                        mode: 'pester'
                    })
                );
            }
        });
        event.detail.selectedRows = event.detail.selectedRows.filter(row => row.isDisabled !== true);
        this.checkforToggle( recentlyselctedrow);
    }
    
}
   


   
   



  















 // checkforToggle(row){
    //    this.gridData.forEach(element => {
    //     if(element._children){
    //          element._children.forEach(ele => {
    //              if(row){
    //                 if(row.Id === ele.Id ){
    //                     ele.displayIconName = ele.displayIconName == 'utility:check' ? 'utility:close' : 'utility:check' ;
    //                     this.testVar = true; 
    //                 }
    //              }else{
    //                 ele.displayIconName = 'utility:close' ;
    //              }
                 
    //          });
    //     } 
    //   });


      //   var  AccountID = row.AccountId; 
    //   console.log('Fox 2  :::' +this.selectedRows);
    // //    this.selectedRows.forEach(element => {
    // //        if(element !== row.Id){
    // //            if(this.gridData.filter(ele => ele.Id == AccountID)){
    // //              this.selectedRows.splice(array.indexOf(element), 1);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    // //            }
    // //        }
    // //    });



   // }
public with sharing class ExampleController {

    @AuraEnabled(cacheable=true)
    public static List < Account > fetchAccounts() {

        return [ SELECT Id, Name, Industry, ( SELECT Id, Name ,  FirstName, LastName , AccountId FROM Contacts ) FROM Account where Name Like '%TestAC%' ];
       
    }
   
}
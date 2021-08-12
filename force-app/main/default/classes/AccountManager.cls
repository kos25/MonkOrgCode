@RestResource(urlmapping='/v1/Account/*')
global class AccountManager {

    global class accountWrrapper{
        global Account accountRec;
        global List<Contact> contactRecs;
        global List<Case> CaseList;
        accountWrrapper(Account accountRec,List<Contact> contactRecs,List<Case> CaseList){
            this.accountRec = accountRec; 
            this.contactRecs = contactRecs;
            this.CaseList = CaseList;
        }
    }
    
       
   @httpGet   
    global Static accountWrrapper accountInformation(){
         RestRequest request = RestContext.request;
         String requestURI = request.requestURI;
         String accountID = requestURI.substringAfterLast('/');
         System.debug('accountID = '+accountID);
         Account acc = [select id , Name ,  Rating, Industry, Description, Phone, Fax FROM Account Where Id =: accountID];
         List<Contact> conList = [Select id , Name, FirstName, LastName, Email, Phone from Contact where AccountId  =: accountID];
         List<Case> caseList = [Select id, CaseNumber, Subject, Description, Status, Owner.Name FROM Case Where AccountId =: accountId];
         accountWrrapper accWrp = new accountWrrapper(acc,conList,caseList);
         return accWrp;
    }

    @httpPost
    global static Account createAccount(String Name , String Rating , String Industry){
        Account Acc = new Account(Name = Name , Rating=Rating , Industry=Industry);
        insert Acc; 
        return Acc;
    }
    
}
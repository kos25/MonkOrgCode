public without sharing class fieldApisMangerCls {

    public fieldApisMangerCls() {}


    @AuraEnabled
    public static List<lableApiNameWrapper> getLabelApiName(){
            List<lableApiNameWrapper> wraperList = new List<lableApiNameWrapper>();
            for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() ) {
                Schema.DescribeSObjectResult objResult = o.getDescribe();
                wraperList.add(new lableApiNameWrapper(String.valueof(objResult.getLabel()),String.valueof(objResult.getName())));
                //wraperList.add(new lableApiNameWrapper('TestLabel','TestApi'));
            }
            return wraperList;
    }


    public  class  lableApiNameWrapper {
        @AuraEnabled public String lableNmae;
        @AuraEnabled public String apiName; 
        lableApiNameWrapper(String  lableNmae , String apiName ){
            this.lableNmae = lableNmae; 
            this.apiName = apiName; 
        }

    }
}
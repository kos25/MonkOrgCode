public without sharing class LWCManegerController {
    public LWCManegerController() {}


    
    @AuraEnabled(cacheable = true)
    public static string returnInput(String str){
    return str; 
    }
}
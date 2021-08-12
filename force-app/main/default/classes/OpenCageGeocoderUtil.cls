global with sharing class OpenCageGeocoderUtil {
    
     private Static String API_KEY = System.Label.openCageKey;
     private Static  String END_POINT = 'https://api.opencagedata.com/geocode/v1/json?';

     @future(callout=true)
     global Static void forwardGeoCoding(id accId){
         String errorMessage = '';
         Account acc = [Select id , Name , Location__latitude__s , Location__longitude__s, ShippingStreet, ShippingState,  
                        ShippingPostalCode,  ShippingCountry, ShippingCity From Account where Id  =: accId];
        
        String address = acc.ShippingStreet + ',' + acc.ShippingCity + ',' + acc.ShippingState + ','  + acc.ShippingPostalCode + ',' 
                         +acc.ShippingCountry;

        String encodedAdress = EncodingUtil.urlEncode(address,'UTF-8'); 
        String finalEndPoint =     END_POINT+'key='+API_KEY+'&q='+encodedAdress+'&pretty=1&limit=1';
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json'); 
        request.setEndpoint(finalEndPoint);
        HttpResponse response = new HttpResponse();

        try{

            response = http.send(request);
            if(response.getStatusCode() == 200){
                String body =  response.getBody();
                GeoCoderJsonToApex openGeoCoderData = (GeoCoderJsonToApex)System.JSON.deserialize(body, GeoCoderJsonToApex.class);
                System.debug(system.LoggingLevel.DEBUG, openGeoCoderData);
                List<GeoCoderJsonToApex.results>  results = openGeoCoderData.results;
                if(!results.isEmpty()){
                    GeoCoderJsonToApex.results result  = results.get(0);
                    acc.Location__latitude__s = result.geometry.lat;
                    acc.Location__longitude__s= result.geometry.lng;
                }
                
                update acc; 
                
            }

        }catch(Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                +' Remote Site Setting and add '+' '+ END_POINT  +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with OpenCage Data API. '
                    +'Status '+response.getStatus()+' and Status Code '+response.getStatuscode();
            }
            System.debug(system.LoggingLevel.DEBUG, 'Exception Executed ' +errorMessage);

        }

     }

     @future(callout=true)
      global Static void reverseGeoCoding(id accId){
            String errorMessage = '';
            Account acc = [Select id , Name , Location__latitude__s , Location__longitude__s, ShippingStreet, ShippingState,  
                        ShippingPostalCode,  ShippingCountry, ShippingCity From Account where Id  =: accId];
        
        String address = acc.Location__latitude__s + '+' +acc.Location__longitude__s;
        String encodedAdress = EncodingUtil.urlEncode(address,'UTF-8'); 
        String finalEndPoint =     END_POINT+'key='+API_KEY+'&q='+encodedAdress+'&pretty=1&limit=1'; 
        system.debug('finalEndPoint='+finalEndPoint);

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json'); 
        request.setEndpoint(finalEndPoint);
        HttpResponse response = new HttpResponse();

        try{

            response = http.send(request);
            if(response.getStatusCode() == 200){
                String body =  response.getBody();
                GeoCoderJsonToApex openGeoCoderData = (GeoCoderJsonToApex)System.JSON.deserialize(body, GeoCoderJsonToApex.class);
                System.debug(system.LoggingLevel.DEBUG, openGeoCoderData);
                List<GeoCoderJsonToApex.results>  results = openGeoCoderData.results;
                if(!results.isEmpty()){


                    GeoCoderJsonToApex.results result  = results.get(0);
                    acc.ShippingStreet = result.components.road;
                    acc.ShippingPostalCode= result.components.postcode;
                    acc.ShippingCity = result.components.city;
                    acc.ShippingCountry= result.components.country;
                    
                }
                
                update acc; 
                TriggerHandler.triggerHandler = false;
                
            }

        }catch(Exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                +' Remote Site Setting and add '+' '+ END_POINT  +' Endpoint';
            }else{
                errorMessage = 'Unexpected Error while communicating with OpenCage Data API. '
                    +'Status '+response.getStatus()+' and Status Code '+response.getStatuscode();
            }
            System.debug(system.LoggingLevel.DEBUG, 'Exception Executed ' +errorMessage);

        }


      }
}


//OpenCageGeocoderUtil.reverseGeoCoding('0015g000004Ulcv');
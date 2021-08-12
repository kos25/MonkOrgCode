public With sharing class FreshdeskUtil {
    private static Final String  TICKETS_ENDPOINT = 'https://kaustubhjaiswal.freshdesk.com/api/v2/tickets';
    private static Final String  CONTACTS_ENDPOINT = 'https://kaustubhjaiswal.freshdesk.com/api/v2/contacts';
    private static Final String  LOGINCREADS = 'a5igcBsF9VbP8YtGnTKR:X';

    public static void  createContact(String name  , String email , String phone , String mobile){

        String errorMessage = ''; 
        
        String requestBody = '{'+

                               '"name": "'+name+'",' +
                               '"email":"'+email+'",'+
                               '"phone":"'+phone+'",'+
                               '"mobile":"'+mobile+'"'

                               +'}';

       


        Http http = new Http();

        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setHeader('Authorization', EncodingUtil.base64Encode(Blob.valueOf(LOGINCREADS)));
        request.setHeader('Content-Type', 'application/json');
        request.setBody(requestBody);
        request.setEndpoint(CONTACTS_ENDPOINT);

        HttpResponse response = new HttpResponse();
        
        try{

            response = http.send(request);

            if(response.getStatusCode()== 201){
                String responseBody = response.getBody();
                System.debug(system.LoggingLevel.DEBUG, +responseBody);
            }else{
                errorMessage = 'Unexpected Error while communicating with API. '
                    +'Status '+response.getStatus()+' and Status Code '+response.getStatuscode();
                System.debug(System.LoggingLevel.DEBUG, 'Exeception Executed '+response.getBody());
            }

        }catch(exception e){
            if(String.valueOf(e.getMessage()).startsWith('Unauthorized endpoint')){
                errorMessage = 'Unauthorize endpoint: An Administer must go to Setup -> Administer -> Security Control ->'
                    +' Remote Site Setting and add '+' '+ CONTACTS_ENDPOINT +' Endpoint';
            }else {
                errorMessage = 'Unexpected Error while communicating with API. '
                +'Status '+response.getStatus()+' and Status Code '+response.getStatuscode();
            }
            System.debug(system.LoggingLevel.DEBUG, +errorMessage);
        }

    }
}


//FreshdeskUtil.createContact('kaustubh','kaustubhjaiswal221@gmail.com','789894162','7898994162');
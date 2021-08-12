trigger AccountAfterTrigger on Account (after insert , after update) {
    for(Account acc : trigger.new){
        if(TriggerHandler.triggerHandler){
          //  OpenCageGeocoderUtil.reverseGeoCoding(acc.Id);
        }
    }
}
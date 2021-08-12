trigger Duplicate on Lead (before insert,before update) {

    for (Lead lead : Trigger.new)
    {
        System.debug('ID:::' +lead.Id);
        System.debug('Email:::' +lead.Email);
    }
}
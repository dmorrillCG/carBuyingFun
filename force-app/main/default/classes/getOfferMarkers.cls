public with sharing class getOfferMarkers {
    
    
    @AuraEnabled(cacheable=true)
    public static List<Dealer_Offer__c> getDealerOffers() {
        
        List < Dealer_Offer__c> theList = [SELECT Id, Name, 
                                           Sport_Price__c,
                                           OTD_Sport_Price__c,
                                           EX_Price__c,
                                           OTD_EX_Price__c,
                                           Dealer__r.Street__c, 
                                           Dealer__r.City__c, 
                                           Dealer__r.State__c, 
                                           Dealer__r.Name
                                           FROM Dealer_Offer__c
                                           WHERE Dealer__r.Street__c != null
                                          AND (
                                          OTD_Sport_Price__c != null
                                              OR OTD_EX_Price__c != null
                                          )
                                          ORDER BY OTD_EX_Price__c ASC
                                          NULLS LAST];
        
        return theList; 
    }
    
    
    
}
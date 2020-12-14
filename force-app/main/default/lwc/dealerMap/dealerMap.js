import { LightningElement, wire } from 'lwc';
import getDealerOffers from '@salesforce/apex/getOfferMarkers.getDealerOffers';



export default class HelloApexAccounts extends LightningElement {

    error=[];
    mapMarkers=[];

    @wire(getDealerOffers, {})
    wiredDealerOffers({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            let tempMarkers = [];

            for (var i = 0; i < data.length; i++) {
                let dealerOffer = data[i];


                let theDescription = '';

                if (typeof dealerOffer.OTD_Sport_Price__c  !== 'undefined' && typeof dealerOffer.OTD_EX_Price__c  !== 'undefined'){
                    theDescription = 'Sport Price: $' + dealerOffer.OTD_Sport_Price__c.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' | ' + 'EX Price: $' + dealerOffer.OTD_EX_Price__c.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }else if (typeof dealerOffer.OTD_Sport_Price__c  !== 'undefined'){
                    theDescription = 'Sport Price: $' + dealerOffer.OTD_Sport_Price__c.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');;
                }else if (typeof dealerOffer.OTD_EX_Price__c  !== 'undefined'){
                    theDescription = 'EX Price: $' + dealerOffer.OTD_EX_Price__c.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }



                let marker = {
                        location: {
                            Street: dealerOffer.Dealer__r.Street__c,
                            City: dealerOffer.Dealer__r.City__c,
                            State: dealerOffer.Dealer__r.State__c,
                        },

                        title: dealerOffer.Dealer__r.Name,
                        description: theDescription,
                        icon: 'utility:travel_and_places'
                    };

                tempMarkers.push(marker);
            }

            this.mapMarkers = tempMarkers;
        }
    }
}
# IABVerifier - Node.js verification library for Google Play products

## Installation

Grab from npm
`npm install iab_verifier`

iab_verifier requires the 'crypto' module. The system should automatically grab this dependency for you. 

## Overview

iab_verifier takes 2 pieces of information from your Google IAB purchase flow and allows you to verify their authenticity on a remote server. These 2 pieces of info are the signed data blob and the signature both provided in a callback from the IABHelper service( usually in PurchaseCompleteAwaitingVerification).

### Usage
  
When instantiating the verifier you need to provide the Google Play public key give to you through the <a href='https://play.google.com/apps/publish'>developer portal</a> under (App name) -> Services & APISs -> LICENSING & IN-APP BILLING

#### To verify a receipt:

Javascript:
    
    var IABVerifier = require('iab_verifier'),

    var googleplay_public_key = "-- YOUR PUBLIC KEY --";
    var googleplayVerifier = new IABVerifier(googleplay_public_key);

    var receiptData = receiptDataFromClient;
    var receiptSignature = signatureDataFromClient;

    var isValid = googleplayVerifier.verifyReceipt(receiptData,receiptSignature);

    if (isValid) {
        // Receipt is valid. Grab a beer celebrate!
    } else {
        // Receipt is NOT valid... 
    }        
       
### License

See LICENSE file.

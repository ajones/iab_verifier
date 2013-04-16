(function() {
  var   IABVerifier, 
        crypto = require('crypto'),
        algorithm = 'RSA-SHA1';
  

  IABVerifier = (function() {
    function IABVerifier(publicKeyString) {
      this.publicKeyString = generateFormattedPublickey(publicKeyString)
    };

    // gotta give credit to nothing2lose for this function
    function generateFormattedPublickey(publicKeyStr) {
        var KEY_PREFIX, KEY_SUFFIX, chunkSize, chunks, str;
        KEY_PREFIX = "-----BEGIN PUBLIC KEY-----\n";
        KEY_SUFFIX = '\n-----END PUBLIC KEY-----';
        str = publicKeyStr;
        chunks = [];
        chunkSize = 64;
        while (str) {
            if (str.length < chunkSize) {
                chunks.push(str);
                break;
            } else {
                chunks.push(str.substr(0, chunkSize));
                str = str.substr(chunkSize);
            }
        }
        str = chunks.join("\n");
        str = KEY_PREFIX + str + KEY_SUFFIX;
        return str;
    };

    IABVerifier.prototype.verifyReceipt = function(signedData, signature) {
        var verifier;
        verifier = crypto.createVerify(algorithm);
        verifier.update(signedData);
        return verifier.verify(this.publicKeyString, signature, 'base64');
    };

    return IABVerifier;

  })();

  module.exports = IABVerifier;

}).call(this);

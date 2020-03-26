export function encryption(plainText, type = "enc") {
 
  var CryptoJS = require("crypto-js");
  var key = CryptoJS.enc.Utf8.parse('sblw-3hn8-sqoy19');
    var iv = CryptoJS.enc.Utf8.parse('sblw-3hn8-sqoy19');
  if (type === "enc") {
    var ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var New_ciphertext=ciphertext.toString();
    return New_ciphertext;
  } else {
    
    var Decrpttext = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(plainText), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
   
    return Decrpttext;
  }
}

 

export function encryption(plainText, type = "enc") {
  var CryptoJS = require("crypto-js");
  var key = CryptoJS.enc.Utf8.parse('sblw-3hn8-sqoy19');
    var iv = CryptoJS.enc.Utf8.parse('sblw-3hn8-sqoy19');
  if (type === "enc") {
    // var ciphertext = CryptoJS.TripleDES.encrypt(plainText.toString(), "sblw-3hn8-sqoy19");
    // return ciphertext.toString();
    // var key = "sblw-3hn8-sqoy19";

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
    // if (plainText != null) {
    //   var bytes = CryptoJS.TripleDES.decrypt(
    //     plainText.toString(),
    //     "sblw-3hn8-sqoy19"
    //   );
    //   var decrypt = bytes.toString(CryptoJS.enc.Utf8);
    //   return decrypt;
    // } else {
    //   window.location.href = "./SignIn";
    // }

    var ciphertext = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(plainText), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return ciphertext;
  }
}

export function convertToPlain(rtf) {
  debugger;
  if (rtf !== "" && rtf !== null && rtf !== undefined) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    return rtf
      .replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
      .trim();
  }
}

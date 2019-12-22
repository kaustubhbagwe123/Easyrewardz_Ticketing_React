export function encryption(plainText, type = "enc") {
  var CryptoJS = require("crypto-js");
  if (type === "enc") {
    var ciphertext = CryptoJS.TripleDES.encrypt(plainText.toString(), "sblw-3hn8-sqoy19");
    return ciphertext.toString();
  } else {
    if (plainText != null) {
      var bytes = CryptoJS.TripleDES.decrypt(plainText.toString(), "sblw-3hn8-sqoy19");
      var decrypt = bytes.toString(CryptoJS.enc.Utf8);
      return decrypt;
    } else {
      window.location.href = "./SignIn";
    }
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

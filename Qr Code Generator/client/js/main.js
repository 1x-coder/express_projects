import apiCall from "./apiCall.js";

const currentUrl = window.location.href;
const qrcodeInputId = "#qrdata";
const qrcodeOutputId = "#qrcode";
const qrValueId = "#qrvalue";
const apiUrl = currentUrl + "qr";
const appTitleId = "app-title";
const outputContainerId = "output-container";
const clearBtnId = "clear";
const submitBtnId = "submit";
let data = String;

const setHrefById = (id, href) => {
  if (!id.startsWith("#")) {
    id = "#" + id;
  }
  $(id).attr("href", href);
};
const setCssById = (id, css) => {
  if (!id.startsWith("#")) {
    id = "#" + id;
  }
  $(id).css(css);
};
const setClickEventById = (id, action) => {
  if (!id.startsWith("#")) {
    id = "#" + id;
  }
  $(id).click(() => {
    action();
  });
};

const init = () => {
  setHrefById(appTitleId, currentUrl);
  setCssById(outputContainerId, { "background-color": "#666" });
  setClickEventById(clearBtnId, clear);
  setClickEventById(submitBtnId, submit);

  $("img").mousedown((e) => {
    e.preventDefault();
  });
  $("body").on("contextmenu", (e) => {
    return false;
  });
};

const setError = (errorMsg) => {
  $(qrcodeInputId).css("border", "4px solid red");
  setCssById(qrValueId, { color: "#D82801", "font-size": "25px" });
  $(qrcodeOutputId).attr("src", "").hide();
  $(qrValueId).text(errorMsg).show();
};

const clear = () => {
  $(qrcodeInputId).each((i, e) => {
    e.value = "";
  });
  $(qrcodeOutputId).attr("src", "").hide();
  $(qrcodeInputId).css("border", "3px solid black");
  $(qrValueId).text("").hide();
};

const setQR = (qrCode, qrValue) => {
  $(qrcodeInputId).css("border", "3px solid black");
  $(qrcodeOutputId).attr("src", qrCode).show();
  setCssById(qrValueId, { color: "white", "font-size": "20px" });
  $(qrValueId)
    .text("QR code value: " + qrValue)
    .show();
};

const submit = () => {
  let inputData = $(qrcodeInputId);
  for (let index = 0; index < inputData.length; index++) {
    let e = inputData[index];
    if (e.value !== null && e.value !== undefined) {
      data = e.value.toString();
    }
  }
  if (data == "" || data == undefined || data == null) {
    setError("Client error: You need to enter something to create a QR code.");
    return;
  }
  if (data != null && data != undefined && data != "") {
    apiCall(apiUrl, data, (apiData) => {
      if (apiData.status != 200) {
        setError(apiData.statusText + ": " + apiData.responseJSON.message);
        return;
      } else {
        const qrCode = apiData.responseJSON.code;
        const qrValue = apiData.responseJSON.value;
        console.log("Api Data: ", apiData);
        setQR(qrCode, qrValue);
      }
    });
  }
};
window.addEventListener("load", (event) => {
  init();
});

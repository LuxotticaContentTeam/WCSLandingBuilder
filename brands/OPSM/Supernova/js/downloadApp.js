const downloadAppManager = {
  init: function () {
    var userAgent = navigator.userAgent.toLowerCase();
    var isAndroid = userAgent.indexOf("android") > -1;
    var isiOS = /(iphone|ipad|ipod|ios)/i.test(userAgent);

    var downloadCTA = document.getElementById("downloadCTA");
    if (isAndroid) {
      downloadCTA.href =
        "https://play.google.com/store/apps/details?id=com.facebook.stella&hl=en_US";
    } else if (isiOS) {
      downloadCTA.href =
        "https://apps.apple.com/it/app/meta-view-for-smart-glasses/id1558240027";
    }
  },
};

export default downloadAppManager;

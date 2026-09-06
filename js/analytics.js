(function () {
  const host = window.location.hostname;
  const isLiveSite = host === "witold1.github.io";
  let forceAnalytics = false;
  try {
    forceAnalytics =
      new URLSearchParams(window.location.search).get("dev_analytics") === "true";
  } catch (e) {}

  // Live site, or forced with ?dev_analytics=true
  if (isLiveSite || forceAnalytics) {
    // GoatCounter
    const gc = document.createElement("script");
    gc.async = true;
    gc.src = "//gc.zgo.at/count.js";
    gc.setAttribute("data-goatcounter", "https://witold1.goatcounter.com/count");
    document.head.appendChild(gc);

    // Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "ye78zzt6nm");

    // Google Analytics 4
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-2FXQDXBK8B");
    const ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-2FXQDXBK8B";
    document.head.appendChild(ga);
  }
})();

export const parse = $ => {
  const AMZN = "https://www.amazon.com";
  const widgetContainer = $("#newerVersion_feature_div");
  const newVersionLink = $("#newer-version a");
  const newVersion = $("#newer-version img");

  if (newVersion && newVersionLink.attr("href")) {
    return {
      asin: newVersionLink.attr("href").split("/")[3],
      link: `${AMZN}${newVersionLink.attr("href")}`,
      text: newVersion.attr("alt")
    };
  } else {
    return {
      asin: null,
      link: null,
      text: null
    };
  }
};

export const expectation = {
  "replacements.html": {
    asin: "B001T25YWW",
    link:
      "https://www.amazon.com/GE-Lighting-72269-GE132-MV-N-Fluorescent/dp/B001T25YWW/ref=dp_ob_image_hi",
    text:
      "GE Lighting 72269 GE132-MV-N 120/277-Volt Multi-Volt ProLine Electronic Fluorescent T8 Instant Start Ballast 1 F32T8 Lamp"
  }
};

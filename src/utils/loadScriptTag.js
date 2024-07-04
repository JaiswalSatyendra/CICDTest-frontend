const scriptTag = {
  add: function (url, callback) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    if (callback) {
      script.onload = callback;
    }
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  remove: function (url) {
    const script = document.querySelector(`script[src="${url}"]`);
    if (script) {
      script.parentNode.removeChild(script);
    }
  },
};

export default scriptTag;

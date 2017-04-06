chrome.webRequest.onHeadersReceived.addListener(function(details){
  details.responseHeaders.map(function (header) {
    if (header.name.toLowerCase() === 'content-security-policy') {
      header.value = header.value.replace(/(connect-src 'self')/, [
        '$1',
        'ns.wilddog.com',
        '*.wilddogio.com',
        'wss://*.wilddogio.com '
      ].join(' '))
      console.log(header)
      return true
    }
  })
  return { responseHeaders: details.responseHeaders };
}, {urls: ["<all_urls>"]}, ['blocking', 'responseHeaders']);
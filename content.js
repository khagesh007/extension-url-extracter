let urls = [];

document.querySelectorAll('a').forEach(link => {
    urls.push(link.href);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getUrls') {
        sendResponse({ urls: urls });
    }
});

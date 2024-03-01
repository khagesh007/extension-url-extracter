chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'newUrl' && request.url) {
        // Add the new URL to the list of URLs
        urls.push(request.url);
    }
});

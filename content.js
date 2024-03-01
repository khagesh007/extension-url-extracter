let urls = [];

document.querySelectorAll('a').forEach(link => {
    urls.push(link.href);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getUrls') {
        sendResponse({ urls: urls });
    }
});
// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            // Check if the added node is an anchor tag with a URL
            if (node.tagName === 'A' && node.href) {
                // Send message to background script with the new URL
                chrome.runtime.sendMessage({ action: 'newUrl', url: node.href });
            }
        });
    });
});

// Start observing changes in the entire document
observer.observe(document.body, { childList: true, subtree: true });


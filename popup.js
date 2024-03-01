chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getUrls' }, function (response) {
        if (response && response.urls) {
            const urlList = document.getElementById('urlList');
            response.urls.forEach(url => {
                const li = document.createElement('li');
                li.textContent = url;
                urlList.appendChild(li);
            });

            // Create a temporary textarea to copy the URLs to the clipboard
            const textarea = document.createElement('textarea');
            textarea.style.position = 'fixed';
            textarea.style.opacity = 0;
            document.body.appendChild(textarea);
            
            // Copy URLs to the clipboard when the extension icon is clicked
            document.getElementById('copyBtn').addEventListener('click', function () {
                textarea.value = response.urls.join('\n');
                textarea.select();
                document.execCommand('copy');
                alert('URLs copied to clipboard!');
            });
        }
    });
});

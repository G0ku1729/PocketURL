document.getElementById('shortenBtn').addEventListener('click', async () => {
    const originalUrl = document.getElementById('originalUrl').value;
    if (!originalUrl || !isValidUrl(originalUrl)) {
        alert('Please enter a valid URL');
        return;
    }
    try {
        const response = await fetch('/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl })
        });
        const data = await response.json();
        const shortUrl = `${window.location.href}${data.shortUrl}`;
        document.getElementById('shortUrl').innerHTML = `Your Pocket URL:<br>${shortUrl}`;
        document.getElementById('copyBtn').style.display = 'inline-block';
        document.getElementById('resetBtn').style.display = 'inline-block';
        document.getElementById('copyBtn').onclick = () => copyToClipboard(shortUrl);
    } catch (err) {
        console.error('Error shortening the URL: ', err);
        alert('Error shortening the URL, PLEASE TRY AGAIN');
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('originalUrl').value = '';
    document.getElementById('shortUrl').textContent = '';
    document.getElementById('copyBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
});

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const copyText = document.getElementById('copyText');
    copyText.textContent = 'Copied!';
    
    setTimeout(() => {
        copyText.textContent = 'Copy';
    }, 3000);
}

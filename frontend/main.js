document.getElementById('fetchButton').addEventListener('click', async () => {
    console.log('Fetch button clicked');
    try {
        const response = await fetch('/api/fetch-notion-data');
        console.log('Response received');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched:', data);
        document.getElementById('dataDisplay').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('dataDisplay').innerText = 'Error fetching data: ' + error.message;
    }
});
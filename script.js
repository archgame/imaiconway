document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('drops.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            const links = [];

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                const link = {};

                for (let j = 0; j < headers.length; j++) {
                    link[headers[j].trim()] = values[j].trim();
                }

                links.push(link);
            }

            // Generate HTML for links
            const linksContainer = document.getElementById('links-container');
            links.forEach(link => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.textContent = link['Display Text'];
                anchor.href = link['Link'];
                listItem.appendChild(anchor);
                linksContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching links:', error);
        });
});
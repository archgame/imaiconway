document.addEventListener('DOMContentLoaded', function () {
    // Fetch the CSV file
    fetch('drops.csv')
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n').slice(1); // Skip the header row
            const linksByYear = {};

            rows.forEach(row => {
                const [year, displayText, link] = row.split(',');

                if (!linksByYear[year]) {
                    linksByYear[year] = [];
                }

                linksByYear[year].push({ displayText: displayText.trim(), link: link.trim() });
            });

            // Generate HTML for links
            const linksContainer = document.getElementById('links-container');

            // Sort the years in descending order
            const sortedYears = Object.keys(linksByYear).sort((a, b) => b - a);

            sortedYears.forEach(year => {
                const yearParagraph = document.createElement('p');
                yearParagraph.textContent = year;
                linksContainer.appendChild(yearParagraph);

                linksByYear[year].forEach(linkData => {
                    const listItem = document.createElement('li');
                    const anchor = document.createElement('a');
                    anchor.textContent = linkData.displayText;
                    anchor.href = linkData.link;
                    listItem.appendChild(anchor);
                    linksContainer.appendChild(listItem);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching links:', error);
        });
});
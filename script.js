document.addEventListener('DOMContentLoaded', function () {
    function fetchAndDisplayLinks(csvFile, containerId) {
        fetch(csvFile)
            .then(response => response.text())
            .then(data => {
                // Parse CSV data
                const rows = data.split('\n').slice(1); // Skip the header row
                const linksByYear = {};
                const displayTextCount = {}; // To track duplicate display texts

                rows.forEach(row => {
                    const [year, displayText, link] = row.split(',');

                    if (!linksByYear[year]) {
                        linksByYear[year] = [];
                    }

                    const trimmedDisplayText = displayText.trim();
                    const trimmedLink = link.trim();

                    // Handle duplicate display texts
                    if (displayTextCount[trimmedDisplayText]) {
                        displayTextCount[trimmedDisplayText]++;
                        linksByYear[year].push({
                            displayText: `${trimmedDisplayText} (${displayTextCount[trimmedDisplayText]})`,
                            link: trimmedLink
                        });
                    } else {
                        displayTextCount[trimmedDisplayText] = 1;
                        linksByYear[year].push({
                            displayText: trimmedDisplayText,
                            link: trimmedLink
                        });
                    }
                });

                // Generate HTML for links
                const linksContainer = document.getElementById(containerId);

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
    }

    // Fetch and display links from drips.csv and drops.csv
    fetchAndDisplayLinks('drips.csv', 'drips-container');
    fetchAndDisplayLinks('drops.csv', 'drops-container');

    // contact
    var a = "studio";
    var b = "imaiconway";
    var c = "com";
    var d = a + "@" + b + "." + c;
    var e = document.getElementById("email-link");
    e.innerHTML = '<a href="mailto:' + d + '">' + d + '</a>';
});
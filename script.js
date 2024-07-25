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
                    // Split the row into columns and trim each value
                    const columns = row.split(',').map(col => col.trim());

                    // Check if the row has exactly 3 columns
                    if (columns.length === 3) {
                        const [year, displayText, link] = columns;

                        if (!linksByYear[year]) {
                            linksByYear[year] = [];
                        }

                        // Handle duplicate display texts
                        if (displayTextCount[displayText]) {
                            displayTextCount[displayText]++;
                            linksByYear[year].push({
                                displayText: `${displayText} (${displayTextCount[displayText]})`,
                                link: link
                            });
                        } else {
                            displayTextCount[displayText] = 1;
                            linksByYear[year].push({
                                displayText: displayText,
                                link: link
                            });
                        }
                    } else {
                        console.warn('Skipping malformed row:', row);
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

                    const ul = document.createElement('ul'); // Create an unordered list for each year

                    linksByYear[year].forEach(linkData => {
                        const listItem = document.createElement('li');
                        const anchor = document.createElement('a');
                        anchor.textContent = linkData.displayText;
                        anchor.href = linkData.link;
                        anchor.target = "_blank"; // Open link in a new tab
                        listItem.appendChild(anchor);
                        ul.appendChild(listItem); // Append list item to the unordered list
                    });

                    linksContainer.appendChild(ul); // Append the unordered list to the container
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
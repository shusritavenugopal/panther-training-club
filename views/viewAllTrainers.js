document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay('https://panther-training-club.glitch.me/api/admin/trainers');
});

function fetchDataAndDisplay(endpoint) {
    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` 
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display JSON in HTML
        displayJson(data);
        displayData(data, 'trainers-table');
    })
    .catch(error => console.error('Error:', error));
}

function displayJson(data) {
    // Get the container element where you want to display the JSON
    const container = document.getElementById('jsonContainer');
    // Stringify the data and set it as the innerHTML of the container
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function displayData(data, tableId) {
    const table = document.getElementById(tableId);
    let tableHtml = '<tr><th></th>'; 

    let headers = [];
    if (tableId === 'trainers-table') {
        headers = ['Name', 'Email', 'Phone Number'];
    }

    headers.forEach(header => {
        tableHtml += `<th>${header}</th>`;
    });
    tableHtml += '</tr>';

    // Generate the data rows with checkboxes
    data.forEach((item, index) => {
        tableHtml += `<tr>`;
        
      // tableHtml += `<td><input type="checkbox" class="row-checkbox" name="${tableId}Checkbox" value="${item._id}" data-user-type="${tableId}" onchange="handleCheckboxChange(event)"></td>`;
      if (tableId === 'trainers-table') {
            tableHtml += `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phoneNo}</td>
            `;
        }
        tableHtml += `</tr>`;
    });

    table.innerHTML = tableHtml;
}
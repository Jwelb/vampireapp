google.charts.load('current', { 'packages': ['corechart', 'table'] });
google.charts.setOnLoadCallback(drawChart);

var classmateData = [];
var chart;
var data;
var options;

function drawChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Number');
    data.addRows([
        ['Human', 1],
        ['Vampire', 0]
    ]);

    options = {
        'title': 'Vampire Status',
        'width': 400,
        'height': 300
    };

    chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function updateChart() {
    var vampire = determineVampire();
    var human = 1 - vampire;

    data.removeRows(0, data.getNumberOfRows());
    data.addRows([
        ['Human', human],
        ['Vampire', vampire]
    ]);

    chart.draw(data, options);
    displayChosenOption();
}

function calculateScore() {
    var score = 0;

    var shadow = document.querySelector('input[name="shadow"]:checked')?.value;
    var pale = document.querySelector('input[name="pale"]:checked')?.value;
    var garlic = document.querySelector('input[name="garlic"]:checked')?.value;

    if (shadow === 'no') score += 4;
    if (pale === 'yes') score += 3;
    if (garlic === 'yes') score += 3;

    return score;
}

function determineVampire() {
    var method = document.getElementById("method").value;
    if (method === "random") {
        return Math.random() < 0.5 ? 1 : 0;
    } else if (method === "threshold") {
        return calculateScore() > 6 ? 1 : 0;
    } else if (method === "decision_tree") {
        // Implement decision tree logic here
        return Math.random() < 0.5 ? 1 : 0; // Placeholder
    } else if (method === "neural_network") {
        // Implement neural network logic here
        return Math.random() < 0.5 ? 1 : 0; // Placeholder
    }
}

function displayChosenOption() {
    var method = document.getElementById("method").value;
    alert("Chosen method: " + method);
}

function deselectAll() {
    var radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
        radio.checked = false;
    });
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
    document.getElementById('method').selectedIndex = -1;
}

function drawTable(){
    const tableData = new google.visualization.DataTable();
    tableData.addColumn('string', 'Name');
    tableData.addColumn('number', 'Age');

    classmateData.forEach(row => {
        tableData.addRow([row.name, row.age]);
    });
    
    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(tableData, {showRowNumber: true, width: '100%', height: '100%'});
}

function addRow(){
    const name = document.getElementById('rowName').value;
    const age = parseInt(document.getElementById('rowAge').value);   

    if (name && !isNaN(age)){
        classmateData.push({name, age});
        drawTable();
        document.getElementById('addRowForm').reset();
    } else{
        alert("Please enter a valid name and age.")
    }
}
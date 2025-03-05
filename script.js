google.charts.load('current', { 'packages': ['corechart', 'table'] });
google.charts.setOnLoadCallback(drawChart);

var classmateData = [
    { 'name': 'John', 'shadow': 'no', 'garlic': 'no', 'complexion': 'pale' },
    { 'name': 'Lee', 'shadow': 'yes', 'garlic': 'no', 'complexion': 'pale' },
    { 'name': 'Emma', 'shadow': 'no', 'garlic': 'yes', 'complexion': 'brown' },
    { 'name': 'Ava', 'shadow': 'yes', 'garlic': 'yes', 'complexion': 'olive' },
    { 'name': 'Alex', 'shadow': 'no', 'garlic': 'no', 'complexion': 'brown' }
];

var chart;
var data;
var options;

function drawChart() {
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Number');
    updateChart();

    options = {
        'title': 'How many vampires are in the class?',
        'width': 400,
        'height': 300
    };

    chart = new google.visualization.PieChart(document.getElementById('chart_div'));
}

function updateChart() {
    var numVampires = 0;
    var numHumans = 0;

    classmateData.forEach(student => {
        if (student.vampire) {
            numVampires++;
        } else {
            numHumans++;
        }
    });

    data.removeRows(0, data.getNumberOfRows());
    data.addRows([
        ['Human', numHumans],
        ['Vampire', numVampires]
    ]);

    if (chart) {
        chart.draw(data, options);
    }
}

function calculateScore(student) {
    var score = 0;

    if (student.shadow === 'no') score += 4;
    if (student.complexion === 'pale' || 'Pale') score += 3;
    if (student.garlic === 'no') score += 3;

    return score;
}

function determineVampire(student) {
    var method = document.getElementById("method").value;
    if (method === "random") {
        return Math.random() < 0.5;
    } else if (method === "threshold") {
        return calculateScore(student) > 6;
    }
}

function deselectAll() {
    var radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function (radio) {
        radio.checked = false;
    });
    document.getElementById('method').selectedIndex = -1;
}

function drawTable() {
    const tableData = new google.visualization.DataTable();
    tableData.addColumn('string', 'Name');
    tableData.addColumn('string', 'Shadow');
    tableData.addColumn('string', 'Garlic');
    tableData.addColumn('string', 'Complexion');
    tableData.addColumn('string', 'Vampire?');

    classmateData.forEach(row => {
        tableData.addRow([row.name, row.shadow, row.garlic, row.complexion, row.vampire ? 'Yes' : 'No']);
    });

    const table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(tableData, { showRowNumber: true, width: '100%', height: '100%' });
}

function addRow() {
    const name = document.getElementById('rowName').value;
    const shadow = document.getElementById('rowShadow').value;
    const garlic = document.getElementById('rowGarlic').value;
    const complexion = document.getElementById('rowComplexion').value;

    if (name && shadow && garlic && complexion) {
        const newStudent = { name, shadow, garlic, complexion };
        newStudent.vampire = determineVampire(newStudent);
        classmateData.push(newStudent);
        drawTable();
        updateChart();
        document.getElementById('addRowForm').reset();
    } else {
        alert("Please enter valid information for all fields.");
    }
}

function toggleForm() {
    var method = document.getElementById("method").value;
    var formElements = document.getElementById("formElements");

    if (method === "random") {
        formElements.style.display = "none";
    } else if (method === "threshold") {
        formElements.style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    classmateData.forEach(student => {
        student.vampire = determineVampire(student);
    });
});
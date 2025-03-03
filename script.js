google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

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
}

function calculateScore() {
    var score = 0;

    var shadow = document.querySelector('input[name="shadow"]:checked')?.value;    
    var pale = document.querySelector('input[name="pale"]:checked')?.value;
    var garlic = document.querySelector('input[name="garlic"]:checked')?.value;

    if(shadow === 'no') score += 4;
    if(pale === 'yes') score += 3;
    if(garlic === 'yes') score += 3;

    return score;
}

function determineVampire() {
    var useRandomGuess = document.getElementById("randomGuess").checked;
    if (useRandomGuess) {
        return Math.random() < 0.5 ? 1 : 0;
    } else {
        return calculateScore() >= 6 ? 1 : 0;
    }
}

// create references and initial variables
var containerEle = $('.container')
var dateData = {}
var tableTimes = ['nine', 'ten', 'eleven', 'twelve', 'one', 'two', 'three', 'four', 'five']

// function to create rows for container
function createTable() {
    tableTimes.forEach(function(time) {
        // create row with classes
        var tableRow = $('<div>')
        tableRow.attr('class', 'row')

        // create time column in row
        var timeCol = $('<div>')
        timeCol.attr('class', 'col-md-2 hour')
        var timeEle = $('<h2>')
        timeEle.text(time)
        // append time display to time column and time col to row
        timeCol.append(timeEle)
        tableRow.append(timeCol)

        // create textarea column
        var textCol = $('<div>')
        textCol.attr('class', 'col-md-8')
        var textareaEle = $('<textarea>')
        // append textarea to col and col to row
        textCol.append(textareaEle)
        tableRow.append(textCol)

        // create save button column
        var saveCol = $('<div>')
        saveCol.attr('class', 'col-md-2 saveBtn')
        tableRow.append(saveCol)

        // append whole row to container
        containerEle.append(tableRow)
        
    })

}

function loadData() {

}

function storeData(time) {
    var currentDate = $('#currentDay').text()
    var times = localStorage.getItem(currentDate)
    times = JSON.parse(times)
    times[time] = ''

}

$('.saveBtn').on('click', storeData)

createTable();
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
        textareaEle.attr('class', `${time}-text`)
        // append textarea to col and col to row
        textCol.append(textareaEle)
        tableRow.append(textCol)

        // create save button column
        var saveCol = $('<div>')
        saveCol.attr('class', `col-md-2 saveBtn`)
        saveCol.attr('data-time', time)
        tableRow.append(saveCol)

        // append whole row to container
        containerEle.append(tableRow)
        
    })

}

// function to load data from local storage to table for display
function loadData() {
    // pull data for the current date from local storage
    var currentDate = $('#currentDay').text()
    var timesInStorage = localStorage.getItem(currentDate)
    // parse the object of time data from local storage
    var timeData = JSON.parse(timesInStorage)

    // for each time the user has save data for, display in each relative textarea
    for (var time in timeData) {
        $(`.${time}-text`).val(timeData[time])
    }
}

// function to store data when user saves text
function storeData() {
    // retrive current date from page
    var currentDate = $('#currentDay').text()
    // pull data for current date from local storage and parse the object
    var timesInStorage = localStorage.getItem(currentDate)
    times = JSON.parse(timesInStorage)

    var timeToStore = $(this).attr('data-time')
    var textareaText = $(`.${timeToStore}-text`).val()
    times[timeToStore] = textareaText
    timeForStorage = JSON.stringify(times)
    localStorage.setItem(currentDate, timeForStorage)
}

createTable();
loadData();

// save text in textarea to local storage when user clicks save
$('.saveBtn').on('click', storeData)


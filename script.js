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

}

// function to store data when user saves text
function storeData() {
    var currentDate = $('#currentDay').text()
    var timesInStorage = localStorage.getItem(currentDate)
    var timeToStore = $(this).attr('data-time')
    times = JSON.parse(timesInStorage)
    var textareaText = $(`.${timeToStore}-text`).val()
    times[timeToStore] = textareaText
    timeForStorage = JSON.stringify(times)
    localStorage.setItem(currentDate, timeForStorage)
}

createTable();

// save text in textarea to local storage when user clicks save
$('.saveBtn').on('click', storeData)


// create references and initial variables
var containerEle = $('.container')
var dateData = {}
var tableTimes = ['nine', 'ten', 'eleven', 'twelve', 'one', 'two', 'three', 'four', 'five']
var tableTimesNumbers = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM']
var dateOffsetCounter = 0;

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
        timeEle.text(tableTimesNumbers[tableTimes.indexOf(time)])
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
    // retrive the current date from the page
    var currentDate = $('#currentDay').text()
    // if the current date isn't stored in local storage, store an empty object in for the date
    if (!localStorage.getItem(currentDate)) {
        var emptyObj = {'nine': '', 'ten': '', 'eleven': '', 'twelve': '', 'one': '', 'two': '', 'three': '', 'four': '', 'five': ''}
        var objToStore = JSON.stringify(emptyObj)
        localStorage.setItem(currentDate, objToStore)
    }

    // pull data for the current date from local storage
    var timesInStorage = localStorage.getItem(currentDate)
    // parse the object of time data from local storage
    var timeData = JSON.parse(timesInStorage)

    // for each time the user has save data for, display in each relative textarea
    for (var time in timeData) {
        // locate the appropriate textarea and change value to text from local storage
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

// function sets the current date at the top of the page
function setDate() {
    var dateEle = $('#currentDay')
    var currentDay = moment().format('MMM Do YYYY')
    dateEle.text(currentDay)
}

setDate();
createTable();
loadData();

// save text in textarea to local storage when user clicks save
$('.saveBtn').on('click', storeData)

$('.yesterday').on('click', function() {
    // indicate that we want to move back in time by one day
    dateOffsetCounter -= 1

    // grab reference point to element for displaying date
    var dateDisplay = $('#currentDay')
    // retrieve current date and go back x many days
    var newDate = moment().add(dateOffsetCounter, 'days').format('MMM Do YYYY')
    dateDisplay.text(newDate)
    loadData();
})

$('.tomorrow').on('click', function() {
    // update counter to move forward one day
    dateOffsetCounter += 1

    // grab reference point to element for displaying date
    var dateDisplay = $('#currentDay')
    // retrive current date and go back x many days
    var newDate = moment().add(dateOffsetCounter, 'days').format('MMM Do YYYY')
    dateDisplay.text(newDate)
    loadData();
})
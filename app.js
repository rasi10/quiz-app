const http = new EasyHTTP
const ui = new UI
let urlToFetch = ''
let urlToSendAnswer = ''
let playerName = ''
let count = 0
let intervalID
let totalTime = 0;

startUI()

function startUI() {
    // console.log(`AAAAAAAAAAAAAAAAAAAAAAA: ${totalTime}   `)
    ui.drawStart()
    document.querySelector('#button1').addEventListener('click', startQuiz)
}

function startQuiz() {
    playerName = document.querySelector('#name-text').value
    urlToFetch = 'http://vhost3.lnu.se:20080/question/1'
    fetchQuestion(urlToFetch)
}

function tickTimer(){
    ++count
    // console.log(++count)
    document.querySelector('#timer-txt').innerHTML = 20 - count
    if (count >=20){
        stopTimer()
        restartTimer()
        ui.drawLastQuestion2(' The time is up!')
        document.querySelector('#button5').addEventListener('click', showResultsWithoutUpdateTable)
    } 
}

function stopTimer(){
    clearInterval(intervalID)
}

function restartTimer(){
    count = 0
}

function restartTotalTime(){
    totalTime = 0
}

function fetchQuestion(url) {
    //console.log(url)
    intervalID = setInterval(tickTimer, 1000);
    http.get(url)
        .then(data => {
            ui.drawQuestion(data, playerName)
            document.querySelector('#button2').addEventListener('click', submitAnswer)
            // console.log(data)
            urlToFetch = data.nextURL
        })
        .catch(err => console.log(err))
}


function buildAnswerPayload() {
    if (document.querySelector('#answer-text')) {
        answerSubmitted = document.getElementById('answer-text').value
    } else {
        answerSubmitted = document.querySelector('input:checked').getAttribute('value')
    }
    answerData = { answer: answerSubmitted }
    //console.log(answerData)
}

function submitAnswer() {
    totalTime+= count
    stopTimer()
    restartTimer()
    buildAnswerPayload()
    if (document.querySelector('#answer-text')) {
        answerSubmitted = document.getElementById('answer-text').value
    } else {
        answerSubmitted = document.querySelector('input:checked').getAttribute('value')
    }
    answerData = { answer: answerSubmitted }
    //console.log(answerData)

    http.post(urlToFetch, answerData)
        .then(data => {
            if (data.message === 'Correct answer!') {
                //console.log('YEEEEEYYYY')
                //console.log(data)
                if (typeof data.nextURL !== 'undefined') {
                    fetchQuestion(data.nextURL)
                } else {
                    ui.drawLastQuestion()
                    document.querySelector('#button3').addEventListener('click', showResults)
                    console.log('THIS WAS THE LAST QUESTIONNNN')
                }

            } else {
                ui.drawLastQuestion2('Your answer is wrong!')
                //console.log('NOT RIGHT ANSWER!')
                document.querySelector('#button5').addEventListener('click', showResultsWithoutUpdateTable)
                //console.log(data)
            }
        })
        .catch(err => console.log(err))
        
        //console.log(`TIME IN SECS TO ADD: ${countDownSecs}`)
}

function showResults() {
    updateResultsList()
    showRankingList()
    document.querySelector('#button4').addEventListener('click', startUI)
}

function showResultsWithoutUpdateTable() {
    restartTotalTime()
    showRankingList()
    document.querySelector('#button4').addEventListener('click', startUI)
    
}

function updateResultsList() {
    const scores = JSON.parse(window.localStorage.getItem('scores') || '[]')
    scores.push({
        name: playerName,
        time: totalTime
    })
    window.localStorage.setItem('scores', JSON.stringify(scores))
    console.log(`TOTAL TIME: ${totalTime}`)
    restartTotalTime()
}

function showRankingList() {
    var savedScores = window.localStorage.getItem('scores')
    var scoresAsJson = JSON.parse(savedScores)
    if (scoresAsJson !== null) {
        scoresAsJson.sort(function (a, b) {
            return a.time - b.time
        })
        ui.drawResults(scoresAsJson)
    } else {
        ui.drawResultsEmptyTable()

    }
   
}

/* (function debugFunction() {
    console.log({totalTime})
    //console.log({currentTimeout})
    //console.log({countDownSecs})
    setTimeout(debugFunction, 1000)
})()  */
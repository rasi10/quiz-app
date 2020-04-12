const http = new EasyHTTP
const ui = new UI

let urlToFetch = ''
let urlToSendAnswer = ''
let playerName = ''


// Tryng the code here
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
let countDownSecs = 20;
let totalTime = 0;
let currentTimeout;
let timer_is_on = 0;

function timedCount() {
    if ( document.querySelector('#txt') !== null){
        document.querySelector('#txt').innerHTML = countDownSecs;
    }
    countDownSecs--;
    totalTime++;

    if (countDownSecs <= 10) {
        stopCount()
        ui.drawLastQuestion2()
        console.log('THE TIME IS UP!!')
        document.querySelector('#button5').addEventListener('click', showResults2)

        //console.log(data)

    } else {
        currentTimeout = setTimeout(timedCount, 1000);
        console.log(`BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB: ${totalTime}   `)
        console.log(`tick: ${totalTime}`)
    }
}

function startCount() {
    countDownSecs = 20
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(currentTimeout);
    timer_is_on = 0;
}

startUI()

function startUI() {
    console.log(`AAAAAAAAAAAAAAAAAAAAAAA: ${totalTime}   `)
    ui.drawStart()
    document.querySelector('#button1').addEventListener('click', startQuiz)
}

function startQuiz() {
    playerName = document.querySelector('#name-text').value
    urlToFetch = 'http://vhost3.lnu.se:20080/question/1'
    fetchQuestion(urlToFetch)
}

function manageTimer() {
    startCount()
}

function fetchQuestion(url) {
    console.log(url)
    http.get(url)
        .then(data => {
            ui.drawQuestion(data, playerName)
            manageTimer()
            document.querySelector('#button2').addEventListener('click', submitAnswer)
            console.log(data)
            urlToFetch = data.nextURL
        })
        .catch(err => console.log(err))
    stopCount()
}


function buildAnswerPayload() {
    if (document.querySelector('#answer-text')) {
        answerSubmitted = document.getElementById('answer-text').value
    } else {
        answerSubmitted = document.querySelector('input:checked').getAttribute('value')
    }
    answerData = { answer: answerSubmitted }
    console.log(answerData)
}

function submitAnswer() {
    buildAnswerPayload()
    if (document.querySelector('#answer-text')) {
        answerSubmitted = document.getElementById('answer-text').value
    } else {
        answerSubmitted = document.querySelector('input:checked').getAttribute('value')
    }
    answerData = { answer: answerSubmitted }
    console.log(answerData)

    http.post(urlToFetch, answerData)
        .then(data => {
            if (data.message === 'Correct answer!') {
                console.log('YEEEEEYYYY')
                console.log(data)
                if (typeof data.nextURL !== 'undefined') {
                    fetchQuestion(data.nextURL)
                } else {
                    ui.drawLastQuestion()
                    document.querySelector('#button3').addEventListener('click', showResults)
                    stopCount()
                    console.log('THIS WAS THE LAST QUESTIONNNN')
                }

            } else {
                stopCount()
                ui.drawLastQuestion2()
                console.log('NOT RIGHT ANSWER!')
                document.querySelector('#button5').addEventListener('click', showResults2)
                console.log(data)
            }
        })
        .catch(err => console.log(err))
        
        console.log(`TIME IN SECS TO ADD: ${countDownSecs}`)
}

function showResults() {
    updateResultsList()
    showRankingList()
    document.querySelector('#button4').addEventListener('click', startUI)
}

function showResults2() {
    showRankingList()
    document.querySelector('#button4').addEventListener('click', startUI)
}

function updateResultsList() {
    const scores = JSON.parse(window.localStorage.getItem('scores') || '[]')
    scores.push({
        name: playerName,
        time: totalTime - 4
    })
    window.localStorage.setItem('scores', JSON.stringify(scores))

    totalTime = 0
}

function showRankingList() {
    var savedScores = window.localStorage.getItem('scores')
    var scoresAsJson = JSON.parse(savedScores)
    scoresAsJson.sort(function (a, b) {
        return a.time - b.time
    })
    ui.drawResults(scoresAsJson)
}

/* (function debugFunction() {
    console.log({totalTime})
    console.log({currentTimeout})
    setTimeout(debugFunction, 1000)
})() */
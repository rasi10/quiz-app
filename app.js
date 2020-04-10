const http = new EasyHTTP
const ui = new UI

let urlToFetch = ''
let urlToSendAnswer = ''
let playerName = ''


// Tryng the code here
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_cleartimeout2
let countDownSecs = 20;
let t;
let timer_is_on = 0;

function timedCount() {
    document.querySelector('#txt').innerHTML = countDownSecs;
    countDownSecs = countDownSecs - 1;
    if (countDownSecs <= 10) {
        stopCount()
        console.log('TIME IS UP!! YOU WILL NOW GO TO THE SHOW RESULTS PAGE!')
    } else {
        t = setTimeout(timedCount, 1000);
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
    clearTimeout(t);
    timer_is_on = 0;
}



startUI()

function startUI() {
    ui.drawStart()
    document.querySelector('#button1').addEventListener('click', startQuiz)
}

function startQuiz() {
    playerName = document.querySelector('#name-text').value
    urlToFetch = 'http://vhost3.lnu.se:20080/question/1'
    fetchQuestion(urlToFetch)
}

function manageTimer() {
    // Trying this counter
    // https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
    /* let timeleft = 20;

    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            console.log('GAME OVERR!')
            clearInterval(downloadTimer);
        }
        document.getElementById("progressBar").value = 20 - timeleft;
        timeleft -= 1;
    }, 1000);
    c= 0; */
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
                    console.log('THIS WAS THE LAST QUESTIONNNN')
                }

            } else {
                console.log('NOT RIGHT ANSWER, YOU SUCKER!')
                console.log(data)
            }
        })
        .catch(err => console.log(err))
}

function showResults() {
    updateResultsList()
    showRankingList()
    document.querySelector('#button4').addEventListener('click', startUI)
}

function updateResultsList() {
    const scores = JSON.parse(window.localStorage.getItem('scores') || '[]')
    scores.push({
        name: playerName,
        time: 10
    })
    window.localStorage.setItem('scores', JSON.stringify(scores))
}

function showRankingList() {
    var savedScores = window.localStorage.getItem('scores')
    var scoresAsJson = JSON.parse(savedScores)
    scoresAsJson.sort(function (a, b) {
        return a.time - b.time
    })
    ui.drawResults(scoresAsJson)
}

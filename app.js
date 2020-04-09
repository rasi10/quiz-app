const http = new EasyHTTP
const ui = new UI

let urlToFetch = ''
let urlToSendAnswer = ''
let playerName = ''

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

function fetchQuestion(url) {
    console.log(url)
    http.get(url)
        .then(data => {
            ui.drawQuestion(data, playerName)
            document.querySelector('#button2').addEventListener('click', submitAnswer)
            console.log(data)
            urlToFetch = data.nextURL
        })
        .catch(err => console.log(err))
}

function submitAnswer() {
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

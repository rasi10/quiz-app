const http = new EasyHTTP
const ui = new UI
let urlToFetch = ''
let urlToSendAnswer = ''

document.querySelector('#button1').addEventListener('click', startQuiz)
document.querySelector('#button2').addEventListener('click', submitAnswer)

function startQuiz() {
    urlToFetch = 'http://vhost3.lnu.se:20080/question/1'
    fetchQuestion(urlToFetch)
}

function fetchQuestion(url) {
    console.log(url)
    http.get(url)
        .then(data => {
            ui.draw(data)
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
                if ( typeof data.nextURL !== 'undefined') {
                    fetchQuestion(data.nextURL)
                } else {
                    ui.drawLastQuestion()
                    console.log('THIS WAS THE LAST QUESTIONNNN')
                }

            } else {
                console.log('NOT RIGHT ANSWER, YOU SUCKER!')
                console.log(data)
            }

        })
        .catch(err => console.log(err))
}
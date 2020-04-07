const http = new EasyHTTP
const ui = new UI
let urlToFetch = 'http://vhost3.lnu.se:20080/question/21'

document.querySelector('#button1').addEventListener('click', fetchFirstQuestion)
document.querySelector('#button2').addEventListener('click', submitAnswer)


function fetchFirstQuestion() {
    http.get(urlToFetch)
        .then(data => ui.draw(data))
        .catch(err => console.log(err))
}

function fetchNextQuestion(url){
    console.log(url)
    http.get(url)
    .then(data => ui.draw(data))
    .catch(err => console.log(err))
}

function submitAnswer(){
    answerSubmitted = document.querySelector('input:checked').getAttribute('value')
    answerData = { answer: answerSubmitted }
    console.log(answerData)

    http.post('http://vhost3.lnu.se:20080/answer/21',answerData)
        .then(data => {
            if(data.message === 'Correct answer!'){
                console.log('YEEEEEYYYY')
                console.log(data)
                //urlToFetch = data.nextURL
                fetchNextQuestion(data.nextURL)
            } else {
                console.log('NOT RIGHT ANSWER, YOU SUCKER!')
                console.log(data)
            }
            
        })
        .catch(err => console.log(err)) 
}
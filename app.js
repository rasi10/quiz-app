const http = new EasyHTTP
document.querySelector('#button1').addEventListener('click', fetchQuestion)

function fetchQuestion(){ 
//get method to get a question
http.get('http://vhost3.lnu.se:20080/question/1')
    .then(data => {
        console.log(data)
        let output = '';
        output += `<div>${data.question}</div>`
        document.getElementById('output').innerHTML = output
    })
    .catch(err => console.log(err))
}



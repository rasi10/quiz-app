const http = new EasyHTTP
const ui = new UI
let urlToFetch = 'http://vhost3.lnu.se:20080/question/21'

document.querySelector('#button1').addEventListener('click', fetchQuestion2)


function fetchQuestion2(){ 
    //get method to get a question
    http.get(urlToFetch)
        .then(data => {
            console.log(data)
            ui.draw(data)
        })
        .catch(err => console.log(err))
    }
    

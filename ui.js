class UI {
    draw(data) {
        let output = '';
        output += `<div><h5>${data.question}</h5></div>`
        if (data.alternatives === undefined) {
            output += `<input type="text" id="answer-text"></input>`
        } else {
            for (var prop in data.alternatives) {
                output += `<input type="radio" name="answer" value=${prop}>`
                output += `<label for="${data.alternatives[prop]}">${data.alternatives[prop]}</label>`
            }
        }
        document.getElementById('output').innerHTML = output
    }

    drawLastQuestion(){
        let output = '';
        output += `<div><h5>Congratulations! You cleared all the questions...</h5></div>`
        output += `<button id="button2">Show Results</button>`
        document.getElementById('output').innerHTML = output
    }
}

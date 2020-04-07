class UI {
    // Make a http get request
    paint(data) {
        let output = '';
        output += `<div>${data.question}</div>`
        document.getElementById('output').innerHTML = output
       
    }

    
}

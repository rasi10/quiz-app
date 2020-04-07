class UI {
    // Make a http get request
    draw(data) {
        let output = '';
        output += `<div><h5>${data.question}</h5></div>`
        // console.log(data.alternatives)
        
        if (data.alternatives === undefined){
            output += `<input type="text"></input>`
            //console.log('IT HAS NO ALTERNATIVES')
        } else{
            for (var prop in data.alternatives) {
                //output += `<input type="radio" name="answer" value=${data.alternatives[prop]}>`
                output += `<input type="radio" name="answer" value=${prop}>`
                output += `<label for="${data.alternatives[prop]}">${data.alternatives[prop]}</label>`
              }
            //console.log('IT HAS ALTERNATIVES')
        }
        
        document.getElementById('output').innerHTML = output
       
    }

    
}

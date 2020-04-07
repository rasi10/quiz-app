class UI {
    // Make a http get request
    draw(data) {
        let output = '';
        output += `<div>${data.question}</div>`
        console.log(data.alternatives)
        
        if (data.alternatives === undefined){
            console.log('IT HAS NO ALTERNATIVES')
        } else{
            console.log('IT HAS ALTERNATIVES')
        }
        
        document.getElementById('output').innerHTML = output
       
    }

    
}

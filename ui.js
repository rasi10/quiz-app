class UI {
    drawQuestion(data, playerName) {
        let output = '';
        //output += `<h1>Quiz Application</h1>`
        output += `<h4>Welcome, <spam id="player-name">${playerName}</spam></h4>`
       
        output += `<div><h5>${data.question}</h5></div>`
        if (data.alternatives === undefined) {
            output += `<input type="text" id="answer-text"></input>`
        } else {
            for (var prop in data.alternatives) {
                output += `<input type="radio" name="answer" value=${prop}> ${data.alternatives[prop]}`
                //output += `<label for="${data.alternatives[prop]}">${data.alternatives[prop]}</label>`
            }
        }
        output+=`<br><br>`
        output+=`<button id="button2">Submit answer</button>`
        output += `<div>Remaining Time: <spam id="txt">timer</spam></div>`
        // output += `<progress value="0" max="20" id="progressBar"></progress>`
        
        document.getElementById('container').innerHTML = output
    }

    drawStart(){
        let output = ''
        //output += `<h1>Quiz Application</h1>`
        output += `<h5>Please, enter your name</h5>`
        output += `<input type="text" id="name-text"></input>`
        output += `<button id="button1">Start The Quiz</button>`
        document.getElementById('container').innerHTML = output

    }

    drawLastQuestion(){
        let output = '';
        output += `<h1>Quiz Application</h1>`
        output += `<div><h5>Congratulations! You cleared all the questions...</h5></div>`
        output += `<button id="button3">Show Results</button>`
        document.getElementById('container').innerHTML = output
    }

    drawResults (webstorageData) {
        let output = '';
        output += `<h1>Quiz Application</h1>`
        output += `<div><h5>Ranking list</h5></div>`
        output += `<table>
                        <tr>
                            <th>Player</th>
                            <th>Time(secs)</th>
                        </tr>`
    
        for (let index = 0; (index < webstorageData.length && index < 5); index++) {
            output += `<tr>
                            <td>${webstorageData[index].name}</td>
                            <td>${webstorageData[index].time}</td>
                        </tr>`
        }
        output += `</table>`
        output += `<button id="button4">Restart</button>`
        document.getElementById('container').innerHTML = output    
        }        
}

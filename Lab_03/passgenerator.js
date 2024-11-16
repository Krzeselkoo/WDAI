let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
let capital = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] 
let special = ['!','@','#','$','%','^','&','*','(',')','-','_','=','+','[','{',']','}',';',':','\'','"',',','<','.','>','/','?','\\','|']

function generate(){
    let password = []
    let minLen = parseInt(document.getElementById("minlen").value)
    let maxLen = parseInt(document.getElementById("maxlen").value)

    let capitalYes = document.getElementById("capital").checked
    let specialYes = document.getElementById("special").checked

    if(minLen > maxLen){
        alert("Max lenght cannot be smaller than Min lenght!")
    }else{
        let lenght = randomIntFromInterval(minLen, maxLen)
        let passwordCharacters = []
        passwordCharacters = passwordCharacters.concat(letters)

        if(capitalYes){
            password.push(capital[Math.floor(Math.random() * capital.length)])
            lenght -= 1
            passwordCharacters = passwordCharacters.concat(capital);
        }

        if(specialYes){
            password.push(special[Math.floor(Math.random() * special.length)])
            lenght -= 1
            passwordCharacters = passwordCharacters.concat(special);
        }
        
        for(i = 0; i < lenght; i++){
            password.push(passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)])
        }

        shuffle(password)

        alert(password.join(''))

    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
}
let number = document.getElementById("digit");
let input = document.getElementById("userText");

function retrieveText(event) {
    let enteredTextLength = event.target.value.length;  //length of entered text
    let number = document.getElementById("digit");
    number.textContent = 60 - enteredTextLength;
    if (enteredTextLength > 50) { 
        number.style.color = "red";
    }
    else {
        number.style.color = "rgb(79, 79, 79)";
    }
    // console.log(enteredTextLength);
    // console.log(number);
}

text.addEventListener("input", retrieveText)



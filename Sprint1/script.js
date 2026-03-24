const numpad = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.op');
const eq = document.getElementById("eq");
const eg = document.getElementById("egg")

console.log("numpad: ", numpad);
console.log("ops: ", ops);

let lock = false;
console.log("lock: "+lock);

function replaceAt(originalString, index, replacementChar) {
    return originalString.slice(0, index) + replacementChar + originalString.slice(index + 1);
}

numpad.forEach(button => {
    button.addEventListener("click", function() {
        if (tela.innerText == "0" || lock == true){
            console.log("num: " + button.innerText);
            lock = false;
            console.log("lock: "+lock);
            //let display = button.innerText;
            tela.innerText = button.innerText;
        }
        else {
            console.log("num: " + button.innerText);
            //let display = tela.innerText + button.innerText;
            tela.innerText = tela.innerText + button.innerText;
        }
    }   )
})

ops.forEach(button => {
    console.log("op");
    button.addEventListener('click', function() {
        switch (tela.innerText.at(-1)){
            case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "0":
                console.log("op add");
                tela.innerText = tela.innerText + button.innerText;
                lock = false;
           
            default:
                console.log("op replace");
                tela.innerText = replaceAt(tela.innerText, tela.innerText.length-1, button.innerText);
                lock = false;
        }
           
})})

function equal(){
    let res = eval(tela.innerText);
    tela.innerText = res;
    lock = true;
    console.log("lock: "+lock);
}

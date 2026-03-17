const numpad = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.op');

//const soma = document.getElementById("soma");
//const sub = document.getElementById("sub");
//const mult = document.getElementById("mult");
//const div = document.getElementById("div");
const eq = document.getElementById("eq");

let expressao = []

let lock = false;

console.log("numpad: ", numpad);
console.log("ops: ", ops);

function replaceAt(originalString, index, replacementChar) {
  return originalString.slice(0, index) + replacementChar + originalString.slice(index + 1);
}

function clique_num(){
    numpad.forEach(button => {
        button.addEventListener("click", function() {
            if (tela.innerText == 0 || lock == true){
                console.log("num: " + button.innerText);
                lock = false;
                cancelIdleCallback.
                expressao.push(button.innerText);
                //let display = button.innerText;
                let display = expressao.join("");
                tela.innerText = display;
            }
            else {
                console.log("num: " + button.innerText);
                expressao.push(button.innerText);
                console.log(expressao)
                //let display = button.innerText;
                let display = expressao.join("");
                tela.innerText = display;
                //tela.innerText = tela.innerText + button.innerText;
            }
        }   )
    })
}



function clique_op(){
    ops.forEach(button => {
        console.log("op");
        button.addEventListener('click', function() {
            //tela.innerText = button.innerText;
            if (tela.innerText.endsWith(1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 0)){
                tela.innerText = tela.innerText + button.innerText;
                //tela.innerText = display;
            }
            else {
                //let display = replaceAt(tela.innerText, tela.innerText.length-1, button.innerText);
                tela.innerText = replaceAt(tela.innerText, tela.innerText.length-1, button.innerText);
            }
           
})})
}

function equal(){
    let res = eval(tela.innerText);
    tela.innerText = res;
    lock = true;
    console.log(lock)
}

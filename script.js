const allButtons = document.getElementsByTagName("button");
const inputBox = document.querySelector("#input");
const opBox = document.querySelector(".show-op");
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const ops = ["+", "-", "x", "÷", "√"];
let A = "";
let B = "";
let operator = "";

function clearInput () {
    inputBox.textContent = "";

    A = "";
    B = "";
    operator = "";
}

function evaluate() {
    let prev;
    console.log(A, operator, B);
    switch (operator) {
        case "+":
            inputBox.textContent = Number(A) + Number(B);
            prev = Number(A) + Number(B);
            break;
        case "-":
            inputBox.textContent = Number(A) - Number(B);
            prev = Number(A) - Number(B);
            break;
        case "x":
            inputBox.textContent = Number(A) * Number(B);
            prev = Number(A) * Number(B);
            break;
        case "÷":
            inputBox.textContent = Number(A) / Number(B);            
            prev = Number(A) / Number(B);
            break;
        case "√":
            inputBox.textContent = Math.sqrt(Number(A))
            prev = Math.sqrt(Number(A));
            break;
    }
    clearInput();
    inputBox.textContent = prev;
    A = prev;
}

for (let i = 0; i < allButtons.length; i++) {
    const child = allButtons[i];
    
    if (child.textContent === "C") {
        child.addEventListener("click", clearInput);
    } else if (child.textContent === "=") {
        child.addEventListener("click", evaluate);
    } else {
        child.addEventListener("click", () => {
            if (nums.includes(child.textContent)) {
                /// first number, just add on to empty/prev number
                if (operator === "" && B === "") {
                    inputBox.textContent += child.textContent;
                    A = inputBox.textContent;
                } else if (A !== "" && operator !== "") {  /// second number, after operator, either replace current display or add to existing numbers
                    if (B === "") {
                        inputBox.textContent = "";
                    }
                    inputBox.textContent += child.textContent;
                    B = inputBox.textContent;
                }
            } else if (ops.includes(child.textContent)) {  
                operator = child.textContent;
                opBox.textContent = child.textContent;
                if (child.textContent === "√") {
                    evaluate();
                }
            } else if (child.textContent === "+/-" && nums.includes(inputBox.textContent[inputBox.textContent.length-1])) {
                inputBox.textContent = -1 * Number(inputBox.textContent);
                if (B === "") {
                    A = inputBox.textContent;
                } else {
                    B = inputBox.textContent;
                }
            }
            console.log(A, B, operator);
        });
    }
}

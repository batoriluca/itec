const generatePoemBtn = document.getElementById("generatePoem");

generatePoemBtn.addEventListener("click", () => {
    document.querySelector(".sc2").setAttribute("style", "display:flex;")
})


var otherOn = false;
const otherTypeBtn = document.getElementById("othertype");
otherTypeBtn.addEventListener("click", () => {
    document.querySelector(".other").setAttribute("style", "display:block;")
    otherOn = true;
})



const wordInput = document.getElementById("wordInputt");
const addWord = document.getElementById("addWord");
const wordList = document.getElementById("ulwords");
const clearWordsBtn = document.getElementById("clear");
var listOfWords = {};
var nrWords = 0;
addWord.addEventListener("click", () => {
    if (nrWords < 5) {
        document.querySelector(".clear").setAttribute("style", "display:block;")
        var inputValue = wordInput.value;
        wordInput.value = "";
        listOfWords[nrWords] = inputValue;
        var newWord = document.createElement("li");
        wordList.appendChild(newWord);
        newWord.innerText = inputValue;
        nrWords++;
    } else {
        document.querySelector(".wordsNrErr").setAttribute("style", "display:block;")
        setTimeout(() => {
            document.querySelector(".wordsNrErr").setAttribute("style", "display:none;")
        }, 5000)

        wordInput.value = "";
    }
})

clearWordsBtn.addEventListener("click", () => {
    nrWords = 0;
    document.querySelector(".clear").setAttribute("style", "display:none;")
    var allWords = document.querySelectorAll(".ulWOrds li");
    allWords.forEach(wordLi => {
        wordLi.remove();
    });
    listOfWords = {};
})
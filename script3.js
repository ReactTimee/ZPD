
var startTime;
var playerName;
var playerAge;
var totalGames = 10;
var remainingGames = totalGames; // Variable to track remaining games
var reactionTimes = []; // Array to store reaction times for correct guesses

function startGame() {
    if (remainingGames <= 0) {
        alert("Test pabeigts. Pārbaudiet reakcijas laikus zemāk.");
        return;
    }

    playerName = document.getElementById("name").value;
    playerAge = document.getElementById("age").value;

    if (!playerName || !playerAge) {
        alert("Ievadi vārdu un vecumu.");
        return;
    }else{
      hidestuff()
      document.getElementById("result-message").innerText = "";
      document.getElementById("attempts").innerText = "Mēģinājumi atklikuši: " + remainingGames;
  
      var delayBeforeOptions = 1500; 
      var delayTime = 1000;
  
      setTimeout(function () {
          var randomNumber = Math.floor(Math.random() * 4) + 1;
  
          var targetNumberElement = document.getElementById("number-to-find");
          targetNumberElement.innerHTML = '';
          targetNumberElement.appendChild(createSVGIcon(randomNumber, '6em')); 
  
          setTimeout(function () {
              var buttonValues = [1, 2, 3, 4];
              shuffleArray(buttonValues);
  
              var buttonContainer = document.getElementById("button-container");
              buttonContainer.innerHTML = "";
  
              for (var i = 0; i < buttonValues.length; i++) {
                  var button = document.createElement("button");
                  button.className = "button";
                  button.appendChild(createSVGIcon(buttonValues[i], '4em'));
                  button.onclick = checkNumber.bind(null, buttonValues[i], randomNumber);
                  buttonContainer.appendChild(button);
              }
  
              startTime = new Date().getTime();
          }, delayTime);
      }, delayBeforeOptions);
  }
  
    }


function checkNumber(selectedNumber, targetNumber) {
    name = document.getElementById("name").value;
    age = document.getElementById("age").value;
    variants = 3;
    var resultMessage = document.getElementById("result-message");
    var attemptsDisplay = document.getElementById("attempts");
    var endTime = new Date().getTime();
    var reactionTime = endTime - startTime;

    document.getElementById("button-container").innerHTML = "";

    if (selectedNumber === targetNumber) {
        reactionTimes.push(reactionTime); 

      
        var reactionList = document.getElementById("reaction-time");
        var listItem = document.createElement("li");
        listItem.innerHTML = "Reakcijas laiks " + (reactionTimes.length) + ": " + reactionTime + " ms";
        reactionList.appendChild(listItem);

        remainingGames--;
        recordReactionTime({ variants,name, reactionTime ,age})
        if (remainingGames > 0) {
            startGame();
        } else {
            alert("Test pabeigts. Pārbaudiet reakcijas laikus zemāk.");
        }
    } else {
        resultMessage.innerText = "Nepareizais numurs";

        if (remainingGames <= 0) {
            resultMessage.innerText += " No more games!";
            setTimeout(startGame, 1000);
        } else {
            attemptsDisplay.innerText = "Games remaining: " + remainingGames;
            setTimeout(startGame, 2000); 
        }
    }
}

function hidestuff(){
    document.getElementById('h1').style.display = 'none';
    document.getElementById('p').style.display = 'none';
  document.getElementById('btn').style.display = 'none';
  document.querySelectorAll('input').forEach(input => input.style.display = 'none');
  document.getElementById('game-container').classList.add('started');
  document.querySelectorAll('label').forEach(label => label.style.display = 'none');
}
function createSVGIcon(number) {
  var svgString = '';
  var iconSize = '5em'; 

  switch (number) {
    case 1:
      svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="' + iconSize + '" height="' + iconSize + '" fill="#28a745" class="bi bi-1-square-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z"/></svg>';
      break;
    case 2:
      svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="' + iconSize + '" height="' + iconSize + '" fill="#28a745" class="bi bi-2-square-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306"/></svg>';
      break;
    case 3:
      svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="' + iconSize + '" height="' + iconSize + '" fill="#28a745" class="bi bi-3-square-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318"/></svg>';
      break;
    case 4:
      svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="' + iconSize + '" height="' + iconSize + '" fill="#28a745" class="bi bi-4-square-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.519 5.057q.33-.527.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265Z"/></svg>';
      break;
    default:
      break;
  }

  var div = document.createElement('div');
  div.innerHTML = svgString.trim();

  return div.firstChild;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
}
async function recordReactionTime(data) {
  const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
  const url = `${baseUrl}?name=${data.name}&reactionTime=${data.reactionTime}&age=${data.age}&variant=${data.variants}&key=rihards123`;
  //save results in db
  await fetch(url,{
     mode: 'no-cors'
          });
}


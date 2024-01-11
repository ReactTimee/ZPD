var startTime;
var playerName;
var playerAge;

function startGame() {
  playerName = document.getElementById("name").value;
  playerAge = document.getElementById("age").value;

  if (!playerName || !playerAge) {
    alert("Ievadi vārdu un vecumu.");
    return;
  }

  document.getElementById("result-message").innerText = "";
  document.getElementById("reaction-time").innerText = "";

  var delayTime = 1000; 
  setTimeout(function() {

    var randomNumber = Math.floor(Math.random() * 4) + 1;

    var targetNumberElement = document.getElementById("number-to-find");
    targetNumberElement.innerHTML = '';
    targetNumberElement.appendChild(createSVGIcon(randomNumber));

    var buttonValues = [1, 2, 3, 4];
    shuffleArray(buttonValues);

    var buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = "";

    for (var i = 0; i < buttonValues.length; i++) {
      var button = document.createElement("button");
      button.className = "button";
      button.appendChild(createSVGIcon(buttonValues[i]));
      button.onclick = checkNumber.bind(null, buttonValues[i], randomNumber);
      buttonContainer.appendChild(button);
    }

    startTime = new Date().getTime();
  }, delayTime);
}

  function checkNumber(selectedNumber, targetNumber) {
    playerName = document.getElementById("name").value;
    playerAge = document.getElementById("age").value;
  
    var resultMessage = document.getElementById("result-message");
    var reactionTimeElement = document.getElementById("reaction-time");
    var endTime = new Date().getTime();
    var reactionTime = endTime - startTime;
  
    document.getElementById("button-container").innerHTML = "";
  
    if (selectedNumber === targetNumber) {
      reactionTimeElement.innerText = "Tavs reakcijas laiks ir " + reactionTime + " ms";
  
      // Call the recordReactionTime function with the data
      recordReactionTime({ playerName, reactionTime, playerAge });
    } else {
      resultMessage.innerText = "Nepareizais numurs";
    }
  }
  

function createSVGIcon(number) {
  var svgString = '';
  var iconSize = '3em'; 

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

refreshButton.addEventListener('click', function () {
  location.reload();
});

async function recordReactionTime(data) {
  const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
  const url = `${baseUrl}?name=${data.playerName}&reactionTime=${data.reactionTime}&age=${data.playerAge}&key=rihards123`;
 // //save results in db
  await fetch(url);
}

$(document).ready(function() {

  var isXTurn = true;
  var turnCount = 0;
  var gameOver = false;

  // DRY: no need to check row/col independently
  // when we can just pass in the collection.

  // function checkRowForWin($row) {    
  //   var isRowWinning = true;
  //   $row.children("button").each(function (){
  //     if (isRowWinning) {
  //       //we keep the row as a winner until one of our
  //       //buttons isn't the right letter.
  //       isRowWinning = ($(this).text() == (isXTurn ? "X" : "O"));
  //     }
  //   })
  //   return isRowWinning;
  // }

  // function checkColForWin($col) {    
  //   var isColWinning = true;
  //   $col.each(function (){
  //     if (isColWinning) {
  //       //we keep the row as a winner until one of our
  //       //buttons isn't the right letter.
  //       isColWinning = ($(this).text() == (isXTurn ? "X" : "O"));
  //     }
  //   })
  //   return isColWinning;
  // }

  function checkForWin($elems) {    
    var isWinning = true;
    $elems.each(function (){
      if (isWinning) {
        isWinning = ($(this).text() == (isXTurn ? "X" : "O"));
      }
    })
    return isWinning;
  }

  function checkGameForWin() {    
    if (checkForWin($(".row1").children("button")) ||
        checkForWin($(".row2").children("button")) ||
        checkForWin($(".row3").children("button")) ||
        checkForWin($(".col1")) ||
        checkForWin($(".col2")) ||
        checkForWin($(".col3")) ||
        checkForWin($(".row1 .col1, .row2 .col2, .row3 .col3")) ||
        checkForWin($(".row1 .col3, .row2 .col2, .row3 .col1"))
        ) {
      return true;
    }
    return false
  }


  $("button").click(function(){
    if (gameOver) {
      return;
    }
    if($(this).text() == "+") {
      var currentLetter = isXTurn ? "X" : "O"
      $(this).text(currentLetter);
      turnCount++;
      if (checkGameForWin())
      {
        alert(currentLetter + " : Is our winner!!")
        gameOver = true;
        return;
      }
      else {
        isXTurn = !isXTurn;        
      }  
    }
    if(turnCount == 9) {
      alert("boards full, I hope nobody won!");
    }
  });


});
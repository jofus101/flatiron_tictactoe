$(document).ready(function() {

  //globals (not my favorite either) for tracking game state
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

  // This just iterates over the collection seeing if the
  // contained text is what we expect either X or O depending
  // upon the game state/player turn
  function checkForWin($elems) {    
    var isWinning = true;
    $elems.each(function (){
      if (isWinning) {
        isWinning = ($(this).text() == (isXTurn ? "X" : "O"));
      }
    })
    return isWinning;
  }

  // Meaty function that checks all rows, cols, and diagonals
  // Returns true if any of them are consistent otherwise it's false
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

  // Do stuff on button clicks
  $("button").click(function(){
    // Unless the game is over... Don't do anything then
    if (gameOver) {
      return;
    }
    // Only fill in blank buttons
    if($(this).text() == "+") {
      var currentLetter = isXTurn ? "X" : "O"
      // Replace the button text with the appropriate X or O
      $(this).text(currentLetter);
      // turnCount lets us know if the board is full.
      turnCount++;

      if (checkGameForWin())
      {
        alert(currentLetter + " : Is our winner!!")
        gameOver = true;
        return;
      }
      else {
        // if we don't win, flip the boolean for turns
        isXTurn = !isXTurn;        
      }  
    }
    if(turnCount == 9) {
      alert("boards full, I hope nobody won!");
    }
  });


});
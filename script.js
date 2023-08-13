const exampleSocket = new WebSocket(
  "ws://localhost:8001/"
);

// const exampleSocket = new WebSocket(
//   "wss://desolate-reaches-83993-5015aeedf72f.herokuapp.com/"
// );

function t(board){
  return (orig,dest,metadata) => {
  console.log(orig,dest,metadata)
  exampleSocket.send(JSON.stringify({"type": "move", "from": orig,"to": dest}))
  }
}

import { Chessground } from './chessground/chessground.js'

const config = {
  movable: {
    free: true,
    showDests: true,
  }
};
var i = 0
let board
let message = ""



exampleSocket.onmessage = (event) => {
  message=JSON.parse(event.data)
  console.log("received message: ", message)
  if (message["type"]=="gameconfirmation") {
    if (message["value"]=="false") {
      alert("Bad Game Id")
    }
    else {
      board = Chessground(document.getElementById('chessground'), config);
      board.set({ orientation: message["orientation"], movable: { events: { after: t(board)}}});
    }
  }
  else if (message["type"]=="fen") {
    board = Chessground(document.getElementById('chessground'), config);
    board.set({fen: message["value"]})
  }
}


document.getElementById("newgame").onclick=newgame
document.getElementById("joingame").onclick=joingame


function newgame(){
  message = JSON.stringify({"type": "newgame", "id": document.getElementById("startgameid").value})
  console.log("sent message: ", message)
  exampleSocket.send(message)
}

function joingame(){
  message = JSON.stringify({"type": "joingame", "id": document.getElementById("joingameid").value})
  console.log("send message: ", message)
  exampleSocket.send(message)
}

// document.getElementById("myform").onsubmit=button2
// document.getElementById("sub").onclick=button1

// function button1(form) {
//   console.log(document.getElementById("test2").value)
//   console.log('here')
// }

// function button2() {
//   //var inputValue = form.inputbox.value;
//   console.log(document.getElementById("formtext").value)
//   console.log('here')
//   return false
//   //alert (inputValue)
// }

// function onDrop(source,target,piece){
//   exampleSocket.send(JSON.stringify({"type": "move", "from": source,"to": target}))
//   console.log(JSON.stringify({"from": source,"to": target,"piece": piece}))
// }

// var config = {
//   position: 'start',
//   draggable: true,
//   onDrop: onDrop
// }

// var board1 = ChessBoard('board1', config);






// exampleSocket.onopen = (event) => {
//   console.log("open")
// }
// exampleSocket.onclose = (event) => {
//   console.log("close")
// }

// exampleSocket.onerror = (event) => {
//   console.log("error")
// }


// exampleSocket.onmessage = (event) => {
//   const test=JSON.parse(event.data)
//   console.log(test["value"])
//   board1.position(test["value"])
// }


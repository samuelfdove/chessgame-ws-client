// const exampleSocket = new WebSocket(
//   "ws://localhost:8001/"
// );

const exampleSocket = new WebSocket(
  "wss://desolate-reaches-83993-5015aeedf72f.herokuapp.com/"
);

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
const board = Chessground(document.getElementById('chessground'), config);
board.set({ movable: { events: { after: t(board)}}})
//board.set({movable: { events: { after: t}}});

exampleSocket.onmessage = (event) => {
  const test=JSON.parse(event.data)
  console.log(test["value"])
  board.set({fen: test["value"]})
}


document.getElementById("newgame").onclick=newgame
document.getElementById("joingame").onclick=joingame

function newgame(){
  exampleSocket.send(JSON.stringify({"type": "newgame"}))
}

function joingame(){
  exampleSocket.send(JSON.stringify({"type": "joingame"}))
}

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


const exampleSocket = new WebSocket(
  "ws://localhost:8001/"
);

// const exampleSocket = new WebSocket(
//   "wss://desolate-reaches-83993-5015aeedf72f.herokuapp.com/"
// );

function t(board){
  return (orig,dest,metadata) => {
  exampleSocket.send(JSON.stringify({"type": "move", "from": orig,"to": dest}))
  }
}

import { Chessground } from './chessground/chessground.js'
import { getConfig } from './getconfig.js';

const config = {
  movable: {
    free: false,
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
      let dests = new Map(Object.entries(message["dests"]))
      //board.set({ fen: message["FEN"], orientation: message["orientation"], movable: {color: message["orientation"], dests: dests, events: { after: t(board)}}});
      board.set({ fen: message["FEN"], orientation: message["orientation"], movable: {dests: dests, events: { after: t(board)}}});
    }
  }
  else if (message["type"]=="boardupdate") {
    let dests = new Map(Object.entries(message["dests"]))
    board.set({fen: message["fen"], movable: {dests: dests}})
  }
  else if (message["type"]=="chatmessage"){
    document.getElementById("chatbox").value += "\n"+message["value"]
  }
}


document.getElementById("newgame").onclick=newgame
document.getElementById("joingame").onclick=joingame
document.getElementById("sendmessage").onclick=sendmessage

function newgame(){
  message = JSON.stringify({"type": "newgame", "id": document.getElementById("startgameid").value, "config": getConfig()})
  console.log("sent message: ", message)
  exampleSocket.send(message)
}

function joingame(){
  message = JSON.stringify({"type": "joingame", "id": document.getElementById("joingameid").value})
  console.log("send message: ", message)
  exampleSocket.send(message)
}

function sendmessage(){
  message = JSON.stringify({"type": "newmessage", "value": document.getElementById("message").value})
  console.log("send message: ", message)
  exampleSocket.send(message)
  document.getElementById("message").value = ""
}

import { useState } from "react";
import Confetti from 'react-confetti'

export default function Board() {
  const [isX, setIsX] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquare = squares.slice();
    if (isX){
      nextSquare[i] = <img src={require("./img/bacchus.png") } height={140}  alt="Bacchus" />
    }else{
      nextSquare[i] = <img src={require("./img/saint.png") } height={140}  alt="Saint" />
    }
    setSquares(nextSquare)
    setIsX(!isX)
  }

  const winner = calculateWinner(squares);
  let confetti = false;
  let status;
  if(winner){
    status =  ["Winner: " + winner,<br/>, "\n Refresh to replay"];
    confetti = true;
  } else{
    status = "Next player: " + (isX ? "Bacchus" : "Saint");
  }


  return (
  <>
   <Confetti
      run = {confetti}
    />
    <div className="status">{status}</div>
    <div className = "board-row">
      <Square value={squares[0]} onSquareClick={()=> {handleClick(0)}} />
      <Square value={squares[1]} onSquareClick={()=> {handleClick(1)}}/>
      <Square value={squares[2]} onSquareClick={ ()=> {handleClick(2)}} />

    </div>
    <div className = "board-row">
      <Square value={squares[3]} onSquareClick={ ()=> {handleClick(3)}}/>
      <Square value={squares[4]} onSquareClick={ ()=> {handleClick(4)}}/>
      <Square value={squares[5]} onSquareClick={()=> {handleClick(5)}}/>
    </div>
    <div className = "board-row">
      <Square value={squares[6]} onSquareClick={ ()=> {handleClick(6)}}/>
      <Square value={squares[7]} onSquareClick={ ()=> {handleClick(7)}}/>
      <Square value={squares[8]} onSquareClick={()=> {handleClick(8)}}/>
    </div>

  </>
  );
}

function Square({value, onSquareClick}){
 return <button className="square" onClick={onSquareClick}>{value}</button>
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(!squares[a] || !squares[b] || !squares[c]){
      continue;
    }
    
    if (squares[a] && squares[a].props.alt === squares[b].props.alt && squares[a].props.alt === squares[c].props.alt) {
      return squares[a].props.alt;
    }
  }
  return null;
}
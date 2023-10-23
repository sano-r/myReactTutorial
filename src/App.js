import { useState } from 'react';

function Square({ value, onSquareClick }) { // ここで渡されているのがprops
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // squaresはNullが9個詰まった配列
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // squares[i]に値が入っていればTrueで早期リターン
    if (squares[i]) { return; }
    // 勝者の判定、どっちかが勝ったら関数を抜ける
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // 配列のシャローコピー(複製元の一部を参照する代入方法)を作成している
    // アクションの取り消しややり直しをするときに、直接データを書き換えてしまうと、戻すのが大変なのでシャローコピーした
    // 配列squaresをシャローコピーしてnextSquaresという配列を作成
    const nextSquares = squares.slice();
    // trueの時はX,Falseの時はOが入力される
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
    setSquares(nextSquares);
    // クリックのたびにtrue/falseが切り替わる
    setXIsNext(!xIsNext);
  }

  // ゲームの終了・続行を知らせるコメントを表示
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  }else{
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // handleClickに対して引数を渡して実行したいが、JSX内で{handleClick(0)}と書くとレンダリングした時点で実行する関数になってしまう。
  // したがって、無名関数を定義→その中でhandleClick(0)を呼ぶ、という書き方にしてあげる必要がある。
  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// 勝者を判断
function calculateWinner(squares){
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
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

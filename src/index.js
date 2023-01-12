import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/* This entire class is being replaced by a function (01/11/2023)
class Square extends React.Component {
  
  constructor(props){
    super(props);
    this.state = { value:null, };
  }
  
  render() {
    return (
      <button
       className="square"
       onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button> 
      //This render was replacing the render below it (1/10/2023)
    );
  }
    
    render() {
      return (
        <button className="square" onClick={function() { console.log('click'); }}>
          {this.props.value}
        </button> //Can use onClick={() => console.log('click') instead of what is there
      );
      //This render was replaced by the render above it (01/10/2023)
    }
    
  }
*/
  function Square(props) {     //(01/11/2023)
    return (
      <button className='square' onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    /*
    constructor(props) {
      super(props);
      this.state = { 
        squares: Array(9).fill(null), //(01/10/2023)
        xIsNext: true, //(01/11/2023)
      };
    } //Removed to add a feature to see history (01/11/2023)
    */
   /* This section is moved to the Game component
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';//(01/11/2023)
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext, //(01/11/2023)
      });
    }
    */


    renderSquare(i) {
      return (<Square
       value={this.props.squares[i]} //formerly this.state.squares[i]
       onClick={() => this.props.onClick(i)} //formerly this.handleClick(i)
      />);
    }
  
    render() {
      /*
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = `Winner: ` + winner;
      } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
      }
      */
      /*  const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      Alternative way to format line 71
      (01/11/2023)
      */
      //removed <div className="status">{status}</div> from above the first board-row
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {//(01/11/2023)
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    jumpTo(step) { //to jump to previous game states
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );//key needed for lists for React to understand
      });

      let status;
      if (winner) {
        status = `Winner: ` + winner;
      } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares) {//(01/11/2023)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
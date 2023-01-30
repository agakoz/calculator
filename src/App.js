import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import Button from './components/Button';
import "./css/style.css"

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calculations: '0',
            result: '',
            previous: [],
            nextIsReset: true
        }
    }

    reset = () => {
        this.setState({calculations:'0', result: '', nextIsReset: false })
        this.setFocusToCalc()
    }

    addToCurrent = (symbol) => {
        this.changeFocus(symbol)
        console.log(this.state.previous)
        console.log(this.state.calculations)
        let {calculations} = this.state;

        let mathSymbols = ["/", "-", "+", "*"];

        if(this.state.nextIsReset) {
            calculations = this.state.result;
            this.setState({nextIsReset:false})
        }
        if(mathSymbols.indexOf(symbol) > -1 ){
            if(mathSymbols.some(ms => String(calculations).endsWith(ms))) {
                calculations = calculations.slice(0, -1) + symbol
                this.setState({calculations})
            } else {
                calculations = calculations + symbol
                this.setState({calculations})
            }

        } else {
            if(( this.state.calculations === "0" && symbol !== ".") || this.state.nextIsReset){
                this.setState({calculations: symbol, result: symbol, nextIsReset: false})
            
            }  else {
                console.log(this.state.calculations.indexOf("."))
                if(symbol !== "." || this.state.calculations.indexOf(".") === -1) {
                    let {result} = this.state
                    result = eval(String(this.state.calculations + symbol))
                    this.setState({calculations: this.state.calculations + symbol, result  })
                }

            }
      
        }
    }

    calculate = (symbol) => {
        let {calculations, nextIsReset} = this.state
        if(calculations.length > 0){
            // current = eval(String(previous[previous.length-1] + current));
            this.setState({nextIsReset: true})
            this.changeFocus(symbol)
        }
    }

    changeFocus = (symbol) => {
        if(symbol==="=" && !document.getElementById("result").classList.contains("focus")) {
            this.setFocusToResult()
        } else if(symbol!== "=") {
            this.setFocusToCalc()
        }
    }

    setFocusToCalc = () => {
        let result = document.getElementById("result")
        let calculations = document.getElementById("calculations")
        calculations.classList.add("focus");
        result.classList.remove("focus");
    }

    setFocusToResult = () => {
        let result = document.getElementById("result")
        let calculations = document.getElementById("calculations")
        result.classList.add("focus");
        calculations.classList.remove("focus");
    }

    render() {
        const buttons = [
            {symbol: 'C', cols:3, action: this.reset},
            {symbol: '/', cols:1, action: this.addToCurrent},
            {symbol: '7', cols:1, action: this.addToCurrent},
            {symbol: '8', cols:1, action: this.addToCurrent},
            {symbol: '9', cols:1, action: this.addToCurrent},
            {symbol: '*', cols:1, action: this.addToCurrent},
            {symbol: '4', cols:1, action: this.addToCurrent},
            {symbol: '5', cols:1, action: this.addToCurrent},
            {symbol: '6', cols:1, action: this.addToCurrent},
            {symbol: '-', cols:1, action: this.addToCurrent},
            {symbol: '1', cols:1, action: this.addToCurrent},
            {symbol: '2', cols:1, action: this.addToCurrent},
            {symbol: '3', cols:1, action: this.addToCurrent},
            {symbol: '+', cols:1, action: this.addToCurrent},
            {symbol: '0', cols:2, action: this.addToCurrent},
            {symbol: '.', cols:1, action: this.addToCurrent},
            {symbol: '=', cols:1, action: this.calculate},
        ]


        return (
            <div className="App">
                <div className="display">
                    {
                        this.state.calculations.length > 0 ?
                            <div id="calculations" className={["calculations", "focus"].join(' ')}>{this.state.calculations}</div>
                            : null
                    }
                    <input id="result" className={["result"].join(' ')} type="text" value={this.state.result}/>
                    {/* <input className="result focus" type="text" value={this.state.result}/> */}
                </div>
               
                <br/>
                <div className="buttons">
                     {
                    buttons.map((btn, i) => {
                        return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
                })}
                </div>
               
            </div>
        );
    }
}




export default App;

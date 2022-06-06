import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./Components/BoardComponent";
import {Board} from "./Models/Board";
import {Player} from "./Models/Player";
import {Colors} from "./Models/Colors";
import LostFigures from "./Components/LostFigures";
import Timer from "./Components/Timer";
async function connect (){
    const address = "http://localhost:3003/api/key/get"
    const obj = {method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}}
    const msg1:string =JSON.stringify({a:10})
    const qwer = (await fetch(address, {...obj, body:msg1}))
    console.log(qwer);
    const parseData = (await qwer.json())
    console.log(parseData)
    const address2 = 'http://localhost:3003/status/'
    const result = (await (await fetch(address2)).json());
    console.log(result);
}

connect()

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => { //хукаем через главный компонент app функцию рестарта
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() { // функция для начала новой игры
        const newBoard = new Board()
        newBoard.initCells() // создаем новый объект и вызываем метод для инициализации ячеек
        newBoard.addFigures()
        setBoard(newBoard) // сохраняем в состояние
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (

        <div className="App">

            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />

            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Черные Фигуры"
                    figures={board.lostBlackFigures}/>
                <LostFigures
                    title="Белые Фигуры"
                    figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
};
export default App;
import React, {FC, useEffect, useState} from 'react';
import {Board} from "../Models/Board";
import CellComponents from "./CellComponents";
import {Cell} from "../Models/Cell";
import {Player} from "../Models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    // показываем, что на вход ожидаем пропсы и функцию для изменения компонента
    currentPlayer: Player | null;
    swapPlayer: () => void;

}

const BoardComponent: FC<BoardProps> = ({board, setBoard,currentPlayer,swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3 className="currentPlayer">Текущий игрок {currentPlayer?.color}</h3>
            <div className='board'>
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponents
                            click={click}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />
                    )}
                </React.Fragment> // создаем фрагмент, потому что полноценный блок не нужен. Фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов
            )}
        </div>
        </div>
    );
};

export default BoardComponent;
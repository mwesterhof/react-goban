import './Goban.css';
import { useState } from 'react';


const Stone = (props) => {
    const className=(props.playerBlack ? 'byBlack': 'byWhite');
    const fullClassName=`Stone ${className}`

    return (
        <div className={fullClassName}>
        </div>
    );
};


const Cell = (props) => {
    return (
        <div className='Cell' onClick={props.onClick}>
            {(props.value == true || props.value == false) && <Stone playerBlack={props.value} />}
        </div>
    );
}


const Goban = (props) => {
    var boardRaw = [];

    for (var i=0; i<props.size; i++) {
        var line = [];
        for (var j=0; j<props.size; j++) {
            line.push(null);
        }
        boardRaw.push(line);
    }

    const [board, setBoard] = useState(boardRaw);
    const [blackTurn, setBlackTurn] = useState(true);

    const getCellClickHandler = (clickedRow, clickedCol) => {
        const cellClickHandler = () => {
            console.log(`clicked cell ${clickedRow}/${clickedCol}`);
            setBoard(oldBoard => {
                return oldBoard.map((line, row) => {
                    return line.map((cell, col) => {
                        return ((row == clickedRow && col == clickedCol) ? blackTurn: cell);
                    });
                });
            });
            setBlackTurn(old => !old);
        };
        return cellClickHandler
    }

    return (
        <div className='Goban'>
            <h1>{(blackTurn ? 'Black': 'White')}'s move</h1>
            <div className='Board'>
                <table border="1">
                    <tbody>
                        {board.map((line, row) => {
                            return (
                                <tr key={row}>
                                    {line.map((cell, col) => <td key={col}><Cell value={cell} onClick={getCellClickHandler(row, col)} /></td>)}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Goban;

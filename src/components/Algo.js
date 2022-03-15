const processCaptures = (board, checkBlack, size) => {
    var counts = [];
    for (var i=0; i<size; i++) {
        var line = [];
        for (var j=0; j<size; j++) {
            line.push(null);
        }
        counts.push(line);
    }
    const countLiberties = (row, col, _tracked) => {
        const key = JSON.stringify([row, col]);
        var tracked;
        if (_tracked === null) {
            tracked = new Set();
        }
        else {
            tracked = _tracked;
        }
        
        if (tracked.has(key)) {
            return 0
        }
        tracked.add(key);

        if (row < 0 || row >= size) {
            return 0;
        }
        if (col < 0 || row >= size) {
            return 0;
        }
        if (board[row][col] !== checkBlack && board[row][col] !== null) {
            return 0;
        }
        if (board[row][col] === null) {
            return 1;
        }

        const results = [
            countLiberties(row-1, col, tracked),
            countLiberties(row+1, col, tracked),
            countLiberties(row, col-1, tracked),
            countLiberties(row, col+1, tracked)
        ]
        if (row===0 && col ===0) {
            console.log(results);
        }

        return results.reduce((a, b) => a + b);
    };

    for (var rowIdx=0; rowIdx<size; rowIdx++) {
        for (var colIdx=0; colIdx<size; colIdx++) {
            if (board[rowIdx][colIdx] === checkBlack) {
                counts[rowIdx][colIdx] = countLiberties(rowIdx, colIdx, null);
            }
        }
    }
    // console.log(counts);

    for (var row=0; row<size; row++) {
        for (var col=0; col<size; col++) {
            if (counts[row][col] === 0) {
                board[row][col] = null;
            }
        }
    }
};

export default processCaptures;

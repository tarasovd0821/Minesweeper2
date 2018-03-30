export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}
	get playerBoard() {
		// Getter method called playerBoard
		return this._playerBoard;
	}
	// Flip a tile and act according to whether it's already been flipped, hides
	//    a bomb, or doesn't hide a bomb (in which case step 3 is called).	
	flipTile(rowIndex, columnIndex) {
		if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
			//console.log('This tile has already been flipped!');
			return;
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}

		this._numberOfTiles--;
	}

	// 3. Get the number of bombs in tiles adjacent to a particular tile
	getNumberOfNeighborBombs(rowIndex, columnIndex) {
		const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;

		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});
		return numberOfBombs;
	}

	hasSafeTiles() {
		return this._numberOfTiles !== this._numberOfBombs;
	}

	print() {
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	}

	// Generate the board for the player's guesses
	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		const board = [];
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			const row = [];
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(' '); //creates a cell in the table
			} //closes inner loop
			board.push(row);
		} //closes outer loop
		return board;
	} //closes generatePlayerBoard

	// Generate the bomb board and randomly place bombs on it
	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		const board = [];
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			const row = [];
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null); //creates a cell in the table
			} //closes inner loop
			board.push(row);
		} //closes outer loop
		let numberOfBombsPlaced = 0;
		while (numberOfBombsPlaced < numberOfBombs) {
			const randomRowIndex = Math.floor(Math.random() * numberOfRows);
			const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
			}
		}
		return board;
	}
}
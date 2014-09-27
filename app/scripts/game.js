'use strict';

//Main game logic is here

TICTACTOE.Game = function(){

	var gridSize = 3, //game grid selected size, defaults to 3
		turns_finished, //array contains 2 values storing turns finished for player 1 and 2 respectively
		rows_result, //stores a value for each row and is used to check if any player has won yet(horizontal win)
		cols_result, //stores a value for each col and is used to check if any player has won yet(vertical win)
		diagonal_result,//stores a value for the 2 diagonals and is used to check if any player has won yet(diagonal win)
		cur_turn; //stores who's turn it is now

	return {

		init: function(){

			$('#board-overlay').css('display','inline-block');
			$('#loading-game').css('display','inline-block');
			$('#board').css('opacity','0.7');

			//used to delay board generation and apply required css first, as it can bolck css rendering for large grid sizes
			setTimeout(function(){

				turns_finished = [0,0];
				rows_result = [];
				cols_result = [];
				diagonal_result = [0,0];
				cur_turn = 1; //player 1 starts the game

				for(var i=0;i<gridSize;i++){

					rows_result[i] = 0;
					cols_result[i] = 0;

				}

				$('#board').css('display','block');
				TICTACTOE.Board.generateBoard(gridSize);

				$('#board-overlay').css('display','none');
				$('#board').css('opacity','1');
				$('#loading-game').css('display','none');

			},100);

		},

		setGridSize: function(size){
	
			$('#grid-size span:first-child').html(size);//show new selected grid size value in the view
			$('.dropdown-menu').css('display','none');

			//add previous grid size value in dropdown and remove new one from list as it's been selected now
			$('.dropdown-menu li:nth-child('+(gridSize-2)+')').css('display','block');
			$('.dropdown-menu li:nth-child('+(size-2)+')').css('display','none');

			gridSize = size;

		},

		getGridSize: function(){

			return gridSize;

		},

		/*
			setGameData()

			x,y : x and y co-ordinates selected in the grid by current player
			
			We add 1 if 'X'(player1) and subtract 1 if 'O'(player2) 
			at appropriate position in the rows_result, cols_result array 
			as well as in diagonal_result array if a diagonal has been selected
		*/
		setGameData: function(player, x, y){

			switch(player){
				case 1:
					rows_result[x] += 1;
					cols_result[y] += 1;
					if(x === y)//diagonal
						diagonal_result[0] += 1;

					if((gridSize-(x+1)) === y)	//antidiagonal		
						diagonal_result[1] += 1;
					break;
				case 2:
					rows_result[x] -= 1;
					cols_result[y] -= 1;
					if(x === y)//diagonal
						diagonal_result[0] -= 1;
					if((gridSize-(x+1)) === y)	
						diagonal_result[1] -= 1;		
					break;
				default:
			}

		},

		/*
			checkGameOver()

			x,y : x and y co-ordinates selected in the grid by current player

			Game is over in the current move if,
			current player = player1(X)
				if rows_result or cols_result or diaginal_result = +gridSize
				then
				player1 wins
			or
			current player = player2(O) : 
				if rows_result or cols_result or diaginal_result = -gridSize
				then
				player2 wins
			or 
			board is filled up and its a draw
			
		*/
		checkGameOver: function(player, x, y){

			switch(player){
				case 1: 
					var over = false, //game over
						win_type = '', //won by row/col/diag/antidiag
						pos = null;
					if(rows_result[x] === gridSize){
						win_type = 'row';
						pos = x;
						over = true;
					}
					else if(cols_result[y] === gridSize){ 
						win_type = 'col';
						pos = y;
						over = true;
					}
					else if(diagonal_result[0] === gridSize){
						win_type = 'diag';
						pos = 0;
						over = true;
					}
					else if(diagonal_result[1] === gridSize){//we could conditionally check diagonals depending on whether diag is selected but its an overhead as it doesn't hamper the logic of the game
						win_type = 'antidiag';
						pos = 1;
						over = true;
					}
					if(over){
						TICTACTOE.Game.gameOver(1, win_type, pos);
						return true;
					}
					break;
				case 2:
					var over = false, //game over
						win_type = '', //won by row/col/diag/antidiag
						pos = null;
					if(rows_result[x] === -gridSize){
						win_type = 'row';
						pos = x;
						over = true;
					}
					else if(cols_result[y] === -gridSize){ 
						win_type = 'col';
						pos = y;
						over = true;
					}
					else if(diagonal_result[0] === -gridSize){
						win_type = 'diag';
						pos = 0;
						over = true;
					}
					else if(diagonal_result[1] === -gridSize){//we could conditionally check diagonals depending on whether diag is selected but its an overhead as it doesn't hamper the logic of the game
						win_type = 'antidiag';
						pos = 1;
						over = true;
					}
					if(over){
						TICTACTOE.Game.gameOver(2, win_type, pos);
						return true;
					}
					break;
				default:
			}

			//verify if board is filled up
			if((turns_finished[0]+turns_finished[1])=== (gridSize*gridSize)){
				TICTACTOE.Game.gameOver(3, 'none', 0);
				return true;
			}
			else
				return false;

		},

		/*
			Set appropriate view elements depending on a win or draw
		*/
		gameOver: function(result, win_type, pos){

			switch(result){
				case 1:
					$('#game-status').html('Player 1 wins. Congratulations!');
					//set win pattern to white
					if(win_type === 'row')
						$('#grid tr:nth-child('+(pos+1)+')').css('color','white');
					else if(win_type === 'col'){
						for(var i=0;i<gridSize;i++)
							$('#grid tr:nth-child('+(i+1)+') td:nth-child('+(pos+1)+')').css('color','white');
					}
					else if(win_type === 'diag'){
						for(var i=0;i<gridSize;i++)
							$('#grid tr:nth-child('+(i+1)+') td:nth-child('+(i+1)+')').css('color','white');
					}
					else if(win_type === 'antidiag'){
						for(var i=gridSize;i>0;i--)
							$('#grid tr:nth-child('+(gridSize-i+1)+') td:nth-child('+i+')').css('color','white');
					}
					break;
				case 2:
					$('#game-status').html('Player 2 wins. Congratulatoins!');
					//set win pattern to white
					if(win_type === 'row')
						$('#grid tr:nth-child('+(pos+1)+')').css('color','white');
					else if(win_type === 'col'){
						for(var i=0;i<gridSize;i++)
							$('#grid tr:nth-child('+(i+1)+') td:nth-child('+(pos+1)+')').css('color','white');
					}
					else if(win_type === 'diag'){
						for(var i=0;i<gridSize;i++)
							$('#grid tr:nth-child('+(i+1)+') td:nth-child('+(i+1)+')').css('color','white');
					}
					else if(win_type === 'antidiag'){
						for(var i=gridSize;i>0;i--)
							$('#grid tr:nth-child('+(gridSize-i+1)+') td:nth-child('+i+')').css('color','white');
					}
					break;
				case 3:
					$('#game-status').html("It's a draw");
					break;
				default:
			}

			/*show overlay on board so that players cannot click 
			anymore as game is over
			*/
			$('#board-overlay').css('width',$('#board').css('width'));
			$('#board-overlay').css('height',$('#board').css('height'));
			$('#board-overlay').css('display','inline-block');

		},

		/*
		x,y : x and y co-ordinates selected in the grid by current player
		*/
		cellSelected: function(x, y){
			
			//check if the cell is not already marked
			if($('#grid tr:nth-child('+x+') td:nth-child('+y+')').html() === ''){ 

				switch(cur_turn){

					case 1: //player1
						var row = document.querySelector('#grid tbody');
						row.children[x-1].children[y-1].innerHTML = 'X';
						//$('#grid tr:nth-child('+x+') td:nth-child('+y+')').html('X');
						cur_turn = 2; //set to next turn
						turns_finished[0] += 1;
						TICTACTOE.Game.setGameData(1, x-1, y-1);

						//check game over only if min number of turns required to finish game are over
						if((turns_finished[0] >= gridSize)){
							if(!TICTACTOE.Game.checkGameOver(1, x-1, y-1))
								$('#game-status').html("Player 2's turn");
						}
						else
							$('#game-status').html("Player 2's turn");
						break;
					case 2: //player2
						$('#grid tr:nth-child('+x+') td:nth-child('+y+')').html('O');
						cur_turn = 1; //set to next turn 
						turns_finished[1] += 1;
						TICTACTOE.Game.setGameData(2, x-1, y-1);

						//check game over only if min number of turns required to finish game are over
						if(turns_finished[1] >= gridSize){
							if(!TICTACTOE.Game.checkGameOver(2, x-1, y-1))
								$('#game-status').html("Player 1's turn");
						}
						else
							$('#game-status').html("Player 1's turn");
						break;
					default:

				}

			}

		}

	}

}();
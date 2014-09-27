/*
Author: Satya Rohit A
*/
/*'use strict';

var gridSize = 3;

var selectGridSize = function(){

	if($('.dropdown-menu').css('display') === 'none')
		$('.dropdown-menu').css('display','inline-block');
	else
		$('.dropdown-menu').css('display','none');

}

var changeGridSize = function(size){
	
	$('.dropdown-menu li:nth-child('+(gridSize-2)+')').css('display','block');
	$('.dropdown-menu li:nth-child('+(size-2)+')').css('display','none');
	gridSize = size;
	$('#grid-size span:first-child').html(gridSize);
	selectGridSize();//hide dropdown

}

var generateBoard = function(size){

	$('#grid').html('');

	for(var i=1; i<= size;i++){

		var row = "<tr>";
		
		for(var j=1;j<=size;j++)
			row += "<td class='bold'></td>";
			//row += "<td class='bold' onclick='cellSelected("+i+","+j+")'></td>";
		
		row += "</tr>";
		$('#grid').append(row);

	}

	if(gridSize > 10){
		$('#grid').css('width','100%');
		$('#grid td').css('border-width','0 0.1em 0.1em 0');
	}
	else{
		$('#grid').css('width','auto');
		$('#grid td').css('border-width','0 0.35em 0.35em 0');
	}

	$('#grid').css('height',($('#grid').css('width')));
	$('#grid td').css('width',$('#grid td').css('width'));
	$('#grid td').css('height',$('#grid td').css('height'));

	$('#board-overlay').css('display','none');
	$('#game-status').html("Player 1's turn");

	$('#grid td').click(function(){
		cellSelected(($(this).parent().index()+1),($(this).index()+1));
	});

}

var turns_finished = [0,0],
	rows_result = [],
	cols_result = [],
	diagonal_result = [0,0],
	cur_turn = 1;

var setGameData = function(player, x, y){

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

}

var checkGameOver = function(player, x, y){

	switch(player){
		case 1: 
		console.log(diagonal_result);
			if((rows_result[x] === gridSize) || (cols_result[y] === gridSize) || (diagonal_result[0] === gridSize) || (diagonal_result[1] === gridSize))//check,optimize
				return true;
			break;
		case 2:
			
			if((rows_result[x] === -gridSize) || (cols_result[y] === -gridSize) || (diagonal_result[0] === -gridSize) || (diagonal_result[1] === -gridSize))
				return true;
			break;
		default:
	}

	return false;

}

var gameOver = function(result){

	switch(result){
		case 1:
			$('#game-status').html('Player 1 wins. Congratulations!');
			$('#board-overlay').css('width',$('#board').css('width'));
			$('#board-overlay').css('height',$('#board').css('height'));
			$('#board-overlay').css('display','inline-block');
			break;
		case 2:
			$('#game-status').html('Player 2 wins. Congratulatoins!');
			$('#board-overlay').css('width',$('#board').css('width'));
			$('#board-overlay').css('height',$('#board').css('height'));
			$('#board-overlay').css('display','inline-block');
			break;
		case 3:
			$('#game-status').html("It's a draw");
			$('#board-overlay').css('width',$('#board').css('width'));
			$('#board-overlay').css('height',$('#board').css('height'));
			$('#board-overlay').css('display','inline-block');
			break;
		default:
	}

}

var cellSelected = function(x, y){
	
	if($('#grid tr:nth-child('+x+') td:nth-child('+y+')').html() === ''){ //check if cell is already marked

		switch(cur_turn){
			case 1:
				$('#grid tr:nth-child('+x+') td:nth-child('+y+')').html('X');
				cur_turn = 2;
				turns_finished[0] += 1;
				setGameData(1, x-1, y-1);
				if(checkGameOver(1, x-1, y-1))
					gameOver(1);
				else
					$('#game-status').html("Player 2's turn");
				break;
			case 2:
				$('#grid tr:nth-child('+x+') td:nth-child('+y+')').html('O');
				cur_turn = 1;
				turns_finished[1] += 1;
				setGameData(2, x-1, y-1);
				if(checkGameOver(2, x-1, y-1))
					gameOver(2);
				else
					$('#game-status').html("Player 1's turn");
				break;
			default:
		}

		if((turns_finished[0]+turns_finished[1])=== (gridSize*gridSize))
			gameOver(3);

	}

}

var newGame = function(){

	turns_finished = [0,0];
	rows_result = [];
	cols_result = [];
	diagonal_result = [0,0];
	cur_turn = 1;

	for(var i=0;i<gridSize;i++){
		rows_result[i] = 0;
		cols_result[i] = 0;
	}

	$('#board').css('display','block');
	generateBoard(gridSize);

}

for(var i = 3; i<=100; i++){	
	$('.dropdown-menu').append('<li onclick="changeGridSize('+ i +')">'+ i +'</li>');
}

//hide 3 as tis already selected
$('.dropdown-menu li:first-child').css('display','none');*/
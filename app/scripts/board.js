'use strict';

//Game board

TICTACTOE.Board = function(){

	return {

		//Generate the game board based on grid size
		generateBoard: function(size){
			//size === grid size

			$('#grid').html(''); //clear game grid

			//insert cells in the grid based on grid size
			var row = '',
				grid = '';
			for(var j=1;j<=size;j++) //columns
				row += "<td class='bold'></td>";
				
			for(var i=1; i<=size;i++) //rows
				grid += '<tr>'+row+'</tr>';
			
			$('#grid').append(grid);
			//adjust styling based on grid size
			if(size > 5)
				$('#grid td').css('font-size','1em');
			else
				$('#grid td').css('font-size','2em');

			if(size > 10){
				$('#grid').css('width','100%');
				$('#grid td').css('border-width','0 0.1em 0.1em 0');
			}
			else{
				$('#grid').css('width','auto');
				$('#grid td').css('border-width','0 0.2em 0.2em 0');
			}

			//fix height and width of grid and cells so they cannot change
			$('#grid').css('height',($('#grid').css('width')));
			$('#grid td').css('width',$('#grid td').css('width'));
			$('#grid td').css('height',$('#grid td').css('height'));

			$('#board-overlay').css('display','none'); //remove overlay mask on game board
			$('#game-status').html("Player 1's turn");

			//set click handler on the grid
			$('#grid').click(function(e){
				TICTACTOE.Game.cellSelected(e.target.parentNode.rowIndex+1,e.target.cellIndex+1);
			});
			
		}

	}

}();


/*
Author: Satya Rohit A

This is a TIC TAC TOE game  with a grid size ranging from
3 to 100.
*/

'use strict';

var TICTACTOE = function(){

	var min_grid_size = 3,
		max_grid_size = 100;

	return {

		init: function(){

			//generate dropdown selection list for grid size
			for(var i = min_grid_size; i<=max_grid_size; i++)
				$('.dropdown-menu').append('<li onclick="TICTACTOE.Game.setGridSize('+ i +')">'+ i +'</li>');

			//hide 3 as tis already selected
			$('.dropdown-menu li:first-child').css('display','none');

		},

		//show and hide dropdown menu
		selectGridSize: function(){
			
			if($('.dropdown-menu').css('display') === 'none')
				$('.dropdown-menu').css('display','inline-block');
			else
				$('.dropdown-menu').css('display','none');

		}

	}	

}();

TICTACTOE.init();
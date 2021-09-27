// זהו קובץ הסקריפט של ריבוע האוכל

import {
    expand_snake,
    is_the_snake_eating_now
} from './snake_data.js';

import {
    get_random_grid_position
} from './grid.js'


// default position of the food on the grid game board.
let the_food_square_on_the_grid_board_game = get_random_grid_position_for_food_square();

// here we control how much the snake will grow after eating the food square.
let EXPANTION_RATE = 1;

// how the update food status works?
// first, we want to know if the snake is eating right now.
//      if he is, expand his body and put the new food square randomly
//      on the grid game board.
//      if he isn't, do nothing with the food and do nothing with
//      the snake appearence.
export function update_food_status() {
    if (is_the_snake_eating_now(the_food_square_on_the_grid_board_game)) {
        expand_snake(EXPANTION_RATE);
        the_food_square_on_the_grid_board_game = get_random_grid_position_for_food_square();
    }
}

export function draw_updated_food_status(game_board) {

    const food_div_element = document.createElement("div");
    food_div_element.style.gridRowStart = the_food_square_on_the_grid_board_game.y;
    food_div_element.style.gridColumnStart = the_food_square_on_the_grid_board_game.x;
    food_div_element.classList.add("the_food_square");
    game_board.appendChild(food_div_element);

}


function get_random_grid_position_for_food_square() {

    let new_food_square_position;

    while ((new_food_square_position == null) || (is_the_snake_eating_now(new_food_square_position))) {
        new_food_square_position = get_random_grid_position();
    }

    return new_food_square_position;
}
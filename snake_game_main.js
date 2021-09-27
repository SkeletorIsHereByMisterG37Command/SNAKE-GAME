// זהו קובץ הסקריפט הראשי של המשחק

import {
    update_snake_status as update_snake,
    draw_updated_snake_status as draw_the_snake,
    get_snake_head,
    is_snake_head_collide_with_its_body,
    SNAKE_SPEED
}
from './snake_data.js';

import {
    update_food_status as upadate_food,
    draw_updated_food_status as draw_the_food
} from './food_data.js';

import {
    is_out_of_grid
} from './grid.js'



// asking the browser when we can render the next frame
// when the browser answer, 
//      the current_time parameter will store the "when" the browser just answered in milliseconds.
// when ever the rendering is possible, the main function will be called over and over again.
// we also want to know the time difference between each "ok to render" answer from the browser.
// to calculate that difference we will use the global last_render_time variable
//       and the local seconds_since_last_rendering variable.
// the formula: seconds_since_last_rendering = current_time - last_render_time
// but then the difference will be in milliseconds, so divide with 1000 will give us 
//       the difference in seconds.
// next we want to import the variable that stores the snake speed from the snake_data.js file.
// we want to stop the "endless loop" if the difference we calculated above is
//       smaller then (1/SNAKE_SPEED)
// this method will help us to control the speed of the snake.
// if we want a faster snake - all we need to do is to increase the value of the 
//       imported SNAKE_SPEED.
// the imported stuff from the other script files are listed at the top of this script.
// next we want to "endlessly" update the game status pending user key strokes
//       and draw the status of the game accordignally.
// for that we need to grab the game board first.
// the_game_board variable is where the game board is stored.
// we send that variable to the snake_data.js file to the draw_updated_snake_status
//       function.

let last_render_time = 0;
let game_over = false;
const the_game_board = document.getElementById("the_snake_game_board");



function main(current_time) {

    if (game_over) {
        if (confirm("Game Over - You Lost!!! Press OK to restart the game.")) {
            game_over = false;
            location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    const seconds_since_last_rendering = ((current_time - last_render_time) / 1000);
    if (seconds_since_last_rendering < (1 / SNAKE_SPEED)) {
        return;
    }
    last_render_time = current_time;

    update_game_status();
    draw_updated_game_status();
}

// start the above "endless loop" for the first time
window.requestAnimationFrame(main);




function update_game_status() {
    update_snake();
    upadate_food();
    update_death();
}

// to prevent the snake from duplicate itself and actually looked
//      like he is moving, we need to clear the old status of 
//      the game board.
function draw_updated_game_status() {
    the_game_board.innerHTML = '';
    draw_the_snake(the_game_board);
    draw_the_food(the_game_board);
}



function update_death() {
    game_over = is_out_of_grid(get_snake_head()) || is_snake_head_collide_with_its_body();
}
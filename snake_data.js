import {
    get_direction_input
} from './user_direction_input.js'


// here we control the speed of the snake.
// to increase his speed - just increse the value.
export const SNAKE_SPEED = 5;

// here we set the snake default position on the grid board game.
// the grid board game is 21x21 squares so the middle square 
//      is at position (11, 11).
const the_snake_square_on_the_grid_board_game = [{
    x: 11,
    y: 11
}];


// when the game starts the snake hasn't been eating nothing yet
//      so no new segmants needs to be updated.
let new_segments = 0;

export function update_snake_status() {
    add_segments();
    const direction_input = get_direction_input();
    for (let i = (the_snake_square_on_the_grid_board_game.length - 2); i >= 0; i--) {
        the_snake_square_on_the_grid_board_game[i + 1] = {
            ...the_snake_square_on_the_grid_board_game[i]
        };
    }

    // the_snake_square_on_the_grid_board_game[0] is the head of the snake.
    the_snake_square_on_the_grid_board_game[0].x += direction_input.x;
    the_snake_square_on_the_grid_board_game[0].y += direction_input.y;
}

export function draw_updated_snake_status(game_board) {
    the_snake_square_on_the_grid_board_game.forEach(segment => {
        const snake_div_element = document.createElement("div");
        snake_div_element.style.gridRowStart = segment.y;
        snake_div_element.style.gridColumnStart = segment.x;
        snake_div_element.classList.add("the_snake_square");
        game_board.appendChild(snake_div_element);
    });
}


export function expand_snake(amount) {
    new_segments += amount;
}



// this function is beign used for 2 purposes.
// 1. to check if the snake is eating right now.
// 2. to check for collision between the snake's head to his own body.

// the first purpose: 
//      calls for this function comes from the food_data.js file.
//      the position parameter stores the location of the food square on the grid board game.
//      no boolean expression is being passed to this function - hence the = {} .
//      the .some() part happend with each rendering, because even if no direction
//              input is being provided, the snake is still advancing.
//      segment stores the current rendering of the snake's head on the grid board game.
//              the .x and .y coordinates of the snake's head.
//              if the game hasn't started, segment.x and segment.y is 11, middle of the 
//              grid game board where a single blue square is shown representing the snake.
//              when a direction input is given by the keyboard those values will change
//              accordingly.
//      index is a number representing the amount of squares the snake currently has.
//              before the game starts, index === 0 because the snake hasn't eaten.
//              when the snake eats for the first time, index === 1 and so on.
//      all the calls from the food_data.js file, only passes the food current position.
//              if this function recieve's the boolean expression { ignore_the_head = true },
//              she know's its not about purpose 1, but about purpose 2.
//              we want to skip the if statement when the function needs to serve
//              purpose 1.
//              so we define a default boolean expression { ignore_the_head = false } = {} .
//              with that, the if statement is skipped, and we are checking if the snake
//              has eaten right now.

// the second purpose:
//      calls for this function come from this script file.
//      the position parameter stores the location of the head of the snake.
//      the boolean expression { ignore_the_head = true } is beign passed to this function.
//      the default boolean expression { ignore_the_head = false } is being override.
//      if index === 0, either the game hasn't started yet, or the snake hasn't eaten yet.
//              which ever the case, a single square, representing the snake,
//              cannot collide with itself - a reason to return false stating the game
//              isn't over.
//      if ignore_the_head === true, this function know's she needs to serve for purpose 2
//              and not purpose 1.
//      so, if (ignore_the_head === true && index === 0) is a true statement, the game
//              continues without checking if the snake has eaten - purpose 2.
//      now we need to check what happens if index > 1 and ignore_the_head === true.
//              as mentioned, if ignore_the_head === true, the position parameter stores the
//              snake's head and not the food location.
//              therefor, the equal_positions function, that is constantly being called,
//              beside when ignore_the_head === true && index === 0, serve purpose 2
//              and not purpose 1.
//              if the snake's head collide with his own body, 
//              the equal_positions function will return true, meaning a valid collision
//              between head and body accured, and its Game Over.
//      
export function is_the_snake_eating_now(position, {
    ignore_the_head = false
} = {}) {
    return the_snake_square_on_the_grid_board_game.some((segment, index) => {
        if (ignore_the_head && index === 0) {
            return false;
        }
        return equal_positions(segment, position);
    });
}




function equal_positions(position1, position2) {
    return (
        position1.x === position2.x && position1.y === position2.y
    );
}

// we take the_snake_square_on_the_grid_board_game and duplicate it at the end of the snake body.
// the duplication is beign done with the ... inside the .push built in function.
// the end of the snake is ( the_snake_square_on_the_grid_board_game.length - 1 ) .
// so basically we are saying:
//      when the snake eats, push a duplicate of the snake at the end of 
//      the snake former size.
// after duplication is done, the snake will try to reach to the next piece
//      of food. 
// in other words, the snake isn't eating now.
// so no new segments are needed, so we set new_segmants = 0 .
function add_segments() {
    for (let i = 0; i < new_segments; i++) {
        the_snake_square_on_the_grid_board_game.push({
            ...the_snake_square_on_the_grid_board_game[the_snake_square_on_the_grid_board_game.length - 1]
        });
    }

    new_segments = 0;
}

// this fuction will return the snake's head.
export function get_snake_head() {
    return the_snake_square_on_the_grid_board_game[0];
}

// we want to check if the snake's head is colliding with his own body.
// we will use the existing function is_the_snake_eating_now for that.
// the part of the snake that is eating is his head, so we will use that fact for
//      testing collision between the snake's head and his own body.
// because we dont want to check an impossible collision between the sneak's head to
//      his own head, we will send a boolean phrase: { ignore_the_head: true } .
export function is_snake_head_collide_with_its_body() {
    return is_the_snake_eating_now(the_snake_square_on_the_grid_board_game[0], {
        ignore_the_head: true
    });
}
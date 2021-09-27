// קובץ סקריפט זה מתעסק בלוח המשחק

// get random position on the game board.
export function get_random_grid_position() {
    return {
        x: Math.floor((Math.random() * 21) + 1),
        y: Math.floor((Math.random() * 21) + 1)
    };
}

// check for collision of the snake head with the grid board game borders.
export function is_out_of_grid(position) {
    return (
        position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21
    );
}
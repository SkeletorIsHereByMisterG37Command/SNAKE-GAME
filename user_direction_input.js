// קובץ סקריפט זה אחראי על קבלת כיוון תנועת הנחש מהמקלדת

// by default, we don't want the snake to move untill the user
//      has chosen where to move the snake.
let direction_input = {
    x: 0,
    y: 0
};

let last_direction_input = {
    x: 0,
    y: 0
};

// grab direction from the keyboard arrows.
// according to the snake game rules:
//      movement from up to down and than from down to up is forbidden.
//      movement from down to up and than from up to down is forbidden.
//      same for left to right and than right to left and vice versa.
// the if statements will help with enforcing those rules.
window.addEventListener("keydown", e => {
    switch (e.key) {
        case 'ArrowUp':
            if (last_direction_input.y != 0) {
                break;
            }
            direction_input = {
                x: 0,
                y: -1
            };
            break;

        case 'ArrowDown':
            if (last_direction_input.y != 0) {
                break;
            }
            direction_input = {
                x: 0,
                y: 1
            };
            break;

        case 'ArrowLeft':
            if (last_direction_input.x != 0) {
                break;
            }
            direction_input = {
                x: -1,
                y: 0
            };
            break;

        case 'ArrowRight':
            if (last_direction_input.x != 0) {
                break;
            }
            direction_input = {
                x: 1,
                y: 0
            };
            break;
    }
});

export function get_direction_input() {
    last_direction_input = direction_input;
    return direction_input;
}
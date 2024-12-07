
export function solveday6(input) {
    let result = {
        "part1": day6part1(input),
        "part2": day6part2(input)
    }
    return result;
}

function day6part1(input) {
    let input_lines = input.split("\n");
    let position = find_starting_point(input_lines);
    let rows = input_lines.length;
    let cols = input_lines[0].length;
    let direction = get_next_direction(undefined);
    let count_unique_positions = 0;
    while (true) {
        let next_position = Array.from(position);
        if (input_lines[position[0]][position[1]] != "X") {
            count_unique_positions++;
        }
        input_lines[position[0]] = replaceCharInString(input_lines[position[0]], position[1], "X");
        next_position[0] += direction[0];
        next_position[1] += direction[1];
        if (next_position[0] >= rows || next_position[0] < 0 || next_position[1] >= cols || next_position[1] < 0) {
            break;
        } else if (input_lines[next_position[0]][next_position[1]] != "#") {
            position = next_position;
        } else {
            direction = get_next_direction(direction);
        }
    }
    return count_unique_positions;
}

function day6part2(input) {
    let input_lines = input.split("\n");
    let original_map = [];
    for (let row of input_lines) {
        original_map.push(Array.from(row));
    }
    let position = find_starting_point(input_lines);
    let rows = input_lines.length;
    let cols = input_lines[0].length;
    let direction = get_next_direction(undefined);
    let traveled_positions = []
    while (true) {
        let next_position = Array.from(position);
        let character = original_map[position[0]][position[1]];
        if (character != "X" && character != "^") {
            console.log(`pushing position with character ${original_map[position[0]][position[1]]} - ${character == "^"}`)
            traveled_positions.push(position);
        }
        original_map[position[0]] = replaceCharInString(original_map[position[0]], position[1], "X");
        next_position[0] += direction[0];
        next_position[1] += direction[1];
        if (next_position[0] >= rows || next_position[0] < 0 || next_position[1] >= cols || next_position[1] < 0) {
            break;
        } else if (original_map[next_position[0]][next_position[1]] != "#") {
            position = next_position;
        } else {
            direction = get_next_direction(direction);
        }
    }
    // so now we have the traveled map with a lot of Xs, as well as the original map
    // we can put a # on the original map in any one of the X positions
    // we do that then check if the map has a loop for all X positions
    let count_loops = 0;
    console.log(traveled_positions);
    let counter = 0;
    for (let position of traveled_positions) {
        counter++;
        let new_map = [];
        for (let row of input_lines){
            new_map.push(Array.from(row).join(""))
        }
        if (new_map[position[0]][position[1]] == "^") {
            console.log("what's with this? keep trying to overwrite the starting point wtf");
        } else {
            new_map[position[0]] = replaceCharInString(input_lines[position[0]], position[1], "#");
            if (detect_loop_in_map(new_map)) {
                count_loops++;
            }
        }
        if (counter % 100 == 0) {
            console.log(`seen ${counter} maps, found ${count_loops} loops.`)
        }
    }
    return count_loops;
}

function detect_loop_in_map(map_lines) {
    let position = find_starting_point(map_lines);
    if (!position) {
        console.log("invalid position - what?");
        for (let row of map_lines) {
            console.log(row);
        }
        return false;
    }
    let rows = map_lines.length;
    let cols = map_lines[0].length;
    let direction = get_next_direction(undefined);
    while (true) {
        let posChar = map_lines[position[0]][position[1]];
        if (posChar == ".") {
            map_lines[position[0]] = replaceCharInString(map_lines[position[0]], position[1], "1");
        } else if (posChar == "1") {
            map_lines[position[0]] = replaceCharInString(map_lines[position[0]], position[1], "2");
        } else if (posChar == "2") {
            map_lines[position[0]] = replaceCharInString(map_lines[position[0]], position[1], "3");
        } else if (posChar == "3") {
            map_lines[position[0]] = replaceCharInString(map_lines[position[0]], position[1], "4");
        } else if (posChar == "4") {
            return true;
        }
        let next_position = Array.from(position);
        next_position[0] += direction[0];
        next_position[1] += direction[1];
        if (next_position[0] >= rows || next_position[0] < 0 || next_position[1] >= cols || next_position[1] < 0) {
            break;
        } else if (map_lines[next_position[0]][next_position[1]] != "#") {
            position = next_position;
        } else {
            direction = get_next_direction(direction);
        }
    }
    return false;
}

function find_starting_point(input_lines) {
    for (let row in input_lines) {
        for (let col in input_lines[row]) {
            if (input_lines[row][col] == "^") {
                return [parseInt(row), parseInt(col)];
            }
        }
    }
    return undefined;
}

function get_next_direction(current_direction) {
    if (!current_direction) {
        return [-1, 0];
    }
    if (current_direction[0] == 1 && current_direction[1] == 0) {
        return [0, -1];
    } else if (current_direction[0] == 0 && current_direction[1] == 1) {
        return [1, 0];
    } else if (current_direction[0] == -1 && current_direction[1] == 0) {
        return [0, 1];
    } else {
        return [-1, 0];
    }
}

function replaceCharInString(str, index, replacement) {
    let chars = [...str];
    chars[index] = replacement;
    return chars.join('');
  }


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
        if (original_map[position[0][position[1]]] != "X") {
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

    return undefined;
}

function detect_loop_in_map = 

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


export function solveday7(input) {
    let result = {
        "part1": day7part1(input),
        "part2": day7part2(input)
    }
    return result;
}

function day7part1(input) {
    let lines = parseInput(input);
    let valid_sum = 0;
    let valid_counter = 0;
    for (let line of lines) {
        let target_result = parseInt(line[0]);
        let numbers = line[1];
        let possibilities = [numbers[0]];
        for (let i = 1; i < numbers.length; i++) {
            possibilities = generateNextPossibilities(possibilities, numbers[i]);
        }
        for (let possibility of possibilities) {
            if (calculateEqn(possibility) == target_result) {
                valid_sum += target_result;
                valid_counter++;
                break;
            }
        }
    }
    console.log(`found ${valid_counter} valid eqns out of ${lines.length}`)
    return valid_sum;
}

function day7part2(input) {
    let lines = parseInput(input);
    let valid_sum = 0;
    let valid_counter = 0;
    for (let line of lines) {
        let target_result = parseInt(line[0]);
        let numbers = line[1];
        let possibilities = [numbers[0]];
        for (let i = 1; i < numbers.length; i++) {
            possibilities = generateNextPossibilities2(possibilities, numbers[i]);
        }
        for (let possibility of possibilities) {
            if (calculateEqn(possibility) == target_result) {
                valid_sum += target_result;
                valid_counter++;
                break;
            }
        }
    }
    console.log(`found ${valid_counter} valid eqns out of ${lines.length}`)
    return valid_sum;
}

function parseInput(input) {
    let lines = [];
    for (let line of input.split("\n")) {
        if (!line) {
            continue;
        }
        let separated = line.split(": ");
        let parsed_line = [separated[0], separated[1].split(" ")];
        lines.push(parsed_line);
    }
    return lines;
}

function calculateEqn(equation) {
    let value = parseInt(equation[0]);
    let i = 1;
    while (true) {
        if (i >= equation.length - 1) {
            break;
        }
        if (equation[i] == "+") {
            value += parseInt(equation[i+1]);
        } else if (equation[i] == "*") {
            value *= parseInt(equation[i+1]);
        } else if (equation[i] == "||") {
            value = parseInt(String(value) + String(equation[i+1]));
        } else {
            console.warn(`invalid equation ${equation} detected at index ${i} - ${equation[i]}`);
        }
        i += 2;
    }
    return value;
}

function generateNextPossibilities(possibilities_so_far, next_number) {
    // possibility looks like [n, +, n, *, n, ...] (all strings)
    let new_possibilities = [];
    if (possibilities_so_far.length == 1) {
        let new_possibility_plus = [possibilities_so_far[0], "+", next_number];
        let new_possibility_times = [possibilities_so_far[0], "*", next_number];
        new_possibilities.push(new_possibility_plus);
        new_possibilities.push(new_possibility_times);
        return new_possibilities;
    }
    for (let possibility of possibilities_so_far) {
        let new_possibility_plus = Array.from(possibility)
        new_possibility_plus.push("+");
        new_possibility_plus.push(next_number);
        new_possibilities.push(new_possibility_plus);
        
        let new_possibility_times = Array.from(possibility)
        new_possibility_times.push("*");
        new_possibility_times.push(next_number);
        new_possibilities.push(new_possibility_times);
    }
    return new_possibilities;
}

function generateNextPossibilities2(possibilities_so_far, next_number) {
    // possibility looks like [n, +, n, *, n, ...] (all strings)
    let new_possibilities = [];
    if (possibilities_so_far.length == 1) {
        let new_possibility_plus = [possibilities_so_far[0], "+", next_number];
        let new_possibility_times = [possibilities_so_far[0], "*", next_number];
        let new_possibility_concat = [possibilities_so_far[0], "||", next_number];
        new_possibilities.push(new_possibility_plus);
        new_possibilities.push(new_possibility_times);
        new_possibilities.push(new_possibility_concat);
        return new_possibilities;
    }
    for (let possibility of possibilities_so_far) {
        let new_possibility_plus = Array.from(possibility)
        new_possibility_plus.push("+");
        new_possibility_plus.push(next_number);
        new_possibilities.push(new_possibility_plus);
        
        let new_possibility_times = Array.from(possibility)
        new_possibility_times.push("*");
        new_possibility_times.push(next_number);
        new_possibilities.push(new_possibility_times);

        let new_possibility_concat = Array.from(possibility)
        new_possibility_concat.push("||");
        new_possibility_concat.push(next_number);
        new_possibilities.push(new_possibility_concat);
    }
    return new_possibilities;
}

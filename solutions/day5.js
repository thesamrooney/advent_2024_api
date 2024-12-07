
export function solveday5(input) {
    let result = {
        "part1": day5part1(input),
        "part2": day5part2(input)
    }
    return result;
}

function day5part1(input) {
    let input_lines = input.split("\n");
    let rules_and_updates = get_rules_and_updates(input_lines);
    let rules = rules_and_updates[0];
    let updates = rules_and_updates[1];
    let valid_updates = [];
    for (let update of updates) {
        if (validate_update(update, rules)) {
            valid_updates.push(update);
        }
    }
    let mid_number_sum = 0;
    for (let update of valid_updates) {
        let mid_number_idx = ((update.length - 1) / 2);
        let mid_number = update[mid_number_idx];
        mid_number_sum += parseInt(mid_number);
    }

    return mid_number_sum;
}

function day5part2(input) {
    let input_lines = input.split("\n");
    let rules_and_updates = get_rules_and_updates(input_lines);
    let rules = rules_and_updates[0];
    let updates = rules_and_updates[1];
    let invalid_updates = [];
    for (let update of updates) {
        if (!validate_update(update, rules)) {
            invalid_updates.push(update);
        }
    }
    let mid_number_sum = 0;
    for (let update of invalid_updates) {
        let sorted_update = find_valid_update(update, rules);
        let mid_number_idx = ((sorted_update.length - 1) / 2);
        let mid_number = sorted_update[mid_number_idx];
        mid_number_sum += parseInt(mid_number);
    }

    return mid_number_sum;
}

function find_valid_update(invalid_update, rules) {
    let valid_update = []
    for (let addition_idx in invalid_update) {
        let test_update = Array.from(valid_update);
        for (let i = 0; i <= valid_update.length; i++) {
            test_update.splice(i, 0, invalid_update[addition_idx])
            if (validate_update(test_update, rules)) {
                // console.log(test_update);
                break;
            }
            test_update = Array.from(valid_update);
        }
        valid_update = test_update;
    }
    return valid_update;
}

function validate_update(update, rules) {
    for (let rule of rules) {
        let idx_first = update.indexOf(rule[0]);
        let idx_second = update.indexOf(rule[1]);
        if (idx_first == -1 || idx_second == -1) {
            continue;
        }
        if (idx_first > idx_second) {
            return false;
        }
    }
    return true;
}

function get_rules_and_updates(input_lines) {
    let rules = [];
    let updates = [];
    let num_regex = /\d\d/g
    for (let line of input_lines) {
        let line_nums = line.match(num_regex);
        if (!line_nums) {
            continue;
        }
        if (line_nums.length == 2) {
            rules.push(line_nums);
        } else {
            updates.push(line_nums);
        }
    }
    return [rules, updates];
}

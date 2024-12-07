
export function solveday3(input) {
    let result = {
        "part1": day3part1(input),
        "part2": day3part2(input)
    }
    return result;
}

function day3part1(input) {
    let mul_finder_pattern = /mul\(\d*,\d*\)/g;
    let matches = input.match(mul_finder_pattern);
    let sum = 0;
    matches.forEach((match) => {
        let nums = match.match(/\d+/g);
        sum += Number(nums[0]) * Number(nums[1]);
    });
    return sum;
}

function day3part2(input) {
    let mul_and_control_pattern = /mul\(\d*,\d*\)|do\(\)|don\'t\(\)/g
    let matches = input.match(mul_and_control_pattern);
    let currently_accepting_muls = true;
    let sum = 0;
    for (let i = 0; i < matches.length; i++) {
        switch (matches[i]) {
            case "do()":
                currently_accepting_muls = true;
            break;
            case "don't()":
                currently_accepting_muls = false;
            break;
            default:
                if (currently_accepting_muls) {
                    let nums = matches[i].match(/\d+/g);
                    sum += Number(nums[0]) * Number(nums[1]);
                }
            break;
        }
    }
    return sum;
}
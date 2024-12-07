
export function solveday4(input) {
    let result = {
        "part1": day4part1(input),
        "part2": day4part2(input)
    }
    return result;
}

function day4part1(input) {
    let total_xmas_count = 0;
    let input_lines = input.split("\n")

    let rows = input_lines.length-1; // last entry is undefined
    let cols = input_lines[0].length;
    
    let transpose_lines = [];
    for (let i = 0; i < cols; i++) {
        transpose_lines.push("")
        for (let j = 0; j < rows; j++) {
            transpose_lines[i] += input_lines[j][i];
        }
    }

    let forward_diagonals = [];
    let diag_index = 0;
    for (let row = rows-1; row>=0; row--) {
        let i = row;
        let j = 0;
        forward_diagonals.push("");
        while (i < rows) {
            forward_diagonals[diag_index] += input_lines[i][j];
            i++;
            j++;
        }
        diag_index++;
    }
    for (let col = cols-1; col>0; col--) {
        let i = 0;
        let j = col;
        forward_diagonals.push("");
        while (j < cols) {
            forward_diagonals[diag_index] += input_lines[i][j];
            i++;
            j++;
        }
        diag_index++;
    }

    let reverse_diagonals = [];
    diag_index = 0;
    for (let row = rows-1; row>=0; row--) {
        let i = row;
        let j = 0;
        reverse_diagonals.push("");
        while (i >= 0) {
            reverse_diagonals[diag_index] += input_lines[i][j];
            i--;
            j++;
        }
        diag_index++;
    }
    for (let col = cols-1; col>0; col--) {
        let i = rows-1;
        let j = col;
        reverse_diagonals.push("");
        while (j < cols) {
            reverse_diagonals[diag_index] += input_lines[i][j];
            i--;
            j++;
        }
        diag_index++;
    }

    // I need to inspect:
    // - the original line
    // - the transposed lines
    // - the forward diagonal lines (top left to bottom right)
    // - the reverse diagonal lines (top right to bottom left)
    let xmas_pattern_forward = /XMAS/g;
    let xmas_pattern_reverse = /SAMX/g;
    input_lines.forEach(function(line) {
        let matches = line.match(xmas_pattern_forward)
        if (matches) {
            total_xmas_count += matches.length;
        }
        matches = line.match(xmas_pattern_reverse)
        if (matches) {
            total_xmas_count += matches.length;
        }
    })
    transpose_lines.forEach(function(line) {
        let matches = line.match(xmas_pattern_forward)
        if (matches) {
            total_xmas_count += matches.length;
        }
        matches = line.match(xmas_pattern_reverse)
        if (matches) {
            total_xmas_count += matches.length;
        }
    })
    forward_diagonals.forEach(function(line) {
        let matches = line.match(xmas_pattern_forward)
        if (matches) {
            total_xmas_count += matches.length;
        }
        matches = line.match(xmas_pattern_reverse)
        if (matches) {
            total_xmas_count += matches.length;
        }
    })
    reverse_diagonals.forEach(function(line) {
        let matches = line.match(xmas_pattern_forward)
        if (matches) {
            total_xmas_count += matches.length;
        }
        matches = line.match(xmas_pattern_reverse)
        if (matches) {
            total_xmas_count += matches.length;
        }
    })

    return total_xmas_count;
}



function day4part2(input) {
    let total_x_mas_count = 0;
    let input_lines = input.split("\n")
    let rows = input_lines.length-1; // last entry is undefined
    let cols = input_lines[0].length;

    for (let i = 1; i < rows-1; i++) {
        for (let j = 1; j < cols-1; j++) {
            if (input_lines[i][j] == "A") {
                let tlbr = input_lines[i-1][j-1] + input_lines[i+1][j+1];
                let trbl = input_lines[i+1][j-1] + input_lines[i-1][j+1];
                if ((tlbr == "MS" || tlbr == "SM") && (trbl == "MS" || trbl == "SM")) {
                    total_x_mas_count += 1;
                }
            }
        }
    }
    
    return total_x_mas_count;
}


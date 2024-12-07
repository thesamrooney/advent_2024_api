
import { solveday1 } from './solutions/day1.js';
import { solveday2 } from './solutions/day2.js';
import { solveday3 } from './solutions/day3.js';
import { solveday4 } from './solutions/day4.js';
import { solveday5 } from './solutions/day5.js';
import { solveday6 } from './solutions/day6.js';
import { solveday7 } from './solutions/day7.js';

export async function SolveDay(day, input)
{
    switch(day)
    {
        case 1:
            return solveday1(input);
        case 2:
            return solveday2(input);
        case 3:
            return solveday3(input);
        case 4:
            return solveday4(input);
        case 5:
            return solveday5(input);
        case 6:
            return solveday6(input);
        case 7:
            return solveday7(input);
        case 8:
            break;
        case 9:
            break;
        case 10:
            break;
        case 11:
            break;
        case 12:
            break;
        case 13:
            break;
        case 14:
            break;
        case 15:
            break;
        case 16:
            break;
        case 17:
            break;
        case 18:
            break;
        case 19:
            break;
        case 20:
            break;
        case 21:
            break;
        case 22:
            break;
        case 23:
            break;
        case 24:
            break;
        case 25:
            break;
        default:
            return {"error": "Could not find day."};
            break;
    }
    return {"error": "Not yet implemented."};
}
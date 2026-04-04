import { isNumber, arrayContainNumbers } from './helpers.ts';

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: 1 | 2 | 3
    ratingDescription: string
    target: number
    average: number
}

if (process.argv[1] === import.meta.filename) {
    const args = process.argv;

    if (args.length < 4) {
        throw new Error(
            'You must defined a target value and a series of total trained hours per day.',
        );
    }

    const target = Number(args[2]);
    if (!isNumber(target)) {
        throw new Error('Target must be a number.');
    }

    const daily_hours = args.slice(3).map((item) => Number(item));
    if (!arrayContainNumbers(daily_hours)) {
        throw new Error(
            'After the target you must pass a series of training hours.',
        );
    }

    console.log(calculateExercises(daily_hours, target));
}

function calculateExercises(daily_hours: number[], target: number): Result {
    const periodLength = daily_hours.length;
    const trainingDays = daily_hours.filter((item) => item !== 0).length;
    const total_hours = daily_hours.reduce((acc, a) => acc + a, 0);
    const average = total_hours / periodLength;
    const success = average >= target;

    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    if (average / target >= 1) {
        rating = 3;
        ratingDescription = 'excellent, you met your goal';
    } else if (average / target >= 0.5) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'needs improvement';
    }

    return {
        periodLength,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription,
    };
}

export { calculateExercises };

import { isNumber } from './helpers.ts';

if (process.argv[1] === import.meta.filename) {
    const args = process.argv;

    if (args.length != 4) {
        throw new Error('You need to pass the height and weight.');
    }

    const height = Number(args[2]);
    if (!isNumber(height)) {
        throw new Error('Height must be a number.');
    }

    const weight = Number(args[3]);
    if (!isNumber(weight)) {
        throw new Error('Weight must be a number.');
    }

    console.log(calculateBmi(height, weight));
}

function calculateBmi(height: number, weight: number): string {
    // to meters
    const heightMeters = height / 100;

    const bmi = weight / (heightMeters * heightMeters);

    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal range';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    return 'Obese';
}

export { calculateBmi };

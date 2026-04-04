const isNumber = (value: unknown): boolean => {
    const num = Number(value);
    return !isNaN(num);
};

const arrayContainNumbers = (array: unknown[]): boolean => {
    return array.every((item) => isNumber(item));
};

export { isNumber, arrayContainNumbers };

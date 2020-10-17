export default class Salary {
    constructor() {}

    monthlyTotal(salaries) {
        let total = 0;
        for (let s of salaries) {
            total += s / 12;
        }
    }

    excessiveAlert(monthlyTotal) {
        return monthlyTotal > 20000 ? true : false;
    }
}

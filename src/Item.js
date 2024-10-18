class Meal {
  constructor(name, calorie) {
    this.id = crypto.randomUUID().replace(/-/g, '').slice(15);
    this.name = name;
    this.calories = calorie;
  }
}

class WorkOut {
  constructor(name, calorie) {
    this.id = crypto.randomUUID().replace(/-/g, '').slice(15);
    this.name = name;
    this.calories = calorie;
  }
}

export { Meal, WorkOut };

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimitKey') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = parseInt(localStorage.getItem('calorieLimitKey'));
    }
    return calorieLimit;
  }
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimitKey', calorieLimit);
  }

  static getTotalCalorie(defaultCalories = 0) {
    let totalCalories;
    if (localStorage.getItem('totalCalorieKey') === null) {
      totalCalories = defaultCalories;
    } else {
      totalCalories = parseInt(localStorage.getItem('totalCalorieKey'));
    }
    return totalCalories;
  }

  static updateTotalCalories(totalCalories) {
    localStorage.setItem('totalCalorieKey', totalCalories);
  }

  static getMeals() {
    let meals;
    if (localStorage.getItem('getMealsKey') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('getMealsKey'));
    }
    return meals;
  }

  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('getMealsKey', JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem('getMealsKey', JSON.stringify(meals));
  }

  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('getWorkoutsKey') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('getWorkoutsKey'));
    }
    return workouts;
  }

  static saveWorkouts(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('getWorkoutsKey', JSON.stringify(workouts));
  }

  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem('getWorkoutsKey', JSON.stringify(workouts));
  }

  static clearAll() {
    localStorage.removeItem('totalCalorieKey');
    localStorage.removeItem('getMealsKey');
    localStorage.removeItem('getWorkoutsKey');
  }
}

export default Storage;

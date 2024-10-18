import Storage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalorie = Storage.getTotalCalorie(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgressBar();

    document.querySelector('#limit').value = this._calorieLimit;
  }

  //Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalorie += meal.calories;
    Storage.updateTotalCalories(this._totalCalorie);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkOut(workout) {
    this._workouts.push(workout);
    this._totalCalorie -= workout.calories;
    Storage.updateTotalCalories(this._totalCalorie);
    Storage.saveWorkouts(workout);
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalorie -= meal.calories;
      Storage.updateTotalCalories(this._totalCalorie);
      this._meals.splice(index, 1);
      Storage.removeMeal(id);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalorie += workout.calories;
      Storage.updateTotalCalories(this._totalCalorie);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }

  reset() {
    this._totalCalorie = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
    Storage.clearAll();
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    Storage.setCalorieLimit(calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  loadItems() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  //Private Methods

  _displayNewMeal(meal) {
    const mealsEl = document.querySelector(`#meal-items`);
    const div = document.createElement('div');
    div.classList.add('card', 'my-2');
    div.setAttribute('data-id', meal.id);
    div.innerHTML = `<div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${meal.name}</h4>
                    <div
                      class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                    >
                      ${meal.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>`;

    mealsEl.appendChild(div);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.querySelector(`#workout-items`);
    const div = document.createElement('div');
    div.classList.add('card', 'my-2');
    div.setAttribute('data-id', workout.id);
    div.innerHTML = `<div class="card-body">
                  <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${workout.name}</h4>
                    <div
                      class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                    >
                      ${workout.calories}
                    </div>
                    <button class="delete btn btn-danger btn-sm mx-2">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>`;

    workoutsEl.appendChild(div);
  }

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    totalCaloriesEl.innerHTML = this._totalCalorie;
  }
  _displayCaloriesLimit() {
    const caloriesLimitEl = document.querySelector('#calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.querySelector('#calories-burned');

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.querySelector('#calories-remaining');
    const progressEl = document.querySelector('#calorie-progress');
    const test = document.querySelector('#test');

    const remaining = this._calorieLimit - this._totalCalorie;

    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
      test.lastElementChild.innerHTML = `You Have Exceed Your Limit`;
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      progressEl.classList.add('bg-success');
      progressEl.classList.remove('bg-danger');
    }
  }

  _displayCalorieProgressBar() {
    const progressEl = document.querySelector('#calorie-progress');
    const percentage = (this._totalCalorie / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);

    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgressBar();
  }
}

export default CalorieTracker;

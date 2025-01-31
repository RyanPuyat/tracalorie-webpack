import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, WorkOut } from './Item';
import '../css/main.css';
import './css/style.css';

// This Section has been refractor the meal and workout into one by changing to _newItem
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    console.log(this._tracker);
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));

    document
      .querySelector('#meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));
    document
      .querySelector('#workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
    document
      .querySelector('#filter-meals')
      .addEventListener('keyup', this._filterItem.bind(this, 'meal'));
    document
      .querySelector('#filter-workouts')
      .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
    document
      .querySelector('#reset')
      .addEventListener('click', this._reset.bind(this));
    document
      .querySelector('#limit-modal')
      .addEventListener('submit', this._setLimit.bind(this));

    this._tracker.loadItems();
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.querySelector(`#${type}-name`);
    const calories = document.querySelector(`#${type}-calories`);

    //validate input
    if (name.value === '' || calories.value === '') {
      alert('Please enter a value');
      return;
    }

    //add to the CalorieTracker
    if (type === 'meal') {
      const meal = new Meal(name.value, parseInt(calories.value));
      this._tracker.addMeal(meal);
      // this._displayNewItem(type, meal);
    } else {
      const workout = new WorkOut(name.value, parseInt(calories.value));
      this._tracker.addWorkOut(workout);
      // this._displayNewItem(type, workout);
    }

    //clear the inputs

    name.value = '';
    calories.value = '';

    //Bootstrap Collapse toggle
    const collapseMeal = document.querySelector(`#collapse-${type}`);
    const bsCollapse = new Collapse(collapseMeal, { toggle: true });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure you want to delete this item?')) {
        const id = e.target.closest('.card').getAttribute('data-id');

        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;

      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _setLimit(e) {
    e.preventDefault();

    const limit = document.querySelector('#limit');

    if (limit.value === '') {
      alert('Please Input a value');
      return;
    }

    this._tracker.setLimit(parseInt(limit.value));
    limit.value = '';

    // const modalEl = document.querySelector('#limit-modal');
    // const modal = Modal.getInstance(modalEl);
    // modal.hide();
    const modalEl = document.querySelector('#limit-modal');
    let modal = Modal.getInstance(modalEl);
    if (!modal) {
      modal = new Modal(modalEl);
    }
    modal.hide();
  }

  _reset() {
    this._tracker.reset();
    document.querySelector('#meal-items').innerHTML = '';
    document.querySelector('#workout-items').innerHTML = '';
    document.querySelector('#filter-meals').value = '';
    document.querySelector('#filter-workouts').value = '';
  }
}

if (window.location.pathname === '/index.html') {
  console.log('This is the index page');
} else if (window.location.pathname === '/tracker.html') {
  const app = new App();
  console.log('This is the tracker page');
}

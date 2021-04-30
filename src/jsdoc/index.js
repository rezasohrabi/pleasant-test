// @ts-check
import { add } from './calculator';

/**
 * @file index.js is the root file for jsdoc app example
 * @author Reza Sohrabi
 * @see <a href='http://www.rezasohrabi.com'>Reza Sohrabi Official</a>
 */

log(add(32, 50));

/**
 * Studen name
 * @type {string}
 */
const studentName = 'Reza Sohrabi';
log(studentName);
/**
 * Array of names
 * @type {Array<string>}
 */
const users = ['jack', 'michael', 'david'];
log(users);
/**
 * Person object
 * @typedef {Object} User
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {boolean} isOnline - User is online
 * @property {string|number} [age] - User age (optional)
 */

/**
 * @type {User}
 */
const jack = {
  name: 'jack',
  email: 'jack@yahoo.com',
  isOnline: false,
  age: 25,
};
log(jack);
/**
 * Calculate tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string} -Total with a dolor sign
 */
function calculateTax(amount, tax) {
  return `$ ${amount + tax * amount}`;
}
log(calculateTax(20, 0.2));
/**
 * Class to create a person object
 */
class Student {
  /**
   *
   * @param {Object} studentInfo Information about the student
   */
  constructor(studentInfo) {
    /**
     * @property {string} name Stuent name
     */
    this.name = studentInfo.name;
    /**
     * @property {string} degree Student degree
     */
    this.degree = studentInfo.degree;
    /**
     * @property {string|number} age Student age
     */
    this.age = studentInfo.age;
  }
  /**
   * @property {Function} greet Greeting with the name and age
   * @returns void
   */
  greet() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age}`);
  }
}
/**
 * reza
 * See {@link Student}
 */
const reza = new Student({
  name: 'Reza',
  degree: 'master',
  age: 26,
});

log(reza);

/**
 * Log all inputs in console
 * @param  {...any} args any input
 */
function log(...args) {
  console.log(...args);
}

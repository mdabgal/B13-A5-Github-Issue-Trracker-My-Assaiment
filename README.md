1. Ans:

* var, let, and const are used to declare variables in javaScript.
* var is the old way to declare variables. it is function scoped and can be redeclared.
* let is block scoped. Its value can be changed but it cannot be redeclared in the same block.
* const is also block scoped but its value cannot be changed after declaration.


2. Ans:

* the spread operator(...) is used to expand elements of an arry or object.
Example:

    const numbers = [1, 2, 3]
    const newNumbers = [...numbers, 4, 5]
here ...numbers copies all element from the numbers array into a new arry.


3. Ans:

These are array methods used to work with array elements.
* map() -> runs a function on each element and returns a new arry.
* filter() -> returns a new arry with elements that match a condition.
* forEach() -> runs a function for each element but does not return a new arry.


4. Ans: 

* Arrow function is a short and easier way to write functions in javaScript.
Exampe:

       const add = (a, b) => {
        retun a + b
       }


 5. Ans:

 * Template literals are used to create strings with variables inside them.
 * They are written using backticks  
 Example:
 const name = "Jannati"
 console.log(`My name is ${name}`)    


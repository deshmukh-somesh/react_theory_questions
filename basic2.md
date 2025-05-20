# React Interview Questions

## 1. What is React and why would you use it?
React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer and allows you to create reusable UI components.

## 2. Explain the difference between state and props in React.
* Props (short for properties) are passed from parent to child components and are immutable within the child component.
* State is managed within the component and can be changed using setState() or useState() hook.

## 3. What are hooks in React and why were they introduced?
Hooks allow you to use state and other React features without writing a class. They were introduced to solve problems with class components like complex lifecycle methods and difficulties in reusing stateful logic.

## 4. Explain the difference between Real DOM and Virtual DOM and give examples.
### Real DOM
* The Real DOM (Document Object Model) is the actual browser representation of the HTML elements on a webpage.
* When changes occur in the Real DOM, the entire tree structure often needs to be recalculated and rerendered, which is expensive.
* Direct manipulation of the Real DOM is slower and less efficient for frequent updates.

### Virtual DOM
* The Virtual DOM is a lightweight copy of the Real DOM kept in memory by React.
* React creates a new Virtual DOM tree when state changes, compares it with the previous one (diffing), and then only updates the necessary parts of the Real DOM.
* This process is called "reconciliation" and makes React applications more efficient.

### Examples

**Real DOM Example:**
```javascript
// Direct DOM manipulation without React
document.getElementById('counter').innerHTML = count + 1;
document.getElementById('message').style.color = 'red';
document.getElementById('status').className = 'active';
```
Each of these operations directly manipulates the browser DOM, potentially causing multiple reflows and repaints.

**Virtual DOM Example:**
```javascript
// React approach using Virtual DOM
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p id="counter">{count}</p>
      <p id="message" style={{ color: count > 10 ? 'red' : 'black' }}>Status message</p>
      <div id="status" className={count > 5 ? 'active' : 'inactive'}>Status</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
In this React example, when the count changes, React:
1. Creates a new Virtual DOM tree with the updated values
2. Compares it with the previous Virtual DOM tree
3. Identifies only the elements that need to change
4. Efficiently updates just those specific parts in the Real DOM

## 5. What are controlled and uncontrolled components in React? Define, explain, and give examples.

In React, form elements like `<input>`, `<textarea>`, and `<select>` maintain their own state in the DOM. When working with these elements, you can choose between two approaches: controlled or uncontrolled components.

### Controlled Components

**Definition:** A controlled component is a form element whose value is controlled by React state. The component doesn't maintain its own internal state.

**Explanation:**
* The form data is handled by the React component's state
* The current value is passed as a prop to the input
* Changes are handled through callbacks like `onChange`
* React state becomes the "single source of truth"
* More explicit and predictable, but requires more code

**Example:**
```javascript
import React, { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', { name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```
In this example, React state fully controls the input values. Every keystroke updates the state, and the input always reflects the current state.

### Uncontrolled Components

**Definition:** An uncontrolled component is a form element that maintains its own internal state. The form data is handled by the DOM itself.

**Explanation:**
* Form data is handled by the DOM, not by React component state
* Values are typically accessed using refs
* Simpler and requires less code
* Less direct control over input behavior
* Useful for integrating with non-React code or simple forms

**Example:**
```javascript
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value
    };
    console.log('Submitted data:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input 
            type="text" 
            defaultValue="" 
            ref={nameInputRef} 
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input 
            type="email" 
            defaultValue="" 
            ref={emailInputRef} 
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```
In this uncontrolled example, the form inputs manage their own state internally in the DOM. React only accesses the values when the form is submitted, using refs.

### Key Differences

1. **State Management**: 
   - Controlled: React state
   - Uncontrolled: DOM state

2. **Value Access**:
   - Controlled: Through state variables
   - Uncontrolled: Through refs or DOM queries

3. **Instant Validation**:
   - Controlled: Easy to implement as you have the value on every change
   - Uncontrolled: More complex, requires additional event handlers

4. **Form Submission**:
   - Controlled: Data is already in your state
   - Uncontrolled: Need to query the DOM to get values
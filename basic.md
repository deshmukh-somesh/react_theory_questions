### what is jsx ? 

- JavaScript XML (JSX) - Extension to the JavaScript language syntax. 
- Write XML-like code for elements and components. 
- JSX tags have a tag name, attributes, and children.
- JSX is not a necessity to write React applications. 
- JSX makes your react code simpler and elegant. 
- JSX ultimately transpiles to pure JavaScript which is understood by the browsers. 

  # JSX vs React.createElement

## Two Ways to Create React Elements

### 1. Using JSX

```jsx
const Hello = () => {
    return (
        <div>
            <h1>Hello Somesh</h1>
        </div>
    )
}

export default Hello;
```

### 2. Without Using JSX

```jsx
import React from 'react';

const Hello = () => {
    return React.createElement(
        "div", 
        null, 
        React.createElement("h1", null, "Hello Somesh Deshmukh!")
    )
}

export default Hello;

// Output: Hello Somesh Deshmukh!
```

## React.createElement Parameters Explained

`React.createElement` takes three main parameters:

### 1. Type
The first parameter specifies the element type:
- Can be a string for HTML elements (like 'div', 'span', 'button')
- Can be a React component (class or function)
- Can be a React Fragment (React.Fragment)

### 2. Props
The second parameter is an object containing the properties/attributes:
- Contains all attributes/props you want to pass to the element
- Can include event handlers like onClick, onSubmit
- Can be null or empty object ({}) if no props are needed
- Includes special props like key, ref, className, style, etc.

### 3. Children
The third and subsequent parameters are the children:
- Can be strings for text content
- Can be other React elements (more createElement calls)
- Can be arrays of elements
- Can be null or undefined (no children)

## Example With Props

```jsx
import React from 'react';

const Hello = () => {
    return React.createElement(
        "div", 
        { id: "hello", className: "dummyClass" }, 
        React.createElement("h1", null, "Hello Vishwas")
    )
}

export default Hello;
```

## JSX Differences from HTML

When using JSX, there are several differences from standard HTML:

| HTML Attribute | JSX Attribute |
|----------------|---------------|
| class          | className     |
| for            | htmlFor       |
| onclick        | onClick       |
| tabindex       | tabIndex      |

JSX follows a camelCase property naming convention for all attributes and event references.
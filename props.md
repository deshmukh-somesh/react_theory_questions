# Understanding React Props

Props are one of the most fundamental concepts in React. They allow you to pass data from parent components to child components, making your components reusable and dynamic.

## How to Pass Props to a Component

Props (short for "properties") are passed to components similar to how HTML attributes work. You can pass any JavaScript value through props, including strings, numbers, arrays, objects, and even functions.

```jsx
// Parent component
function App() {
  return (
    <Greeting 
      name="John" 
      age={25} 
      isAdmin={true}
      hobbies={['reading', 'swimming', 'coding']} 
      user={{ id: 1, email: 'john@example.com' }}
      onClick={() => console.log('Greeting clicked!')}
    />
  );
}

// Child component
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

## How to Read Props from a Component

There are two common ways to access props in a component:

### 1. Using the props object

```jsx
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old.</p>
      {props.isAdmin && <p>You have admin privileges.</p>}
      <p>Hobbies: {props.hobbies.join(', ')}</p>
      <p>Email: {props.user.email}</p>
      <button onClick={props.onClick}>Click me</button>
    </div>
  );
}
```

### 2. Using destructuring (recommended)

Destructuring makes your code cleaner and more readable:

```jsx
function Greeting({ name, age, isAdmin, hobbies, user, onClick }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      {isAdmin && <p>You have admin privileges.</p>}
      <p>Hobbies: {hobbies.join(', ')}</p>
      <p>Email: {user.email}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
```

## How to Specify Default Values for Props

Sometimes you want to ensure a prop has a value even if it's not provided by the parent component. There are two ways to set default values:

### 1. Using destructuring with default values

```jsx
function Greeting({ name = "Guest", age = 18, isAdmin = false, hobbies = [] }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      {isAdmin && <p>You have admin privileges.</p>}
      <p>Hobbies: {hobbies.join(', ')}</p>
    </div>
  );
}
```

### 2. Using the defaultProps property

```jsx
function Greeting(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
      <p>You are {props.age} years old.</p>
      {props.isAdmin && <p>You have admin privileges.</p>}
    </div>
  );
}

Greeting.defaultProps = {
  name: "Guest",
  age: 18,
  isAdmin: false,
  hobbies: []
};
```

## How to Pass JSX to a Component (Children Prop)

React has a special prop called `children` that allows you to pass JSX content between the opening and closing tags of your component:

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="Welcome">
      <p>This is some content inside the card.</p>
      <button>Click me</button>
      <img src="/logo.png" alt="Logo" />
    </Card>
  );
}
```

This pattern is very powerful for creating container components like cards, layouts, modals, etc.

## How Props Change Over Time

Props are immutable within a component - a component cannot modify its own props. However, the parent component can pass new props values when its state changes, causing the child component to re-render with the new data.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <DisplayCount count={count} />
    </div>
  );
}

function DisplayCount({ count }) {
  console.log("DisplayCount rendered with count:", count);
  return <p>Current count: {count}</p>;
}
```

In this example:
1. The `Counter` component manages a state variable `count`
2. It passes `count` as a prop to `DisplayCount`
3. When the button is clicked, `count` state updates
4. The new `count` value is passed to `DisplayCount`, triggering a re-render

Remember that whenever a parent component re-renders, all its child components will re-render by default (though React optimizes actual DOM updates).

## Best Practices for Working with Props

1. **Keep components pure**: Treat props as read-only; never modify them
2. **Use prop types or TypeScript**: Add type checking to your props for better documentation and error prevention
3. **Use destructuring**: Destructure props for cleaner, more readable code
4. **Provide default values**: When appropriate, specify default values for optional props
5. **Pass only what's needed**: Don't pass unnecessary props to components

## Example with TypeScript

If you're using TypeScript, you can define interfaces for your component props:

```tsx
interface GreetingProps {
  name: string;
  age: number;
  isAdmin?: boolean; // Optional prop
  hobbies?: string[];
  user?: {
    id: number;
    email: string;
  };
  onClick?: () => void;
}

function Greeting({ name, age, isAdmin = false, hobbies = [], user, onClick }: GreetingProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
      {isAdmin && <p>You have admin privileges.</p>}
      {hobbies.length > 0 && <p>Hobbies: {hobbies.join(', ')}</p>}
      {user && <p>Email: {user.email}</p>}
      {onClick && <button onClick={onClick}>Click me</button>}
    </div>
  );
}
```

## Conclusion

Props are the primary way to pass data between components in React. Understanding how to use props effectively is essential for building reusable, composable components. By mastering props, you'll be able to create flexible component APIs that make your React applications more maintainable and robust.
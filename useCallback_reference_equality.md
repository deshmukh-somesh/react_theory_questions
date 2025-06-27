# useCallback and Reference Equality in React

## What is Reference Equality?

**Reference equality** in `useCallback` is about comparing **memory addresses** rather than function content.

```javascript
// These functions do the same thing but have different references
const func1 = () => console.log('hello');
const func2 = () => console.log('hello');

console.log(func1 === func2); // false (different references)
console.log(func1 === func1); // true (same reference)
```

## The Problem Without useCallback

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ New function created on every render
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <ExpensiveChild onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered'); // This will log on every render!
  return <button onClick={onClick}>Click me</button>;
});
```

### What happens:
- Every time `Parent` renders, `handleClick` is recreated
- New `handleClick` has a **different reference** 
- `ExpensiveChild` thinks props changed and re-renders
- `React.memo` doesn't help because `onClick !== onClick` (reference inequality)

## Solution With useCallback

```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ Same function reference between renders
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty dependency array = never changes

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <ExpensiveChild onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log('ExpensiveChild rendered'); // Only logs when actually needed!
  return <button onClick={onClick}>Click me</button>;
});
```

## Visual Example of Reference Changes

```javascript
function Demo() {
  const [count, setCount] = useState(0);

  // Without useCallback - new reference every time
  const withoutCallback = () => console.log('hello');
  
  // With useCallback - same reference
  const withCallback = useCallback(() => console.log('hello'), []);

  useEffect(() => {
    console.log('withoutCallback changed'); // Logs every render
  }, [withoutCallback]);

  useEffect(() => {
    console.log('withCallback changed'); // Logs only once
  }, [withCallback]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## When Dependencies Change

```javascript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Function reference changes only when 'query' changes
  const search = useCallback(() => {
    console.log(`Searching for: ${query}`);
  }, [query]); // Dependency array

  // This effect runs only when search function reference changes
  useEffect(() => {
    search();
  }, [search]);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <select 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="recent">Recent</option>
      </select>
    </div>
  );
}
```

## Comparison: With vs Without useCallback

| Scenario | Without useCallback | With useCallback |
|----------|-------------------|------------------|
| **Reference** | New every render | Same reference (until deps change) |
| **Child re-renders** | Always | Only when needed |
| **Memory** | Creates new function | Reuses same function |
| **Performance** | Can cause unnecessary renders | Prevents unnecessary renders |

## Real-World Example: API Calls

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // ❌ Without useCallback - API called on every render
  const fetchUser = async () => {
    setLoading(true);
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    setUser(userData);
    setLoading(false);
  };

  // ✅ With useCallback - API called only when userId changes
  const fetchUserMemoized = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    setUser(userData);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchUserMemoized();
  }, [fetchUserMemoized]);

  return (
    <div>
      {loading ? 'Loading...' : user?.name}
    </div>
  );
}
```

## When to Use useCallback

### ✅ Use useCallback when:
- Passing functions to child components wrapped with `React.memo`
- Functions are dependencies in `useEffect`
- Expensive computations or API calls in functions
- Preventing unnecessary re-renders in large component trees

```javascript
// Good use case
const MemoizedChild = React.memo(ChildComponent);

function Parent() {
  const expensiveCallback = useCallback(() => {
    // Expensive operation
  }, [dependency]);

  return <MemoizedChild onAction={expensiveCallback} />;
}
```

### ❌ Don't use useCallback when:
- Simple functions with no dependencies
- Functions not passed to child components
- Over-optimizing (premature optimization)

```javascript
// Unnecessary use of useCallback
function SimpleComponent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Overkill for simple operations

  return <button onClick={handleClick}>Click</button>;
}
```

## Common Patterns

### 1. Form Handling
```javascript
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = useCallback((field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  }, []);

  return (
    <form>
      <input onChange={handleInputChange('name')} />
      <input onChange={handleInputChange('email')} />
    </form>
  );
}
```

### 2. Debounced Search
```javascript
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    }, 300),
    []
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ResultsList results={results} />
    </div>
  );
}
```

## Key Takeaways

### Reference Equality Concept
```javascript
// These are referentially different (even though they look the same)
const func1 = () => 'hello';
const func2 = () => 'hello';
console.log(func1 === func2); // false

// useCallback ensures referential equality between renders
const memoizedFunc = useCallback(() => 'hello', []);
// Same memoizedFunc reference across renders (until dependencies change)
```

### The Bottom Line
- **Reference equality** = "Are these pointing to the same spot in memory?"
- `useCallback` ensures your function has the **same memory address** between renders
- This prevents unnecessary child component re-renders
- Use it strategically, not everywhere

## Performance Impact

```javascript
// Measuring re-renders
function PerformanceExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // This will cause ExpensiveChild to re-render every time
  const badCallback = () => console.log('bad');
  
  // This will only re-render ExpensiveChild when 'count' changes
  const goodCallback = useCallback(() => {
    console.log('good', count);
  }, [count]);

  return (
    <div>
      <button onClick={() => setOther(other + 1)}>
        Other: {other}
      </button>
      <ExpensiveChild onClick={goodCallback} />
    </div>
  );
}
```

Remember: `useCallback` is about **optimizing child component re-renders**, not about the function itself!

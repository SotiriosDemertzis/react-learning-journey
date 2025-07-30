export {initialCartItems,initialTasks,project1SkillsLearned,
    project2SkillsLearned,project3SkillsLearned,project4SkillsLearned,PRODUCTS
}

const initialCartItems = [
        {id: 1, name: 'Laptop', price: 999, quantity: 1},
        {id: 2, name: 'Mouse', price: 25, quantity: 2},
        {id: 3, name: 'Keyboard', price: 45, quantity: 1},
        {id: 4, name: 'Monitor', price: 199, quantity: 1}
    ];

const initialTasks = [
    { id: 1, description: 'Complete the project report', completed: false },
    { id: 2, description: 'Prepare for the client meeting', completed: false },
    { id: 3, description: 'Update the project documentation', completed: false }
];

const project1SkillsLearned = [
    { title: 'Components', description: 'Reusable building blocks' },
    { title: 'JSX Syntax Rules', description: 'HTML-like syntax for defining UI' },
    { title: 'Props Concept', description: 'Pass data to components, destructuring, types, default props' },
    { title: 'Component Reusability', description: 'Build once, use everywhere' },
    { title: 'State Concept', description: 'Data that can change over time within a component' },
    { title: 'UseState Syntax', description: 'const [state, setState] = useState(initialValue)' },
    { title: 'State Triggers Re-renders', description: 'When state changes, React updates the UI' },
    { title: 'State Update Patterns', description: 'Functional updates, batching, etc.' },
    { title: 'Multiple State Variables', description: 'Managing different pieces of state separately' }
];

const project2SkillsLearned = [
    { title: 'Side effects concept', description: 'Operations that affect things outside the component' },
    { title: 'useEffect patterns',
      details: [
        { title: 'No dependency array: runs after every render'},
        { title: 'Empty array []: runs once on mount'},
        { title: 'With dependencies [count]: runs when dependencies change'}
      ]
    },
    { title: 'Common useEffect cases',
      details: [
        { title: 'Data fetching from APIs'},
        { title: 'Setting up timers/intervals'},
        { title: 'Event listeners'},
        { title: 'Document title updates'}
      ]
    },
    { title: 'Cleanup functions', description: 'Preventing memory leaks with return () => cleanup()' },
    { title: 'Real practice', description: 'Built weather dashboard with real API integration' }
];

const project3SkillsLearned = [
  { 
    title: 'Custom Hooks Architecture', 
    description: 'Building reusable stateful logic with custom hooks',
    details: [
      { title: 'useTasks: Complete CRUD operations with localStorage persistence' },
      { title: 'useFilter: Efficient filtering with useMemo optimization' },
      { title: 'useLocalStorage: Browser storage abstraction with error handling' }
    ]
  },
  { 
    title: 'Advanced State Management', 
    description: 'Complex state patterns beyond basic useState',
    details: [
      { title: 'Multiple useState hooks for different UI concerns' },
      { title: 'State lifting and prop drilling management' },
      { title: 'Controlled vs uncontrolled components (forms and inputs)' },
      { title: 'State synchronization across multiple components' }
    ]
  },
  { 
    title: 'Performance Optimization Techniques', 
    description: 'React optimization patterns for better user experience',
    details: [
      { title: 'useCallback: Memoizing event handlers and complex functions' },
      { title: 'useMemo: Optimizing expensive filtering operations' },
      { title: 'Lazy initialization in useState for localStorage reads' },
      { title: 'Proper dependency arrays to prevent infinite re-renders' }
    ]
  },
  { 
    title: 'Advanced useEffect Patterns', 
    description: 'Side effect management and cleanup',
    details: [
      { title: 'Auto-focus management with refs and useEffect' },
      { title: 'Timer cleanup patterns for error message timeouts' },
      { title: 'Event listener management (storage events for tab sync)' },
      { title: 'Conditional effect execution with proper dependencies' }
    ]
  },
  { 
    title: 'React Refs and DOM Manipulation', 
    description: 'Direct DOM access when needed',
    details: [
      { title: 'useRef for form input references (textAreaRef, editInputRef)' },
      { title: 'Programmatic focus and text selection' },
      { title: 'Imperative DOM operations within React paradigm' }
    ]
  },
  { 
    title: 'Form Handling and User Input', 
    description: 'Complex form interactions and validation',
    details: [
      { title: 'Multiple input types (textarea, checkbox, radio buttons)' },
      { title: 'Keyboard event handling (Enter, Shift+Enter, Escape)' },
      { title: 'Real-time validation and error display' },
      { title: 'Form submission prevention and custom handling' }
    ]
  },
  { 
    title: 'Component Architecture and Props', 
    description: 'Professional component design patterns',
    details: [
      { title: 'PropTypes for runtime type checking' },
      { title: 'Default props and optional prop handling' },
      { title: 'Component composition and reusability' },
      { title: 'Single responsibility principle in component design' }
    ]
  },
  { 
    title: 'Error Handling and User Experience', 
    description: 'Robust error management patterns',
    details: [
      { title: 'Try-catch blocks in event handlers' },
      { title: 'User-friendly error messages with auto-dismissal' },
      { title: 'Graceful degradation for localStorage failures' },
      { title: 'Input validation and duplicate prevention' }
    ]
  },
  { 
    title: 'Browser API Integration', 
    description: 'Working with browser storage and events',
    details: [
      { title: 'localStorage API with JSON serialization' },
      { title: 'Cross-tab synchronization with storage events' },
      { title: 'SSR-safe browser API access' },
      { title: 'Storage quota and error handling' }
    ]
  }
];

const project4SkillsLearned = [
  { 
    title: 'React Context API Architecture', 
    description: 'Building scalable state management with Context and Provider pattern',
    details: [
      { title: 'createContext: Creating application-wide state containers' },
      { title: 'Context Provider: Wrapping components to share state globally' },
      { title: 'useContext hook: Consuming context in child components' },
      { title: 'Custom context hooks: Creating reusable context abstractions (useShop)' }
    ]
  },
  { 
    title: 'Advanced useReducer Patterns', 
    description: 'Complex state management with reducer functions and actions',
    details: [
      { title: 'Action types: Defining structured action constants' },
      { title: 'Reducer functions: Pure functions for state transitions' },
      { title: 'Complex state updates: Handling nested objects and arrays' },
      { title: 'Immutable updates: Spread operators and array methods' }
    ]
  },
  { 
    title: 'State Management Architecture', 
    description: 'Organizing application state for scalability and maintainability',
    details: [
      { title: 'State normalization: Separating UI state from data state' },
      { title: 'Action creators: Encapsulating dispatch logic in functions' },
      { title: 'Computed properties: Deriving state from base state values' },
      { title: 'State persistence: localStorage integration with useEffect' }
    ]
  },
  { 
    title: 'Shopping Cart Logic Implementation', 
    description: 'Complex e-commerce functionality with real-world patterns',
    details: [
      { title: 'Cart operations: Add, remove, update quantity, clear cart' },
      { title: 'Duplicate handling: Checking existing items and updating quantities' },
      { title: 'Cart calculations: Total price and item count computations' },
      { title: 'Stock management: Inventory tracking and availability checks' }
    ]
  },
  { 
    title: 'Advanced Filtering and Search', 
    description: 'Multi-criteria data filtering and sorting mechanisms',
    details: [
      { title: 'Multi-filter logic: Category and search term combinations' },
      { title: 'Dynamic sorting: Multiple sort criteria (name, price, rating)' },
      { title: 'Real-time filtering: Immediate UI updates on filter changes' },
      { title: 'Derived state: Computing filtered results from base data' }
    ]
  },
  { 
    title: 'Component Communication Patterns', 
    description: 'Efficient data flow between multiple components',
    details: [
      { title: 'Provider pattern: Sharing state across component tree' },
      { title: 'Consumer components: Multiple components accessing shared state' },
      { title: 'State lifting: Moving state to appropriate levels' },
      { title: 'Component isolation: Keeping components focused and reusable' }
    ]
  },
  { 
    title: 'UI State Management', 
    description: 'Managing complex user interface states and interactions',
    details: [
      { title: 'Modal/sidebar state: Toggle visibility and overlay management' },
      { title: 'View modes: Grid/list toggle functionality' },
      { title: 'Conditional rendering: Dynamic UI based on state' },
      { title: 'Loading and empty states: User experience considerations' }
    ]
  },
  { 
    title: 'Data Persistence and Side Effects', 
    description: 'Browser storage integration and effect management',
    details: [
      { title: 'localStorage integration: Persisting cart data across sessions' },
      { title: 'useEffect with dependencies: Syncing state with storage' },
      { title: 'Data serialization: JSON stringify/parse operations' },
      { title: 'Error handling: Graceful degradation for storage failures' }
    ]
  },
  { 
    title: 'Performance Optimization Techniques', 
    description: 'Optimizing context-based applications for better performance',
    details: [
      { title: 'Context value optimization: Preventing unnecessary re-renders' },
      { title: 'Computed values: Memoizing expensive calculations' },
      { title: 'Component structure: Organizing for minimal re-render scope' },
      { title: 'State organization: Grouping related state for efficiency' }
    ]
  },
  { 
    title: 'Complex Event Handling', 
    description: 'Managing sophisticated user interactions and events',
    details: [
      { title: 'Form interactions: Input handling with immediate state updates' },
      { title: 'Button states: Dynamic button text and styling based on state' },
      { title: 'Quantity controls: Increment/decrement with validation' },
      { title: 'Overlay interactions: Click-outside-to-close patterns' }
    ]
  },
  { 
    title: 'Error Handling and Validation', 
    description: 'Robust error management and user input validation',
    details: [
      { title: 'Context error boundaries: Preventing context-related crashes' },
      { title: 'State validation: Ensuring data integrity in reducers' },
      { title: 'User feedback: Error states and validation messages' },
      { title: 'Fallback UI: Graceful handling of missing or invalid data' }
    ]
  },
  { 
    title: 'Modern React Patterns', 
    description: 'Contemporary React development patterns and best practices',
    details: [
      { title: 'Hook composition: Combining multiple hooks effectively' },
      { title: 'Custom hook creation: Abstracting complex logic (useShop)' },
      { title: 'Component composition: Building complex UIs from simple components' },
      { title: 'Separation of concerns: Clear boundaries between logic and presentation' }
    ]
  }
];

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics", image: "🎧", rating: 4.5, stock: 15 },
  { id: 2, name: "Coffee Maker", price: 149.99, category: "Appliances", image: "☕", rating: 4.2, stock: 8 },
  { id: 3, name: "Running Shoes", price: 79.99, category: "Sports", image: "👟", rating: 4.7, stock: 12 },
  { id: 4, name: "Smartphone", price: 699.99, category: "Electronics", image: "📱", rating: 4.4, stock: 5 },
  { id: 5, name: "Backpack", price: 49.99, category: "Accessories", image: "🎒", rating: 4.3, stock: 20 },
  { id: 6, name: "Laptop", price: 1299.99, category: "Electronics", image: "💻", rating: 4.6, stock: 3 },
  { id: 7, name: "Water Bottle", price: 24.99, category: "Sports", image: "🍼", rating: 4.1, stock: 30 },
  { id: 8, name: "Desk Lamp", price: 39.99, category: "Home", image: "🪔", rating: 4.0, stock: 18 },
  { id: 9, name: "Gaming Mouse", price: 59.99, category: "Electronics", image: "🖱️", rating: 4.8, stock: 10 },
  { id: 10, name: "Yoga Mat", price: 29.99, category: "Sports", image: "🧘‍♀️", rating: 4.5, stock: 25 },
  { id: 11, name: "Bluetooth Speaker", price: 89.99, category: "Electronics", image: "🔊", rating: 4.3, stock: 7 },
  { id: 12, name: "Electric Kettle", price: 39.99, category: "Appliances", image: "🫖", rating: 4.2, stock: 10 },
  { id: 13, name: "Fitness Tracker", price: 199.99, category: "Electronics", image: "⌚", rating: 4.6, stock: 6 },
  { id: 14, name: "Portable Charger", price: 29.99, category: "Accessories", image: "🔋", rating: 4.4, stock: 15 },
  { id: 15, name: "Smartwatch", price: 249.99, category: "Electronics", image: "⌚", rating: 4.5, stock: 4 },
  { id: 16, name: "Air Purifier", price: 199.99, category: "Home", image: "🌬️", rating: 4.3, stock: 8 },
  { id: 17, name: "Electric Toothbrush", price: 49.99, category: "Health", image: "🪥", rating: 4.1, stock: 20 },
  { id: 18, name: "Smart Thermostat", price: 129.99, category: "Home", image: "🌡️", rating: 4.4, stock: 5 },
  { id: 19, name: "Wireless Charger", price: 39.99, category: "Accessories", image: "🔌", rating: 4.2, stock: 12 },
  { id: 20, name: "Digital Camera", price: 499.99, category: "Electronics", image: "📷", rating: 4.7, stock: 2 },
  { id: 21, name: "Smart Light Bulb", price: 19.99, category: "Home", image: "💡", rating: 4.0, stock: 50 },
  { id: 22, name: "Portable Bluetooth Speaker", price: 79.99, category: "Electronics", image: "📻", rating: 4.5, stock: 15 },
  { id: 23, name: "Electric Grill", price: 89.99, category: "Appliances", image: "🔥", rating: 4.3, stock: 10 },
  { id: 24, name: "Smart Doorbell", price: 129.99, category: "Home", image: "🔔", rating: 4.6, stock: 6 },
  { id: 25, name: "Wireless Earbuds", price: 149.99, category: "Electronics", image: "🎧", rating: 4.8, stock: 8 },
  { id: 26, name: "Electric Bike", price: 999.99, category: "Sports", image: "🚲", rating: 4.9, stock: 1 },
  { id: 27, name: "Smart Refrigerator", price: 1999.99, category: "Appliances", image: "❄️", rating: 4.5, stock: 3 },
  { id: 28, name: "Gaming Console", price: 399.99, category: "Electronics", image: "🎮", rating: 4.7, stock: 2 },
  { id: 29, name: "Smart Vacuum Cleaner", price: 299.99, category: "Home", image: "🧹", rating: 4.4, stock: 4 },
  { id: 30, name: "Wireless Keyboard", price: 49.99, category: "Electronics", image: "⌨️", rating: 4.2, stock: 10 }
];
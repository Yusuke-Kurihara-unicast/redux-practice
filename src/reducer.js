const initialState = {
  todos: [
    { id: 0, text: "first todo", completed: false },
    { id: 1, text: "second todo", completed: true, color: "blue" },
    { id: 2, text: "third todo", completed: false }
  ],
  filters: {
    status: "All",
    color: []
  }
};

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todo/todoAdded": {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nextTodoId(state.todo),
            text: action.payload,
            completed: false
          }
        ],
        filters: {
          status: "All",
          color: []
        }
      };
    }
    case "todo/todoToggled": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }
          return {
            ...todo,
            completed: !todo.completed
          };
        })
      };
    }
    case "filters/statusFilterChanged":
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload
        }
      };
    default:
      return state;
  }
};

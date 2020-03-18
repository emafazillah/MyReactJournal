import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
// import { getTodos } from "../redux/selectors";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { VISIBILITY_FILTERS } from "../constants";

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);

// const mapStateToProps = state => {
//   const { byIds, allIds } = state.todos || {};
//   const todos =
//     allIds && allIds.length
//       ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { todos };
// };

// export default connect(state => ({ todos: getTodos(state) }))(TodoList);

const mapStateToProps = state => {
  const { visibilityFilter } = state
  const todos = getTodosByVisibilityFilter(state, visibilityFilter)
  return { todos }
}

export default connect(mapStateToProps)(TodoList);
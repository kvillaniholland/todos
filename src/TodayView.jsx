import React from "react";
import TodoList from "./TodoList.jsx";

export default class TodayView extends React.Component {
  render() {
    return (
      <TodoList
        listId="today-todos"
        todos={this.props.todos}
        onCheck={this.props.onTodoCheck}
        onReorder={this.props.onReorder}
      />
    );
  }
}

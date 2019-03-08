import React from "react";
import store from "./store";
import TodoList from "./TodoList";

export default class TodayView extends React.Component {
  render() {
    return (
      <TodoList
        listId="today-todos"
        todos={store.todayTodos}
        onReorder={this.props.onReorder}
      />
    );
  }
}

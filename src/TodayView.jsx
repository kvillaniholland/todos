import React from "react";
import { observer } from "mobx-react";
import store from "./store";
import TodoList from "./TodoList";

class TodayView extends React.Component {
  render() {
    return <TodoList todos={store.todayTodos} />;
  }
}

export default observer(TodayView);

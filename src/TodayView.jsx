import React from "react";
import { observer } from "mobx-react";
import store from "./store";
import TodoList from "./TodoList";
import ChoreList from "./ChoreList";
import SomedayList from "./SomedayList";

class TodayView extends React.Component {
  render() {
    return (
      <>
        <TodoList todos={store.todayTodos} />
        <ChoreList chores={store.todayChores} />
        <SomedayList somedays={store.todaySomedays()} />
      </>
    );
  }
}

export default observer(TodayView);

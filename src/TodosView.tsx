import React from "react";
import { observer } from "mobx-react";
import { CheckBox } from "grommet";
import store from "./store";
import TodoList from "./TodoList";

class TodosView extends React.Component {
  state = {
    showDone: true
  };

  render() {
    const { showDone } = this.state;
    return (
      <>
        <CheckBox
          checked={showDone}
          onChange={(event: any) =>
            this.setState({ showDone: event.target.checked })
          }
        />{" "}
        Show completed
        <TodoList
          todos={showDone ? store.allTodos : store.allIncompleteTodos}
        />
      </>
    );
  }
}

export default observer(TodosView);

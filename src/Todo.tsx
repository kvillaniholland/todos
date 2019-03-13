import React from "react";
import { Box, CheckBox, Button } from "grommet";
import { observer } from "mobx-react";
import DatePicker from "react-datepicker";
import { addDays } from "./store";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

class Todo extends React.Component<{ todo: any }> {
  render() {
    const { todo } = this.props;
    return (
      <Box direction="row" pad="small">
        <CheckBox checked={todo.done} onChange={todo.toggleDone} />
        {todo.task}
        <DatePicker
          popperPlacement="left-start"
          selected={todo.due}
          onChange={todo.setDue}
        />
        <Button
          label="Postpone"
          onClick={() => todo.setDue(addDays(todo.due, 1))}
        />
        <Button label="Delete" onClick={todo.delete} />
      </Box>
    );
  }
}

export default observer(Todo);

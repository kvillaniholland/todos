import React from "react";
import { Box, CheckBox } from "grommet";
import { observer } from "mobx-react";

class Todo extends React.Component<{ todo: any; onCheck: any }> {
  render() {
    return (
      <Box direction="row" pad="small">
        <CheckBox
          checked={this.props.todo.done}
          onChange={this.props.onCheck}
        />
        {this.props.todo.task}
      </Box>
    );
  }
}

export default observer(Todo);

import React from "react";
import { Box, CheckBox } from "grommet";

export default class Todo extends React.Component {
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

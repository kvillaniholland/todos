import React from "react";
import { Box, CheckBox, Button } from "grommet";
import { observer } from "mobx-react";
import DatePicker from "react-datepicker";
import { addDays } from "./store";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

class Someday extends React.Component<{ someday: any }> {
  render() {
    const { someday } = this.props;
    return (
      <Box direction="row" pad="small">
        {someday.task}
        <Button label="Schedule" onClick={someday.schedule} />
      </Box>
    );
  }
}

export default observer(Someday);

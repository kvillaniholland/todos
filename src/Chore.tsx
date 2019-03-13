import React from "react";
import { Box, CheckBox, Button } from "grommet";
import { observer } from "mobx-react";
import DatePicker from "react-datepicker";
import { addDays } from "./store";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

class Chore extends React.Component<{ chore: any }> {
  render() {
    const { chore } = this.props;
    return (
      <Box direction="row" pad="small">
        {chore.task}
        <Button label="Complete" onClick={chore.complete} />
        <Button label="Skip" onClick={chore.skip} />
        <Button label="Schedule" onClick={chore.schedule} />
      </Box>
    );
  }
}

export default observer(Chore);

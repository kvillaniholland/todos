import React from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import TodayView from "./TodayView.jsx";
import TodosView from "./TodosView";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

export default class App extends React.Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box align="center">
          <Tabs>
            <Tab title="Today">
              <TodayView />
            </Tab>
            <Tab title="Todos">
              <TodosView />
            </Tab>
          </Tabs>
        </Box>
      </Grommet>
    );
  }
}

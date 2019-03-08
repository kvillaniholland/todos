import React from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import store from "./store";
import TodayView from "./TodayView.jsx";
import TodosView from "./TodosView";

export default class App extends React.Component {
  render() {
    return (
      <Grommet plain>
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

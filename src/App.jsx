import React from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import store from "./store";
import TodayView from "./TodayView.jsx";
import TodosView from "./TodosView";
import AddItem from "./AddItem";

export default class App extends React.Component {
  render() {
    return (
      <Grommet plain>
        <Box align="center">
          <AddItem />
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

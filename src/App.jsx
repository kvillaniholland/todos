import React from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import store from "./store";
import TodayView from "./TodayView.jsx";
import TodoList from "./TodoList";

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
              <TodoList todos={store.allTodos} />
            </Tab>
          </Tabs>
        </Box>
      </Grommet>
    );
  }
}

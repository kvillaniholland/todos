import React from "react";
import { Grommet, Box, Tabs, Tab } from "grommet";
import TodayView from "./TodayView.jsx";
import TodoList from "./TodoList.jsx";

export default class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        task: "Groceries",
        due: new Date("2019-03-04"),
        done: false,
        ordinal: 1
      },
      {
        id: 2,
        task: "Something Else",
        due: new Date("2019-03-06"),
        done: false,
        ordinal: 0
      }
    ],
    somedays: [{ id: 1, task: "Drivers License", ordinal: 0 }],
    chores: [
      { id: 1, task: "Music", days: ["M", "T"], lastDone: null, ordinal: 0 }
    ]
  };
  render() {
    return (
      <Grommet plain>
        <Box align="center">
          <Tabs>
            <Tab title="Today">
              <TodayView
                onReorder={todos => this.setState({ ...this.state, todos })}
                todos={this.state.todos
                  .filter(todo => todo.due <= new Date())
                  .sort((a, b) => a.ordinal - b.ordinal)}
                onTodoCheck={(item, event) =>
                  this.setState({
                    ...this.state,
                    todos: this.state.todos.map(todo =>
                      todo.id === item.id
                        ? { ...todo, done: event.target.checked }
                        : todo
                    )
                  })
                }
              />
            </Tab>
            <Tab title="Todos">
              <TodoList
                onReorder={todos => this.setState({ ...this.state, todos })}
                todos={this.state.todos.sort((a, b) => a.ordinal - b.ordinal)}
                onTodoCheck={(item, event) =>
                  this.setState({
                    ...this.state,
                    todos: this.state.todos.map(todo =>
                      todo.id === item.id
                        ? { ...todo, done: event.target.checked }
                        : todo
                    )
                  })
                }
              />
            </Tab>
          </Tabs>
        </Box>
      </Grommet>
    );
  }
}

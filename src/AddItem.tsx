import React from "react";
import { TextInput, Button } from "grommet";
import { addDays } from "./store";

export default class AddItem extends React.Component {
  state = {
    input: ""
  };

  render() {
    return (
      <>
        <TextInput
          value={this.state.input}
          onChange={e =>
            this.setState({ ...this.state, input: e.target.value })
          }
        />
        <Button
          label="Create"
          onClick={() => console.log(parseInput(this.state.input))}
        />
      </>
    );
  }
}

const parseInput = (input: string) => {
  let array = input.split(" ");
  const task: { due?: Date } = {};
  const relativeDateKeys = Object.keys(relativeDateStrings);
  let month = 1;

  array = array.filter(piece => {
    if (relativeDateKeys.includes(piece)) {
      task.due = relativeDateStrings[piece]();
      return false;
    }
    return true;
  });

  if (!task.due) {
    array = array.filter(piece => {
      for (const pattern of months) {
        if (piece.match(pattern)) {
          month = months.indexOf(pattern);
          return false;
        }
      }
      return true;
    });
    const due = new Date();
    due.setMonth(month);
    due.setDate(1);
    if (due < new Date()) {
      due.setFullYear(new Date().getFullYear() + 1);
    }
    task.due = due;
  }

  return { ...task, task: array.join(" ") };
};

const relativeDateStrings: { [key: string]: () => Date } = {
  today: () => new Date(),
  tomorrow: () => addDays(new Date(), 1)
};

const months = [/jan|january|01\//];

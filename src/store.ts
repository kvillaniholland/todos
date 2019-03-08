import { types } from "mobx-state-tree";
import { values } from "mobx";

const commonProps = {
  id: types.identifier,
  ordinal: types.number,
  task: types.string
};

const commonActions = (self: any) => ({
  setOrdinal(ordinal: number) {
    self.ordinal = ordinal;
  },
  setTask(task: string) {
    self.task = task;
  }
});

// BREAK THESE INTO MODEL FILES??

const todoProps = {
  ...commonProps,
  done: types.boolean,
  due: types.Date
};

// FIX THESE ANYS
const todoActions = (self: any) => ({
  ...commonActions(self),
  toggleDone() {
    self.done = !self.done;
  },
  postpone(date = null) {
    self.due = date || addDays(self.date, 1);
  },
  setDue(due: Date) {
    self.due = due;
  }
});

const choreProps = {
  ...commonProps,
  lastCompleted: types.Date,
  lastSkipped: types.Date,
  days: types.array(types.string)
};

// FIX THESE ANYS
const choreActions = (self: any) => ({
  ...commonActions(self),
  skip() {
    self.lastSkipped = new Date();
  },
  complete() {
    self.lastCompleted = new Date();
  },
  setDays(days: Day[]) {
    self.days = days;
  }
});

export const Todo = types.model(todoProps).actions(todoActions);
export const Chore = types.model(choreProps).actions(choreActions);
export const Someday = types.model(commonProps).actions(commonActions);

const RootStore = types
  .model({
    todos: types.map(Todo),
    chores: types.map(Chore),
    somedays: types.map(Someday)
  })
  .views(self => ({
    get todayTodos() {
      return values(self.todos)
        .filter((todo: any) => todo.due <= new Date())
        .sort((a: any, b: any) => a.ordinal - b.ordinal);
    },
    get allTodos() {
      return values(self.todos)
        .map(item => item)
        .sort((a: any, b: any) => a.ordinal - b.ordinal);
    }
  }));

const store = RootStore.create({
  todos: {
    "1": { task: "eat", done: false, due: new Date(), ordinal: 1, id: "1" },
    "2": {
      task: "eat tomorrow",
      done: false,
      due: new Date("2019-03-09"),
      ordinal: 1,
      id: "2"
    },
    "3": {
      task: "eat but worse",
      done: false,
      due: new Date(),
      ordinal: 2,
      id: "3"
    }
  }
});

export default store;

// PROLLY PUT THIS IN A DATEHELPERS FILE
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

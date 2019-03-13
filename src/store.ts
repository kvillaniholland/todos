import { types } from "mobx-state-tree";
import { ChoreStore } from "./models/Chores";
import { TodoStore } from "./models/Todos";
import { SomedayStore } from "./models/Somedays";

const RootStore = types
  .compose(
    TodoStore,
    ChoreStore,
    SomedayStore
  )
  .actions(self => ({
    scheduleChore(chore: any) {
      chore.skip();
      const id = new Date().getTime().toString(16);
      self.todos.put({
        id,
        task: chore.task,
        done: false,
        due: new Date(),
        ordinal: 0
      });
    }
  }));

const store = RootStore.create({
  todos: {
    "1": { id: "1", task: "eat", done: false, due: new Date(), ordinal: 0 }
  },
  chores: {
    "1": { id: "1", task: "eat chore", ordinal: 0, days: [0, 3], skips: 0 }
  },
  somedays: {
    "1": { id: "1", task: "eat someday", ordinal: 0 },
    "2": { id: "2", task: "someday", ordinal: 1 }
  }
});

export default store;

// PROLLY PUT THIS IN A DATEHELPERS FILE
export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

import { types, getParent } from "mobx-state-tree";
import { values } from "mobx";
import { commonProps, commonActions } from "./Task";

const todoProps = {
  ...commonProps,
  done: types.boolean,
  due: types.Date
};

const todoActions = (self: any) => ({
  ...commonActions(self),
  toggleDone() {
    self.done = !self.done;
  },
  setDue(due: Date) {
    self.due = due;
  },
  delete() {
    (getParent(self, 2) as any).removeTodo(self);
  }
});

const TodoModel = types.model(todoProps).actions(todoActions);
export const TodoStore = types
  .model({
    todos: types.map(TodoModel)
  })
  .actions(self => ({
    removeTodo(todo: any) {
      self.todos.delete(todo.id);
    }
  }))
  .views(self => ({
    get todayTodos() {
      return values(self.todos)
        .filter(todo => todo.due <= new Date())
        .filter(todo => !todo.done)
        .sort((a: any, b: any) => a.ordinal - b.ordinal);
    },
    get allTodos() {
      return values(self.todos)
        .map(item => item)
        .sort((a: any, b: any) => a.due - b.due);
    },
    get allIncompleteTodos() {
      return values(self.todos)
        .filter(todo => !todo.done)
        .sort((a: any, b: any) => a.due - b.due);
    }
  }));

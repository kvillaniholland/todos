import { types, getParent } from "mobx-state-tree";
import { commonProps, commonActions, Day } from "./Task";
import { values } from "mobx";

const choreProps = {
  ...commonProps,
  lastCompleted: types.maybe(types.Date),
  lastSkipped: types.maybe(types.Date),
  days: types.array(types.number),
  skips: types.number
};

const choreActions = (self: any) => ({
  ...commonActions(self),
  skip() {
    self.lastSkipped = new Date();
    self.skips = self.skips + 1;
  },
  complete() {
    self.lastCompleted = new Date();
  },
  setDays(days: Day[]) {
    self.days = days;
  },
  schedule() {
    getParent(self, 2).scheduleChore(self);
  }
});

export const ChoreModel = types.model(choreProps).actions(choreActions);

export const ChoreStore = types
  .model({
    chores: types.map(ChoreModel)
  })
  .actions(self => ({
    removeChore(todo: any) {
      self.chores.delete(todo.id);
    }
  }))
  .views(self => ({
    get todayChores() {
      const today = new Date();
      return values(self.chores)
        .filter(
          chore =>
            chore.days.includes(today.getDay()) &&
            (!chore.lastCompleted ||
              chore.lastCompleted.toDateString() !== today.toDateString()) &&
            (!chore.lastSkipped ||
              chore.lastSkipped.toDateString() !== today.toDateString())
        )
        .sort((a: any, b: any) => a.ordinal - b.ordinal);
    }
  }));

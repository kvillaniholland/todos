import { types } from "mobx-state-tree";

export const commonProps = {
  id: types.identifier,
  ordinal: types.number,
  task: types.string
};

export const commonActions = (self: any) => ({
  setOrdinal(ordinal: number) {
    self.ordinal = ordinal;
  },
  setTask(task: string) {
    self.task = task;
  }
});

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

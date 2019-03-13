import { types } from "mobx-state-tree";
import { commonProps, commonActions } from "./Task";
import { values } from "mobx";

export const SomedayModel = types.model(commonProps).actions(commonActions);

export const SomedayStore = types
  .model({
    somedays: types.map(SomedayModel)
  })
  .actions(self => ({
    remove(todo: any) {
      self.somedays.delete(todo.id);
    }
  }))
  .views(self => ({
    todaySomedays(count = undefined) {
      return values(self.somedays)
        .map(a => a)
        .sort((a: any, b: any) => a.ordinal - b.ordinal)
        .slice(0, count);
    }
  }));

import React from "react";
import { observer } from "mobx-react";
import Chore from "./Chore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, ordinal: index }));
};

class ChoreList extends React.Component<{
  chores: any[];
}> {
  onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const todos = reorder(
      this.props.chores,
      result.source.index,
      result.destination.index
    );

    // this.props.onReorder(todos);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {this.props.chores.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Chore chore={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default observer(ChoreList);

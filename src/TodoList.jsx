import React from "react";
import { DataTable, CheckBox, Text } from "grommet";
import { observer } from "mobx-react";
import { values } from "mobx";
import Todo from "./Todo";
import store from "./store";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, ordinal: index }));
};

class TodoList extends React.Component {
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const todos = reorder(
      this.props.todos,
      result.source.index,
      result.destination.index
    );

    this.props.onReorder(todos);
  };

  render() {
    const todos = store.todos;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {values(todos).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo todo={item} onCheck={item.toggleDone} />
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

export default observer(TodoList);

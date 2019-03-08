import React from "react";
import { observer } from "mobx-react";
import Todo from "./Todo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, ordinal: index }));
};

class TodoList extends React.Component<{
  todos: any[];
  onReorder: (todos: any[]) => void;
}> {
  onDragEnd = (result: any) => {
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {this.props.todos.map((item, index) => (
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

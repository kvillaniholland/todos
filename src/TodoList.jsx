import React from "react";
import { DataTable, CheckBox, Text } from "grommet";
import Todo from "./Todo.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({ ...item, ordinal: index }));
};

export default class TodoList extends React.Component {
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
                      <Todo
                        todo={item}
                        onCheck={event => this.props.onCheck(item, event)}
                      />
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

/**
  <DataTable
        columns={[
          {
            property: "done",
            header: <Text>Done</Text>,
            render: item => (
              <CheckBox
                checked={item.done}
                onChange={event => this.props.onCheck(item, event)}
              />
            )
          },
          {
            property: "task",
            header: "Task",
            primary: true
          }
        ]}
        data={this.props.todos}
      />
 */

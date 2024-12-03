import { Button } from "react-bootstrap";
import DisplayCard from "../components/ui-components/DisplayCard";
import { useState } from "react";
import AddToDoModal from "../components/modals/AddToDoModal";

const Todo = () => {
  const todos = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, bread, eggs, and fruits",
      isCompleted: false,
      createdAt: new Date("2024-12-03T09:00:00"),
    },
    {
      id: 2,
      title: "Morning workout",
      description: "30-minute run and stretching exercises",
      isCompleted: true,
      createdAt: new Date("2024-12-02T07:30:00"),
    },
    {
      id: 3,
      title: "Complete project report",
      description: "Finalize and email the report to the manager",
      isCompleted: false,
      createdAt: new Date("2024-12-03T10:15:00"),
    },
    {
      id: 4,
      title: "Call the plumber",
      description: "Fix the leaking kitchen sink",
      isCompleted: false,
      createdAt: new Date("2024-12-03T11:00:00"),
    },
  ];

  const [allToDos, setAllToDos] = useState(todos);
  const [modalState, setModalState] = useState(false);

  const addToDo = (data) => {
    setAllToDos((prevTodos) => {
      const id =
        prevTodos.length > 0 ? prevTodos[prevTodos.length - 1].id + 1 : 1;
      const newData = { ...data, id };
      return [...prevTodos, newData];
    });
  };

  const openToDoModal = () => {
    setModalState(true);
  };
  const closeToDoModal = () => {
    setModalState(false);
  };

  const updateToDo = (data) => {
    console.log("id", data);
    setAllToDos((prev) =>
      prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
    );
    // const value = allToDos.filter((todo) => todo.id === data?.id);
  };

  const deleteToDo = (id) => {
    console.log("id", id);
    setAllToDos((prev) => prev.filter((item) => item.id !== id));
    // const value = allToDos.filter((todo) => todo.id !== id);
  };

  return (
    <div className="d-flex ">
      {allToDos.map((todoItem, index) => (
        <DisplayCard
          key={index}
          data={todoItem}
          updateToDo={updateToDo}
          deleteToDo={deleteToDo}
        />
      ))}
      <Button onClick={openToDoModal}>Add ToDo</Button>
      <AddToDoModal
        modalState={modalState}
        openToDoModal={openToDoModal}
        closeToDoModal={closeToDoModal}
        addToDo={addToDo}
      />
    </div>
  );
};

export default Todo;

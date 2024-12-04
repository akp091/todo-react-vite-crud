import { Button } from "react-bootstrap";
import DisplayCard from "../components/ui-components/DisplayCard";
import { useEffect, useState } from "react";
import AddToDoModal from "../components/modals/AddToDoModal";
import axios from "axios";

const Todo = () => {
  // const todos = [
  //   {
  //     id: 1,
  //     title: "Buy groceries",
  //     description: "Milk, bread, eggs, and fruits",
  //     isCompleted: false,
  //     createdAt: new Date("2024-12-03T09:00:00"),
  //   },
  //   {
  //     id: 2,
  //     title: "Morning workout",
  //     description: "30-minute run and stretching exercises",
  //     isCompleted: true,
  //     createdAt: new Date("2024-12-02T07:30:00"),
  //   },
  //   {
  //     id: 3,
  //     title: "Complete project report",
  //     description: "Finalize and email the report to the manager",
  //     isCompleted: false,
  //     createdAt: new Date("2024-12-03T10:15:00"),
  //   },
  //   {
  //     id: 4,
  //     title: "Call the plumber",
  //     description: "Fix the leaking kitchen sink",
  //     isCompleted: false,
  //     createdAt: new Date("2024-12-03T11:00:00"),
  //   },
  // ];

  const [allToDos, setAllToDos] = useState([]);
  const [modalState, setModalState] = useState(false);
  const getAllToDos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      if (response.status === 200) {
        console.log("response", response);
        setAllToDos(response.data); // response ke andr jis bhi field me data aa rha hoga usko state me set kra lena
      } else {
        console.error("Failed to fetch todos:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  useEffect(() => {
    getAllToDos();
  }, []);

  // const addToDo = (data) => {
  //   setAllToDos((prevTodos) => {
  //     const id =
  //       prevTodos.length > 0 ? prevTodos[prevTodos.length - 1].id + 1 : 1;
  //     const newData = { ...data, id };
  //     return [...prevTodos, newData];
  //   });
  // };

  const addToDo = async (newToDo) => {
    try {
      const response = await axios.post('http://localhost:3000', newToDo);
      if (response.status === 201) {
        console.log("ToDo added successfully:", response.data);
        getAllToDos();
      } else {
        console.error("Failed to add ToDo:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding ToDo:", error);
    }
  };

  const updateToDo = async (updatedToDo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/${updatedToDo.id}`,
        updatedToDo
      );
      if (response.status === 200) {
        console.log("ToDo updated successfully:", response.data);
        getAllToDos();
      } else {
        console.error("Failed to update ToDo:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating ToDo:", error);
    }
  };

  const deleteToDo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/${id}`);
      if (response.status === 200) {
        console.log("ToDo deleted successfully");
        getAllToDos();
      } else {
        console.error("Failed to delete ToDo:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting ToDo:", error);
    }
  };

  const openToDoModal = () => {
    setModalState(true);
  };
  const closeToDoModal = () => {
    setModalState(false);
  };

  // const updateToDo = (data) => {
  //   console.log("id", data);
  //   setAllToDos((prev) =>
  //     prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
  //   );
  //   // const value = allToDos.filter((todo) => todo.id === data?.id);
  // };

  // const deleteToDo = (id) => {
  //   console.log("id", id);
  //   setAllToDos((prev) => prev.filter((item) => item.id !== id));
  //   // const value = allToDos.filter((todo) => todo.id !== id);
  // };

  return (
    <div className="row">
      {allToDos.map((todoItem, index) => (
        <div
          key={index}
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center"
        >
          <DisplayCard
            data={todoItem}
            updateToDo={updateToDo}
            deleteToDo={deleteToDo}
          />
        </div>
      ))}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex justify-content-center">
        <Button onClick={openToDoModal}>Add ToDo</Button>
      </div>
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

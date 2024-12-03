import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import AddToDoModal from "../modals/AddToDoModal";
import { useState } from "react";

function DisplayCard(props) {
  const [modalState, setModalState] = useState(false);
  const openToDoModal = () => {
    setModalState(true);
  };
  const closeToDoModal = () => {
    setModalState(false);
  };

  const markAsDone = () => {
    let updatedToDo = { ...props?.data, isCompleted: true };
    props.updateToDo(updatedToDo);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props?.data?.title}</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Card.Text>{props?.data?.description}</Card.Text>
          <Button
            variant="primary"
            onClick={openToDoModal}
            disabled={props?.data?.isCompleted}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => props?.deleteToDo(props?.data?.id)}
          >
            Delete
          </Button>
          <Button
            variant="success"
            onClick={markAsDone}
            disabled={props?.data?.isCompleted}
          >
            Mark as Done
          </Button>
        </Card.Body>
      </Card>
      <AddToDoModal
        value={props?.data}
        modalState={modalState}
        openToDoModal={openToDoModal}
        closeToDoModal={closeToDoModal}
        updateToDo={props?.updateToDo}
      />
    </>
  );
}

export default DisplayCard;

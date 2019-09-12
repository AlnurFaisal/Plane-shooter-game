import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import MDSpinner from "react-md-spinner";
import "./Popup.css";

const Popup = props => {
  if (props.popup === "complete") {
    return (
      <Modal
        show={props.show}
        backdrop="static"
        size="lg"
        aria-labelledby="modal_complete"
        centered
      >
        <ModalHeader>
          <ModalTitle id="modal_complete" style={{ fontWeight: 900 }}>
            Game Completion
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-12">
              <p className="h3" align="center">
                Congratulations!
                <br />
                You have completed the game.
                <br />
                <br />
              </p>
            </div>
            <div className="offset-md-1 col-md-5">
              <p className="lead">
                <strong>Score: </strong>
                <span></span> Points
              </p>
            </div>
            <div className="offset-md-1 col-md-5">
              <p className="lead">
                <strong>Time Taken: </strong>
                <span></span> Minutes
              </p>
            </div>
            <br />
            <br />
            <div className="offset-md-7 col-md-5">
              <Button variant="primary" size="lg">
                Retry Game
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={props.handleClick}
                style={{ marginLeft: "5px" }}
              >
                Exit Game
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  } else if (props.popup === "begin") {
    return (
      <Modal
        show={props.show}
        backdrop="static"
        size="lg"
        aria-labelledby="modal_begin"
        centered
      >
        <ModalHeader>
          <ModalTitle id="modal_begin" style={{ fontWeight: 900 }}>
            Begin Game
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p id="countDown" align="center">
            <MDSpinner size={75} duration={1200} />
          </p>
        </ModalBody>
      </Modal>
    );
  }
};

export default Popup;

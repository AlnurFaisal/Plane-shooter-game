import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import { checkDifficulty, findDifficulty } from "../Helper/Helper";
import { Database } from "../Db/configFirebase";
import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      complete: false,
      name: "",
      options: {},
      dbLength: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.storeToDB = this.storeToDB.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // before moving to game component, will store the values of difficulty and playerName to firebaseDb
    this.storeToDB(this.state.name, findDifficulty(this.state.options));
    /* call the setState method below to change the complete status to true
       so the redirect to the app component can happen */
    this.setState({
      complete: true
    });
  }

  componentWillMount() {
    const getDb = Database.ref("temp");
    getDb.on("value", snapshot => {
      const dbLength = snapshot.val() ? snapshot.val().length : 0;
      this.setState({
        dbLength: dbLength
      });
    });
  }

  storeToDB(name, difficulty) {
    // create a new record
    Database.ref(`temp/${this.state.dbLength}`).set({
      difficulty: difficulty,
      name: name
    });
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleClick(event) {
    const option = event.target.id;
    const objOptions = checkDifficulty(option);
    this.setState({
      options: Object.assign({}, objOptions)
    });
  }

  render() {
    if (this.state.complete) {
      return <Redirect to="/game" />;
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 align="center" className="title_name_reg">
                Space Wars
              </h1>
            </div>
          </div>
          <br />
          <Card body>
            <div className="row">
              <div className="col-md-12">
                <h2 className="player_info">Player Info</h2>
              </div>
            </div>
            <hr className="line_hr" />
            <div className="row">
              <div className="col-md-12">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                      <span className="form_title">Name:</span>
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={this.state.value}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Group>

                  <fieldset>
                    <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                        <span className="form_title">Difficulty:</span>
                      </Form.Label>
                      <Col sm={10}>
                        <span className="span_options">
                          <FormCheck
                            type="radio"
                            label="Easy"
                            inline
                            name="formHorizontalRadios"
                            id="easy"
                            onClick={this.handleClick}
                          />
                          <FormCheck
                            style={{ marginLeft: "5px" }}
                            type="radio"
                            label="Moderate"
                            inline
                            name="formHorizontalRadios"
                            id="moderate"
                            onClick={this.handleClick}
                          />
                          <FormCheck
                            style={{ marginLeft: "5px" }}
                            type="radio"
                            label="Hard"
                            inline
                            name="formHorizontalRadios"
                            id="hard"
                            onClick={this.handleClick}
                          />
                        </span>
                      </Col>
                    </Form.Group>
                  </fieldset>
                  <Button type="submit" variant="success" size="lg">
                    Submit Form
                  </Button>
                  <Button
                    variant="danger"
                    type="reset"
                    size="lg"
                    style={{ marginLeft: "5px" }}
                  >
                    Reset Form
                  </Button>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      );
    }
  }
}

export default Register;

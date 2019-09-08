import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      complete: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    /* call the setState method below to change the complete status to true
       so the redirect to the app component can happen */
    this.setState({
      complete: true
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
                        onChange={this.props.handleChange}
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
                            onClick={this.props.handleClick}
                          />
                          <FormCheck
                            style={{ marginLeft: "5px" }}
                            type="radio"
                            label="Moderate"
                            inline
                            name="formHorizontalRadios"
                            id="moderate"
                            onClick={this.props.handleClick}
                          />
                          <FormCheck
                            style={{ marginLeft: "5px" }}
                            type="radio"
                            label="Hard"
                            inline
                            name="formHorizontalRadios"
                            id="hard"
                            onClick={this.props.handleClick}
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

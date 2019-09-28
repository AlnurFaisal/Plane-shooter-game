import React, { Component } from "react";
import { Database } from "../Db/configFirebase";
import { Redirect } from "react-router";
import { sortScores } from "../Helper/Helper";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Leaderboard.css";

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      home: false
    };
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    const getDb = Database.ref("players");
    getDb.on("value", snapshot => {
      let copyPlayers = snapshot.val();
      copyPlayers = sortScores(copyPlayers);
      this.setState({
        players: [...copyPlayers]
      });
    });
  }

  goHome() {
    this.setState({
      home: true
    });
  }

  render() {
    if (this.state.home) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 align="center" className="leaderboard_title">
                Leaderboard
              </h1>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="offset-md-2 col-md-8">
              <Card body>
                <h4>
                  Below are the scoring formula used to calculate the score:{" "}
                </h4>
                <br />
                <ul className="leader_info">
                  <li>
                    <strong>Easy(2 Min 30 Sec):</strong> <br />
                    Score = Points from destroyed aliens * 1{" "}
                  </li>
                  <li>
                    <strong>Moderate(2 Min):</strong> <br />
                    Score = Points from destroyed aliens * 2{" "}
                  </li>
                  <li>
                    <strong>Hard(1 Min 30 Sec):</strong> <br />
                    Score = Points from destroyed aliens * 3{" "}
                  </li>
                </ul>
              </Card>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="offset-md-1 col-md-10">
              <Table striped bordered variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                    <th>Time of completion</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.players &&
                    this.state.players.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.name}</td>
                          <td>{element.difficulty}</td>
                          <td>{element.score}</td>
                          <td>{element.time_taken}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <br />
              <Button size="lg" variant="success" onClick={this.goHome} block>
                Go Back
              </Button>
              <br />
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Leaderboard;

import React, { Component } from "react";
import StudenTable from "./StudenTable";
import StudentForm from "./StudentForm";

export default class FormExercise extends Component {
  render() {
    return (
      <div className="container text-left text-lg">
        <StudentForm />
        <StudenTable />
      </div>
    );
  }
}

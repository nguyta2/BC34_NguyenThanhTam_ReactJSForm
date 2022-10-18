import React, { Component } from "react";
import { connect } from "react-redux";

class StudenTable extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    studentArr: state.FormReducer.studentArr,
  };
};

export default connect(mapStateToProps, null)(StudenTable);

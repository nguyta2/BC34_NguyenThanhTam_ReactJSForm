import React, { Component } from "react";
import { connect } from "react-redux";

class StudenTable extends Component {
  renderSinhVien = () => {
    const { studentArr } = this.props;
    return studentArr.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.maSV}</td>
          <td>{student.hoTen}</td>
          <td>{student.soDienThoai}</td>
          <td>{student.email}</td>
          <td>
            <button
              className="btn btn-primary mx-2"
              onClick={() =>
                this.props.dispatch({
                  type: "GET_STUDENT",
                  payload: student.maSV,
                })
              }
            >
              Sửa
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                this.props.dispatch({
                  type: "DELETE_STUDENT",
                  payload: student.maSV,
                })
              }
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr className="bg-dark text-white">
              <th>Mã SV</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderSinhVien()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentArr: state.FormReducer.studentArr,
    studentUpdate: state.FormReducer.studentUpdate,
  };
};

export default connect(mapStateToProps, null)(StudenTable);

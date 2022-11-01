import React, { Component } from "react";
import { connect } from "react-redux";

class StudentForm extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    valid: false,
  };

  static getDerivedStateFromProps = (newProps, currentState) => {
    if (
      newProps.studentUpdate !== "" &&
      newProps.studentUpdate.maSV !== currentState.values.maSV
    ) {
      return { ...currentState, values: newProps.studentUpdate };
    } else return null;
  };

  handleChange = (e) => {
    let { values, errors } = this.state;
    let tagInput = e.target;
    let { name, value, type, pattern } = tagInput;
    let errorMsg = "";

    // check empty
    if (value.trim() === "") errorMsg = name + " không được bỏ trống! ";

    // check email
    if (type === "email") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorMsg = name + ` không đúng định dạng!`;
      }
    }
    if (name === "soDienThoai") {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        errorMsg = name + ` không đúng định dạng!`;
      }
    }

    values[name] = value;
    errors[name] = errorMsg;

    this.setState(
      {
        ...this.state,
        values: values,
        errors: errors,
      },
      () => {
        this.checkValid();
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.isAdded) {
      this.props.addStudent(this.state.values);
    } else {
      this.props.changeStudent(this.state.values);
    }

    this.setState({
      values: {
        maSV: "",
        hoTen: "",
        soDienThoai: "",
        email: "",
      },
    });
  };

  checkValid = () => {
    let valid = true;

    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "" || this.state.values[key] === "") {
        valid = false;
      }
    }

    this.setState({
      ...this.state,
      valid: valid,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="card text-left">
          <div className="card-header bg-dark text-white">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  <input
                    className="form-control"
                    name="maSV"
                    value={this.state.values.maSV}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.maSV}</p>
                </div>
                <div className="form-group col-6">
                  <span>Họ tên</span>
                  <input
                    className="form-control"
                    name="hoTen"
                    value={this.state.values.hoTen}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.hoTen}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <span>Số điện thoại</span>
                  <input
                    className="form-control"
                    name="soDienThoai"
                    type={"number"}
                    pattern="^[0-9]+$"
                    value={this.state.values.soDienThoai}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.soDienThoai}</p>
                </div>
                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    className="form-control"
                    name="email"
                    type={"email"}
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    value={this.state.values.email}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  {this.state.valid ? (
                    <div>
                      <button className="btn btn-success" type="submit">
                        Thêm sinh viên
                      </button>
                      <button type="submit" className="btn btn-primary m-2">
                        Cập nhật
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success"
                        type="submit"
                        disabled
                      >
                        Thêm sinh viên
                      </button>
                      <button type="submit" className="btn btn-primary m-2">
                        Cập nhật
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentArr: state.FormReducer.studentArr,
    studentUpdate: state.FormReducer.studentUpdate,
    isAdded: state.FormReducer.isAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      const action = {
        type: "ADD_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
    changeStudent: (student) => {
      const action = {
        type: "CHANGE_STUDENT",
        payload: student,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);

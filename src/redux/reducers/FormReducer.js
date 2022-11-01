const initialState = {
  studentArr: [
    { maSV: "1", hoTen: "abc", soDienThoai: "0909090909", email: "def" },
  ],
  studentUpdate: "",
  isAdded: true,
};

export const FormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_STUDENT": {
      const studentArr = [...state.studentArr];
      let isExist = studentArr.find((student) => student.maSV === payload.maSV);
      if (isExist) {
        alert("account is already exist");
      } else {
        studentArr.push(payload);
      }
      return { ...state, studentArr };
    }
    case "DELETE_STUDENT": {
      let studentArr = [...state.studentArr];

      studentArr = studentArr.filter((student) => student.maSV != payload);

      return { ...state, studentArr };
    }
    case "GET_STUDENT": {
      const studentArr = [...state.studentArr];
      let tempStudent = studentArr.find((student) => student.maSV === payload);
      return { ...state, studentUpdate: tempStudent, isAdded: false };
    }
    case "CHANGE_STUDENT": {
      let studentArr = [...state.studentArr];

      studentArr = studentArr.map((student) =>
        student.maSV === payload.maSV
          ? {
              ...student,
              maSV: payload.maSV,
              hoTen: payload.hoTen,
              soDienThoai: payload.soDienThoai,
              email: payload.email,
            }
          : { ...student }
      );
      return { ...state, studentArr, studentUpdate: "", isAdded: true };
    }
    default:
      return { ...state };
  }
};

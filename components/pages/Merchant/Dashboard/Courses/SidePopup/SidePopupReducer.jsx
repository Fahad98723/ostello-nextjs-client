export const initialSidePopupState = {
  isVisible: false,
  title: "",
  formElement: "",
  handleSubmit: function (e) {
    ("Success");
  },
  handleClose: function (e) {
    ("Cancel");
  },
};

export const sidePopupReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        isVisible: true,
        title: action.payload.title,
        formElement: action.payload.formElement,
        handleSubmit: action.payload.handleSubmit,
        handleClose: action.payload.handleClose,
      };
    case "CLOSE":
      return {
        ...state,
        ...initialSidePopupState,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

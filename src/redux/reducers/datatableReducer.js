export const initialDatatable = {
  loading: false,
  data: [],
  pagination: {},
};

export const datatableReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_DATA':
      return {
        loading: false,
        data: action.payload.data,
        pagination: action.payload.pagination,
      };
    case 'FETCH_DATA':
      return {
        loading: true,
        data: state.data,
        pagination: state.pagination,
      };
    default:
      return state;
  }
};

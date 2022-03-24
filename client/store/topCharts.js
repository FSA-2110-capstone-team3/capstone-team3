import axios from 'axios'

//------------ACTION TYPES------------//

const GET_TOP_CHARTS = 'GET_TOP_CHARTS';

//------------ACTION CREATORS------------//

const _getTopCharts = (topCharts) => {
  return {
    type: GET_TOP_CHARTS,
    topCharts
  }
};

//------------THUNKS------------//

export const getTopCharts = () => {
  return async (dispatch) => {
    // Limit to top 25
    const topCharts = (await axios.get("/api/shows/topcharts")).data.slice(0, 25);
    dispatch(_getTopCharts(topCharts));
  }
};

//------------REDUCER------------//

export const topCharts = (state = [], action) => {
  switch (action.type) {
    case GET_TOP_CHARTS:
      return action.topCharts;
    default:
      return state;
  }
};

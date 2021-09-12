const appConfig = {
  apiServer: process.env.API_SERVER || 'http://localhost:3016/',
  pagination: {
    recordPerPage: 10,
  },
};

export default appConfig;

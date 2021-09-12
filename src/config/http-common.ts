import axios from 'axios';
import appConfig from './app-config';

export default axios.create({
  baseURL: appConfig.apiServer,
  headers: {
    'Content-type': 'application/json',
  },
});

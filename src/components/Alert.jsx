import {Alert as RNAlert} from 'react-native';

const Alert = (title = '', message = '') => {
  RNAlert.alert(title, message);
};

export default Alert;

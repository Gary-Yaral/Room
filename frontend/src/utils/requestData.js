import axios from 'axios'

const postData = (url, objData, callback, isObj=false) => {
    axios.post(url, objData).then(({ data }) => {
      if(isObj) return callback(data.results[0]);
      callback(data.results);
    });
};


const getData = (url, callback) => {
    axios.post(url).then(({ data }) => {
      callback(data.results);
    });
};

export { postData, getData }


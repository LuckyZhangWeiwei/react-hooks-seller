import axios from 'axios'

const ERROR_OK = 0

export function get(url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then(res => {
      const { errno, data } = res.data
      if (errno === ERROR_OK) {
       return data 
      }
    }).catch(err => {
      console.error(err)
    })
  }
}

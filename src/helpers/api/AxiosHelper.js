import axios from 'axios';


class AxiosHelper {

  constructor() {
    this.defaultBackendUrl = process.env.REACT_APP_BASE_URL;
    this.instance = axios.create({
      baseURL: this.defaultBackendUrl,
    });
  }

  /**
  * @author Sanchit Dang
  * @param {String} errorMessage Error Message
  * @returns {Object}
  */
  generateSuccess(data) {
    return {
      success: true,
      data: data
    };
  }

  /**
  * @author Sanchit Dang
  * @param {String} errorMessage Error Message
  * @returns {Object}
  */
  throwError(errorMessage) {
    return {
      success: false,
      data: errorMessage
    };
  }

  /**
 * @author Sanchit Dang
 * @description Error Helper
 * 
 * @param {any} error 
 * @param {String} variant 
 * @returns {Object}
 */
  errorHelper(error) {
    if(error===undefined) return this.throwError(error);
    if (error.response === undefined) {
      return this.throwError("Network Error");
    }
    if (error.response.data) {
      return this.throwError(error.response.data);
    }
    if (error.response) {
      return this.throwError(error.response);
    }
  }
}

const instance = new AxiosHelper();
export default instance;
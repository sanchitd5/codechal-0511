import AxiosHelper from './AxiosHelper';

class API {
  constructor() { 
    this.instance = AxiosHelper.instance;
    this.generateSuccess = AxiosHelper.generateSuccess;
    this.throwError = AxiosHelper.throwError;
    this.errorHelper = AxiosHelper.errorHelper;
  }

  async getUsers() {
    try {
      const response = await this.instance.get('users');
      return this.generateSuccess(response.data);
    } catch (e) {
      console.error(e);
      this.errorHelper(e.data);
    }
  }

  async getPost(userId) {
    try {
      const response = await this.instance.get(`posts?userId=${userId}`);
      return this.generateSuccess(response.data);
    } catch (e) {
      console.error(e);
      this.errorHelper(e.data);
    }
  }
}

const instance = new API();

export default instance;
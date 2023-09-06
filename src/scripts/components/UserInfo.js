class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
    this.nameMain = document.querySelector('.profile__name'); 
    this.jobMain = document.querySelector('.profile__description');
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job
    }
  }

  setUserInfo() {
    this.nameMain.textContent = this.getUserInfo().name;
    this.jobMain.textContent = this.getUserInfo().job;
  }
}

export default UserInfo;
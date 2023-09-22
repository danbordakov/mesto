class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(`.${nameSelector}`);
    this._job = document.querySelector(`.${jobSelector}`);
    this._avatar = document.querySelector(`.${avatarSelector}`);
  }

  getUserInfo() {
   return {
      name: this._name.textContent,
      job: this._job.textContent,
      id: this._id
    }
  }

  setUserInfo(name, job, id) {
    if (name) {this._name.textContent = name};
    if (job) {this._job.textContent = job};
    if (id) {this._id = id};
  }

  setAvatar(avatar) {
    if (avatar) {this._avatar.src = avatar};
  }
}

export default UserInfo;
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
    this._name.textContent = name;
    this._job.textContent = job;
    this._id = id;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}

export default UserInfo;
export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileJob = document.querySelector(this._jobSelector);
    this._profileAvatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };
    return this._userInfo;
  }

  setUserNameJob(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  setUserInfo(name, job, avatar) {
    this.setUserNameJob(name, job);
    this.setUserAvatar(avatar);
  }

  setUserAvatar(avatar) {
    this._profileAvatar.style.backgroundImage = `url(${avatar})`;
  }
}

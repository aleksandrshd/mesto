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
    if (name) {
      this._profileName.textContent = name;
    } else {
      throw new Error('Имя пользователя не было передано');
    }
    if (job) {
      this._profileJob.textContent = job;
    } else {
      throw new Error('Описание пользователя не было передано');
    }

  }

  setUserInfo(name, job, avatar) {
    this.setUserNameJob(name, job);
    this.setUserAvatar(avatar);
  }

  setUserAvatar(avatar) {
    if (avatar) {
      this._profileAvatar.style.backgroundImage = `url(${avatar})`;
    } else {
      throw new Error('Аватар пользователя не был передан');
    }

  }
}

class userData {
	constructor() {
		this.token = "ZTg4ZWIyMmUtNzA4Yi00OGE2LTk2ODYtMjJlMmNlZTkxNDM5";
		this.userId = "793"; 
	}
	setUserId() {
		localStorage.setItem("userId", this.userId);
	}
	setToken() {
		localStorage.setItem("token", this.token);
	}
	getUserId() {
		localStorage.getItem("userId");
	}
	getToken() {
		localStorage.getItem("token");
	}
	clearUserData() {
		localStorage.clear();
	}
}
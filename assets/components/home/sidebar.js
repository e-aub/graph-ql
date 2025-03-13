import { router } from "/assets/script.js";

class Sidebar {
    constructor(userData, parent) {
        this.userData = userData;
        this.render(parent);
    }

 

    render(parent) {
        const aside = document.createElement('aside');
        aside.classList.add('sidebar');
        aside.innerHTML =  `
  <div class="sidebar-header">
    <div class="profile-pic">
      <img src="/assets/images/aelhadda.png" alt="Student Profile">
    </div>
    <div class="user-info">
      <div class="user-name">${this.userData.login ? this.userData.login : "_"}</div>
      <div class="user-role">Level:  ${this.userData["level"][0]["amount"] ? this.userData["level"][0]["amount"] : "_"}</div>
      <div class="user-details">Full Name: ${this.userData["firstName"] ? this.userData["firstName"] : "_"} ${this.userData["lastName"] ? this.userData["lastName"] : "_"}</div>
      <div class="user-details">Email: ${this.userData.email ? this.userData.email : "_"}</div>
      <div class="user-details">campus: ${this.userData.campus ? this.userData.campus : "_"}</div>
      <div class="user-details">Joined: ${new Date(this.userData.createdAt? this.userData.createdAt : "").toDateString({day: "2-digit", month: "short", year: "numeric"})}</div>
    </div>
  </div>
    `
      const logoutBtn = document.createElement('a');
      logoutBtn.classList.add('logout-btn');
      logoutBtn.textContent = 'Logout';
      logoutBtn.addEventListener('click', async () => {
        localStorage.removeItem('token');
        await router.route('/login');
      });
      aside.appendChild(logoutBtn);
      parent.appendChild(aside);
    }
    
   
}

export { Sidebar };
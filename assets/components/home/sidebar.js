class Sidebar {
    constructor(userData, parent) {
        this.userData = userData;
        console.log(this.userData);
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
      <div class="user-name">${this.userData.login}</div>
      <div class="user-role">${this.userData["rank"]}</div>
      <div class="user-details">Full Name: ${this.userData["firstName"]} ${this.userData["lastName"]}</div>
      <div class="user-details">Email: ${this.userData.email}</div>
      <div class="user-details">campus: ${this.userData.campus}</div>
      <div class="user-details">Joined: ${new Date(this.userData.createdAt).toDateString({day: "2-digit", month: "short", year: "numeric"})}</div>
    </div>
  </div>
  
  <ul class="nav-links">
    <li class="nav-item">
      <a href="#projects" class="nav-link">
        <span class="nav-link-icon">📚</span>
        Projects
      </a>
    </li>
    <li class="nav-item">
      <a href="#progress" class="nav-link">
        <span class="nav-link-icon">📝</span>
        Progress
      </a>
    </li>
    <li class="nav-item">
      <a href="#audits" class="nav-link">
        <span class="nav-link-icon">🕵</span>
        Audits
      </a>
    </li>
     <li class="nav-item">
      <a href="#" class="nav-link">
        <span class="nav-link-icon">🎯</span>
        Skills
      </a>
    </li>
  </ul>
  
  <a class="logout-btn">
    <span class="nav-link-icon">🚪</span>
    Logout
  </a>
    `
        parent.appendChild(aside);
    }
}

export { Sidebar };
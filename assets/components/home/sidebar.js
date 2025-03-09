class Sidebar {
    constructor(userData) {
        this.render();
    }

    render() {
        const aside = document.createElement('aside');
        aside.classList.add('sidebar');
        aside.innerHTML =  `
  <div class="sidebar-header">
    <div class="profile-pic">
      <img src="/assets/images/aelhadda.png" alt="Student Profile">
    </div>
    <div class="user-info">
      <div class="user-name">${false}</div>
      <div class="user-role">${false}</div>
      <div class="user-details">Full Name: ${false}</div>
      <div class="user-details">Email: ${false}</div>
      <div class="user-details">campus: ${false}</div>
      <div class="user-details">Level: ${false}</div>
      <div class="user-details">Joined: Jan 2023</div>
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
        document.body.appendChild(aside);
    }
}

export { Sidebar };
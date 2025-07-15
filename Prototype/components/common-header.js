// Vue 共用表頭元件
Vue.component("common-header", {
  template: `
    <nav class="backstage-nav">
        <div class="nav-header">
            <div class="nav-user-info">
                <div class="user-section">
                    <span class="greeting">您好，</span>
                    <i class="fas fa-user-alt icon" aria-hidden="true"></i>
                    <span class="username">王小明(linkchain0000)</span>
                    <span class="separator">｜</span>
                </div>
                <div class="home-section">
                    <i class="fas fa-home icon" aria-hidden="true"></i>
                    <span>前台</span>
                </div>
                <span class="separator">｜</span>
                <div class="logout-section">
                    <i class="fas fa-sign-in-alt icon" aria-hidden="true"></i>
                    <span>登出</span>
                </div>
            </div>
        </div>
        <div class="nav-main">
            <div class="system-name">
                <img src="img/logo.png" alt="系統圖示" class="system-logo">
                <div class="system-text">
                    <h1>捕蜂捉蛇及動物救援業務管理系統</h1>
                    <p>Animal Rescue Management System</p>
                </div>
            </div>
            <div class="nav-menu">
                <div class="menu-item dropdown" :class="{active: activeMenu==='review'}">
                    <span>審核案件管理</span>
                    <i class="fas fa-caret-down icon dropdown-icon" aria-hidden="true"></i>
                </div>
                <div class="menu-item dropdown" :class="{active: activeMenu==='duty'}">
                    <span>勤務案件管理</span>
                    <i class="fas fa-caret-down icon dropdown-icon" aria-hidden="true"></i>
                </div>
                <div class="menu-item single">
                    <span>數據統計</span>
                </div>
                <div class="menu-item dropdown">
                    <span>系統設定管理</span>
                    <i class="fas fa-caret-down icon dropdown-icon" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </nav>
    `,
  props: {
    activeMenu: {
      type: String,
      default: "", // 'review' 或 'duty' 可高亮對應選單
    },
  },
});

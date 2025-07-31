// header-utils.js - Header 功能工具函數
function initializeHeader() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  console.log("Initializing header..."); // 除錯用
  console.log("Button:", btn); // 除錯用
  console.log("Menu:", menu); // 除錯用

  if (btn && menu) {
    // 移除可能存在的舊監聽器
    btn.removeEventListener("click", handleMenuToggle);

    // 添加新的監聽器
    btn.addEventListener("click", handleMenuToggle);

    // 點擊外部區域自動收合選單
    document.addEventListener("click", handleOutsideClick);

    console.log("Header initialized successfully"); // 除錯用
  } else {
    console.error("Mobile menu elements not found");
  }

  // 初始化手機版子選單
  initializeMobileSubmenu();

  // 初始化桌面版子選單
  initializeDesktopSubmenu();
}

function initializeDesktopSubmenu() {
  const dataMenu = document.getElementById("desktop-data-menu");
  const dataTrigger = document.getElementById("desktop-data-trigger");
  const dataSubmenu = document.getElementById("desktop-data-submenu");
  const dataIcon = document.getElementById("desktop-data-icon");

  if (dataMenu && dataTrigger && dataSubmenu && dataIcon) {
    let isSubmenuOpen = false;
    let submenuTimeout;

    // 滑鼠進入主選單項目時顯示子選單
    dataMenu.addEventListener("mouseenter", function () {
      clearTimeout(submenuTimeout);
      isSubmenuOpen = true;
      dataSubmenu.classList.remove("hidden");
      dataIcon.classList.remove("fa-chevron-down");
      dataIcon.classList.add("fa-chevron-up");
    });

    // 滑鼠離開整個選單區域時隱藏子選單（加入延遲）
    dataMenu.addEventListener("mouseleave", function () {
      submenuTimeout = setTimeout(function () {
        if (isSubmenuOpen) {
          isSubmenuOpen = false;
          dataSubmenu.classList.add("hidden");
          dataIcon.classList.remove("fa-chevron-up");
          dataIcon.classList.add("fa-chevron-down");
        }
      }, 150); // 150ms 延遲，讓使用者有時間移動到子選單
    });

    // 點擊觸發器時切換子選單
    dataTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (isSubmenuOpen) {
        isSubmenuOpen = false;
        dataSubmenu.classList.add("hidden");
        dataIcon.classList.remove("fa-chevron-up");
        dataIcon.classList.add("fa-chevron-down");
      } else {
        isSubmenuOpen = true;
        dataSubmenu.classList.remove("hidden");
        dataIcon.classList.remove("fa-chevron-down");
        dataIcon.classList.add("fa-chevron-up");
      }
    });

    // 點擊文件其他地方時關閉子選單
    document.addEventListener("click", function (e) {
      if (!dataMenu.contains(e.target)) {
        isSubmenuOpen = false;
        dataSubmenu.classList.add("hidden");
        dataIcon.classList.remove("fa-chevron-up");
        dataIcon.classList.add("fa-chevron-down");
      }
    });
  }
}

function initializeMobileSubmenu() {
  const dataMenu = document.getElementById("mobile-data-menu");
  const dataSubmenu = document.getElementById("mobile-data-submenu");
  const dataIcon = document.getElementById("mobile-data-icon");

  if (dataMenu && dataSubmenu && dataIcon) {
    dataMenu.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // 切換子選單顯示狀態
      dataSubmenu.classList.toggle("hidden");

      // 切換箭頭方向
      if (dataSubmenu.classList.contains("hidden")) {
        dataIcon.classList.remove("fa-chevron-up");
        dataIcon.classList.add("fa-chevron-down");
      } else {
        dataIcon.classList.remove("fa-chevron-down");
        dataIcon.classList.add("fa-chevron-up");
      }
    });
  }
}

function handleMenuToggle(e) {
  e.preventDefault();
  e.stopPropagation();

  const menu = document.getElementById("mobile-menu");
  if (menu) {
    console.log("Toggling menu"); // 除錯用
    menu.classList.toggle("hidden");
  }
}

function handleOutsideClick(e) {
  const menu = document.getElementById("mobile-menu");
  const btn = document.getElementById("mobile-menu-btn");

  if (
    menu &&
    btn &&
    !menu.classList.contains("hidden") &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    menu.classList.add("hidden");
  }
}

// 當 DOM 載入完成時初始化
document.addEventListener("DOMContentLoaded", initializeHeader);

// 提供手動初始化的方法，供動態載入 header 的頁面使用
window.initializeHeader = initializeHeader;

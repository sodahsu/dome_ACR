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

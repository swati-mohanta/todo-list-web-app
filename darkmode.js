document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Apply saved mode from localStorage
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "dark") {
    body.classList.add("dark");
    toggle.checked = true;
  }

  // Toggle dark mode on switch change
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      body.classList.add("dark");
      localStorage.setItem("mode", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("mode", "light");
    }
  });
});

  const links = document.querySelectorAll(".menu-item");

  links.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".menu-item.active")?.classList.remove("active");
      item.classList.add("active");
    });
  });

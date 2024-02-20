document.addEventListener("DOMContentLoaded", () => {
  const back = document.querySelector("a.back");

  back.addEventListener("click", () => {
    window.history.back();
  });

  const product_qq_get = async () => {
    const alram = document.querySelector("i.fa.fa-bell");

    const res = await fetch("/qq");
    const json = await res.json();

    if (!json) {
      alram.style.color = "gray";
    } else if (json) {
      alram.style.color = "green";
    }
  };
  product_qq_get();
});


const closeMessage = document.querySelector("#close-message");
const messageElement = document.querySelector(".message");

if (closeMessage && messageElement) {
  closeMessage.addEventListener("click", () => {
    messageElement.style.display = "none";
  });

  setTimeout(() => {
    messageElement.style.display = "none";
  }, 5000);
}
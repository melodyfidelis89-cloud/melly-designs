const WHATSAPP_NUMBER = "2348125169418";
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.querySelectorAll("[data-service]").forEach(card => card.addEventListener("click", () => {
  document.getElementById("service").value = card.dataset.service;
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
  document.getElementById("customerName").focus({preventScroll:true});
}));
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();
  const deadline = document.getElementById("deadline").value.trim();
  const message = [
    "Hello Melly Designs! I'd like to order a design.",
    "",
    `Name: ${name}`,
    `Service: ${service}`,
    details ? `Design details: ${details}` : "",
    deadline ? `Needed by: ${deadline}` : "",
    "",
    "Please let me know the price and delivery time. Thank you!"
  ].filter(Boolean).join("\n");
  document.getElementById("formMessage").textContent = "WhatsApp is opening with your order details. Review the message and press Send to submit your request.";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

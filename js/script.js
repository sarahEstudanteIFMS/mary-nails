/* Comportamento do site (usa as variáveis de config.js) */
const WHITE = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="4" height="5"><rect width="4" height="5" fill="#fff"/></svg>');
const wa = CONFIG.whatsappLink || ("https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(CONFIG.whatsappMessage));
document.querySelectorAll("[data-wa]").forEach(a => a.href = wa);
document.getElementById("igLink").href = CONFIG.instagramLink;
document.getElementById("heroImg").src = CONFIG.heroImage || WHITE;

const track = document.getElementById("track"), dots = document.getElementById("dots");
CONFIG.portfolio.forEach((p, i) => {
  track.insertAdjacentHTML("beforeend", '<div class="slide"><img alt="' + p.title + '" src="' + (p.img || WHITE) + '"><div class="cap"><small>' + p.tag + '</small><span>' + p.title + '</span></div></div>');
  dots.insertAdjacentHTML("beforeend", '<i class="' + (i ? "" : "on") + '"></i>');
});
track.addEventListener("scroll", () => {
  const s = track.children[0].offsetWidth + 14;
  const i = Math.min(dots.children.length - 1, Math.round(track.scrollLeft / s));
  [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i));
}, { passive: true });

document.getElementById("mailBtn").addEventListener("click", async () => {
  const hint = document.getElementById("mailHint");
  try { await navigator.clipboard.writeText(document.getElementById("mailTxt").textContent); hint.textContent = "Copiado!"; }
  catch (e) { hint.textContent = "Copie manualmente"; }
  setTimeout(() => hint.textContent = "E-mail • Toque para copiar", 1800);
});

const links = [...document.querySelectorAll("nav a")];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
}), { threshold: .35 });
["inicio", "portfolio", "servicos", "contato"].forEach(id => io.observe(document.getElementById(id)));

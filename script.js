/* =====================================================================
   PERSIANAS ZAMBRANA — Script principal
   ---------------------------------------------------------------------
   Funciones:
   1. Intro animada de persiana (solo en la home)
   2. Menú de navegación móvil
   3. Sombra del header al hacer scroll
   4. Acordeón de preguntas frecuentes (FAQ)
   5. Animaciones de aparición al hacer scroll (reveal)
   6. Año dinámico en el footer
   7. Formulario de contacto → enlace a WhatsApp
   ===================================================================== */
(function () {
  "use strict";

  /* -------------------------------------------------------------------
     1. INTRO ANIMADA — Persiana subiendo (solo home)
     Se muestra una vez por sesión para no resultar molesta.
  ------------------------------------------------------------------- */
  function gestionarIntro() {
    var intro = document.getElementById("intro");
    if (!intro) return;

    var yaVista = sessionStorage.getItem("pz_intro_vista");
    var reduceMov = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (yaVista) {
      // Si ya se vio en esta sesión, quitarla de inmediato.
      intro.remove();
      document.body.classList.remove("intro-activo");
      return;
    }

    document.body.classList.add("intro-activo");
    var duracion = reduceMov ? 450 : 1500;

    window.setTimeout(function () {
      intro.classList.add("intro--oculto");
      document.body.classList.remove("intro-activo");
      sessionStorage.setItem("pz_intro_vista", "1");
      window.setTimeout(function () {
        if (intro && intro.parentNode) intro.remove();
      }, 700);
    }, duracion);

    // Permitir saltar la intro pulsando / tocando.
    intro.addEventListener("click", function () {
      intro.classList.add("intro--oculto");
      document.body.classList.remove("intro-activo");
      sessionStorage.setItem("pz_intro_vista", "1");
    });
  }

  /* -------------------------------------------------------------------
     2. MENÚ MÓVIL
  ------------------------------------------------------------------- */
  function gestionarMenuMovil() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    // Construye la estructura premium del menú (cabecera, iconos y pie)
    construirMenuPremium(links);

    // Backdrop dinámico
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);

    function abrir() {
      links.classList.add("abierto");
      backdrop.classList.add("visible");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function cerrar() {
      links.classList.remove("abierto");
      backdrop.classList.remove("visible");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      if (links.classList.contains("abierto")) cerrar();
      else abrir();
    });
    backdrop.addEventListener("click", cerrar);

    // Cerrar al pulsar un enlace o el botón de cierre del menú
    links.addEventListener("click", function (e) {
      if (e.target.closest("a, .menu-close")) cerrar();
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") cerrar();
    });

    // Cerrar si se pasa a escritorio
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) cerrar();
    });
  }

  /* -------------------------------------------------------------------
     2.1 ESTRUCTURA PREMIUM DEL MENÚ MÓVIL
     Inyecta cabecera (logo + cierre), iconos por sección y pie de
     contacto, sin tocar el HTML de cada página.
  ------------------------------------------------------------------- */
  function construirMenuPremium(links) {
    if (links.dataset.premium) return;
    links.dataset.premium = "1";

    var S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
    var iconos = {
      "index.html":      S + '<path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>',
      "reparacion-":     S + '<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6l-6.4 6.4 2.6 2.6 6.4-6.4a4 4 0 0 0 5.6-5.6l-2.4 2.4-2.6-2.6z"/></svg>',
      "cambio-cinta":    S + '<path d="M12 2v6M12 16v6"/><circle cx="12" cy="12" r="4"/></svg>',
      "cambio-lamas":    S + '<path d="M3 7h18M3 12h18M3 17h18"/></svg>',
      "motores":         S + '<path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="5"/></svg>',
      "instalacion":     S + '<path d="M3 21h18M4 21V8l8-5 8 5v13"/></svg>',
      "urgencias":       S + '<path d="m13 2-10 12h7l-1 8 10-12h-7l1-8z"/></svg>'
    };
    function iconoPara(href) {
      href = href || "";
      for (var k in iconos) { if (href.indexOf(k) !== -1) return iconos[k]; }
      return iconos["index.html"];
    }
    var flecha = '<svg class="mi-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

    // Enriquece cada enlace de navegación (no los botones CTA)
    [].forEach.call(links.querySelectorAll("li:not(.nav-cta-movil) > a"), function (a) {
      if (a.querySelector(".mi-ico")) return;
      a.insertAdjacentHTML("afterbegin", '<span class="mi-ico">' + iconoPara(a.getAttribute("href")) + "</span>");
      a.insertAdjacentHTML("beforeend", flecha);
    });

    // Cabecera del menú
    var head = document.createElement("li");
    head.className = "menu-head";
    head.innerHTML =
      '<a href="index.html" class="menu-brand"><img src="assets/logo.svg" alt=""><span>Persianas Zambrana<small>Málaga</small></span></a>' +
      '<button type="button" class="menu-close" aria-label="Cerrar menú">' + S + '<path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    links.insertBefore(head, links.firstChild);

    // Pie del menú con contacto
    var foot = document.createElement("li");
    foot.className = "menu-foot";
    foot.innerHTML =
      '<a href="tel:952322660" class="menu-foot-tel">' + S + '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg> 952 32 26 60</a>' +
      '<span class="menu-foot-sub"><span class="estrellas">★★★★★</span> 4,8 · Atención en Málaga</span>';
    links.appendChild(foot);
  }

  /* -------------------------------------------------------------------
     3. SOMBRA DEL HEADER AL HACER SCROLL
  ------------------------------------------------------------------- */
  function gestionarHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     4. FAQ — ACORDEÓN
  ------------------------------------------------------------------- */
  function gestionarFAQ() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-pregunta");
      var resp = item.querySelector(".faq-respuesta");
      if (!btn || !resp) return;

      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var abierto = item.classList.contains("abierto");

        // Cerrar el resto (comportamiento acordeón)
        items.forEach(function (otro) {
          if (otro !== item) {
            otro.classList.remove("abierto");
            var r = otro.querySelector(".faq-respuesta");
            var b = otro.querySelector(".faq-pregunta");
            if (r) r.style.maxHeight = null;
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });

        if (abierto) {
          item.classList.remove("abierto");
          resp.style.maxHeight = null;
          btn.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("abierto");
          resp.style.maxHeight = resp.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* -------------------------------------------------------------------
     5. REVEAL — Animaciones de aparición al hacer scroll
  ------------------------------------------------------------------- */
  function gestionarReveal() {
    var elementos = document.querySelectorAll(".reveal");
    if (!elementos.length) return;

    if (!("IntersectionObserver" in window)) {
      elementos.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elementos.forEach(function (el) { obs.observe(el); });
  }

  /* -------------------------------------------------------------------
     6. AÑO DINÁMICO EN EL FOOTER
  ------------------------------------------------------------------- */
  function gestionarAnio() {
    var spans = document.querySelectorAll("[data-anio]");
    var anio = new Date().getFullYear();
    spans.forEach(function (s) { s.textContent = anio; });
  }

  /* -------------------------------------------------------------------
     7. FORMULARIO → WHATSAPP
     El formulario no usa backend: compone un mensaje y abre WhatsApp.
     Edita el número en data-wa del propio formulario si cambia.
  ------------------------------------------------------------------- */
  function gestionarFormulario() {
    var form = document.getElementById("form-contacto");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var wa = form.getAttribute("data-wa") || "34661507518";
      var nombre = (form.nombre && form.nombre.value || "").trim();
      var tel = (form.telefono && form.telefono.value || "").trim();
      var servicio = (form.servicio && form.servicio.value || "").trim();
      var mensaje = (form.mensaje && form.mensaje.value || "").trim();

      var texto =
        "Hola, soy " + (nombre || "[nombre]") + ". " +
        "He visto la web de Persianas Zambrana y necesito " +
        (servicio ? "información sobre: " + servicio + ". " : "información o presupuesto. ") +
        (mensaje ? "Detalle: " + mensaje + ". " : "") +
        (tel ? "Mi teléfono: " + tel + "." : "");

      var url = "https://wa.me/" + wa + "?text=" + encodeURIComponent(texto);

      var feedback = document.getElementById("form-feedback");
      if (feedback) feedback.classList.add("visible");

      window.open(url, "_blank", "noopener");
    });
  }

  /* -------------------------------------------------------------------
     8. LAMAS INTERACTIVAS EN LA HOME
  ------------------------------------------------------------------- */
  function gestionarDecisionLamas() {
    var items = document.querySelectorAll(".decision-item");
    if (!items.length) return;

    function cerrarOtros(actual) {
      items.forEach(function (item) {
        if (item !== actual) {
          item.classList.remove("is-open");
          item.setAttribute("aria-expanded", "false");
        }
      });
    }

    items.forEach(function (item) {
      item.setAttribute("role", "button");
      item.setAttribute("aria-expanded", "false");

      item.addEventListener("click", function () {
        var abierto = item.classList.contains("is-open");
        cerrarOtros(item);
        item.classList.toggle("is-open", !abierto);
        item.setAttribute("aria-expanded", abierto ? "false" : "true");
      });

      item.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        item.click();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      items.forEach(function (item) {
        item.classList.remove("is-open");
        item.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------------------
     INICIO
  ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    gestionarIntro();
    gestionarMenuMovil();
    gestionarHeaderScroll();
    gestionarFAQ();
    gestionarReveal();
    gestionarAnio();
    gestionarFormulario();
    gestionarDecisionLamas();
  });
})();

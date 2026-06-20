# Persianas Zambrana — Web comercial (Málaga)

Web estática, ligera y orientada a conversión para **Persianas Zambrana**, un negocio de
reparación e instalación de persianas en Málaga. Está pensada para convertir visitas en
contactos mediante **llamada telefónica, WhatsApp y solicitud de presupuesto**.

No es una tienda online ni necesita backend: son archivos HTML, CSS y JS que funcionan
abriéndolos en cualquier navegador o subiéndolos a cualquier hosting.

---

## 🗂️ Estructura de archivos

```
/
├── index.html                          → Home (landing principal con 10 secciones)
├── reparacion-persianas-malaga.html    → Servicio: reparación
├── cambio-cinta-persianas-malaga.html  → Servicio: cambio de cinta
├── cambio-lamas-persianas-malaga.html  → Servicio: cambio de lamas
├── motores-persianas-malaga.html       → Servicio: motores
├── instalacion-persianas-malaga.html   → Servicio: instalación
├── urgencias-persianas-malaga.html     → Servicio: urgencias
├── aviso-legal.html                    → Aviso legal (plantilla editable)
├── politica-privacidad.html            → Política de privacidad (plantilla editable)
├── styles.css                          → Todos los estilos (mobile-first)
├── script.js                           → Intro, menú móvil, FAQ, animaciones, formulario
├── README.md                           → Este archivo
└── assets/                             → Imágenes (ilustraciones SVG)
    ├── logo.svg
    ├── favicon.svg
    ├── hero-home.svg
    ├── reparacion.svg
    ├── cambio-cinta.svg
    ├── cambio-lamas.svg
    ├── motores.svg
    ├── instalacion.svg
    └── urgencias.svg
```

---

## 🚀 Cómo verla

- **Opción rápida:** haz doble clic en `index.html` para abrirla en el navegador.
- **Recomendado** (para que el mapa y las fuentes carguen perfecto): sírvela con un servidor
  local. Por ejemplo, desde la carpeta del proyecto:
  ```bash
  # Con Python instalado
  python -m http.server 8080
  # luego abre http://localhost:8080
  ```

Para publicarla, sube **todos los archivos y la carpeta `assets/`** a cualquier hosting
(Netlify, Vercel, Hostinger, un FTP clásico, etc.). No requiere base de datos.

---

## ✏️ Datos que puedes editar fácilmente

Todos los datos del negocio están repetidos en las páginas para mantenerlas independientes.
Si cambias un dato, **búscalo y reemplázalo en todos los archivos** (incluido el footer).

| Dato | Valor actual | Dónde aparece |
|------|--------------|---------------|
| Teléfono (texto) | `952 32 26 60` | Topbar, header, CTA, contacto, footer |
| Teléfono (enlace) | `tel:952322660` | Todos los botones "Llamar" |
| WhatsApp (texto) | `661 50 75 18` | Contacto y footer |
| WhatsApp (enlace) | `wa.me/34661507518` | Todos los botones de WhatsApp |
| Dirección | `Av. de José Ortega y Gasset, 96, 29006 Málaga` | Contacto, footer, mapa, legal |
| Valoración | `4,8` | Hero, métricas, reseñas |
| Nº de reseñas | `+400` | Hero, métricas, reseñas |

> ⚠️ **Datos provisionales por confirmar:** la dirección, los datos fiscales del aviso legal y
> de la política de privacidad están marcados con corchetes `[ ]` o con la palabra
> *provisional*. Revísalos antes de publicar.

### Mensaje de WhatsApp
La home usa este mensaje predefinido:
> "Hola, he visto la web de Persianas Zambrana. Necesito información o presupuesto para una
> persiana en Málaga. ¿Podéis ayudarme?"

Cada página de servicio usa una variante adaptada (reparación, cinta, lamas, motor,
instalación, urgencia). El texto va codificado dentro del enlace `wa.me/...?text=`.

---

## 🖼️ Imágenes

Como no había fotos reales del negocio, se han creado **ilustraciones SVG** coherentes con
cada servicio (técnico reparando, detalle de cinta, lamas nuevas, motor, instalación,
persiana bloqueada). Ventajas: pesan muy poco, se ven nítidas en móvil y escritorio y son
fáciles de sustituir.

**Para usar fotos reales:** sustituye el archivo de `assets/` o cambia el `src` de la
etiqueta `<img>` correspondiente. Cada imagen lleva un comentario HTML cercano del tipo
`<!-- Sustituir por foto real cuando esté disponible -->`. Mantén un tamaño/recorte similar
(las tarjetas usan formato apaisado 16:10 y el hero 4:3).

---

## ⭐ Reseñas

El bloque de reseñas de la home incluye **ejemplos genéricos sin nombres reales** y una nota
visible: *"Bloque preparado para insertar reseñas reales de Google"*. Sustituye esos textos
por reseñas reales (con permiso) o incrusta el widget oficial de Google cuando lo tengas.

---

## 🎨 Diseño y personalización

- **Colores:** se controlan con variables CSS al principio de `styles.css` (sección
  *1. Variables*). El amarillo de marca es `--amarillo: #FFC400`; cámbialo ahí y se actualiza
  toda la web. Paleta: amarillo + antracita + gris claro + toques metálicos.
- **Tipografías:** Poppins (títulos) e Inter (texto), cargadas desde Google Fonts.
- **Mobile-first:** el diseño se construye primero para móvil; las media queries amplían a
  tablet y escritorio (560px, 760px, 992px).

---

## ⚙️ Funcionalidades (script.js)

- **Intro animada:** una persiana sube mostrando la frase *"Subimos la persiana por ti"* y da
  paso a la home. Solo aparece en la home y **una vez por sesión** (no molesta al navegar).
  Se puede saltar haciendo clic. Respeta `prefers-reduced-motion`.
- **Menú móvil:** hamburguesa con panel lateral y fondo oscuro.
- **FAQ:** acordeón desplegable.
- **Animaciones de aparición** al hacer scroll (clase `.reveal`).
- **Formulario de contacto:** no usa servidor. Compone un mensaje con los datos introducidos
  y abre WhatsApp para finalizar el contacto. El número se define en el atributo
  `data-wa` del `<form>`.
- **Botones flotantes:** barra inferior "Llamar / WhatsApp" en móvil y burbuja de WhatsApp en
  escritorio, siempre visibles.

---

## 🔍 SEO

Cada página tiene su propio `title`, `meta description`, `H1` único, enlace canónico y
etiquetas Open Graph. La home incluye datos estructurados (`schema.org` tipo
`HomeAndConstructionBusiness`) con teléfono, dirección y valoración. Las palabras clave
trabajadas son locales: *persianas Málaga, reparación de persianas Málaga, persianista
Málaga, cambio cinta persiana Málaga, motor persiana Málaga, instalación persianas Málaga,
urgencias persianas Málaga*.

> Recuerda actualizar los datos estructurados de `index.html` si cambian la dirección o la
> valoración, y dar de alta el negocio en **Google Business Profile** para potenciar el SEO local.

---

## ✅ Checklist antes de publicar

- [ ] Confirmar dirección real y actualizarla en todas las páginas y en el mapa.
- [ ] Completar datos fiscales en `aviso-legal.html` y `politica-privacidad.html`.
- [ ] Sustituir las reseñas de ejemplo por reseñas reales o el widget de Google.
- [ ] (Opcional) Sustituir las ilustraciones por fotos reales del negocio.
- [ ] Revisar que teléfono y WhatsApp son correctos en todos los botones.
- [ ] Subir la web a un dominio y verificar en un móvil real.

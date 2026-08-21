const { useState, useEffect } = React;

/* ===== A11y hook for modals/lightboxes =====
   - Focus trap (Tab/Shift+Tab queda dentro del modal)
   - Escape para cerrar
   - Body scroll lock mientras está abierto
   - Restauración de foco al cerrar (al elemento que lo abrió) */
function useLightboxA11y(isOpen, onClose) {
  const lastFocusRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) return;

    // Guardar elemento que tenía foco antes de abrir
    lastFocusRef.current = document.activeElement;

    // Focus al primer elemento focusable del modal (botón cerrar)
    const focusFirst = () => {
      const c = containerRef.current;
      if (!c) return;
      const f = c.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
      if (f) f.focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const c = containerRef.current;
      if (!c) return;
      const focusables = Array.from(
        c.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      // Restaurar foco al elemento anterior
      const prev = lastFocusRef.current;
      if (prev && typeof prev.focus === "function") {
        try { prev.focus(); } catch (_) {}
      }
    };
  }, [isOpen, onClose]);

  return containerRef;
}

/* ===== Shared ===== */
function Nav({ current }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "index", href: "index.html", label: "Inicio" },
    { id: "portafolio", href: "portafolio.html", label: "Portafolio" },
    { id: "recomendaciones", href: "recomendaciones.html", label: "Recomendaciones" },
    { id: "contacto", href: "contacto.html", label: "Contacto" },
  ];

  // Cerrar drawer con Escape + bloquear scroll cuando está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <a href="index.html" className="nav__brand" aria-label="Ir al inicio">
            <span className="bmark" aria-hidden="true">A</span>
            <span>Alejandro López</span>
          </a>
          <nav className="nav__links" aria-label="Navegación principal">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={current === l.id ? "is-active" : ""}
                aria-current={current === l.id ? "page" : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="contacto.html" className="nav__cta" aria-label="Contacto — Disponible"><span className="dot" aria-hidden="true" /> <span>Disponible</span></a>
          <button
            type="button"
            className={"nav__burger " + (open ? "is-open" : "")}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="bar" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="nav-drawer"
        className={"nav__drawer " + (open ? "is-open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div className="nav__drawer__panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Menú de navegación">
          <nav className="nav__drawer__links" aria-label="Navegación móvil">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={current === l.id ? "is-active" : ""}
                aria-current={current === l.id ? "page" : undefined}
              >
                <span>{l.label}</span>
                <span className="arr" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="nav__drawer__foot">
            <span>Contacto directo</span>
            <a href={window.SiteMeta.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
            <a href={`mailto:${window.SiteMeta.email}`}>{window.SiteMeta.email}</a>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactStrip() {
  return (
    <section className="cta-strip">
      <div className="wrap">
        <div className="cta-strip__inner">
          <div>
            <div className="cta-strip__kicker">Hablemos · Respuesta en menos de 24h</div>
            <h2 className="cta-strip__head">Experiencias digitales <em>centradas en resultados.</em></h2>
          </div>
          <div className="cta-strip__side">
            <p>Cuéntame tu brief, tu producto o tu reto. Disponible para colaboraciones freelance y vacantes de tiempo completo 100% home office.</p>
            <div className="btns">
              <a className="btn btn--primary" href={window.SiteMeta.whatsapp} target="_blank" rel="noopener noreferrer">Escríbeme por WhatsApp <span className="arr" aria-hidden="true">↗</span></a>
              <a className="btn btn--ghost" href="contacto.html">Hablemos <span className="arr" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__wordmark">Diseñemos <em>juntos.</em></div>
        <div className="footer__meta">
          <span>© 2026 Alejandro López</span>
          <div className="footer__links">
            <a href="index.html">Inicio</a>
            <a href="portafolio.html">Portafolio</a>
            <a href="recomendaciones.html">Recomendaciones</a>
            <a href="contacto.html">Contacto</a>
          </div>
          <span>v2026.08</span>
        </div>
      </div>
    </footer>
  );
}

function Marquee() {
  const phrase = (
    <>
      <span>Diseño de producto</span><span className="star">★</span>
      <span>UX/UI</span><span className="star">★</span>
      <span>Sistemas de diseño</span><span className="star">★</span>
      <span>Diseño asistido por IA</span><span className="star">★</span>
      <span>Investigación UX</span><span className="star">★</span>
      <span>Prototipado</span><span className="star">★</span>
      <span>Accesibilidad WCAG</span><span className="star">★</span>
      <span>Maquetado frontend</span><span className="star">★</span>
      <span>Código → Figma</span><span className="star">★</span>
      <span>Branding digital</span><span className="star">★</span>
      <span>Handoff a desarrollo</span><span className="star">★</span>
      <span>Web · Mobile · SaaS</span><span className="star">★</span>
    </>
  );
  return (
    <div className="marquee">
      <div className="marquee__track">
        <div className="marquee__item">{phrase}{phrase}</div>
        <div className="marquee__item">{phrase}{phrase}</div>
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, em, aside, noline }) {
  return (
    <div className={"section__head" + (noline ? " section__head--noline" : "")}>
      <div>
        <div className="mono">{kicker}</div>
        <h2 className="section__title">{title} <em>{em}</em></h2>
      </div>
      {aside && <div className="section__aside"><div className="mono">{aside.label}</div><p>{aside.text}</p></div>}
    </div>
  );
}

function Tweaks({ open, theme, setTheme, locked }) {
  return (
    <div className={"tweaks " + (open ? "is-open" : "")}>
      <h4>Ajustes · En vivo</h4>
      <div className="tweaks__row">
        <label>Tema {locked && <span className="tweaks__lock">· fijo</span>}</label>
        <div className="tweaks__seg">
          <button className={theme==="light"?"is-active":""} onClick={()=>!locked && setTheme("light")} disabled={locked}>Claro</button>
          <button className={theme==="dark"?"is-active":""} onClick={()=>!locked && setTheme("dark")} disabled={locked}>Oscuro</button>
        </div>
      </div>
      {locked && <p className="tweaks__hint">El portafolio se muestra siempre en modo claro para preservar el color original de los proyectos.</p>}
    </div>
  );
}

/* ===== HOME ===== */
function Hero() {
  const d = window.HomeData.hero;
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <span className="hero__eyebrow"><span className="square"></span>{d.eyebrow}</span>
            <h1 className="hero__title">
              {d.titleA} <span className="accent">{d.titleB}</span> <em>{d.titleC}</em>
            </h1>
            <p className="hero__lead">{d.lead}</p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="portafolio.html">Ver portafolio <span className="arr" aria-hidden="true">↗</span></a>
              <a className="btn btn--ghost" href="contacto.html">Hablemos <span className="arr" aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero__side">
            <img src={d.portrait} alt={`Retrato de ${window.SiteMeta.name}`} fetchpriority="high" decoding="async" width="520" height="650" />
            <span className="hero__badge"><span className="dot" aria-hidden="true"></span>{d.availability}</span>
            <div className="hero__sticker" aria-hidden="true"><div><span>★</span>Abierto a<br/>nuevas<br/>colaboraciones</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="section section--tight" style={{ paddingTop: "0" }}>
      <div className="wrap">
        <div className="stats">
          {window.HomeData.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat__num">{s.n}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  // Bento 6-col sin huecos: hero(4x2) + tall(2x2) | third*3(2x1) | full(6x1)
  const layouts = ["hero", "tall", "third", "third", "third", "full"];
  const items = window.HomeData.featured;
  const [lightbox, setLightbox] = React.useState(null);

  const lbRef = useLightboxA11y(lightbox !== null, () => setLightbox(null));

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && lightbox > 0) setLightbox(lightbox - 1);
      if (e.key === "ArrowRight" && lightbox < items.length - 1) setLightbox(lightbox + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, items.length]);

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="02 — Selección destacada"
          title="Proyectos"
          em="recientes."
          aside={{ label: "Categorías", text: "Fintech · SOFIPO · Medios de pago · Facturación electrónica · SaaS · B2B · Plataformas empresariales · E-commerce · POS · Apps móviles · Vehículos eléctricos · Big Data · Logística · Hostelería · Educación · Gobierno · Startups · Design systems · Branding · Web corporativa" }}
        />
        <div className="work-grid">
          {items.map((w, i) => (
            <button className={`work-card work-card--${layouts[i]}`} key={i} onClick={() => setLightbox(i)} type="button" aria-label={`Ampliar ${w.title}`}>
              <div className="work-card__img" style={{ backgroundImage: `url("${w.img}")` }} />
              <div className="work-card__overlay" />
              <span className="work-card__tag">{w.tag}</span>
              <div className="work-card__foot">
                <div>
                  <h3 className="work-card__title">{w.title}</h3>
                </div>
                <span className="work-card__cta">⤢</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
          <a className="btn btn--primary" href="portafolio.html">Ver los {window.PortfolioList.length} proyectos <span className="arr">↗</span></a>
        </div>
      </div>

      {lightbox !== null && items[lightbox] && ReactDOM.createPortal(
        <div className="lightbox" ref={lbRef} role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${items[lightbox].title}`} onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Cerrar vista ampliada">×</button>
          {lightbox > 0 && (
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }} aria-label="Proyecto anterior">←</button>
          )}
          {lightbox < items.length - 1 && (
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }} aria-label="Proyecto siguiente">→</button>
          )}
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={items[lightbox].img} alt={items[lightbox].title} />
            <figcaption className="lightbox__cap">
              <div className="lightbox__tag">{items[lightbox].tag}</div>
              <h3>{items[lightbox].title}</h3>
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
}

function About() {
  const d = window.HomeData.about;
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead
          kicker="03 — Sobre mí"
          title="Valor para el negocio,"
          em="fluidez para el usuario."
          aside={{ label: "Enfoque", text: "Producto de extremo a extremo, colaboración multidisciplinaria e IA en cada etapa." }}
        />
        <div className="about">
          <div className="about__card">
            <div className="about__quote">{d.p}</div>
            <div className="about__meta">
              <div className="left">Alejandro López · UX/UI</div>
              <div className="right">6 AÑOS · DESDE 2020</div>
            </div>
          </div>
          <div className="about__image">
            <img src={d.cover} alt="Espacio de trabajo de diseño" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="04 — Capacidades"
          title="Qué hago,"
          em="y cómo."
          aside={{ label: "Disciplinas", text: "Ocho especialidades que se integran en cada entrega." }}
        />
        <div className="skills">
          {window.HomeData.skills.map((s, i) => (
            <div className="skill" key={i}>
              <div className="skill__img"><img src={s.img} alt={`Ejemplo de ${s.title}`} loading="lazy" decoding="async" /></div>
              <div className="skill__body">
                <div className="skill__num">{s.num} / 0{window.HomeData.skills.length}</div>
                <h3 className="skill__title">{s.title}</h3>
                <p className="skill__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Behance() {
  const b = window.BehanceData;
  return (
    <section className="section">
      <div className="wrap">
        <div className="behance">
          <div className="behance__head">
            <div>
              <div className="mono" style={{ color: "rgba(255,255,255,0.6)" }}>06 — En vivo</div>
              <h2>También en <em>Behance.</em></h2>
            </div>
            <span className="behance__badge"><span className="be">Bē</span>@{b.profile}</span>
          </div>
          <div className="behance__stats">
            <div className="bstat"><div className="bstat__n">{b.stats.views}</div><div className="bstat__l">Vistas de proyecto</div></div>
            <div className="bstat"><div className="bstat__n">{b.stats.appreciations}</div><div className="bstat__l">Apreciaciones</div></div>
            <div className="bstat"><div className="bstat__n">{b.stats.projects}</div><div className="bstat__l">Proyectos activos</div></div>
            <div className="bstat"><div className="bstat__n">2019</div><div className="bstat__l">Miembro desde</div></div>
          </div>
          <div className="behance__cards">
            {b.projects.map((p, i) => (
              <a className="bcard" key={i} href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="bcard__img"><img src={p.img} alt={`Proyecto ${p.title} en Behance`} loading="lazy" decoding="async" /></div>
                <div className="bcard__body">
                  <div className="bcard__title">{p.title}</div>
                  <div className="bcard__meta"><span>{p.cat}</span><span>♡ {p.loves} · ⊙ {p.views}</span></div>
                </div>
              </a>
            ))}
          </div>
          <div className="behance__foot">
            <div className="stamp">★ Perfil activo en behance.net/{b.profile}</div>
            <a className="big" href={b.url} target="_blank" rel="noopener noreferrer">Ver perfil completo <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="07 — Clientes y equipos"
          title="Con quién he"
          em="colaborado."
          aside={{ label: "12 marcas", text: "Fintech, SOFIPO, big data, medios de pago, vehículos eléctricos, gobierno, educación, salud, hostelería, agencias, startups y recursos humanos." }}
        />
        <div className="clients">
          {window.ClientsData.map((c, i) => (
            <div className={"client" + (c.size === "sm" ? " client--sm" : "")} key={i}>
              <img src={c.logo} alt="" loading="lazy" decoding="async" />
              <span className="client__name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Software() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead kicker="08 — Stack" title="Herramientas y métodos" em="que uso a diario." />
        <div className="software">
          {window.SoftwareData.map((s, i) => (
            <div className="tool" key={i}>
              <div className="tool__num">{s.num} / 0{window.SoftwareData.length}</div>
              <div className="tool__name">{s.name}</div>
              <div className="tool__list">{s.list}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certs() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead kicker="09 — Formación" title="Certificaciones" em="y estudios." />
        <div className="certs">
          {window.CertsData.map((c, i) => (
            <div className="cert" key={i}>
              <div className="cert__top">
                <div className="cert__logo"><img src={c.logo} alt="" loading="lazy" decoding="async" style={c.zoom ? { transform: `scale(${c.zoom})` } : undefined} /></div>
                <div className="cert__year">{c.year}</div>
              </div>
              <div>
                <div className="cert__org">{c.org}</div>
                <div className="cert__title">{c.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== USER REVIEWS (franja home: capturas reales) ===== */
function UserReviews({ showLink = true }) {
  const caps = window.AppReviewsData.captures;
  const [lb, setLb] = React.useState(null);
  const lbRef = useLightboxA11y(lb !== null, () => setLb(null));

  React.useEffect(() => {
    if (lb === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && lb > 0) setLb(lb - 1);
      if (e.key === "ArrowRight" && lb < caps.length - 1) setLb(lb + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lb, caps.length]);

  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="ureviews">
          <div className="ureviews__head">
            <div className="mono">Reseñas de usuarios · Tiendas de apps</div>
            <div className="ureviews__stars" aria-label="5 de 5 estrellas">★★★★★</div>
          </div>
          <div className="rev-caps">
            {caps.map((c, i) => (
              <button className="rev-cap" key={i} onClick={() => setLb(i)} type="button" aria-label={`Ampliar captura de reseñas ${i + 1} de ${caps.length}`}>
                <img src={c.img} alt={`Captura de reseñas de usuarios ${i + 1} de ${caps.length}`} loading="lazy" decoding="async" />
                <span className="rev-cap__cta" aria-hidden="true">⤢</span>
              </button>
            ))}
          </div>
          {showLink && (
            <a className="ureviews__link" href="recomendaciones.html">Ver todas las reseñas y recomendaciones <span aria-hidden="true">↗</span></a>
          )}
        </div>
      </div>

      {lb !== null && caps[lb] && ReactDOM.createPortal(
        <div className="lightbox" ref={lbRef} role="dialog" aria-modal="true" aria-label={`Captura de reseñas ${lb + 1} de ${caps.length}`} onClick={() => setLb(null)}>
          <button className="lightbox__close" onClick={() => setLb(null)} aria-label="Cerrar vista ampliada">×</button>
          {lb > 0 && (
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLb(lb - 1); }} aria-label="Captura anterior">←</button>
          )}
          {lb < caps.length - 1 && (
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLb(lb + 1); }} aria-label="Captura siguiente">→</button>
          )}
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={caps[lb].img} alt={`Captura de reseñas de usuarios ${lb + 1} de ${caps.length}`} />
            <figcaption className="lightbox__cap">
              <div className="lightbox__tag">Reseñas de usuarios</div>
              <h3>Captura {lb + 1} de {caps.length} — Tienda de apps</h3>
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
}

/* ===== PROCESS ===== */
function Process() {
  const d = window.ProcessData;
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          kicker="05 — Proceso"
          title="Cómo trabajo,"
          em="paso a paso."
          noline
          aside={{ label: "Método", text: "Del brief a un producto medible, en cinco pasos." }}
        />
        <div className="process">
          {d.steps.map((s, i) => (
            <div className="pstep" key={i}>
              <div className="pstep__num">{s.num} / 0{d.steps.length}</div>
              <div className="pstep__title">{s.title}</div>
              <p className="pstep__desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="process__note">
          <span className="process__note__label">Nota</span>
          <p>{d.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ===== PORTAFOLIO PAGE ===== */
function PortfolioPage() {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState(null);
  const items = window.PortfolioList;
  const categories = React.useMemo(
    () => ["Todos", ...Array.from(new Set(items.map(i => i.category)))],
    [items]
  );
  const filtered = React.useMemo(
    () => filter === "Todos" ? items : items.filter(i => i.category === filter),
    [items, filter]
  );
  const counts = React.useMemo(
    () => Object.fromEntries(categories.map(c => [c, c === "Todos" ? items.length : items.filter(i => i.category === c).length])),
    [categories, items]
  );

  // Reset lightbox si cambia el filtro (evita índice fuera de rango)
  React.useEffect(() => { setLightbox(null); }, [filter]);

  const lbRef = useLightboxA11y(lightbox !== null, () => setLightbox(null));

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && lightbox > 0) setLightbox(lightbox - 1);
      if (e.key === "ArrowRight" && lightbox < filtered.length - 1) setLightbox(lightbox + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <section className="section port-hero">
      <div className="wrap">
        <div className="mono">Portafolio · {items.length} proyectos</div>
        <h1>Proyectos <em>que cuentan una historia.</em></h1>
        <p>Una selección completa de proyectos de UX/UI, diseño web y branding realizados entre 2020 y 2025.</p>
        <div className="filters">
          {categories.map(c => (
            <button key={c} className={"filter " + (filter === c ? "is-active" : "")} onClick={() => setFilter(c)}>
              {c}<span className="count">· {counts[c]}</span>
            </button>
          ))}
        </div>
        <div className="port-grid">
          {filtered.map((p, i) => (
            <button className="port-item" key={i} onClick={() => setLightbox(i)} type="button" aria-label={`Ampliar ${p.title}`}>
              <div className="port-item__img" style={{ backgroundImage: `url("${p.img}")` }} />
              <div className="port-item__over" />
              <span className="port-item__tag">{p.category}</span>
              <div className="port-item__foot">
                <h3 className="port-item__title">{p.title}</h3>
                <span className="port-item__cta" aria-hidden>⤢</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && filtered[lightbox] && ReactDOM.createPortal(
        <div className="lightbox" ref={lbRef} role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${filtered[lightbox].title}`} onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Cerrar vista ampliada">×</button>
          {lightbox > 0 && (
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }} aria-label="Proyecto anterior">←</button>
          )}
          {lightbox < filtered.length - 1 && (
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }} aria-label="Proyecto siguiente">→</button>
          )}
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].img} alt={filtered[lightbox].title} />
            <figcaption className="lightbox__cap">
              <div className="lightbox__tag">{filtered[lightbox].category}</div>
              <h3>{filtered[lightbox].title}</h3>
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
}

/* ===== RECOMENDACIONES PAGE ===== */
function RecomendacionesPage() {
  const [lightbox, setLightbox] = React.useState(null);
  const recs = window.FeaturedRecs;

  const lbRef = useLightboxA11y(lightbox !== null, () => setLightbox(null));

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && lightbox > 0) setLightbox(lightbox - 1);
      if (e.key === "ArrowRight" && lightbox < recs.length - 1) setLightbox(lightbox + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, recs.length]);

  return (
    <section className="section recs-hero">
      <div className="wrap">
        <div className="mono">Recomendaciones · {window.TestimonialsData.length} testimonios · 10 reseñas de usuarios</div>
        <h1>Lo que dicen <em>los equipos.</em></h1>
        <p>Qué opinan mis stakeholders y los usuarios finales de los productos que diseño.</p>

        <div className="mono" style={{ marginTop: 40 }}>Destacados</div>
        <div className="featured-recs">
          {recs.map((r, i) => (
            <button className="frec" key={i} onClick={() => setLightbox(i)} type="button" aria-label={`Ver recomendaci\u00f3n de ${r.name}, ${r.role}`}>
              <div className="frec__img"><img src={r.img} alt={`Recomendación de ${r.name}`} loading="lazy" decoding="async" /></div>
              <div>
                <div className="frec__name">{r.name}</div>
                <div className="frec__role">{r.role}</div>
              </div>
              <span className="frec__cta" aria-hidden="true">⤲</span>
            </button>
          ))}
        </div>

        <div className="mono">Todos los testimonios</div>
        <div style={{ height: 20 }} />
        <div className="testi-grid">
          {window.TestimonialsData.map((t, i) => (
            <div className="testi" key={i}>
              <div className="testi__q">{t.quote}</div>
              <div className="testi__who">
                <div className="testi__avatar">{t.initials}</div>
                <div>
                  <div className="testi__name">{t.name}</div>
                  <div className="testi__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {lightbox !== null && recs[lightbox] && ReactDOM.createPortal(
        <div className="lightbox" ref={lbRef} role="dialog" aria-modal="true" aria-label={`Recomendación de ${recs[lightbox].name}`} onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Cerrar vista ampliada">×</button>
          {lightbox > 0 && (
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }} aria-label="Recomendación anterior">←</button>
          )}
          {lightbox < recs.length - 1 && (
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }} aria-label="Recomendación siguiente">→</button>
          )}
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={recs[lightbox].img} alt={recs[lightbox].name} />
            <figcaption className="lightbox__cap">
              <div className="lightbox__tag">Recomendación</div>
              <h3>{recs[lightbox].name} — {recs[lightbox].role}</h3>
            </figcaption>
          </figure>
        </div>,
        document.body
      )}
    </section>
  );
}

/* ===== CONTACTO PAGE ===== */
function ContactoPage() {
  return (
    <section className="contact-page">
      <div className="wrap">
        <div className="contact-card">
          <div className="contact-card__kicker">Contacto · Respuesta en menos de 24h</div>
          <h1 className="contact-card__head">Experiencias digitales <em>centradas en resultados.</em></h1>
          <div className="contact-card__grid">
            <div className="contact-card__block">
              <h4>WhatsApp y teléfono</h4>
              <div className="val"><a href={window.SiteMeta.whatsapp} target="_blank" rel="noopener noreferrer">{window.SiteMeta.phone}</a></div>
              <p>Respondo en menos de 24 horas hábiles. Disponible para freelance y vacantes de tiempo completo 100% home office.</p>
            </div>
            <div className="contact-card__block">
              <h4>Correo electrónico</h4>
              <div className="val"><a href={`mailto:${window.SiteMeta.email}`}>{window.SiteMeta.email}</a></div>
              <p>Adjunta brief, presentación o enlace al proyecto.</p>
            </div>
            <div className="contact-card__block">
              <h4>Redes</h4>
              <div className="val links">
                <a href={window.SiteMeta.behance} target="_blank" rel="noopener noreferrer">Behance <span aria-hidden="true">↗</span></a>
                <a href={window.SiteMeta.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                <a href={window.SiteMeta.linktree} target="_blank" rel="noopener noreferrer">Linktree <span aria-hidden="true">↗</span></a>
              </div>
              <p>También puedes encontrarme en otras plataformas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Page orchestration ===== */
function Page({ which }) {
  const forcedLight = which === "portafolio";
  const [theme, setTheme] = useState("light");
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    // Ocultar preloader cuando React monta, respetando un tiempo mínimo visible
    // (evita el parpadeo en cargas muy rápidas). __plStart lo fija el HTML;
    // __plMin permite ajustar el mínimo (500ms por defecto).
    const p = document.getElementById("preloader");
    if (!p || p.classList.contains("is-done")) return;
    const min = window.__plMin || 500;
    const start = window.__plStart || Date.now();
    const wait = Math.max(0, min - (Date.now() - start));
    const t = setTimeout(() => {
      p.classList.add("is-done");
      const remove = () => { if (p.parentNode) p.parentNode.removeChild(p); };
      p.addEventListener("transitionend", remove, { once: true });
      setTimeout(remove, 700); // fallback si transitionend no dispara (reduced motion)
    }, wait);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", forcedLight ? "light" : theme);
  }, [theme, forcedLight]);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (_) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    // Solo animar secciones que NO están visibles al cargar.
    // Las que ya están en viewport se muestran directamente (sin opacity:0 inicial).
    // Esto evita el bug donde en mobile una sección grande se quedaba invisible
    // hasta que el IntersectionObserver disparara tarde.
    const sections = document.querySelectorAll(".section");
    const vh = window.innerHeight || 800;
    const toAnimate = [];

    sections.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh * 0.7) {
        // Sección por debajo del viewport → animar al entrar
        el.classList.add("reveal");
        toAnimate.push(el);
      }
      // Sección ya visible → queda tal cual (sin .reveal, sin opacity:0)
    });

    if (toAnimate.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    toAnimate.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [which]);

  return (
    <>
      <Nav current={which} />
      <main>
        {which === "index" && (
          <>
            <Hero />
            <Marquee />
            <Stats />
            <FeaturedWork />
            <About />
            <Skills />
            <Process />
            <Behance />
            <UserReviews />
            <Clients />
            <Software />
            <Certs />
          </>
        )}
        {which === "portafolio" && <PortfolioPage />}
        {which === "recomendaciones" && (
          <>
            <RecomendacionesPage />
            <UserReviews showLink={false} />
          </>
        )}
        {which === "contacto" && <ContactoPage />}
        {which !== "contacto" && <ContactStrip />}
      </main>
      <Footer />
      <Tweaks open={tweaksOpen} theme={forcedLight ? "light" : theme} setTheme={setTheme} locked={forcedLight} />
    </>
  );
}

window.Page = Page;

// Auto-mount
const el = document.getElementById("root");
if (el) {
  const which = el.getAttribute("data-page") || "index";
  ReactDOM.createRoot(el).render(<Page which={which} />);
}
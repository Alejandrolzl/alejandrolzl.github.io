// Alejandro López — Portfolio data v3 (multi-página, completo)
const IMG = "https://alejandrolzl.github.io/img";

window.SiteMeta = {
  name: "Alejandro López",
  role: "UX/UI · Product Designer",
  city: "Ciudad de México",
  email: "ale2201@outlook.es",
  phone: "+52 55 1289 9235",
  whatsapp: "https://wa.me/5215512899235",
  behance: "https://www.behance.net/alejandrolzl",
  linkedin: "http://linkedin.com/in/alejandrolzl/",
  linktree: "https://linktr.ee/alejandrolzl",
};

window.HomeData = {
  hero: {
    eyebrow: "UX/UI · Product Designer",
    titleA: "Transformo",
    titleB: "datos complejos",
    titleC: "en experiencias memorables.",
    lead: "Product Designer con +5 años de experiencia. Colaboro estrechamente con equipos de negocio y tecnología para reducir tiempos de desarrollo en un 40%. Diseño soluciones escalables que han elevado la retención un 15% y la satisfacción al 92%.",
    availability: "Disponible",
    portrait: `${IMG}/portfolio/Selfie.jpg`,
  },
  stats: [
    { n: "15M+", label: "Usuarios impactados" },
    { n: "30+",  label: "Productos diseñados" },
    { n: "10+",  label: "Design systems aplicados" },
    { n: "5 años", label: "De experiencia" },
  ],
  about: {
    quote: "Transformo datos complejos en experiencias digitales excepcionales.",
    p: "Colaboro con producto, ingeniería y marketing para convertir problemas ambiguos en interfaces escalables. Me obsesiona el handoff limpio, la accesibilidad y los design systems que no se rompen a la tercera iteración.",
    cover: `/img/proyects/AppEvergo.jpg`,
  },
  skills: [
    { num: "01", title: "UX/UI Design",     desc: "Investigación, wireframes, prototipos y pruebas de usabilidad. De la hipótesis al pixel final.", img: `${IMG}/portfolio/UI-skill.jpg` },
    { num: "02", title: "Diseño Web",       desc: "Sitios modernos, funcionales y responsivos. Claridad sobre decoración, usabilidad primero.",       img: `${IMG}/portfolio/DisenoWeb-skill.jpg` },
    { num: "03", title: "Diseño Gráfico",   desc: "Identidad, banners, piezas sociales y activos de UI. Coherencia visual con el producto.",           img: `${IMG}/portfolio/DisenoGrafico-skill.jpg` },
    { num: "04", title: "Maquetado Web",    desc: "HTML, CSS, JavaScript, Tailwind y Bootstrap. Pixel-perfect, responsivo, listo para producción.",    img: `${IMG}/portfolio/MaquetadoWeb-skill.jpg` },
  ],
  // Featured projects on home — bento 2x3 sin huecos
  featured: [
    { num: "01", title: "Bimsa Suite",        tag: "UX/UI",       img: `${IMG}/proyects/BimsaSuite.jpg`,         url: "https://www.behance.net/gallery/247017301/Bimsa-Suite" },
    { num: "02", title: "Comandera Móvil",    tag: "UX/UI",       img: `${IMG}/proyects/ComanderaMovil.jpg`,     url: "https://www.behance.net/gallery/213949749/Comandera-Movil" },
    { num: "03", title: "Evergo App",         tag: "UX/UI",       img: `${IMG}/proyects/AppEvergo.jpg`,          url: "https://www.behance.net/alejandrolzl" },
    { num: "04", title: "Fitbooker",          tag: "UX/UI",       img: `${IMG}/proyects/FITBOOKER.jpg`,          url: "https://www.behance.net/gallery/247063405/Fitbooker" },
    { num: "05", title: "Sitio web OTIF",     tag: "Diseño Web",   img: `${IMG}/proyects/Sitio%20web%20OTIF.jpg`, url: "https://www.behance.net/alejandrolzl" },
    { num: "06", title: "Xspeedfact",         tag: "UX/UI",       img: `${IMG}/proyects/XSPEEDFACT.jpg`,         url: "https://www.behance.net/alejandrolzl" },
  ],
};

// Full portfolio list (from alejandrolzl.github.io/portafolio.html)
const BE_MAIN = "https://www.behance.net/alejandrolzl";
const BE = {
  bimsa:     "https://www.behance.net/gallery/247017301/Bimsa-Suite",
  fitbooker: "https://www.behance.net/gallery/247063405/Fitbooker",
  comandera: "https://www.behance.net/gallery/213949749/Comandera-Movil",
  portafolio:"https://www.behance.net/gallery/188810443/Portafolio-Alejandro-Lopez",
};

window.PortfolioList = [
  { title: "BimsaSuite",                        category: "UX/UI",    img: `${IMG}/proyects/BimsaSuite.jpg`,                  url: BE.bimsa },
  { title: "Design System Bimsa Suite",         category: "UX/UI",    img: `${IMG}/proyects/DSBimsaSuite.jpg`,                url: BE.bimsa },
  { title: "Evergo app (rediseño)",             category: "UX/UI",    img: `${IMG}/proyects/AppEvergo.jpg`,                   url: BE_MAIN },
  { title: "Sitio web OTIF (rediseño)",         category: "UX/UI",    img: `${IMG}/proyects/Sitio%20web%20OTIF.jpg`,          url: BE_MAIN },
  { title: "Design System OTIF",                category: "UX/UI",    img: `${IMG}/proyects/Design%20system%20OTIF.jpg`,      url: BE_MAIN },
  { title: "Evergo Fleet (rediseño)",           category: "UX/UI",    img: `${IMG}/proyects/EvergoFleet.jpg`,                 url: BE_MAIN },
  { title: "IPEF página web",                   category: "Diseño web", img: `${IMG}/proyects/IPEF%20website.jpg`,            url: BE_MAIN },
  { title: "EV POS",                            category: "UX/UI",    img: `${IMG}/proyects/EV%20POS.jpg`,                    url: BE_MAIN },
  { title: "Xspeedfact",                        category: "UX/UI",    img: `${IMG}/proyects/XSPEEDFACT.jpg`,                  url: BE_MAIN },
  { title: "Branding Xspeedfact",               category: "Branding", img: `${IMG}/proyects/Branding%20XSpeedFact.jpg`,       url: BE_MAIN },
  { title: "QR Móvil",                          category: "UX/UI",    img: `${IMG}/proyects/QRMOVIL.jpg`,                     url: BE_MAIN },
  { title: "Portal Shake Shack",                category: "UX/UI",    img: `${IMG}/proyects/Portal%20Shake%20shack.jpg`,      url: BE_MAIN },
  { title: "Branding Data Intelligence",        category: "Branding", img: `${IMG}/proyects/Branding%20Data%20Intelligence.jpg`, url: BE_MAIN },
  { title: "Posts NT Ideas",                    category: "Branding", img: `${IMG}/proyects/Posts%20NT%20Ideas.jpg`,          url: BE_MAIN },
  { title: "Toks Wallet",                       category: "UX/UI",    img: `${IMG}/proyects/Toks%20Wallet.jpg`,               url: BE_MAIN },
  { title: "Complemento Detallista",            category: "UX/UI",    img: `${IMG}/proyects/Complemento%20Detallista.jpg`,    url: BE_MAIN },
  { title: "Página web Data Intelligence",      category: "Diseño web", img: `${IMG}/proyects/Website%20data%20intelligence.jpg`, url: BE_MAIN },
  { title: "FACTO Hospitality (rediseño)",      category: "UX/UI",    img: `${IMG}/proyects/Rediseno%20FACTO%20Hosp.jpg`,     url: BE_MAIN },
  { title: "Fitbooker",                         category: "UX/UI",    img: `${IMG}/proyects/FITBOOKER.jpg`,                   url: BE.fitbooker },
  { title: "Fitbooker Design System",           category: "Branding", img: `${IMG}/proyects/DESIGN%20SYSTEM%20FITBOOKER.jpg`, url: BE.fitbooker },
  { title: "Comandera Móvil",                   category: "UX/UI",    img: `${IMG}/proyects/ComanderaMovil.jpg`,              url: BE.comandera },
  { title: "Ecommerce IGNI",                    category: "UX/UI",    img: `${IMG}/proyects/ECOMMERCE%20IGNI.jpg`,            url: BE_MAIN },
  { title: "Renovación emails AXA Seguros",     category: "UX/UI",    img: `${IMG}/proyects/Emails%20AXA.jpg`,                url: BE_MAIN },
  { title: "Rediseño página web ESFRE Pachuca", category: "Diseño web", img: `${IMG}/proyects/ESFRE%20pachuca.jpg`,           url: BE_MAIN },
  { title: "Rediseño web Sushi Roll",           category: "Diseño web", img: `${IMG}/proyects/Sushi%20Roll.jpg`,              url: BE_MAIN },
  { title: "Plataforma web BAM 247",            category: "Diseño web", img: `${IMG}/proyects/BAM%2024.jpg`,                 url: BE_MAIN },
  { title: "Sitio web Estimaprop avalúos",      category: "Diseño web", img: `${IMG}/proyects/Estimaprop.jpg`,               url: BE_MAIN },
  { title: "Plataforma IPN",                    category: "UX/UI",    img: `${IMG}/proyects/Plataforma%20IPN.jpg`,            url: BE_MAIN },
];

window.BehanceData = {
  profile: "alejandrolzl",
  url: "https://www.behance.net/alejandrolzl",
  stats: { views: 297, appreciations: 8, projects: 4 },
  projects: [
    { title: "Fitbooker",           cat: "Booking · SaaS",         views: 11,  loves: 11, url: "https://www.behance.net/gallery/247063405/Fitbooker",            img: "https://mir-s3-cdn-cf.behance.net/projects/404/6d5573247063405.Y3JvcCw4MDgsNjMyLDAsMA.jpg" },
    { title: "Bimsa Suite",         cat: "Producto · SaaS",         views: 22,  loves: 11, url: "https://www.behance.net/gallery/247017301/Bimsa-Suite",         img: "https://mir-s3-cdn-cf.behance.net/projects/404/e864ec247017301.Y3JvcCw4MDgsNjMyLDAsMA.jpg" },
    { title: "Portafolio",          cat: "Marca personal",          views: 236, loves: 44, url: "https://www.behance.net/gallery/188810443/Portafolio-Alejandro-Lopez", img: "https://mir-s3-cdn-cf.behance.net/projects/404/a4e337188810443.Y3JvcCw4NTAsNjY1LDE1Myww.jpg" },
    { title: "Comandera Móvil",     cat: "Hostelería · Móvil",      views: 58,  loves: 22, url: "https://www.behance.net/gallery/213949749/Comandera-Movil",    img: "https://mir-s3-cdn-cf.behance.net/projects/404/e37d5e213949749.Y3JvcCw4MDgsNjMyLDAsMA.jpg" },
  ],
};

window.ClientsData = [
  { name: "Evergo",            logo: `${IMG}/partners/Evergo%20logo.png` },
  { name: "Data Intelligence", logo: `${IMG}/partners/Logo%20Data%20Intelligence.png` },
  { name: "NT",                logo: `${IMG}/partners/NTLogo.png` },
  { name: "Smart Payment",     logo: `${IMG}/partners/Loso%20Smart%20Payment.png` },
  { name: "Sushi Roll",        logo: `${IMG}/partners/Loso%20Sushi%20Roll.png` },
  { name: "CDMX",              logo: `${IMG}/partners/CDMX%20Logo.png` },
  { name: "ESFRE",             logo: `${IMG}/partners/ESFRE%20Logo.png` },
  { name: "IPN",               logo: `${IMG}/partners/IPN%20Logo.png` },
  { name: "IGNI",              logo: `${IMG}/partners/Logo%20IGNI.png` },
  { name: "Trabajobs",         logo: `${IMG}/partners/Loso%20Trabajobs.png` },
];

window.SoftwareData = [
  { num: "01", name: "Diseño y prototipado", list: "Figma · FigJam · Miro · Maze · Photoshop · Illustrator · Canva · Zeplin · Framer · Typeform" },
  { num: "02", name: "Maquetado Web",        list: "HTML · CSS · JavaScript · jQuery · Tailwind · Bootstrap · Astro" },
  { num: "03", name: "CMS",                  list: "WordPress (Divi · Elementor · Woo) · Shopify · Mailchimp" },
  { num: "04", name: "Colaboración",         list: "Jira · Trello · Confluence · Slack · Azure Boards · Notion" },
  { num: "05", name: "Analítica",            list: "Google Analytics · Hotjar" },
  { num: "06", name: "Inteligencia Artificial", list: "Claude · Claude Code · Claude Design · ChatGPT · Gemini" },
];

window.CertsData = [
  { org: "Google", title: "Diseño de experiencia del usuario", year: "2023", logo: `${IMG}/portfolio/new-google-logo.jpg` },
  { org: "Udemy",  title: "Diseño UX",                          year: "2022", logo: `${IMG}/portfolio/Udemy.png` },
  { org: "EBAC",   title: "Diseño UI",                          year: "2022", logo: `${IMG}/portfolio/ebaclogo.jpeg` },
];

// Featured recommendations (LinkedIn-style with photos from the site)
window.FeaturedRecs = [
  { name: "Risto Vaisanen",  role: "CEO · Trabajobs",           img: `${IMG}/recomend/Recomend0.png` },
  { name: "Francisco Dimas", role: "Desarrollador Senior Líder", img: `${IMG}/recomend/Recomend2.png` },
  { name: "Juan Luis Vega",  role: "Chief Product Officer",     img: `${IMG}/recomend/Recomend3.png` },
  { name: "Fernando Pérez",  role: "Project Manager",           img: `${IMG}/recomend/Recomend1.png` },
];

window.TestimonialsData = [
  { quote: "Destaco su comunicación con dirección y con el equipo técnico, su criterio de producto y su enfoque en calidad. Alejandro simplificó flujos clave de registro y postulación, redujo pasos y fricción en formularios, y dejó documentadas las decisiones de diseño.", name: "Risto Vaisanen",  role: "CEO · Trabajobs",                initials: "RV" },
  { quote: "Demostró un gran compromiso y entregables de gran calidad en colaboración con los equipos de producto, tecnología y marketing, asegurando que cada diseño fuera implementado con precisión.",                                                                         name: "Juan Luis Vega",  role: "Chief Product Officer",          initials: "JV" },
  { quote: "Su profesionalismo y actitud positiva contribuyeron significativamente al ambiente de trabajo. Gran habilidad para adaptarse a los cambios y resolver desafíos complejos.",                                                                                            name: "Francisco Dimas", role: "Desarrollador Senior Líder",    initials: "FD" },
  { quote: "Me consta su responsabilidad y competencia en el trabajo. Creo firmemente que Alejandro sabrá cumplir con las tareas encomendadas y es por eso el motivo de mi recomendación.",                                                                                         name: "David León",      role: "Dirección de Sistemas · IPN",   initials: "DL" },
  { quote: "Es para mí un placer recomendar a Alejandro para cualquier puesto relacionado con desarrollo digital. Amplio dominio de herramientas y técnicas; persona trabajadora y muy confiable.",                                                                                 name: "Leonardo Castro", role: "Director · IGNI",                initials: "LC" },
  { quote: "Su enfoque colaborativo y proactivo, junto con su habilidad para comunicar decisiones de diseño de manera persuasiva, ha fortalecido la cohesión del equipo y contribuido al éxito de los proyectos.",                                                                   name: "Emmanuel Reyes",  role: "Sr UX/UI Designer",              initials: "ER" },
  { quote: "Tener a Alejandro en el equipo impactó positivamente en la calidad de los productos digitales. No solo comprende las necesidades del usuario, sino que se asegura de que cada aspecto del diseño contribuya a los objetivos comerciales.",                              name: "Fernando Pérez",  role: "Product Owner",                  initials: "FP" },
  { quote: "Una persona muy honesta y profesional. Excelente trabajo y gran experiencia como cliente. Estoy muy satisfecho con la calidad, la comunicación y la creatividad que Alejandro aportó a ESFRE Pachuca.",                                                                 name: "Cristian L.",     role: "ESFRE Pachuca",                  initials: "CL" },
];

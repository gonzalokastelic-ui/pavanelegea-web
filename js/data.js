/* =========================================================
   PAVANEL EGEA · Datos editables del sitio
   ---------------------------------------------------------
   Todo lo que el cliente va a cambiar seguido vive acá:
   contacto, propiedades y desarrollos.

   Imágenes: cada entrada de "fotos" puede ser
     · un ID de Unsplash (imágenes genéricas de muestra), o
     · una ruta propia, ej: "img/propiedades/pe-101-1.jpg"
   ========================================================= */

window.SITE = {
  // ⚠️ Reemplazar por el número real (código país + área, sin +, espacios ni guiones)
  whatsapp: "5490000000000",
  whatsappMensaje: "¡Hola! Quisiera hacer una consulta.",
  instagram: "https://www.instagram.com/pavanelegeapropiedades/",
  instagramUser: "@pavanelegeapropiedades",
  email: "PavanelEgeaNI@gmail.com",

  // Formulario: endpoint que recibe la consulta y la envía por mail.
  // "contacto.php" funciona en hostings con PHP (cPanel / public_html).
  formEndpoint: "contacto.php",
  // true = simula el envío (para mostrar la web antes de subirla). Pasar a false al publicar.
  formDemo: true,
  // true = muestra el aviso "Contenido de ejemplo" en Propiedades y Desarrollos.
  // Pasar a false cuando estén cargados los datos y fotos reales.
  datosDeEjemplo: true,
};

window.PROPIEDADES = [
  {
    ref: "PE-101",
    titulo: "Departamento luminoso con balcón",
    tipo: "departamento",
    operacion: "venta",
    moneda: "USD",
    precio: 89000,
    zona: "Zona Centro",
    ambientes: 2, dormitorios: 1, banos: 1, m2: 52,
    descripcion:
      "Departamento de dos ambientes al frente, con balcón corrido y excelente entrada de luz natural. Cocina integrada y placares en dormitorio.",
    caracteristicas: ["Balcón", "Apto crédito", "Luminoso", "Cerca de transporte"],
    fotos: ["1522708323590-d24dbb6b0267", "1493809842364-78817add7ffb", "1484154218962-a197022b5858", "1600607687644-c7171b42498f"],
  },
  {
    ref: "PE-102",
    titulo: "Casa con piscina y jardín",
    tipo: "casa",
    operacion: "venta",
    moneda: "USD",
    precio: 265000,
    zona: "Barrio residencial",
    ambientes: 5, dormitorios: 3, banos: 2, m2: 220,
    descripcion:
      "Casa de diseño contemporáneo en lote propio, con living de doble altura, galería semicubierta, jardín y piscina. Ideal familia.",
    caracteristicas: ["Piscina", "Jardín", "Cochera doble", "Parrilla"],
    fotos: ["1600596542815-ffad4c1539a9", "1600607687939-ce8a6c25118c", "1556911220-bff31c812dba", "1616594039964-ae9021a400a0", "1600566752355-35792bedcfea"],
  },
  {
    ref: "PE-103",
    titulo: "Departamento 3 ambientes amoblado",
    tipo: "departamento",
    operacion: "alquiler",
    moneda: "ARS",
    precio: 750000,
    zona: "Zona Centro",
    ambientes: 3, dormitorios: 2, banos: 1, m2: 78,
    descripcion:
      "Amplio departamento amoblado, listo para habitar. Living comedor con ventanales, dos dormitorios y cocina equipada.",
    caracteristicas: ["Amoblado", "Ascensor", "Calefacción central", "Contrato legal"],
    fotos: ["1502672260266-1c1ef2d93688", "1600210492486-724fe5c67fb0", "1616594039964-ae9021a400a0"],
  },
  {
    ref: "PE-104",
    titulo: "Casa con galería y patio",
    tipo: "casa",
    operacion: "alquiler",
    moneda: "ARS",
    precio: 1200000,
    zona: "Barrio Norte",
    ambientes: 4, dormitorios: 3, banos: 2, m2: 160,
    descripcion:
      "Casa en planta baja con galería, patio parquizado y cochera. Ambientes amplios y cálidos en zona tranquila.",
    caracteristicas: ["Patio", "Cochera", "Galería", "Mascotas permitidas"],
    fotos: ["1600566753190-17f0baa2a6c3", "1618221195710-dd6b41faaea6", "1484154218962-a197022b5858"],
  },
  {
    ref: "PE-105",
    titulo: "Monoambiente a estrenar",
    tipo: "departamento",
    operacion: "alquiler",
    moneda: "ARS",
    precio: 420000,
    zona: "Zona Centro",
    ambientes: 1, dormitorios: 0, banos: 1, m2: 35,
    descripcion:
      "Monoambiente a estrenar con terminaciones de calidad, ideal para estudiantes o profesionales. Edificio con amenities.",
    caracteristicas: ["A estrenar", "Amenities", "Laundry", "Seguridad"],
    fotos: ["1560448204-e02f11c3d0e2", "1556911220-bff31c812dba"],
  },
  {
    ref: "PE-106",
    titulo: "Casa moderna de autor",
    tipo: "casa",
    operacion: "venta",
    moneda: "USD",
    precio: 420000,
    zona: "Barrio cerrado",
    ambientes: 6, dormitorios: 4, banos: 3, m2: 310,
    descripcion:
      "Residencia de autor con grandes paños vidriados, escalera flotante, suite principal con vestidor y piscina climatizada.",
    caracteristicas: ["Piscina climatizada", "Suite con vestidor", "Seguridad 24 h", "Domótica"],
    fotos: ["1580587771525-78b9dba3b914", "1600573472550-8090b5e0745e", "1505691938895-1758d7feb511", "1600607687644-c7171b42498f"],
  },
  {
    ref: "PE-107",
    titulo: "Departamento 4 ambientes con vista",
    tipo: "departamento",
    operacion: "venta",
    moneda: "USD",
    precio: 168000,
    zona: "Barrio Norte",
    ambientes: 4, dormitorios: 3, banos: 2, m2: 110,
    descripcion:
      "Piso alto con vista abierta, tres dormitorios (uno en suite), cocina separada y lavadero. Edificio con cochera.",
    caracteristicas: ["Vista abierta", "Cochera", "Suite", "Lavadero"],
    fotos: ["1545324418-cc1a3fa10c00", "1505691938895-1758d7feb511", "1600210492486-724fe5c67fb0", "1616594039964-ae9021a400a0"],
  },
  {
    ref: "PE-108",
    titulo: "Casa familiar en barrio tranquilo",
    tipo: "casa",
    operacion: "venta",
    moneda: "USD",
    precio: 198000,
    zona: "Barrio residencial",
    ambientes: 4, dormitorios: 3, banos: 2, m2: 180,
    descripcion:
      "Casa en dos plantas sobre lote amplio, living con hogar, cocina comedor y jardín al fondo. Lista para mudarse.",
    caracteristicas: ["Jardín", "Hogar a leña", "Cochera", "Apto crédito"],
    fotos: ["1600047509807-ba8f99d2cdde", "1600607687939-ce8a6c25118c", "1484154218962-a197022b5858"],
  },
];

window.DESARROLLOS = [
  {
    ref: "DS-01",
    nombre: "Edificio Aurora",
    estado: "construccion", // construccion | lanzamiento
    avance: 65,
    entrega: "Diciembre 2027",
    ubicacion: "Zona Centro",
    unidades: "24 unidades",
    tipologias: "1, 2 y 3 ambientes",
    resumen:
      "Edificio residencial de diseño contemporáneo con unidades luminosas, balcones aterrazados y amenities en la terraza.",
    caracteristicas: ["Terraza con SUM", "Cocheras", "Balcones aterrazados", "Seguridad"],
    fotos: ["1512915922686-57c11dde9b6b", "1503387762-592deb58ef4e", "1541888946425-d81bb19240f5", "1600607687939-ce8a6c25118c"],
  },
  {
    ref: "DS-02",
    nombre: "Residencias del Parque",
    estado: "construccion",
    avance: 30,
    entrega: "Junio 2028",
    ubicacion: "Barrio residencial",
    unidades: "12 dúplex",
    tipologias: "Dúplex de 3 y 4 ambientes",
    resumen:
      "Conjunto de dúplex con patio propio y cochera, pensado para familias que buscan espacio y tranquilidad.",
    caracteristicas: ["Patio propio", "Cochera", "Parrilla individual", "Entorno verde"],
    fotos: ["1567496898669-ee935f5f647a", "1504307651254-35680f356dfd", "1600566753190-17f0baa2a6c3", "1618221195710-dd6b41faaea6"],
  },
  {
    ref: "DS-03",
    nombre: "Torre Mirador",
    estado: "lanzamiento",
    avance: 0,
    entrega: "Lanzamiento 2027",
    ubicacion: "Barrio Norte",
    unidades: "Pre-venta",
    tipologias: "2 y 3 ambientes",
    resumen:
      "Nuestro próximo lanzamiento. Reservá tu lugar en la pre-venta y accedé a las mejores unidades y condiciones de financiación.",
    caracteristicas: ["Pre-venta", "Financiación en pesos", "Amenities", "Vistas abiertas"],
    fotos: ["1481253127861-534498168948", "1487958449943-2429e8be8625", "1554469384-e58fac16e23a", "1600573472550-8090b5e0745e"],
  },
];

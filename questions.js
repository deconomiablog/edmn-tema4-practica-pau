(() => {
  const Q = [];
  const add = (block, level, type, prompt, answer, explanation, hint, options = null, tolerance = null) => {
    Q.push({
      id: block + "-" + String(Q.filter(q => q.block === block).length + 1).padStart(2, "0"),
      block, level, type, prompt, answer, explanation, hint, options, tolerance
    });
  };
  const n = v => Math.round(v * 100) / 100;

  // =========================================================
  // 1. PRODUCCIÓN Y PRODUCTIVIDAD — 40 preguntas
  // 14 Básico · 13 Medio · 13 Reto
  // =========================================================
  [
    ["mcq","¿Qué expresa la productividad?","La relación entre la producción obtenida y los factores utilizados","La productividad mide la eficiencia: relaciona el output conseguido con los recursos empleados.","Piensa en un cociente entre resultado y recursos.",["La relación entre la producción obtenida y los factores utilizados","La diferencia entre ingresos y costes","El precio de venta por unidad","Los costes fijos de la empresa"]],
    ["mcq","¿Cuál es la fórmula de la productividad de un factor?","Producción obtenida / unidades del factor empleadas","Relaciona la producción con un único factor, normalmente el trabajo.","Busca output dividido entre un input.",["Producción obtenida / unidades del factor empleadas","Costes totales / producción","Producción × factor empleado","Ingresos / costes fijos"]],
    ["tf","Una empresa puede aumentar su producción y, sin embargo, reducir su productividad.",true,"Sí. Si utiliza proporcionalmente muchos más recursos que antes, la productividad puede bajar aunque produzca más.","Producción y productividad no son sinónimos."],
    ["tf","Para calcular la productividad física por trabajador siempre es necesario conocer el salario.",false,"No. Si se pide productividad física por trabajador, bastan producción y número de trabajadores.","Distingue productividad física de productividad global."],
    ["mcq","Si se producen 600 unidades con 12 trabajadores, la productividad se expresa correctamente como…","unidades por trabajador","La productividad física del trabajo se expresa en unidades producidas por unidad del factor trabajo.","Fíjate en el denominador.",["unidades por trabajador","euros por unidad","trabajadores por euro","euros de beneficio"]],
    ["mcq","La productividad global utiliza…","el valor de la producción y el valor de todos los factores empleados","Para sumar factores heterogéneos hay que valorarlos en una unidad monetaria común.","No se pueden sumar directamente horas, kilos y máquinas.",["el valor de la producción y el valor de todos los factores empleados","solo trabajadores","solo costes fijos","solo el precio de venta"]],
    ["tf","Si la productividad pasa de 8 a 10 unidades por hora, ha aumentado un 25%.",true,"La tasa es (10 − 8) / 8 × 100 = 25%.","La variación se divide entre el valor inicial."],
    ["mcq","¿Qué dato puede ser innecesario para calcular la productividad física por hora de trabajo?","El salario por hora","Para una productividad física por hora interesan producción y horas trabajadas, no el salario.","No confundas productividad física con productividad global.",["El salario por hora","La producción obtenida","El número de trabajadores","Las horas trabajadas"]],
    ["mcq","Si la productividad de un factor aumenta, manteniendo todo lo demás constante, la empresa…","obtiene más producción por unidad de ese factor","Eso es exactamente lo que significa una mejora de productividad.","Interpreta producción / factor.",["obtiene más producción por unidad de ese factor","siempre obtiene más beneficio","reduce necesariamente sus costes fijos","vende siempre más"]],
    ["tf","La productividad global puede calcularse sumando directamente trabajadores, kilos de materia prima y horas-máquina.",false,"No. Son magnitudes heterogéneas y deben expresarse en una unidad monetaria común.","Hay que homogeneizar los factores."],
    ["mcq","¿Qué aparece en el denominador de la productividad global?","El valor total de los factores empleados","PG = valor de la producción / valor de los factores empleados.","Recuerda qué se coloca debajo en el cociente.",["El valor total de los factores empleados","El beneficio","El precio de venta unitario","Los costes fijos solamente"]],
    ["tf","Una tasa de variación de productividad negativa indica que la productividad ha disminuido.",true,"Una tasa negativa significa que el valor final es menor que el inicial.","El signo de la tasa aporta la interpretación."],
    ["mcq","Dos empresas producen lo mismo. ¿Cuál tiene mayor productividad del trabajo?","La que utiliza menos horas de trabajo","Con el mismo numerador, un denominador menor eleva la productividad.","Compara producción / horas.",["La que utiliza menos horas de trabajo","La que utiliza más horas","Las dos siempre tienen la misma productividad","No puede saberse"]],
    ["mcq","La productividad es, sobre todo, un indicador de…","eficiencia","Mide cuánto output se obtiene con los recursos utilizados.","Piensa en aprovechar mejor los recursos.",["eficiencia","forma jurídica","fiscalidad","segmentación de mercado"]]
  ].forEach(x => add("productividad","Básico",...x));

  [
    [1200,6],[1800,9],[2400,8],[3150,9]
  ].forEach(([p,t]) => add("productividad","Medio","number",
    `Una empresa obtiene ${p} unidades con ${t} trabajadores. Calcula la productividad por trabajador.`,
    p/t,`Productividad = ${p} / ${t} = ${n(p/t)} unidades por trabajador.`,
    "Divide la producción entre el número de trabajadores."));

  [
    [640,8,5],[900,10,6],[1440,12,8]
  ].forEach(([p,w,h]) => add("productividad","Medio","number",
    `Se producen ${p} unidades con ${w} trabajadores que trabajan ${h} horas cada uno. ¿Cuál es la productividad por hora de trabajo?`,
    p/(w*h),`Horas totales = ${w} × ${h} = ${w*h}. Productividad = ${p} / ${w*h} = ${n(p/(w*h))} unidades/hora.`,
    "Primero calcula las horas totales de trabajo."));

  [
    [20,24],[25,30],[50,45]
  ].forEach(([a,b]) => add("productividad","Medio","number",
    `La productividad pasa de ${a} a ${b}. Calcula la tasa de variación porcentual.`,
    (b-a)/a*100,`Tasa = (${b} − ${a}) / ${a} × 100 = ${n((b-a)/a*100)}%.`,
    "La base de comparación es la productividad inicial."));

  [
    [1000,8,100,300,200],[1500,10,800,500,700]
  ].forEach(([u,pu,c1,c2,c3]) => {
    const pg=u*pu/(c1+c2+c3);
    add("productividad","Medio","number",
      `Una empresa produce ${u} unidades valoradas a ${pu} € cada una. Los factores utilizados cuestan ${c1} €, ${c2} € y ${c3} €. Calcula la productividad global.`,
      pg,`Valor de producción = ${u*pu} €. Valor de factores = ${c1+c2+c3} €. PG = ${n(pg)}.`,
      "Valora producción y factores en euros y divide.");
  });

  add("productividad","Medio","mcq","La producción aumenta un 20% y el número de trabajadores aumenta un 20%. Si no cambia nada más, la productividad por trabajador…","se mantiene igual","Numerador y denominador crecen en la misma proporción.","Compara las dos tasas de crecimiento.",["aumenta","disminuye","se mantiene igual","se hace cero"]);

  [
    [352000,50,422400,40],[10000,20,10800,18],[45000,30,50400,28]
  ].forEach(([p1,t1,p2,t2]) => {
    const a=p1/t1, b=p2/t2, rate=(b-a)/a*100;
    add("productividad","Reto","number",
      `Periodo 1: ${p1} unidades con ${t1} trabajadores. Periodo 2: ${p2} unidades con ${t2} trabajadores. ¿En qué porcentaje varía la productividad por trabajador?`,
      rate,`P₁ = ${n(a)}. P₂ = ${n(b)}. Tasa = (${n(b)} − ${n(a)}) / ${n(a)} × 100 = ${n(rate)}%.`,
      "Calcula primero ambas productividades.");
  });

  [
    [4800,12,8,10],[7200,15,8,12],[9600,20,6,10]
  ].forEach(([p,w,h,target]) => {
    const current=p/(w*h), rate=(target-current)/current*100;
    add("productividad","Reto","number",
      `Con ${w} trabajadores de ${h} horas se producen ${p} unidades. El sector alcanza ${target} unidades por hora. ¿En qué porcentaje debe aumentar la productividad para igualarlo?`,
      rate,`Productividad actual = ${n(current)}. Incremento necesario = (${target} − ${n(current)}) / ${n(current)} × 100 = ${n(rate)}%.`,
      "Compara el objetivo con la productividad actual.");
  });

  [
    [1000,15,700,300,200,13],[1200,12,600,400,200,15]
  ].forEach(([u,p,c1,c2,c3,pg2]) => {
    const pg1=u*p/(c1+c2+c3), rate=(pg2-pg1)/pg1*100;
    add("productividad","Reto","number",
      `Periodo 1: ${u} unidades a ${p} €; factores por ${c1} €, ${c2} € y ${c3} €. En el periodo 2 la productividad global es ${pg2}. Calcula la variación porcentual de la PG.`,
      rate,`PG inicial = ${n(pg1)}. Tasa = (${pg2} − ${n(pg1)}) / ${n(pg1)} × 100 = ${n(rate)}%.`,
      "Calcula primero la productividad global inicial.");
  });

  add("productividad","Reto","mcq","La producción crece un 10% y las horas de trabajo crecen un 20%. ¿Qué ocurre con la productividad del trabajo?","Disminuye","Si el denominador crece proporcionalmente más que el numerador, el cociente baja.","Compara el crecimiento del numerador y del denominador.",["Aumenta","Disminuye","No cambia","Siempre se duplica"]);
  add("productividad","Reto","mcq","Una empresa mejora la productividad del trabajo. ¿Podemos afirmar solo con ese dato que también ha mejorado la productividad global?","No, faltan datos sobre los demás factores","La mejora de un factor no garantiza que mejore la eficiencia global si otros factores se usan peor o cuestan más.","La productividad global incorpora todos los factores.",["Sí, siempre","No, faltan datos sobre los demás factores","Sí, si aumenta la producción","Solo si bajan los costes fijos"]);
  add("productividad","Reto","number","Una fábrica quiere producir 9.600 unidades con una productividad objetivo de 12 unidades por hora. ¿Cuántas horas totales de trabajo puede utilizar como máximo?",800,"Horas = producción / productividad = 9.600 / 12 = 800.","Despeja el factor trabajo en la fórmula de productividad.");
  add("productividad","Reto","number","La productividad por trabajador es 250 unidades y trabajan 18 personas. ¿Cuál es la producción total?",4500,"Producción = productividad × trabajadores = 250 × 18 = 4.500.","Despeja la producción.");
  add("productividad","Reto","mcq","¿Qué medida puede elevar la productividad sin aumentar proporcionalmente los recursos?","Mejorar la tecnología o la formación","Una mejor tecnología o capital humano puede permitir producir más con los mismos recursos.","Busca una medida de eficiencia.",["Mejorar la tecnología o la formación","Aumentar recursos sin cambiar la producción","Subir el precio de venta","Aumentar siempre los costes fijos"]);

  // =========================================================
  // 2. COSTES DE PRODUCCIÓN — 40 preguntas
  // =========================================================
  [
    ["mcq","¿Qué son los costes fijos?","Los que no varían con el nivel de producción en el periodo analizado","Son independientes del volumen producido dentro del periodo considerado.","Piensa en alquileres o seguros.",["Los que no varían con el nivel de producción en el periodo analizado","Los que crecen con cada unidad","Los ingresos de la empresa","Los que solo existen si se vende"]],
    ["mcq","¿Qué son los costes variables?","Los que varían con el nivel de producción","Cambian cuando cambia la cantidad producida.","Piensa en materias primas.",["Los que varían con el nivel de producción","Los que nunca cambian","Los costes financieros","Los que solo aparecen al cerrar"]],
    ["mcq","¿Cuál es la fórmula del coste total?","CT = CF + CV","El coste total suma costes fijos y variables.","Suma los dos grandes componentes.",["CT = CF + CV","CT = CF − CV","CT = CV / Q","CT = p × Q"]],
    ["mcq","¿Cuál es la fórmula del coste medio total?","CMe = CT / Q","Reparte el coste total entre las unidades producidas.","Es un coste por unidad.",["CMe = CT / Q","CMe = Q / CT","CMe = CF + Q","CMe = ΔQ / ΔCT"]],
    ["mcq","¿Qué mide el coste marginal?","El aumento del coste total al producir una unidad adicional","Muestra cómo cambia el coste total cuando aumenta la producción.","Fíjate en la palabra marginal.",["El aumento del coste total al producir una unidad adicional","El coste fijo por unidad","El precio de venta","El beneficio total"]],
    ["tf","El alquiler mensual de una nave suele considerarse un coste fijo a corto plazo.",true,"El alquiler no depende normalmente de cuántas unidades se produzcan.","Piensa si cambia al producir una unidad más."],
    ["tf","La materia prima consumida en cada unidad suele ser un coste variable.",true,"A mayor producción, normalmente se necesita más materia prima.","Su consumo depende del volumen producido."],
    ["tf","Si la producción es cero, los costes fijos pueden seguir existiendo.",true,"Los costes fijos se soportan aunque no haya producción.","Por eso se llaman fijos."],
    ["mcq","Un coste directo es aquel que…","puede asignarse claramente a un producto o actividad","Se vincula sin dificultad al producto concreto.","Piensa en trazabilidad.",["puede asignarse claramente a un producto o actividad","no puede identificarse con ningún producto","siempre es fijo","siempre es financiero"]],
    ["mcq","Un coste indirecto es aquel que…","requiere un criterio de reparto para imputarlo a productos","Los costes indirectos son compartidos y requieren criterios de imputación.","Suelen ser comunes a varias actividades.",["requiere un criterio de reparto para imputarlo a productos","siempre depende de las ventas","es igual al coste marginal","solo aparece en industrias"]],
    ["tf","El coste fijo medio suele disminuir al aumentar la producción si el coste fijo total no cambia.",true,"El mismo coste fijo se reparte entre más unidades.","CF / Q disminuye al crecer Q."],
    ["mcq","Si CVu es constante, el coste variable total se calcula como…","CV = CVu × Q","El coste variable total crece proporcionalmente con Q.","Multiplica coste por unidad por cantidad.",["CV = CVu × Q","CV = CF / Q","CV = p × Q","CV = CT − Q"]],
    ["tf","El precio de venta forma parte del coste total de producción.",false,"El precio de venta determina ingresos, no costes de producción.","No mezcles ingresos y costes."],
    ["mcq","¿Qué coste se calcula como ΔCT / ΔQ?","Coste marginal","El coste marginal mide la variación del coste total por el cambio en producción.","Busca una magnitud incremental.",["Coste marginal","Coste fijo medio","Coste variable total","Ingreso medio"]]
  ].forEach(x => add("costes","Básico",...x));

  [[1000,3000],[2500,4500],[800,2200],[5000,7000]].forEach(([cf,cv]) => add("costes","Medio","number",
    `Una empresa soporta CF = ${cf} € y CV = ${cv} €. Calcula el coste total.`,
    cf+cv,`CT = CF + CV = ${cf} + ${cv} = ${cf+cv} €.`,"Suma costes fijos y variables."));

  [[2000,5,400],[3600,8,300],[1500,4,500]].forEach(([cf,cvu,q]) => add("costes","Medio","number",
    `CF = ${cf} €, CVu = ${cvu} € y Q = ${q} unidades. Calcula el coste total.`,
    cf+cvu*q,`CV = ${cvu} × ${q} = ${cvu*q} €. CT = ${cf+cvu*q} €.`,"Primero calcula el coste variable total."));

  [[5000,250],[7200,300],[4200,350]].forEach(([ct,q]) => add("costes","Medio","number",
    `El coste total es ${ct} € para ${q} unidades. Calcula el coste medio total.`,
    ct/q,`CMe = CT / Q = ${ct} / ${q} = ${n(ct/q)} €/ud.`,"Divide coste total entre cantidad."));

  [[3000,3300,100,120],[5000,5400,200,250]].forEach(([ct1,ct2,q1,q2]) => add("costes","Medio","number",
    `El coste total pasa de ${ct1} € a ${ct2} € cuando la producción pasa de ${q1} a ${q2} unidades. Calcula el coste marginal medio del incremento.`,
    (ct2-ct1)/(q2-q1),`CMg = ΔCT / ΔQ = ${ct2-ct1} / ${q2-q1} = ${n((ct2-ct1)/(q2-q1))} €/ud.`,"Calcula primero ambas variaciones."));

  add("costes","Medio","mcq","La empresa produce más unidades sin modificar su coste fijo total. ¿Qué ocurre con el coste fijo medio?","Disminuye","CF medio = CF / Q. Si Q aumenta y CF se mantiene, disminuye.","Reparte el mismo coste fijo entre más unidades.",["Aumenta","Disminuye","No cambia nunca","Se convierte en ingreso"]);

  [[2400,6,300,250],[5000,8,400,350],[3200,5,500,420]].forEach(([cf,cvu,q1,q2]) => add("costes","Reto","number",
    `CF = ${cf} € y CVu = ${cvu} €. ¿Cuánto disminuye el coste total si la producción baja de ${q1} a ${q2} unidades?`,
    cvu*(q1-q2),`El CF no cambia. La reducción del CT es ${cvu} × (${q1} − ${q2}) = ${cvu*(q1-q2)} €.`,"Solo varía el componente variable."));

  [[30,200],[45,250]].forEach(([cme,q]) => add("costes","Reto","number",
    `Una empresa tiene un coste medio de ${cme} €/ud. para ${q} unidades. ¿Cuál es su coste total?`,
    cme*q,`CT = CMe × Q = ${cme} × ${q} = ${cme*q} €.`,"Despeja CT de CMe = CT / Q."));

  add("costes","Reto","number","Los costes totales para 100 unidades son 4.000 € y para 101 unidades son 4.035 €. ¿Cuál es el coste marginal de la unidad 101?",35,"CMg = ΔCT / ΔQ = 35 / 1 = 35 €.","Compara el salto de una unidad.");
  add("costes","Reto","mcq","Si el coste marginal está por debajo del coste medio, una unidad adicional tiende a…","reducir el coste medio","Una nueva unidad con coste inferior al promedio arrastra el promedio hacia abajo.","Piensa en cómo funciona una media.",["reducir el coste medio","aumentarlo siempre","dejarlo necesariamente igual","convertirlo en coste fijo"]);
  add("costes","Reto","mcq","¿Qué pareja está correctamente clasificada?","Alquiler: fijo; materia prima: variable","El alquiler suele ser fijo a corto plazo y la materia prima varía con la producción.","Separa lo que depende de Q de lo que no.",["Alquiler: fijo; materia prima: variable","Materia prima: fija; alquiler: variable","Precio de venta: fijo; salario: ingreso","Ventas: coste variable; alquiler: ingreso"]);
  add("costes","Reto","number","CF = 12.000 €. Si el coste fijo medio debe ser 20 €/ud., ¿qué producción corresponde?",600,"CF medio = CF / Q. Q = 12.000 / 20 = 600 unidades.","Despeja Q.");
  add("costes","Reto","number","CT = 18.000 €, Q = 600 y CVu = 20 €. Calcula los costes fijos.",6000,"CV = 20 × 600 = 12.000 €. CF = 18.000 − 12.000 = 6.000 €.","Calcula primero el coste variable total.");
  add("costes","Reto","tf","Con costes fijos constantes y CVu constante, el coste total aumenta linealmente con la producción.",true,"CT = CF + CVu × Q es una función lineal de Q.","Observa la fórmula del coste total.");
  add("costes","Reto","mcq","Una empresa quiere comparar dos niveles de producción. ¿Qué magnitud indica el coste adicional asociado al aumento de producción?","El coste marginal","El coste marginal mide el incremento de CT por el incremento de Q.","Busca la magnitud incremental.",["El coste marginal","El coste fijo total","El precio de venta","La productividad global"]);
  add("costes","Reto","number","En Q=200, CT=3.800 €. En Q=300, CT=4.700 €. Calcula el coste marginal medio entre ambos niveles.",9,"CMg = (4.700 − 3.800) / (300 − 200) = 900 / 100 = 9 €/ud.","Usa ΔCT / ΔQ.");
  add("costes","Reto","number","Con Q=400, CF=2.000 € y CV=4.000 €, calcula el coste medio total.",15,"CT = 6.000 €. CMe = 6.000 / 400 = 15 €/ud.","Suma primero CF y CV.");

  // =========================================================
  // 3. PUNTO MUERTO — 40 preguntas
  // =========================================================
  [
    ["mcq","¿Qué representa el punto muerto o umbral de rentabilidad?","La cantidad en la que ingresos totales y costes totales son iguales","En el punto muerto el beneficio es cero: IT = CT.","Busca el punto sin beneficio ni pérdida.",["La cantidad en la que ingresos totales y costes totales son iguales","La producción máxima","El coste fijo mínimo","El precio más alto posible"]],
    ["mcq","¿Cuál es la fórmula del punto muerto?","Q = CF / (p − CVu)","El denominador es el margen de contribución unitario.","Costes fijos entre margen unitario.",["Q = CF / (p − CVu)","Q = CF / (p + CVu)","Q = p / CF","Q = CVu / p"]],
    ["mcq","¿Qué es el margen de contribución unitario?","p − CVu","Cada unidad aporta esa diferencia a cubrir los costes fijos.","Resta el coste variable unitario al precio.",["p − CVu","p + CF","CF − CVu","CT / Q"]],
    ["tf","En el punto muerto el beneficio es igual a cero.",true,"Porque IT = CT.","Es el punto de equilibrio."],
    ["tf","Por debajo del punto muerto, en condiciones normales, la empresa tiene pérdidas.",true,"Los ingresos todavía no cubren todos los costes.","Compara IT y CT."],
    ["tf","Por encima del punto muerto, cada unidad adicional aporta el margen de contribución al beneficio.",true,"Una vez cubiertos los CF, el margen unitario se convierte en beneficio adicional.","Piensa qué pasa tras cubrir CF."],
    ["mcq","Los ingresos totales se calculan como…","IT = p × Q","Ingresos = precio por cantidad vendida.","Multiplica precio por ventas.",["IT = p × Q","IT = CF + CV","IT = CF / Q","IT = p − CVu"]],
    ["mcq","Si CVu es constante, los costes totales son…","CT = CF + CVu × Q","Los costes totales incorporan una parte fija y otra variable.","Suma CF y CV.",["CT = CF + CVu × Q","CT = p × Q","CT = CF / Q","CT = p − CVu"]],
    ["tf","Si aumenta el precio de venta y todo lo demás permanece igual, el punto muerto disminuye.",true,"Aumenta el margen de contribución y se necesitan menos unidades.","Mira el denominador de la fórmula."],
    ["tf","Si aumentan los costes fijos y todo lo demás permanece igual, el punto muerto aumenta.",true,"Hay más costes fijos que cubrir.","Mira el numerador."],
    ["tf","Si aumenta el coste variable unitario, el punto muerto disminuye.",false,"Al aumentar CVu, baja el margen unitario y hacen falta más unidades.","Observa p − CVu."],
    ["mcq","En el gráfico del punto muerto, el equilibrio se localiza donde…","se cortan IT y CT","El punto de corte de ingresos y costes totales marca beneficio cero.","Busca la intersección.",["se cortan IT y CT","CT corta el eje vertical","IT es cero","CF y CV son iguales"]],
    ["mcq","Si p = CVu, el margen unitario es…","0","No existe aportación por unidad para cubrir los costes fijos.","Resta p − CVu.",["0","1","CF","Q"]],
    ["tf","El análisis de punto muerto puede adaptarse a la decisión de comprar o fabricar.",true,"Se comparan el coste total de compra y el coste total de fabricación y se busca la cantidad de indiferencia.","Es el mismo principio de igualdad de costes."]
  ].forEach(x => add("punto-muerto","Básico",...x));

  [[2000,900,400],[18000,2.25,1.5],[32000,2,1],[1000,10,5]].forEach(([cf,p,cvu]) => add("punto-muerto","Medio","number",
    `CF = ${cf} €, precio = ${p} € y CVu = ${cvu} €. Calcula el punto muerto en unidades.`,
    cf/(p-cvu),`Q = ${cf} / (${p} − ${cvu}) = ${n(cf/(p-cvu))} unidades.`,"Calcula primero el margen unitario."));

  [[1000,10,5,250],[2000,20,8,200],[3000,25,10,300]].forEach(([cf,p,cvu,q]) => {
    const b=p*q-(cf+cvu*q);
    add("punto-muerto","Medio","number",
      `CF = ${cf} €, p = ${p} €, CVu = ${cvu} € y se venden ${q} unidades. Calcula el beneficio.`,
      b,`Bº = pQ − (CF + CVuQ) = ${b} €.`,"Calcula ingresos y costes totales.");
  });

  [[1000,10,5,150],[2400,20,8,150]].forEach(([cf,p,cvu,q]) => {
    const pm=cf/(p-cvu);
    add("punto-muerto","Medio","mcq",
      `Con CF=${cf} €, p=${p} € y CVu=${cvu} €, la empresa vende ${q} unidades. ¿En qué situación está?`,
      q>pm ? "Beneficios" : q<pm ? "Pérdidas" : "Punto muerto",
      `El punto muerto es ${n(pm)} unidades; compáralo con ${q}.`,
      "Calcula primero el punto muerto.",["Beneficios","Pérdidas","Punto muerto","No puede saberse"]);
  });

  add("punto-muerto","Medio","mcq","Si el precio baja un 10% y los costes no cambian, ¿qué suele ocurrir con el punto muerto?","Aumenta","Baja el margen de contribución, por lo que se necesitan más unidades.","Mira p − CVu.",["Aumenta","Disminuye","No cambia","Se hace cero"]);
  add("punto-muerto","Medio","mcq","Si el CVu disminuye y el precio no cambia, ¿qué ocurre con el margen unitario?","Aumenta","p − CVu aumenta cuando baja CVu.","Resta el coste variable al precio.",["Aumenta","Disminuye","No cambia","Se vuelve negativo"]);
  add("punto-muerto","Medio","number","Una empresa quiere obtener 5.000 € de beneficio. CF=10.000 €, p=50 €, CVu=30 €. ¿Cuántas unidades debe vender?",750,"Q = (CF + beneficio objetivo) / (p − CVu) = 15.000 / 20 = 750.","Añade el beneficio objetivo a los costes fijos.");
  add("punto-muerto","Medio","number","Ingresos totales: 40.000 € por 4.000 unidades. Calcula el precio de venta unitario.",10,"p = 40.000 / 4.000 = 10 €/ud.","Divide ingresos entre unidades.");

  [[2800,10,3,8],[10000,30,10,24]].forEach(([cf,p,cvu,newp]) => {
    const oldq=cf/(p-cvu), newq=cf/(newp-cvu), rate=(newq-oldq)/oldq*100;
    add("punto-muerto","Reto","number",
      `CF=${cf} €, CVu=${cvu} €. El precio pasa de ${p} € a ${newp} €. ¿En qué porcentaje varía el punto muerto?`,
      rate,`PM inicial = ${n(oldq)}; PM nuevo = ${n(newq)}. Variación = ${n(rate)}%.`,"Calcula ambos puntos muertos y compara con el inicial.");
  });

  [[10000,3,1],[30000,400,150],[18000,5,2]].forEach(([cf,buy,cvu]) => add("punto-muerto","Reto","number",
    `Comprar un componente cuesta ${buy} €/ud. Fabricarlo exige CF=${cf} € y CVu=${cvu} €/ud. ¿En qué cantidad se igualan ambos costes?`,
    cf/(buy-cvu),`Igualamos ${buy}Q = ${cf} + ${cvu}Q. Q = ${n(cf/(buy-cvu))}.`,"Iguala coste de compra y coste de fabricación."));

  add("punto-muerto","Reto","mcq","Si una empresa está justo en el punto muerto y aumenta el precio manteniendo Q y costes, pasará a…","obtener beneficios","Los ingresos aumentan mientras los costes permanecen iguales.","En el equilibrio IT = CT; cambia solo IT.",["obtener beneficios","tener pérdidas","seguir siempre igual","tener beneficio cero"]);
  add("punto-muerto","Reto","number","Una empresa tiene PM=500 unidades, p=30 € y CVu=18 €. Calcula sus costes fijos.",6000,"CF = PM × (p − CVu) = 500 × 12 = 6.000 €.","Despeja CF.");
  add("punto-muerto","Reto","number","CF=8.000 €, PM=400 unidades y p=35 €. Calcula el CVu.",15,"p − CVu = CF / PM = 20; CVu = 35 − 20 = 15 €.","Despeja primero el margen unitario.");
  add("punto-muerto","Reto","mcq","En comprar/fabricar, si Q está por encima del punto de indiferencia y el CVu de fabricar es menor que el precio de compra, normalmente conviene…","fabricar","Por encima del punto de indiferencia, el menor coste variable compensa los costes fijos.","Compara las pendientes de ambos costes.",["fabricar","comprar","cerrar la empresa","subir el precio de venta"]);
  add("punto-muerto","Reto","tf","Si el margen de contribución unitario se reduce a la mitad y los costes fijos no cambian, el punto muerto se duplica.",true,"Q = CF / margen. Si el denominador se reduce a la mitad, el cociente se duplica.","Aplica proporcionalidad inversa.");
  add("punto-muerto","Reto","number","Una empresa vende 4.000 unidades y obtiene ingresos de 40.000 €. Sus CV totales son 12.000 € y CF 2.800 €. Calcula el punto muerto.",400,"p=10 €, CVu=3 €. PM=2.800 / (10−3) = 400 unidades.","Obtén primero p y CVu a partir de los totales.");
  add("punto-muerto","Reto","mcq","¿Qué interpretación de un punto muerto de 2.000 unidades es correcta?","Con 2.000 unidades el beneficio es cero; por encima comienza la zona de beneficios","El punto muerto marca IT = CT y el umbral a partir del cual aparecen beneficios.","Distingue equilibrio y zona de beneficios.",["Con 2.000 unidades el beneficio es cero; por encima comienza la zona de beneficios","La empresa gana 2.000 €","Los costes fijos son 2.000 €","Debe vender exactamente 2.000 unidades siempre"]);

  // =========================================================
  // 4. FIFO Y PMP — 40 preguntas
  // =========================================================
  [
    ["mcq","¿Qué significa FIFO?","First In, First Out: las primeras entradas son las primeras salidas","FIFO asigna las salidas a los lotes más antiguos.","Piensa en el orden de entrada.",["First In, First Out: las primeras entradas son las primeras salidas","Final In, Final Out","Precio fijo de inventario","Promedio simple de ventas"]],
    ["mcq","¿Qué hace el PMP?","Calcula un precio medio ponderado según unidades y precios de entrada","El PMP pondera cada precio por las unidades correspondientes.","No es una media simple si los lotes tienen distinto tamaño.",["Calcula un precio medio ponderado según unidades y precios de entrada","Valora todo al último precio","Usa siempre el precio de venta","Elimina las existencias iniciales"]],
    ["tf","El precio de venta se utiliza para valorar las salidas en una ficha FIFO o PMP.",false,"La ficha se basa en precios de adquisición/coste, no en precios de venta.","Distingue precio de venta y coste de entrada."],
    ["mcq","Si hay 200 unidades iniciales valoradas en total en 3.600 €, su precio unitario es…","18 €","3.600 / 200 = 18 €/ud.","Divide valor total entre unidades.",["18 €","20 €","16 €","7,2 €"]],
    ["tf","FIFO y PMP pueden dar distinto valor final aunque queden las mismas unidades físicas.",true,"La cantidad física es la misma; cambia el criterio de valoración monetaria.","Un método mantiene lotes y otro promedia precios."],
    ["mcq","En FIFO, una salida se valora primero con…","el lote más antiguo disponible","Se consumen primero las primeras entradas.","FIFO = primero en entrar, primero en salir.",["el lote más antiguo disponible","el último lote comprado","el precio de venta","el precio medio futuro"]],
    ["mcq","En PMP, tras una nueva compra, el nuevo precio medio se obtiene con…","valor total de existencias / unidades totales","Hay que ponderar por cantidades y valores acumulados.","Suma valores y divide entre unidades.",["valor total de existencias / unidades totales","precio más alto / unidades","precio de venta / coste","coste fijo / cantidad"]],
    ["tf","Los gastos de publicidad son necesarios para elaborar la ficha de almacén FIFO/PMP.",false,"La publicidad no forma parte de los movimientos de existencias de la ficha planteada.","Selecciona solo entradas y salidas de almacén."],
    ["tf","Los costes de envío al cliente son necesarios para ordenar las entradas y salidas del almacén en estos ejercicios.",false,"No intervienen en la valoración de los lotes según el criterio trabajado.","Distingue datos comerciales de movimientos de almacén."],
    ["mcq","Si los precios de compra están aumentando, según el criterio PAU trabajado, el método más adecuado es…","FIFO","FIFO deja en almacén las últimas entradas, valoradas a precios más recientes.","Relaciona el método con los lotes que quedan.",["FIFO","PMP","Cualquiera sin justificar","El precio de venta"]],
    ["mcq","Si los precios son relativamente estables, según el criterio PAU trabajado, resulta adecuado…","PMP","El PMP ofrece una valoración representativa cuando no existe una tendencia continuada de subida.","Piensa en un precio promedio representativo.",["PMP","FIFO obligatoriamente","Valorar al precio de venta","No valorar existencias"]],
    ["tf","Si las operaciones no están ordenadas, conviene ordenarlas cronológicamente antes de elaborar la ficha.",true,"El orden temporal determina qué lotes están disponibles en cada momento.","FIFO y PMP dependen de la secuencia temporal."],
    ["mcq","En una ficha de almacén, una compra es…","una entrada","Las compras incorporan unidades al almacén.","Piensa en el movimiento físico.",["una entrada","una salida","un ingreso financiero","una pérdida"]],
    ["mcq","En una ficha de almacén, una venta es…","una salida","La venta reduce las existencias físicas, aunque su precio de venta no se use para valorarlas.","Piensa en unidades que abandonan el almacén.",["una salida","una entrada","un coste fijo","una compra"]]
  ].forEach(x => add("fifo-pmp","Básico",...x));

  function fifoFinal(iniU,iniP,buyU,buyP,sell){
    const fromIni=Math.min(sell,iniU);
    const remIni=iniU-fromIni;
    const remSell=sell-fromIni;
    const remBuy=buyU-remSell;
    return remIni*iniP+remBuy*buyP;
  }
  [[100,10,100,12,120],[150,8,100,9.5,180],[200,18,300,20,250],[300,25,200,25.4,350]].forEach(c => {
    const v=fifoFinal(...c);
    add("fifo-pmp","Medio","number",
      `FIFO: inicial ${c[0]} ud. a ${c[1]} €/ud.; compra ${c[2]} ud. a ${c[3]} €/ud.; vende ${c[4]} ud. ¿Cuál es el valor de las existencias finales?`,
      v,`FIFO da salida primero al lote inicial. Valor final = ${n(v)} €.`,"Consume primero las unidades más antiguas.");
  });

  [[100,10,100,12,120],[150,8,100,9.5,180],[200,18,300,20,250],[300,25,200,25.4,350]].forEach(([u1,p1,u2,p2,sell]) => {
    const pmp=(u1*p1+u2*p2)/(u1+u2), rem=u1+u2-sell, v=rem*pmp;
    add("fifo-pmp","Medio","number",
      `PMP: inicial ${u1} ud. a ${p1} €/ud.; compra ${u2} ud. a ${p2} €/ud.; vende ${sell} ud. ¿Cuál es el valor final del almacén?`,
      v,`PMP = ${n(pmp)} €/ud. Quedan ${rem} ud.; valor final = ${n(v)} €.`,"Calcula el PMP antes de valorar la salida.");
  });

  add("fifo-pmp","Medio","mcq","Precios de entrada: 18 €, 20 € y 22 €, con tendencia ascendente. ¿Qué justificación se ajusta al criterio PAU trabajado?","FIFO, porque las existencias finales corresponden a las entradas más recientes y se aproximan más a precios actuales","Con precios crecientes, FIFO deja las últimas compras en existencias.","No basta con nombrar el método: justifica con la evolución de precios.",["FIFO, porque las existencias finales corresponden a las entradas más recientes y se aproximan más a precios actuales","PMP, porque siempre da el valor más alto","FIFO, porque usa el precio de venta","PMP, porque elimina los lotes"]);
  add("fifo-pmp","Medio","mcq","Precios de entrada: 20 €, 19,80 €, 20,20 € y 20 €. ¿Qué justificación encaja mejor?","PMP, porque proporciona una valoración representativa cuando no existe una tendencia continuada de aumento","Los precios son estables y el promedio ponderado resulta representativo.","Observa que no hay tendencia clara.",["PMP, porque proporciona una valoración representativa cuando no existe una tendencia continuada de aumento","FIFO, porque siempre es obligatorio","PMP, porque usa precios de venta","FIFO, porque elimina las compras"]);
  add("fifo-pmp","Medio","number","Existencias iniciales: 500 ud. valoradas en total en 12.500 €. ¿Cuál es su precio unitario?",25,"12.500 / 500 = 25 €/ud.","Divide valor total entre unidades.");
  add("fifo-pmp","Medio","mcq","¿Qué dato NO necesitas para elaborar FIFO/PMP en un ejercicio típico del tema?","El precio de venta al cliente","La ficha valora existencias al coste de entrada; el precio de venta no interviene.","Busca un dato comercial, no de almacén.",["El precio de venta al cliente","Las unidades iniciales","El precio de compra","La fecha de cada movimiento"]);
  add("fifo-pmp","Medio","tf","Si todas las unidades disponibles tienen exactamente el mismo precio de adquisición, FIFO y PMP darán la misma valoración final.",true,"Si no hay diferencias de coste entre lotes, el criterio de salida no altera el valor.","Sin diferencias de precios no aparece diferencia monetaria.");

  function fifoMulti(iniU,iniP,b1u,b1p,s1,b2u,b2p,s2){
    const lots=[[iniU,iniP],[b1u,b1p]];
    const sell=n=>{
      let left=n;
      while(left>0 && lots.length){
        const take=Math.min(left,lots[0][0]);
        lots[0][0]-=take; left-=take;
        if(lots[0][0]===0) lots.shift();
      }
    };
    sell(s1); lots.push([b2u,b2p]); sell(s2);
    return lots.reduce((s,[u,p])=>s+u*p,0);
  }
  function pmpMulti(iniU,iniP,b1u,b1p,s1,b2u,b2p,s2){
    let u=iniU+b1u, v=iniU*iniP+b1u*b1p, p=v/u;
    u-=s1; v=u*p;
    u+=b2u; v+=b2u*b2p; p=v/u;
    u-=s2; v=u*p;
    return v;
  }

  [
    [200,18,300,20,250,250,22,300],
    [150,8,250,9.5,200,300,11,280],
    [400,10,200,11,250,300,10.5,350]
  ].forEach(c => {
    const f=fifoMulti(...c), p=pmpMulti(...c);
    add("fifo-pmp","Reto","number",
      `Caso completo: inicial ${c[0]} ud. a ${c[1]} €; compra ${c[2]} ud. a ${c[3]} €; venta ${c[4]} ud.; compra ${c[5]} ud. a ${c[6]} €; venta ${c[7]} ud. Aplicando FIFO, ¿cuál es el valor final?`,
      f,`Siguiendo cronológicamente los lotes FIFO, el valor final es ${n(f)} €.`,"Agota primero los lotes más antiguos.");
    add("fifo-pmp","Reto","number",
      `Mismo caso: inicial ${c[0]} ud. a ${c[1]} €; compra ${c[2]} ud. a ${c[3]} €; venta ${c[4]} ud.; compra ${c[5]} ud. a ${c[6]} €; venta ${c[7]} ud. Aplicando PMP móvil, ¿cuál es el valor final?`,
      p,`Recalculando el PMP tras cada entrada, el valor final es ${n(p)} €.`,"Recalcula el PMP tras cada compra, no tras cada venta.");
  });

  add("fifo-pmp","Reto","mcq","En un ejercicio aparecen compras, ventas, gasto publicitario, alquiler y número de empleados. Para FIFO/PMP debes seleccionar…","existencias iniciales, compras y ventas con sus fechas y costes de entrada","La valoración se construye con los movimientos de existencias y sus costes relevantes.","Descarta datos que no modifican unidades ni coste de entrada.",["existencias iniciales, compras y ventas con sus fechas y costes de entrada","todos los datos sin excepción","solo ventas y publicidad","alquiler y empleados"]);
  add("fifo-pmp","Reto","mcq","Con precios crecientes, ¿por qué FIFO suele dejar una valoración final más próxima a precios actuales?","Porque permanecen en almacén las unidades de las entradas más recientes","FIFO da salida a los lotes antiguos y deja los recientes.","Relaciona el orden de salida con lo que queda.",["Porque permanecen en almacén las unidades de las entradas más recientes","Porque usa siempre el precio más alto","Porque valora al precio de venta","Porque ignora las compras"]);
  add("fifo-pmp","Reto","mcq","Con precios relativamente estables, ¿por qué resulta defendible PMP en PAU?","Porque el precio medio ponderado ofrece una valoración representativa sin una tendencia continuada de subida","El PMP suaviza pequeñas oscilaciones cuando no hay una tendencia clara.","Justifica con estabilidad de precios.",["Porque el precio medio ponderado ofrece una valoración representativa sin una tendencia continuada de subida","Porque siempre genera más beneficio","Porque elimina existencias antiguas","Porque usa el precio final de venta"]);
  add("fifo-pmp","Reto","tf","Si el enunciado da el valor total de las existencias iniciales y sus unidades, primero debe calcularse el precio unitario inicial.",true,"Ese coste unitario es necesario para incorporar correctamente el lote inicial a la ficha.","Valor total / unidades.");
  add("fifo-pmp","Reto","number","Quedan 300 unidades físicas. FIFO las valora en 6.600 € y PMP en 6.420 €. ¿En cuánto difiere la valoración final?",180,"Diferencia = 6.600 − 6.420 = 180 €. Las unidades físicas son las mismas; cambia su valoración.","Resta los dos valores monetarios.");
  add("fifo-pmp","Reto","mcq","¿Cuál es la respuesta PAU más completa si los precios suben?","FIFO, porque deja como existencias finales las entradas más recientes, valoradas a precios más actuales","La elección debe relacionarse con la evolución de precios y con el modo en que FIFO valora las existencias finales.","No basta con nombrar el método.",["FIFO, porque deja como existencias finales las entradas más recientes, valoradas a precios más actuales","FIFO","PMP","Los dos son iguales siempre"]);
  add("fifo-pmp","Reto","mcq","Una empresa recibe operaciones desordenadas por fechas. ¿Cuál debe ser el primer paso antes de aplicar FIFO o PMP?","Ordenarlas cronológicamente","La ficha debe reflejar la secuencia real de entradas y salidas.","Sin orden temporal no sabes qué existencias había disponibles.",["Ordenarlas cronológicamente","Sumar todos los precios","Usar el precio de venta","Calcular el beneficio"]);

  const counts = Q.reduce((a,q) => {
    a[q.block] = (a[q.block] || 0) + 1;
    return a;
  }, {});
  window.QUESTION_BANK = Q;
  window.QUESTION_COUNTS = counts;
})();
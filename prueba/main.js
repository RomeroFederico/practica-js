var traverseDomAndCollectElements = function(matchFunc, startEl, resultSet = []) {
  //var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  let cant = startEl.children.length;

  if (matchFunc(startEl)) resultSet.push(startEl);

  if (cant > 0)
    for(let i = 0; i < cant; i++)
      traverseDomAndCollectElements(matchFunc, startEl.children[i], resultSet);
  
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {

  if (selector.startsWith(".")) return "class";
  if (selector.startsWith("#")) return "id";
  if (/\[.*\]/.test(selector)) return "tag-con-atributos";
  if (/\w\.{1}\w/.test(selector)) return "tag.class";
  // EXTRA
  if (/.\>{1}./.test(selector)) return "jerarquia-directa";
  if (/.\s{1}./.test(selector)) return "jerarquia-indirecta";

  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  console.log(selectorType);
  if (selectorType === "id") { 
   matchFunction = (elemento) => { 
    return elemento.id === selector.slice(1); };
  } 
  else if (selectorType === "class") {
    matchFunction = (elemento) => { 
      return elemento.classList.contains(selector.slice(1));
    };
  }
  else if (selectorType === "tag.class") {
    matchFunction = (elemento) => {
      let separador = selector.indexOf(".");
      let tag = selector.slice(0, separador);
      let clase = selector.slice(separador + 1);
      return elemento.tagName.toLowerCase() === tag.toLowerCase() && elemento.classList.contains(clase);};
  }
  else if (selectorType === "tag") {
    matchFunction = (elemento) => { 
      return elemento.tagName.toLowerCase() === selector.toLowerCase(); };
  }
  //Extra
  else if (selectorType === "jerarquia-directa") {
    let query = selector.replace(/\s/g, "").split(">");
    matchFunction = (elemento) => {
      return comprobarJerarquia(query, elemento);
    };
  }

  else if (selectorType === "jerarquia-indirecta") {
    let [padre, hijo] = selector.split(" ");
    matchFunction = (elemento) => {
      return comprobarJerarquiaIndirecta(padre, hijo, elemento);
    };
  }

  else if (selectorType === "tag-con-atributos") {
    let atributos = retornarAtributos(selector);
    let tag = quitarAtributos(selector);
    console.log(atributos);
    matchFunction = (elemento) => {
      if (tag.toLowerCase() !== elemento.tagName.toLowerCase()) return false;
      let cantAt = atributos.length;
      for(let i = 0; i < cantAt; i++)
        if (!elemento[atributos[i][0]] || elemento[atributos[i][0]] != atributos[i][1]) return false;
      return true;
    }
  }

  return matchFunction;
};

function comprobarJerarquia(query, elemento, indice) {
  if (indice < 0) return true;
  if (indice >= 1 && !elemento.parentElement) return false;
  if (indice === undefined) indice = query.length - 1;
  return query[indice].toLowerCase() === elemento.tagName.toLowerCase() && comprobarJerarquia(query, elemento.parentElement, indice - 1);
}

function comprobarJerarquiaIndirecta(padre, hijo, elemento) {
  if (hijo.toLowerCase() !== elemento.tagName.toLowerCase()) return false;
  let padreDelElemento = elemento.parentElement
  while(padreDelElemento) {
    if (padre.toLowerCase() === padreDelElemento.tagName.toLowerCase()) return true;
    padreDelElemento = padreDelElemento.parentElement;
  }
  return false;
}

function retornarAtributos(selector) {
  return selector.match(/\[.*\]/)[0].slice(1,-1).split(";")
  .map((valor) => { return valor.replace(/["']/g, "").split("="); });
}

function quitarAtributos(selector) {
  return selector.replace(/\[.*\]/, "");
}

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};


//var selector = "#pagetitle";
//var matcher = matchFunctionMaker(selector);
//var sampleDivEl = document.createElement("DIV");
//sampleDivEl.id = "price";
//console.log(matcher);
let elem = $('img[alt="simon";height="100px"]');
console.log(elem);
const regNumero = /[\d\.]/;
const regOperador = /[\-\+\*\/]/;
const regParentesisApertura = /[\(]/;
const regParentesisCerrar = /[\)]/;
const regSumaResta = /[\-\+]/;
const regMultDiv = /[\*\/]/;

function calcular(operaciones) {
	var cuentas = [{x: "", y: "", op: "", resultado: null}];
	var cuenta = cuentas[0];
	var final = 0;
	operaciones += "+0";
	
	if (operaciones[0] === "-")
		operaciones = "0" + operaciones;

	operaciones = operaciones.replace(/\-\+/g || /\+\-/g, "-");
	operaciones = operaciones.replace(/\-\-/g, "+");

	operaciones = operaciones.replace(/\*\+/g, "*");
	operaciones = operaciones.replace(/\/\+/g, "/");

	for (let i = 0; i < operaciones.length; i++) {
		if (operaciones[i].match(regNumero)) {

			if (!(cuenta.op))
				cuenta.x += operaciones[i];
			else
				cuenta.y += operaciones[i];
		}
		else if (operaciones[i].match(regOperador)) {

			if (operaciones[i] === "-" && i > 0 && (operaciones[i - 1].match(/\*/) || operaciones[i - 1].match(/\//)))
				cuenta.y = "-";
			else if (!(cuenta.op))
				cuenta.op = operaciones[i];
			else {
				cuentas.push({x: cuenta.y, y: "", op: operaciones[i], resultado: null});
				cuenta = cuentas[cuentas.length - 1];
			}
		}
	}
	
	for (let j = 0; j < cuentas.length; j++) {
		if (cuentas[j].op === "*" )
			cuentas[j].resultado = cuentas[j].x * cuentas[j].y;
		else if(cuentas[j].op === "/")
			cuentas[j].resultado = cuentas[j].x / cuentas[j].y;
		if (cuentas[j].resultado !== null) {
			if (j > 0)
				cuentas[j - 1].y = cuentas[j].resultado;
			if (j < cuentas.length - 1) {
				cuentas[j + 1].x = cuentas[j].resultado;
				if (cuentas[j + 1].op.match(regSumaResta))
					for (let m = j - 1; m >= 0; m--)
						if (cuentas[m].op.match(regSumaResta)) {
							cuentas[m].y = cuentas[j].resultado;
							break;
						}
			}
		}
	}
	
		cuentas = cuentas.reduce((acum, objeto) => {
			if (objeto.op === "+" || objeto.op === "-")
					acum.push(objeto);
				return acum;
		 }, []);

	for (let k = 0; k < cuentas.length; k++) {
		if (cuentas[k].op === "+" ) {
					cuentas[k].resultado = Number(cuentas[k].x) + Number(cuentas[k].y);
					final = cuentas[k].resultado;
					if (k < cuentas.length - 1)
				cuentas[k + 1].x = cuentas[k].resultado;
				}
		else if(cuentas[k].op === "-") {
					cuentas[k].resultado = cuentas[k].x - cuentas[k].y;
					final = cuentas[k].resultado;
					if (k < cuentas.length - 1)
				cuentas[k + 1].x = cuentas[k].resultado;
				}
	}

	return final;
}

function calc(cadena) {

	var cadena = "(" + cadena + ")";
	var indice, operacion, resultaado, parentesis, resultado;

	cadena = cadena.replace(/\s/g, "");
	cadena = cadena.replace(/\-\+/g || /\+\-/g, "-");
	cadena = cadena.replace(/\-\-/g, "+");

	while(cadena.match(regParentesisApertura) && cadena.match(regParentesisCerrar)) {
		indice = 0;
		operacion = "";
		parentesis = { l: false, r: false, lIndex: null, rIndex: null};

		while(indice < cadena.length) {
			if (!(parentesis.l) && cadena[indice].match(regParentesisApertura)) {
				parentesis.l = true;
				parentesis.lIndex = indice;
			}
			else if (parentesis.l && cadena[indice].match(regParentesisApertura)) {
				parentesis.lIndex = indice;
			}
			else if (!(regParentesisCerrar.r) && cadena[indice].match(regParentesisCerrar)) {
				parentesis.r = true;
				parentesis.rIndex = indice;
				break;
			}
			indice++;
		}

		if (parentesis.l && parentesis.r)
		{
			resultado = calcular(cadena.substring(parentesis.lIndex + 1, parentesis.rIndex));
			cadena = cadena.substring(0, parentesis.lIndex) + resultado + cadena.substring(parentesis.rIndex + 1);
		}
	}
	return calcular(cadena);
}
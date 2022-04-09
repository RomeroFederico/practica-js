function busquedaBinaria(array, search) {
	if (array.length === 0 || !search)
  	return -1;
    
  var pivote = Math.floor(array.length / 2);
  var resultado;
  
  if (array[pivote] === search) return pivote;
  
  if (array[pivote] > search) {
  	resultado = busquedaBinaria(array.slice(0, pivote), search);
    if (resultado !== -1)
    	return resultado;
  }
  else {
  	resultado = busquedaBinaria(array.slice(pivote + 1), search);
    if (resultado !== -1)
    	return resultado + pivote + 1;
  }
 	return -1;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(busquedaBinaria(arr, 5));
console.log(busquedaBinaria(arr, 7));
console.log(busquedaBinaria(arr, 3));
console.log(busquedaBinaria(arr, 500));
console.log(busquedaBinaria(arr, -8));
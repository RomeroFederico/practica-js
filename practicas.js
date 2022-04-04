// Convert string to camel case
function toCamelCase(str){
	var cadenaArray = str.split(/[-_]/);
	var strFinal = cadenaArray[0];
	var cantPalabras = cadenaArray.length;
	
	for (let i = 1; i < cantPalabras; i++)
		strFinal += cadenaArray[i][0].toUpperCase() + cadenaArray[i].substring(1);
	
	return strFinal;
}

// Linked Lists - Get Nth Node
function Node(data) {
	this.data = data;
	this.next = null;
}

function getNth(node, index) {
	if (!node) throw new Error("Error");
	
	return index === 0? node : getNth(node.next, index - 1);
}

// function getNth(node, index) {
// 	var contados = 0;
// 	var currentNode = node;
	
// 	while (currentNode) {
// 		if (contados === index)
// 			return currentNode;
// 		currentNode = currentNode.next;
// 		contados++;
// 	}
	
// 	throw new Error();
// }

// Multiples of 3 or 5
function solution(number){
	
	var acum = 0;
	
	while (number > 3) {
		number--;
		acum += number % 5 === 0 || number % 3 === 0? number : 0;
	}
	
	return acum;
}

// Vowel Count
function getCount(str) {
	var vowelsCount = 0;
	
	vowels = str.match(/[aeiou]/g)
	
	vowelsCount = vowels? vowels.length : 0;
	
	return vowelsCount;
}

// Tribonacci Sequence
function tribonacci(signature, n){
	var tri = signature;
	
	if (n < 3)
		return tri.slice(0, n);
	
	for (let i = 3; i < n; i++)
		tri.push((tri[i - 3] || 0 )+(tri[i - 2] || 0)+(tri[i - 1] || 0));
		
	return tri;
}

// Even or Odd
function even_or_odd(number) {
	return number % 2 === 0? "Even" : "Odd";
}

// Stop gninnipS My sdroW!
function spinWords(string){
	//TODO Have fun :)
	return string.split(/\s/).map(word => word.length >= 5? word.reverse() : word).join(" ");
}

String.prototype.reverse = function() {
	var cadena = "";
	
	for (let i = this.length - 1; i >= 0; i--)
		cadena += this[i];
		
	 return cadena;
}

// function spinWords(string){
//   //TODO Have fun :)
//   var cadena = string.split(/\s/g);
//   console.log(cadena);
	
//   return cadena.reduce(filtrar, "").replace(/\s/, "");
// }

// function filtrar(palabraFinal, palabra) {
//   return palabraFinal += " " + (palabra.length >= 5? palabra.reverse() : palabra);
// }

// Simple Fun #354: Lonely Frog III
function jumpTo(x, y){
	steps = 0;
	while(y > x) {
		y = y / 2 >= x && y % 2 === 0? y / 2 : y - 1;
		steps++;
	}
	return steps;
}
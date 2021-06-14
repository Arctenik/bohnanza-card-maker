
nameInp.onchange = () => {
	cardName.textContent = nameInp.value;
	updateNameX();
}

nameColorInp.onchange = () => cardName.style.fill = nameColorInp.value;

boldNameInp.onchange = () => {
	cardName.style.fontWeight = (boldNameInp.checked ? "bold" : "normal");
	updateNameX();
}

nameXInp.onchange = updateNameX;
centerNameInp.onchange = updateNameX;

nameYInp.onchange = () => cardName.setAttribute("y", nameYInp.value);


numberInp.onchange = () => {
	cardNumber.textContent = numberInp.value;
	updateNumberX();
}

numberColorInp.onchange = () => cardNumber.style.fill = numberColorInp.value;

boldNumberInp.onchange = () => {
	cardNumber.style.fontWeight = (boldNumberInp.checked ? "bold" : "normal");
	updateNumberX();
}

numberXInp.onchange = updateNumberX;
centerNumberInp.onchange = updateNumberX;

numberYInp.onchange = () => cardNumber.setAttribute("y", numberYInp.value);



function updateNameX() {
	if (centerNameInp.checked) {
		var width = cardName.getComputedTextLength(),
			x = (cardWidth/2) - (width/2);
		cardName.setAttribute("x", x);
	} else cardName.setAttribute("x", nameXInp.value);
}



function updateNumberX() {
	if (centerNumberInp.checked) {
		var width = cardNumber.getComputedTextLength(),
			x = (cardWidth/2) - (width/2);
		cardNumber.setAttribute("x", x);
	} else cardNumber.setAttribute("x", numberXInp.value);
}

var coinCodes = [
	document.getElementById("1coinCode").innerHTML,
	document.getElementById("2coinCode").innerHTML,
	document.getElementById("3coinCode").innerHTML,
	document.getElementById("4coinCode").innerHTML
];

var coinsIntvl = 25,
	coinsHeight = 72.5,
	pilesBase = 390,
	fourPileBase = 392.5,
	valsBase = 412.5;



oneCoinInp.onchange = updateCoins;
twoCoinInp.onchange = updateCoins;
threeCoinInp.onchange = updateCoins;
fourCoinInp.onchange = updateCoins;



function updateCoins() {
	coinsGroup.innerHTML = "";
	var coinNums = [],
		coins = [oneCoinInp, twoCoinInp, threeCoinInp, fourCoinInp].filter(
				(inp, i) => (inp.value && coinNums.push(i)) //(push = always truthy)
			).map((inp, i) => ({text: inp.value, num: coinNums[i]}));
	if (coins.length) {
		var width = (coins.length - 1) * coinsIntvl;
		coins.forEach(({num}) => width += coinSizes[num][0]);
		var nextX = (cardWidth/2) - (width/2);
		coins.forEach(({text, num}) => {
			var [w, h] = coinSizes[num],
				pileBase = (num === 3 ? fourPileBase : pilesBase),
				g = addCoinGroup(num),
				v = addCoinVal(text),
				valW = v.getComputedTextLength();
			g.setAttribute("transform", `translate(${nextX}, ${pileBase - h})`);
			v.setAttribute("x", nextX + (w/2) - (valW/2));
			nextX += w + coinsIntvl;
		});
	}
}

function addCoinGroup(num) {
	var g = document.createElementNS(svgNs, "g");
	g.innerHTML = coinCodes[num];
	coinsGroup.appendChild(g);
	return g;
}

function addCoinVal(text) {
	var v = document.createElementNS(svgNs, "text");
	v.textContent = text;
	v.setAttribute("y", valsBase);
	v.style.fontFamily = "'Bodoni Highlight ICG', 'Gravitas One'";
	v.style.fontSize = 26.9;
	coinsGroup.appendChild(v);
	return v;
}
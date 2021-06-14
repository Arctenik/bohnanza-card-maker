
var picInp = document.getElementById("picInp"),
	cornerInp = document.getElementById("cornerInp"),
	outlineInp = document.getElementById("outlineInp"),
	outlineColorInp = document.getElementById("outlineColorInp"),
	outlineWidthInp = document.getElementById("outlineWidthInp"),
	//outlineTypeInp = document.getElementById("outlineTypeInp"),
	nameInp = document.getElementById("nameInp"),
	nameColorInp = document.getElementById("nameColorInp"),
	boldNameInp = document.getElementById("boldNameInp"),
	nameXInp = document.getElementById("nameXInp"),
	nameYInp = document.getElementById("nameYInp"),
	centerNameInp = document.getElementById("centerNameInp"),
	numberInp = document.getElementById("numberInp"),
	numberColorInp = document.getElementById("numberColorInp"),
	boldNumberInp = document.getElementById("boldNumberInp"),
	numberXInp = document.getElementById("numberXInp"),
	numberYInp = document.getElementById("numberYInp"),
	centerNumberInp = document.getElementById("centerNumberInp"),
	borderInp = document.getElementById("borderInp"),
	picScaleInp = document.getElementById("picScaleInp"),
	picXInp = document.getElementById("picXInp"),
	picYInp = document.getElementById("picYInp"),
	cornerScaleInp = document.getElementById("cornerScaleInp"),
	lCornerXInp = document.getElementById("lCornerXInp"),
	rCornerXInp = document.getElementById("rCornerXInp"),
	cornersYInp = document.getElementById("cornersYInp"),
	oneCoinInp = document.getElementById("1coinInp"),
	twoCoinInp = document.getElementById("2coinInp"),
	threeCoinInp = document.getElementById("3coinInp"),
	fourCoinInp = document.getElementById("4coinInp");

var saveSvgButton = document.getElementById("saveSvgButton"),
	saveDataButton = document.getElementById("saveDataButton"),
	loadDataInp = document.getElementById("loadDataInp"),
	loadDataButton = document.getElementById("loadDataButton"),
	pngWidthInp = document.getElementById("pngWidthInp"),
	savePngButton = document.getElementById("savePngButton");

var borderPath = document.getElementById("borderPath"),
	cardShapeGroup = document.getElementById("cardShapeGroup"),
	mainImage = document.getElementById("mainImage"),
	cornerLeft = document.getElementById("cornerLeft"),
	cornerRight = document.getElementById("cornerRight"),
	cardName = document.getElementById("cardName"),
	cardNumber = document.getElementById("cardNumber"),
	coinsGroup = document.getElementById("coinsGroup"),
	outlineGroup = document.getElementById("outlineGroup"),
	outlineSvg = document.getElementById("outlineSvg"),
	cardGroup = document.getElementById("cardGroup"),
	cardSvg = document.getElementById("cardSvg"),
	cardSvgDefs = cardSvg.querySelector("defs");
	
var svgNs = "http://www.w3.org/2000/svg",
	cardWidth = 280,
	cardHeight = 435,
	pngWidthChanged;
	
	
	



borderInp.onchange = () => {
	borderPath.style.stroke = borderInp.value;
}



saveSvgButton.onclick = () => {
	var a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([outlineSvg.outerHTML]));
	a.download = (nameInp.value || "card") + ".svg";
	a.dispatchEvent(new MouseEvent("click"));
}

pngWidthInp.onchange = () => pngWidthChanged = true;

savePngButton.onclick = () => {
	var img = new Image(),
		canvas = document.createElement("canvas"),
		ctx = canvas.getContext("2d"),
		width = Math.round(pngWidthInp.value),
		height = Math.round((width/outlineSvg.getAttribute("width")) * outlineSvg.getAttribute("height"));
	img.onload = () => {
		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);
		var a = document.createElement("a");
		a.href = canvas.toDataURL();
		a.download = (nameInp.value || "card") + ".png";
		a.dispatchEvent(new MouseEvent("click"));
	}
	img.src = URL.createObjectURL(new Blob([outlineSvg.outerHTML], {type: "image/svg+xml"}));
}

saveDataButton.onclick = () => {
	var data = JSON.stringify({
		outline: outlineInp.checked,
		outlineColor: outlineColorInp.value,
		outlineWidth: outlineWidthInp.value,
		pic: mainImage.getAttribute("xlink:href"),
		picW, picH,
		picScale: picScaleInp.value,
		picX: picXInp.value,
		picY: picYInp.value,
		corner: cornerLeft.getAttribute("xlink:href"),
		cornerW, cornerH,
		cornerScale: cornerScaleInp.value,
		lCornerX: lCornerXInp.value,
		rCornerX: rCornerXInp.value,
		cornersY: cornersYInp.value,
		border: borderInp.value,
		name: nameInp.value,
		nameColor: nameColorInp.value,
		boldName: boldNameInp.checked,
		nameX: nameXInp.value,
		nameY: nameYInp.value,
		centerName: centerNameInp.checked,
		number: numberInp.value,
		numberColor: numberColorInp.value,
		boldNumber: boldNumberInp.checked,
		numberX: numberXInp.value,
		numberY: numberYInp.value,
		centerNumber: centerNumberInp.checked,
		oneCoin: oneCoinInp.value,
		twoCoin: twoCoinInp.value,
		threeCoin: threeCoinInp.value,
		fourCoin: fourCoinInp.value
	});
	var a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([data]));
	a.download = (nameInp.value || "card") + ".json";
	a.dispatchEvent(new MouseEvent("click"));
}

loadDataButton.onclick = () => {
	var reader = new FileReader();
	reader.onload = processData;
	reader.readAsText(loadDataInp.files[0]);
	function processData() {
		var data = JSON.parse(reader.result),
			s = changeInput.bind(this, data);
		picW = data.picW;
		picH = data.picH;
		cornerW = data.cornerW;
		cornerH = data.cornerH;
		mainImage.setAttribute("xlink:href", data.pic);
		cornerLeft.setAttribute("xlink:href", data.corner);
		cornerRight.setAttribute("xlink:href", data.corner);
		////////
		s(outlineInp, "outline", 1);
		s(outlineColorInp, "outlineColor");
		s(outlineWidthInp, "outlineWidth");
		s(picScaleInp, "picScale");
		s(picXInp, "picX");
		s(picYInp, "picY");
		s(cornerScaleInp, "cornerScale");
		s(lCornerXInp, "lCornerX");
		s(rCornerXInp, "rCornerX");
		s(cornersYInp, "cornersY");
		s(borderInp, "border");
		s(nameInp, "name");
		s(nameColorInp, "nameColor");
		s(boldNameInp, "boldName", 1);
		s(nameXInp, "nameX");
		s(nameYInp, "nameY");
		s(centerNameInp, "centerName", 1);
		s(numberInp, "number");
		s(numberColorInp, "numberColor");
		s(boldNumberInp, "boldNumber", 1);
		s(numberXInp, "numberX");
		s(numberYInp, "numberY");
		s(centerNumberInp, "centerNumber", 1);
		s(oneCoinInp, "oneCoin");
		s(twoCoinInp, "twoCoin");
		s(threeCoinInp, "threeCoin");
		s(fourCoinInp, "fourCoin");
		////////
	}
}

function changeInput(data, inp, key, isCheck) {
	inp[isCheck ? "checked" : "value"] = data[key];
	inp.dispatchEvent(new Event("change"));
}

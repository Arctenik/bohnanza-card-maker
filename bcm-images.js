
var basePicWidth = 240,
	baseCornerHeight = 50,
	rCornerRight = 260,
	picW, picH,       // \__
	cornerW, cornerH; // /  '-- these are the dimensions of the ORIGINAL IMAGES >.>



picInp.onchange = () => {
	var reader = new FileReader();
	reader.onload = () => {
		var url = reader.result;
		imageSize(url).then(([w, h]) => {
			picW = w;
			picH = h;
			var picScale = basePicWidth/w;
			picScaleInp.value = picScale;
			picXInp.value = mainImage.getAttribute("x");
			picYInp.value = mainImage.getAttribute("y");
			mainImage.setAttribute("width", basePicWidth);
			mainImage.setAttribute("height", h * picScale);
			mainImage.setAttribute("xlink:href", url);
		});
	}
	reader.readAsDataURL(picInp.files[0]);
}

cornerInp.onchange = () => {
	var reader = new FileReader();
	reader.onload = () => {
		var url = reader.result;
		imageSize(url).then(([w, h]) => {
			cornerW = w;
			cornerH = h;
			var cornerScale = baseCornerHeight/h;
			var rightW = w * cornerScale,
				rCornerLeft = rCornerRight - rightW;
			cornerScaleInp.value = cornerScale;
			cornerRight.setAttribute("x", rCornerLeft);
			lCornerXInp.value = cornerLeft.getAttribute("x");
			rCornerXInp.value = cornerRight.getAttribute("x");
			cornersYInp.value = cornerRight.getAttribute("y");
			cornerLeft.setAttribute("height", baseCornerHeight);
			cornerLeft.setAttribute("width", w * cornerScale);
			cornerLeft.setAttribute("xlink:href", url);
			cornerRight.setAttribute("height", baseCornerHeight);
			cornerRight.setAttribute("width", rightW);
			cornerRight.setAttribute("xlink:href", url);
		});
	}
	reader.readAsDataURL(cornerInp.files[0]);
}

picScaleInp.onchange = () => {
	var s = picScaleInp.value;
	mainImage.setAttribute("width", picW * s);
	mainImage.setAttribute("height", picH * s);
}

cornerScaleInp.onchange = () => {
	var s = cornerScaleInp.value;
	if (s) {
		cornerLeft.setAttribute("width", cornerW * s);
		cornerLeft.setAttribute("height", cornerH * s);
		cornerRight.setAttribute("width", cornerW * s);
		cornerRight.setAttribute("height", cornerH * s);
	}
}

picXInp.onchange = () => mainImage.setAttribute("x", picXInp.value);
picYInp.onchange = () => mainImage.setAttribute("y", picYInp.value);

lCornerXInp.onchange = () => cornerLeft.setAttribute("x", lCornerXInp.value);
rCornerXInp.onchange = () => cornerRight.setAttribute("x", rCornerXInp.value);
cornersYInp.onchange = () => {
	cornerLeft.setAttribute("y", cornersYInp.value);
	cornerRight.setAttribute("y", cornersYInp.value);
}



function imageSize(url) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.onload = () => resolve([img.width, img.height]);
		img.src = url;
	});
}

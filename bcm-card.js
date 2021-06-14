
outlineInp.onchange = () => {
	if (outlineInp.checked) {
		setOutline();
	} else {
		if (!pngWidthChanged) pngWidthInp.value = cardWidth;
		outlineGroup.innerHTML = "";
		cardGroup.style.transform = "";
		outlineSvg.setAttribute("width", cardWidth);
		outlineSvg.setAttribute("height", cardHeight);
	}
}

outlineColorInp.onchange = () =>
	(outlineInp.checked && (outlineGroup.style.fill = outlineColorInp.value));

outlineWidthInp.onchange = () => (outlineInp.checked && setOutline());



function setOutline() {
	var ow = outlineWidthInp.value,
		imageW = cardWidth + (2 * ow),
		imageH = cardHeight + (2 * ow),
		scaleX = imageW/cardWidth,
		scaleY = imageH/cardHeight;
	if (!pngWidthChanged) pngWidthInp.value = imageW;
	outlineSvg.setAttribute("width", imageW);
	outlineSvg.setAttribute("height", imageH);
	cardGroup.setAttribute("transform", `translate(${ow}, ${ow})`);
	outlineGroup.style.fill = outlineColorInp.value;
	outlineGroup.style.transform = `scale(${scaleX}, ${scaleY})`;
	outlineGroup.innerHTML = cardShapeGroup.innerHTML;
}
import { SVG_NS } from '../settings';

export default class Winner {
  constructor (width, height) {
      this.width = width;
      this.height = height;
  }
render(svg){
  let rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttributeNS(null, "width", this.width);
  rect.setAttributeNS(null, "height", this.height);
  rect.setAttributeNS(null, "fill", "red");

  let text = document.createElementNS(SVG_NS, "text");
  text.setAttributeNS(null, "x", 100);
  text.setAttributeNS(null, "y", 100);
  text.setAttributeNS(null, "font-size", 50);
  text.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
  text.setAttributeNS(null, "fill", 100);
  text.textContent = "You Win!!!";

  svg.appendChild(rect);
  svg.appendChild(text); 
}
}
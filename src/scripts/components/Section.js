class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer;    
    this._container = document.querySelector(selector);
  }


  setItem(element) {
    this._container.append(element);
  }

  addItem() {
  this._initialArray.forEach((item) => {
    this._renderer(item);
  });
  }
}

export default Section;
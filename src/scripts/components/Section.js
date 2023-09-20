class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;    
    this._container = document.querySelector(selector);
  }


  setItem(element) {
    this._container.append(element);
  }

  setNewItem(element) {
    this._container.prepend(element);
  }

  addItem(items) {
  items.forEach((item) => {
    this._renderer(item);
  });
  }

  
}

export default Section;
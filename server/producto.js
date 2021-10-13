exports.Size = class Size {
	constructor(id, size, portion, price, img, scale, description) {
		this.id = id;
		this.size = size;
		this.portion = portion;
		this.price = price;
		this.img = img;
		this.scale = scale;
    this.description = description;
	}
}

exports.Sauce = class Sauce {
	constructor(id, quanty, name, price, img, description) {
		this.id = id;
		this.quanty = quanty;
		this.name = name;
		this.price = price;
		this.img = img;
		this.description = description;
	}
}

exports.Condiment = class Condiment {
	constructor(id, quanty, name, price, img, representation, description) {
		this.id = id;
		this.quanty = quanty;
		this.name = name;
		this.price = price;
		this.img = img;
		this.representation = representation;
		this.description = description;
	}
}

exports.Ingredients = class Ingredients {
	constructor(sizes, sauces, condiments) {
		this.sizes = sizes;
		this.sauces = sauces;
		this.condiments = condiments;
	}
}

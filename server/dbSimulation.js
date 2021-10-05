const { Size, Sauce, Condiment } = require("./producto");

let sizes,
	sauces,
	condiments = {};
	
sizes = {
	uid1: new Size(
		'uid1',
		'small',
		1,
		2000,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/size/sizeS.svg',
		1,
		''
	),
	uid2: new Size(
		'uid2',
		'medium',
		4,
		3500,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/size/sizeM.svg',
		2,
		''
	),
	uid3: new Size(
		'uid3',
		'large',
		6,
		6000,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/size/sizeL.svg',
		3,
		''
	),
	uid4: new Size(
		'uid4',
		'extra-large',
		8,
		8000,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/size/sizeXl.svg',
		4,
		''
	),
};
sauces = {
	uid1: new Sauce(
		'uid1',
		'1000',
		'tomato',
		2000,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/sauces/salsa-de-tomate.svg',
		'Descripción llamativa'
	),
};
condiments = {
	uid1: new Condiment(
		'uid1',
		1000,
		'cheese',
		1200,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/condiments/queso.svg',
		'',
		'Rico queso Parmesano hecho en las montañas europeas. ༼ つ ◕_◕ ༽つ'
	),
	uid2: new Condiment(
		'uid2',
		1000,
		'Piña',
		1300,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/condiments/pina.svg',
		'',
		'Descripción llamativa. ༼ つ ◕_◕ ༽つ'
	),
	uid3: new Condiment(
		'uid3',
		1000,
		'Jamon',
		800,
		'https://raw.githubusercontent.com/CristianNorga/utpC3_createYourPizza/2ea020e66dc53d5aa45a308f749694bf6e4601ad/src/assets/ingredients/condiments/jamon.svg',
		'',
		'Descripción llamativa. ༼ つ ◕_◕ ༽つ'
	),
};

function listSizes() {
  // let lista = [];
  // for (let key in db) {
  //   lista.push(db[key]);
  // }
  // if (lista.length == 0) {
  //   return -1;
  // }
  // return lista;
	return sizes;
}

function listSauces() {
	return sauces;
}

function listCondiments() {
	return condiments;
}

function listIngredients() {
	let ingredients = {
		sizes,
		sauces,
		condiments,
	};

	return ingredients;
}



module.exports = {
	listSizes,
	listSauces,
	listCondiments,
	listIngredients,
};

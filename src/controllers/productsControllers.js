const fs = require('fs');
const path = require('path');
const { off } = require('process');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	index: (req, res) => {
		res.render('products', { products, toThousand });
	},

	detail: (req, res) => {

		const id = +req.params.id;
		let percent;

		var productDetail = products.filter(function (product) {

			return product.id === id;

		});


		const sameCategories = products.filter(function (product) {

		return product.category === productDetail[0].category && product.person===productDetail[0].person;

		});

		productDetail = productDetail[0];
		percent = (productDetail.discount < 10) ? '0.0' + productDetail.discount : '0.' + productDetail.discount;

		productDetail.totalPrice = productDetail.price - (productDetail.price * parseFloat(percent));

		res.render('productDetail', { title: productDetail.name, productDetail, sameCategories, toThousand });

	},

	
	people: (req, res) => {

		const person = req.params.name;

		console.log(person);

		const productsCategory = products.filter(function (product) {

			return product.person === person;

		});

		res.render('products', { productsCategory,person });

	},


	create: (req, res) => {

		const sizes = ["s", "m", "l"];
		const people = ["hombres", "mujeres", "niños"];
		const categories = ["remeras", "shorts", "championes"];

		res.render('add', { sizes, people, categories });

	},

	store: (req, res) => {

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		console.log(req);

		let id= products.length + 1;
		let name= req.body.nombre;
		let price= req.body.precio;
		let discount= req.body.descuento;
		let amount= req.body.cantidad;
		let size = req.body.talle;
		let person = req.body.person;
		let category= req.body.categoria;
		let image=  req.body.foto ? req.body.foto : '#';
		let description= req.body.descripcion;
		
		let newProduct = {	
			id: products.length + 1,
			name: req.body.nombre,
			price: req.body.precio,
			discount: req.body.descuento,
			amount: req.body.cantidad,
			size : req.body.talle,
			person : req.body.person,
			category: req.body.categoria,
			image: req.body.foto? req.body.foto : '#',
			description: req.body.descripcion
		};

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products), { encoding: 'utf-8' });

		res.redirect('/');

	},

	
	edit: (req, res) => {

		const id = +req.params.id;

		const sizes = ["s", "m", "l"];
		const people = ["hombres", "mujeres", "niños"];
		const categories = ["remeras", "shorts", "championes"];

		let productDetail = products.filter(function (product) {

			return product.id === id;

		});

		productDetail = productDetail[0];

		res.render('edit', { title: productDetail.name, productToEdit: productDetail, sizes, people, categories });

	},
	
	update: (req, res) => {

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const id= +req.params.id;

		console.log(req.body.nombre);

		let name= req.body.nombre;
		let price= req.body.precio;
		let discount= req.body.descuento;
		let amount= req.body.cantidad;
		let size = req.body.talle;
		let person = req.body.person;
		let category= req.body.categoria;
		let image= [];
		let description= req.body.descripcion;

	
		let editProduct = {

			id: +req.params.id,
			
			name: req.body.nombre,
			price: req.body.precio,
			discount: req.body.descuento,
			amount: req.body.cantidad,
			size : req.body.talle,
			person : req.body.person,
			category: req.body.categoria,
			image: [],
			description: req.body.descripcion

		};

		for (let i in products) {

			if (products[i].id === id) {

				products[i] = editProduct;
				break;

			}

		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products), { encoding: 'utf-8' });
		res.redirect('/');

	},


	destroy: (req, res) => {

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const id = +req.params.id;

		let productDestroyed = products.filter(function (product) {

			return product.id !== id;

		});

		console.log(productDestroyed);

		fs.writeFileSync(productsFilePath, JSON.stringify(productDestroyed), { encoding: 'utf-8' });
		res.redirect('/');

	}
};

module.exports = controller;
import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entities/product';
import ProductModel from '../database/sequelize/models/product.model';
import ProductRepository from './product.repository';

describe('ProductRepository unit tests', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);

		await sequelize.sync();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 100);
		await productRepository.create(product);
		const productModel = await ProductModel.findOne({ where: { id: '1' } });
		expect(productModel.toJSON()).toStrictEqual({
			id: '1',
			name: 'Product 1',
			price: 100,
		});
	});

	it('should find a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct = await productRepository.find('1');

		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.getId(),
			name: foundProduct.getName(),
			price: foundProduct.getPrice(),
		});
	});

	it('should find all products', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		await Promise.all([productRepository.create(product), productRepository.create(product2)]);

		const productModel = await ProductModel.findAll();

		const foundProducts = await productRepository.findAll();

		expect(productModel.map((p) => p.toJSON())).toStrictEqual(
			foundProducts.map((p) => ({
				id: p.getId(),
				name: p.getName(),
				price: p.getPrice(),
			}))
		);
	});

	it('should update a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product('1', 'Product 1', 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct = await productRepository.find('1');

		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.getId(),
			name: foundProduct.getName(),
			price: foundProduct.getPrice(),
		});

		product.changeName('Product 2');
		product.changePrice(200);

		await productRepository.update(product);
		const productModel2 = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct2 = await productRepository.find('1');
		expect(productModel2.toJSON()).toStrictEqual({
			id: foundProduct2.getId(),
			name: foundProduct2.getName(),
			price: foundProduct2.getPrice(),
		});
	});
});

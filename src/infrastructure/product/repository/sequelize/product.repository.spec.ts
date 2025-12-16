import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../../domain/product/entities/product';
import { ProductModel } from '../../models/sequelize/product.model';
import { ProductRepository } from './product.repository';

describe('ProductRepository unit tests', () => {
	let sequelize: Sequelize;
	let productRepository: ProductRepository;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);

		await sequelize.sync();

		productRepository = new ProductRepository();
	});

	afterEach(async () => {
		if (sequelize) await sequelize.close();
	});

	it('should create a product', async () => {
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
		const product = new Product('1', 'Product 1', 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct = await productRepository.find('1');

		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		});
	});

	it('should find all products', async () => {
		const product = new Product('1', 'Product 1', 100);
		const product2 = new Product('2', 'Product 2', 200);

		await Promise.all([productRepository.create(product), productRepository.create(product2)]);

		const productModel = await ProductModel.findAll();

		const foundProducts = await productRepository.findAll();

		expect(productModel.map((p) => p.toJSON())).toStrictEqual(
			foundProducts.map((p) => ({
				id: p.id,
				name: p.name,
				price: p.price,
			})),
		);
	});

	it('should update a product', async () => {
		const product = new Product('1', 'Product 1', 100);

		await productRepository.create(product);

		const productModel = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct = await productRepository.find('1');

		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		});

		product.changeName('Product 2');
		product.changePrice(200);

		await productRepository.update(product);
		const productModel2 = await ProductModel.findOne({ where: { id: '1' } });

		const foundProduct2 = await productRepository.find('1');
		expect(productModel2.toJSON()).toStrictEqual({
			id: foundProduct2.id,
			name: foundProduct2.name,
			price: foundProduct2.price,
		});
	});
});

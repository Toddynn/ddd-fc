import Product from '../../domain/entities/product';
import ProductRepositoryInterface from '../../domain/repository/product.repository.interface';
import ProductModel from '../database/sequelize/models/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
	async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.getId(),
			name: entity.getName(),
			price: entity.getPrice(),
		});
	}

	async findAll(): Promise<Product[]> {
		const productModels = await ProductModel.findAll();
		return productModels.map((productModel) => {
			return new Product(productModel.id, productModel.name, productModel.price);
		});
	}

	async find(id: string): Promise<Product> {
		const productModel = await ProductModel.findOne({ where: { id } });
		return new Product(productModel.id, productModel.name, productModel.price);
	}

	async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.getName(),
				price: entity.getPrice(),
			},
			{ where: { id: entity.getId() } }
		);
	}

	async delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

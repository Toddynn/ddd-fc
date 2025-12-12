import type { Product } from '../entities/product';
import type { RepositoryInterface } from './repository.interface';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

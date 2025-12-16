import type { RepositoryInterface } from '../../shared/utils/interfaces/repository.interface';
import type { Product } from '../entities/product';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

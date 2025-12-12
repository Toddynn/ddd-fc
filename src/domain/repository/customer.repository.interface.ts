import type { Customer } from '../entities/customer';
import type { RepositoryInterface } from './repository.interface';

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}

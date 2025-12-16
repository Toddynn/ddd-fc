import type { RepositoryInterface } from '../../shared/utils/interfaces/repository.interface';
import type { Customer } from '../entities/customer';

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}

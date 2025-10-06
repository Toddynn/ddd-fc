export default interface RepositoryInterface<T> {
	save(entity: T): Promise<void>;
	create(entity: T): Promise<void>;
	update(entity: T): Promise<void>;
	delete(id: string): Promise<void>;
	find(id: string): Promise<T | null>;
	findAll(): Promise<Array<T>>;
}

export interface OrderItemInterface {
	get id(): string;
	get productId(): string;
	get name(): string;
	get price(): number;
	get quantity(): number;
}

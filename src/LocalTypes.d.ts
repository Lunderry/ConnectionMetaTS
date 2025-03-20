export type NameMetaConnections = string;

export type Meta = { [index: string]: (...args: unknown[]) => void };
export type DisconnectCallback<T> = (value: T) => void;
export interface ContentDisconnect<T> {
	meta: Meta;
	funct: DisconnectCallback<T>;
}

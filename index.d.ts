import { DisconnectCallback, Meta, NameMetaConnections } from "./src/LocalTypes";

export default class ConnectionMeta<T extends defined> {
	public readonly Pack: T[];
	public readonly SpecificType: NameMetaConnections;

	constructor(SpecificType: NameMetaConnections);

	static AddDisconnect(
		nameType: NameMetaConnections,
		meta: Meta | undefined,
		disconnectCallback: DisconnectCallback<unknown>,
	): void;

	public Add(this: ConnectionMeta<T>, connection: T): T;
	public Add(this: ConnectionMeta<T>, ...args: T[]): T[];
	public Add(this: ConnectionMeta<T>, ...args: T[]): T[] | T;

	public Disconnect(this: ConnectionMeta<T>, i?: number | T): void;

	public isConnect(this: ConnectionMeta<T>): boolean;
}

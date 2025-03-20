import { DisconnectCallback, Meta, NameMetaConnections } from "./LocalTypes";
import { Selection } from "./ManagerMeta";
import MetaData, { DEFAULTMETA } from "./MetaData";

export default class ConnectionMeta<T extends defined> {
	public readonly Pack: T[];

	constructor(public SpecificType: NameMetaConnections) {
		this.Pack = setmetatable([], Selection(SpecificType).meta);
	}

	static AddDisconnect(
		nameType: string,
		metatable: Meta = DEFAULTMETA,
		disconnectCallback: DisconnectCallback<unknown>,
	) {
		if (MetaData[nameType as NameMetaConnections] !== undefined) {
			return;
		}

		MetaData[nameType as NameMetaConnections] = {
			meta: metatable,
			funct: disconnectCallback,
		};
	}
	private disconnect(value: T): void {
		Selection(this.SpecificType).funct(value);
	}
	public Add(connection: T): T;
	public Add(...args: T[]): T[] | T {
		args.forEach((c) => (this.Pack[this.Pack.size() - 1] = c));

		if (args.size() === 1) {
			return args[0];
		}
		return args;
	}

	//The value has a index list or connection otherwise everything is eliminated
	public Disconnect(i?: number | T): void {
		if (i !== undefined) {
			if (typeIs(i, "number")) {
				this.disconnect(this.Pack[i]);
				this.Pack.remove(i);
			} else {
				const index = this.Pack.indexOf(i);

				if (index === -1) {
					return;
				}
				this.disconnect(this.Pack[index]);
				this.Pack.remove(index);
			}
			return;
		}
		this.Pack.forEach((v) => this.disconnect(v));
		table.clear(this.Pack);
	}

	public isConnect(): boolean {
		return this.Pack.size() > 0;
	}
}

//Create RBXScriptConnection
ConnectionMeta.AddDisconnect("RBXScriptConnection", undefined, (v) => {
	if (!typeIs(v, "RBXScriptConnection")) {
		return;
	}
	v.Disconnect();
});

//Create thread
ConnectionMeta.AddDisconnect("thread", undefined, (v) => {
	if (!typeIs(v, "thread")) {
		return;
	}
	task.cancel(v);
});

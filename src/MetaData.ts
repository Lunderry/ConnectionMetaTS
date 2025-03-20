import { DisconnectCallback, Meta, NameMetaConnections } from "./LocalTypes";

export const DEFAULTMETA = {
	__newindex: (s: Map<unknown, unknown>, i: unknown, v: unknown) => rawset(s, i, v),
} as Meta;

const MetaData: Partial<Record<NameMetaConnections, { meta: Meta; funct: DisconnectCallback<unknown> }>> = {};

export default MetaData;

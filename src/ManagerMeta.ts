import { ContentDisconnect, NameMetaConnections } from "./LocalTypes";
import MetaData from "./MetaData";

export function Selection<T>(SpecificType: NameMetaConnections): ContentDisconnect<T> {
	return MetaData[SpecificType] as ContentDisconnect<T>;
}

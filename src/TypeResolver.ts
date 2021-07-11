import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {ITypeHandler} from './typeHandlers';

export class TypeResolver {
	private readonly handlers: { [key: string]: ITypeHandler<IMediaEntry> };

	constructor(private defaultHandler: ITypeHandler<IMediaEntry>) {
		this.handlers = {};
	}

	registerHandler(uri: string, handler: ITypeHandler<IMediaEntry>) {
		this.handlers[uri] = handler;
	}

	resolve(uri: string): ITypeHandler<IMediaEntry> {
		if (this.handlers.hasOwnProperty(uri)) {
			return this.handlers[uri];
		} else {
			if (uri.lastIndexOf('.') === -1) {
				return this.defaultHandler;
			} else {
				return this.resolve(uri.substr(0, uri.lastIndexOf('.') - 1));
			}
		}
	}
}

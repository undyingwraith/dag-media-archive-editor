import {ITypeHandler} from './typeHandlers';

export class TypeResolver {
	private readonly handlers: { [key: string]: ITypeHandler };

	constructor(private defaultHandler: ITypeHandler) {
		this.handlers = {};
	}

	registerHandler(uri: string, handler: ITypeHandler) {
		this.handlers[uri] = handler;
	}

	resolve(uri: string): ITypeHandler {
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

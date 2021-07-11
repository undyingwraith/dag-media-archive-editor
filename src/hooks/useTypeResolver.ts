import {useMemo} from 'react';
import {DefaultTypeHandler, ImageTypeHandler, VideoTypeHandler} from '../typeHandlers';
import {TypeResolver} from '../TypeResolver';

export const useTypeResolver = () => {
	return useMemo(() => {
		const resolver = new TypeResolver(new DefaultTypeHandler());

		resolver.registerHandler('Entry.Image', new ImageTypeHandler())
		resolver.registerHandler('Entry.Image.Video', new VideoTypeHandler())

		return resolver;
	}, [])
};

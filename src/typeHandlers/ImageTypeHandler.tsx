import {IImageEntry, IMediaEntry} from '@undyingwraith/dag-media-archive';
import React from 'react';
import {DefaultTypeHandler} from './DefaultTypeHandler';
import {ITypeHandler} from './ITypeHandler';

export class ImageTypeHandler extends DefaultTypeHandler implements ITypeHandler {
	override bigPreview(entry: IMediaEntry): JSX.Element {
		return <img src={`https://ipfs.io/ipfs/${(entry as IImageEntry).thumbnail.toString()}`}/>
	}

	override listPreview(entry: IMediaEntry): JSX.Element {
		return <img src={`https://ipfs.io/ipfs/${(entry as IImageEntry).thumbnail.toString()}`}/>
	}
}

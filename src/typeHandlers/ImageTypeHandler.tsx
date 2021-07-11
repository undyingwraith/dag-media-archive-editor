import {IImageEntry, IMediaEntry} from '@undyingwraith/dag-media-archive';
import React from 'react';
import {DefaultTypeHandler} from './DefaultTypeHandler';
import {ITypeHandler} from './ITypeHandler';

export class ImageTypeHandler extends DefaultTypeHandler implements ITypeHandler<IImageEntry> {
	/**
	 * @inheritDoc
	 */
	override bigPreview(entry: IMediaEntry): JSX.Element {
		return <img src={`https://ipfs.io/ipfs/${entry.source.toString()}`}/>
	}

	/**
	 * @inheritDoc
	 */
	override listPreview(entry: IMediaEntry): JSX.Element {
		return <img src={`https://ipfs.io/ipfs/${(entry as IImageEntry).thumbnail.toString()}`} style={{maxWidth: '100%', maxHeight: '100%'}}/>
	}
}

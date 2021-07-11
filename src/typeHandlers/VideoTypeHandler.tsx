import {IMediaEntry, IVideoEntry} from '@undyingwraith/dag-media-archive';
import React from 'react';
import {DefaultTypeHandler} from './DefaultTypeHandler';
import {ITypeHandler} from './ITypeHandler';

export class VideoTypeHandler extends DefaultTypeHandler implements ITypeHandler {
	override listPreview(entry: IMediaEntry): JSX.Element {
		return <img src={`https://ipfs.io/ipfs/${(entry as IVideoEntry).thumbnail.toString()}`}/>
	}
}

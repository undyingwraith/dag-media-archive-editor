import {IImageEntry, IMediaEntry, IVideoEntry} from '@undyingwraith/dag-media-archive';
import React from 'react';

export const MediaEntry = (props: IMediaEntryProps) => {
	const s = props.entry

	let preview: any

	switch(s.uri) {
		case 'Entry.Image':
			const img = s as IImageEntry
			preview = <img src={`https://ipfs.io/ipfs/${img.thumbnail.toString()}`}/>
			break;
		case 'Entry.Image.Video':
			const vid = s as IVideoEntry
			preview = <img src={`https://ipfs.io/ipfs/${vid.thumbnail.toString()}`}/>
			break;
		default:
			preview = s.uri
			break;
	}

	return <div>
		<p>{preview}</p>
		<a href={`https://ipfs.io/ipfs/${s.source.toString()}`}>{s.id}</a>
	</div>
}

export interface IMediaEntryProps {
	entry: IMediaEntry
}

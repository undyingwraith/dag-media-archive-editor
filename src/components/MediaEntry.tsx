import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Text} from 'evergreen-ui';
import React from 'react';
import {useTypeResolver} from '../hooks/useTypeResolver';

export const MediaEntry = (props: IMediaEntryProps) => {
	const {entry} = props;
	const resolver = useTypeResolver()

	return <Pane
		elevation={1}
		background={'blue100'}
		width={350}
		height={400}
		margin={24}
	>
		<a href={`#/detail/${entry.id}`} style={{width: '100%', height: '100%'}}>
			{resolver && resolver.resolve(entry.uri).listPreview(entry)}
			<Text>{entry.id}</Text>
		</a>
	</Pane>;
};

export interface IMediaEntryProps {
	entry: IMediaEntry
}

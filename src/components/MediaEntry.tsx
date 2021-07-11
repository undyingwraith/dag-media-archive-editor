import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Text} from 'evergreen-ui';
import React from 'react';
import {useTypeResolver} from '../hooks/useTypeResolver';

export const MediaEntry = (props: IMediaEntryProps) => {
	const {entry} = props;
	const resolver = useTypeResolver()

	return <Pane
		elevation={1}>
		<a href={`#/detail/${entry.id}`}>
			{resolver && resolver.resolve(entry.uri).listPreview(entry)}
			<Text>{entry.id}</Text>
		</a>
	</Pane>;
};

export interface IMediaEntryProps {
	entry: IMediaEntry
}

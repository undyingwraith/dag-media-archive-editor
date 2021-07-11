import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Button, Text} from 'evergreen-ui';
import React from 'react';
import {useTypeResolver} from '../hooks';
import {Link} from 'react-router-dom';

export const MediaEntry = (props: IMediaEntryProps) => {
	const {entry} = props;
	const resolver = useTypeResolver();

	return <Pane
		elevation={1}
		background={'blue100'}
		margin={24}
		padding={12}
	>
		<Pane
			width={350}
			height={400}
		>
			<Link to={`/detail/${entry.id}/preview`}>
				{resolver && resolver.resolve(entry.uri).listPreview(entry)}
			</Link>
		</Pane>
		<Pane
			display={'flex'}
			justifyContent={'flex-end'}
		>
			<Link to={`/detail/${entry.id}/edit`}>
				<Button marginRight={16}>
					Edit
				</Button>
			</Link>
			<Link to={`/detail/${entry.id}/details`}>
				<Button marginRight={16}>
					Details
				</Button>
			</Link>
			<Link to={`/detail/${entry.id}/preview`}>
				<Button marginRight={16} appearance="primary">
					View
				</Button>
			</Link>
		</Pane>
	</Pane>;
};

export interface IMediaEntryProps {
	entry: IMediaEntry
}

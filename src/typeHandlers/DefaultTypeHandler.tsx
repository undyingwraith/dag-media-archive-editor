import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Text} from 'evergreen-ui';
import React from 'react';
import {ITypeHandler} from './ITypeHandler';

export class DefaultTypeHandler implements ITypeHandler<IMediaEntry> {
	bigPreview(entry: IMediaEntry): JSX.Element {
		return <Text>{entry.uri}</Text>;
	}

	listPreview(entry: IMediaEntry): JSX.Element {
		return <Text>{entry.uri}</Text>;
	}

	getMeta(entry: IMediaEntry): { [p: string]: any } {
		return {
			id: entry.id,
			uri: entry.uri,
			source: entry.source.toString(),
		};
	}
}

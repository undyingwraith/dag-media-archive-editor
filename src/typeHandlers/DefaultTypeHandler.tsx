import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Text} from 'evergreen-ui';
import React from 'react';
import {ITypeHandler} from './ITypeHandler';

export class DefaultTypeHandler implements ITypeHandler {
	bigPreview(entry: IMediaEntry): JSX.Element {
		return <Text>{entry.uri}</Text>;
	}

	listPreview(entry: IMediaEntry): JSX.Element {
		return <Text>{entry.uri}</Text>;
	}

}

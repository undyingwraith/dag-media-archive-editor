import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Tab, Tablist, Spinner} from 'evergreen-ui';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDmaStore} from '../hooks/useDmaStore';
import {useTypeResolver} from '../hooks/useTypeResolver';

export const DetailPage = () => {
	let {id} = useParams<{ id: string }>();
	const store = useDmaStore();
	const resolver = useTypeResolver();
	const [media, setMedia] = useState<IMediaEntry | undefined>(undefined);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		store?.readMedia(id)
			.then((media) => {
				setMedia(media);
			})
			.catch(e => {
				console.error(e); //TODO
			});
	}, [id, store]);

	return !media ? <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
		<Spinner />
	</Pane> : <Pane>
		<Tablist marginBottom={16} flexBasis={240} marginRight={24}>
			<Tab
				id={'0'}
				onSelect={() => setSelectedIndex(0)}
				isSelected={0 === selectedIndex}
			>
				Preview
			</Tab>
			<Tab
				id={'1'}
				onSelect={() => setSelectedIndex(1)}
				isSelected={1 === selectedIndex}
			>
				Details
			</Tab>
		</Tablist>
		<Pane padding={16} background="blueTint" flex="1">
			<Pane
				id={`panel-0`}
				role="tabpanel"
				aria-hidden={0 !== selectedIndex}
				display={0 === selectedIndex ? 'block' : 'none'}
			>
				{resolver.resolve(media.uri).bigPreview(media)}
			</Pane>
			<Pane
				id={`panel-1`}
				role="tabpanel"
				aria-hidden={1 !== selectedIndex}
				display={1 === selectedIndex ? 'block' : 'none'}
			>
				{media.id}
				{media.uri}
			</Pane>
		</Pane>
	</Pane>;
};

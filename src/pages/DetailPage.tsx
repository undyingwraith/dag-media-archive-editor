import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Tab, Table, Tablist} from 'evergreen-ui';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {BreadCrumbs, IBreadcrumb} from '../components/BreadCrumbs';
import {useDmaStore} from '../hooks/useDmaStore';
import {useTypeResolver} from '../hooks/useTypeResolver';
import {ActionBoundary, IAlertProps} from '../components';

const TABS = {
	Preview: 'preview',
	Details: 'details',
	Edit: 'edit',
};

export const DetailPage = () => {
	let {id} = useParams<{ id: string }>();
	const store = useDmaStore();
	const resolver = useTypeResolver();
	const [media, setMedia] = useState<IMediaEntry | undefined>(undefined);
	const [selectedIndex, setSelectedIndex] = useState(TABS.Preview);
	const [alert, setAlert] = useState<IAlertProps | undefined>(undefined);

	useEffect(() => {
		store?.readMedia(id)
			.then((media) => {
				setMedia(media);
			})
			.catch(e => {
				setAlert({
					msg: e.toString(),
					type: 'danger',
				});
			});
	}, [id, store]);

	const getMetaTable = () => {
		if (!media) return <></>;
		const meta = resolver.resolve(media?.uri ?? 'Entry').getMeta(media);

		const rows = [];
		for (let property in meta) {
			rows.push(<Table.Row key={property} isSelectable onSelect={() => console.debug('selected')}>
				<Table.TextCell>{property}</Table.TextCell>
				<Table.TextCell>{meta[property]}</Table.TextCell>
			</Table.Row>);
		}

		return rows;
	};

	const breadcrumbs: IBreadcrumb[] = [
		{
			name: 'media',
			link: '#/',
		},
		{
			name: media?.id ?? 'loading',
			link: `#/detail/${media?.id}`,
		},
	];

	return <ActionBoundary
		loading={!media}
		alert={alert}
	>
		<Pane background={'gray700'}>
			<Pane background={'gray200'}>
				<BreadCrumbs breadcrumbs={breadcrumbs}/>
				<Tablist marginBottom={16} flexBasis={240} marginRight={24}>
					<Tab
						id={TABS.Preview}
						onSelect={() => setSelectedIndex(TABS.Preview)}
						isSelected={TABS.Preview === selectedIndex}
					>
						Preview
					</Tab>
					<Tab
						id={TABS.Details}
						onSelect={() => setSelectedIndex(TABS.Details)}
						isSelected={TABS.Details === selectedIndex}
					>
						Details
					</Tab>
					<Tab
						id={TABS.Edit}
						onSelect={() => setSelectedIndex(TABS.Edit)}
						isSelected={TABS.Edit === selectedIndex}
					>
						Edit
					</Tab>
				</Tablist>
			</Pane>
			<Pane padding={16} flex="1">
				<Pane
					id={`panel-${TABS.Preview}`}
					role="tabpanel"
					display={TABS.Preview === selectedIndex ? 'block' : 'none'}
				>
					{media && resolver.resolve(media.uri).bigPreview(media)}
				</Pane>
				<Pane
					id={`panel-${TABS.Details}`}
					role="tabpanel"
					display={TABS.Details === selectedIndex ? 'block' : 'none'}
				>
					<Table>
						<Table.Head>
							<Table.SearchHeaderCell/>
							<Table.TextHeaderCell>value</Table.TextHeaderCell>
						</Table.Head>
						<Table.Body>
							{getMetaTable()}
						</Table.Body>
					</Table>
				</Pane>
				<Pane
					id={`panel-${TABS.Edit}`}
					role="tabpanel"
					display={TABS.Edit === selectedIndex ? 'block' : 'none'}
				>
					TODO
				</Pane>
			</Pane>
		</Pane>
	</ActionBoundary>;
};

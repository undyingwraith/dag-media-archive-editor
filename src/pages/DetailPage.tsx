import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Tab, Table, Tablist} from 'evergreen-ui';
import {useEffect, useState} from 'react';
import {useHistory, useParams, useLocation} from 'react-router-dom';
import {ActionBoundary, BreadCrumbs, IAlertProps, IBreadcrumb} from '../components';
import {useDmaStore, useTypeResolver} from '../hooks';

const TABS = {
	Preview: 'preview',
	Details: 'details',
	Edit: 'edit',
};

export const DetailPage = () => {
	const params = useParams<{ id: string, tab?: string }>();
	const h = useHistory();
	const location = useLocation();
	if (!params.tab)
		h.push(`${location.pathname}/${TABS.Preview}`);
	const tab = params.tab ?? TABS.Preview;
	const id = params.id;

	const store = useDmaStore();
	const resolver = useTypeResolver();
	const [media, setMedia] = useState<IMediaEntry | undefined>(undefined);
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
						onSelect={() => h.push(`${location.pathname.replace(tab, TABS.Preview)}`)}
						isSelected={TABS.Preview === tab}
					>
						Preview
					</Tab>
					<Tab
						id={TABS.Details}
						onSelect={() => h.push(`${location.pathname.replace(tab, TABS.Details)}`)}
						isSelected={TABS.Details === tab}
					>
						Details
					</Tab>
					<Tab
						id={TABS.Edit}
						onSelect={() => h.push(`${location.pathname.replace(tab, TABS.Edit)}`)}
						isSelected={TABS.Edit === tab}
					>
						Edit
					</Tab>
				</Tablist>
			</Pane>
			<Pane padding={16} flex="1">
				<Pane
					id={`panel-${TABS.Preview}`}
					role="tabpanel"
					display={TABS.Preview === tab ? 'block' : 'none'}
				>
					{media && resolver.resolve(media.uri).bigPreview(media)}
				</Pane>
				<Pane
					id={`panel-${TABS.Details}`}
					role="tabpanel"
					display={TABS.Details === tab ? 'block' : 'none'}
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
					display={TABS.Edit === tab ? 'block' : 'none'}
				>
					TODO
				</Pane>
			</Pane>
		</Pane>
	</ActionBoundary>;
};

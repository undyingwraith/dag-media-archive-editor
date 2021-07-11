import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {ICollection} from '@undyingwraith/dag-media-archive/dist/types/ICollection';
import {Pagination, Pane} from 'evergreen-ui';
import React, {useEffect, useState} from 'react';
import {ActionBoundary, BreadCrumbs, IAlertProps, IBreadcrumb, MediaEntry} from '../components';
import {useDmaStore} from '../hooks';

export const ListPage = () => {
	const perPage = 12;
	const store = useDmaStore();
	const [mediaList, setMediaList] = useState<IMediaEntry[]>([]);
	const [collections, setCollections] = useState<ICollection[]>([]);
	const [page, setPage] = useState(1);
	const [alert, setAlert] = useState<IAlertProps | undefined>(undefined);

	useEffect(() => {
		store?.getList()
			.then((list) => {
				setMediaList(list);
				setPage(1);
			})
			.catch(e => {
				setAlert({
					msg: e.toString(),
					type: 'danger',
				});
			});
	}, [store]);

	const paginate = (items: any[], page: number, perPage: number) => {
		const start = (page - 1) * perPage;
		return items.slice(start, start + perPage);
	};

	const numPages = Math.ceil(mediaList.length / perPage);
	const breadcrumbs: IBreadcrumb[] = [
		{
			name: 'media',
			link: '#/',
		},
	];

	return <ActionBoundary
		loading={mediaList.length <= 0}
		alert={alert}
	>
		<Pane background={'gray200'}>
			<BreadCrumbs breadcrumbs={breadcrumbs}/>
		</Pane>
		<Pane
			display="flex"
			flexDirection={'row'}
		>
			{paginate(mediaList, page, perPage).map((m) => <MediaEntry entry={m} key={m.id}/>)}
		</Pane>
		<Pane background={'gray200'}>
			<Pagination
				page={1}
				totalPages={numPages}
				onPageChange={(page) => setPage(page)}
			/>
		</Pane>
	</ActionBoundary>;
};

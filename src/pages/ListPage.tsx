import {IMediaEntry} from '@undyingwraith/dag-media-archive';
import {Pane, Card, Pagination, Spinner} from 'evergreen-ui';
import React, {useEffect, useState} from 'react';
import {MediaEntry} from '../components';
import {useDmaStore} from '../hooks/useDmaStore';

export const ListPage = () => {
	const perPage = 12
	const store = useDmaStore();
	const [mediaList, setMediaList] = useState<IMediaEntry[]>([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		store?.getList()
			.then((list) => {
				setMediaList(list);
				setPage(1);
			});
	}, [store]);

	const paginate = (items: any[], page: number, perPage: number) => {
		const start = (page - 1) * perPage;
		return items.slice(start, start + perPage);
	};

	const numPages = Math.ceil(mediaList.length / perPage)

	return mediaList.length > 0 ? <Pane>
		{paginate(mediaList, page, perPage).map((m) => <Card key={m.id}><MediaEntry entry={m}/></Card>)}
		<Pagination
			page={1}
			totalPages={numPages}
			onPageChange={(page) => setPage(page)}
		/>
	</Pane> : <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
		<Spinner />
	</Pane>;
};

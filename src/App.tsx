import {DmaStore, IDmaStore, IMediaEntry} from '@undyingwraith/dag-media-archive';
import {CID, create} from 'ipfs-http-client';
import React, {useEffect, useState} from 'react';
import {MediaEntry} from './components';

function App() {
	const [store, setStore] = useState<IDmaStore<IMediaEntry> | undefined>(undefined);
	const [mediaList, setMediaList] = useState<IMediaEntry[]>([]);

	useEffect(() => {
		//TODO: in browser node fallback
		const node = create({url: 'http://localhost:5001/api/v0'});
		//TODO: load cid from localstorage
		DmaStore.create(node, new CID('bafyriqgksjhvsohlkkqc6f3guennbl4aesrc7qg2txacdsbpnaxzlppnxefzuufdhpe2rtvdwmja73dto5nzc4xjx5v6dwm3h2h6dxiqkkrxm'))
			.then(store => {
				setStore(store);
			});

		return () => {
			//TODO
		};
	}, []);

	useEffect(() => {
		store?.getList()
			.then((list) => {
				setMediaList(list);
			});
	}, [store]);

	return <>
		{mediaList.map((m) => <div key={m.id}><MediaEntry entry={m}/></div>)}
	</>;
}

export default App;

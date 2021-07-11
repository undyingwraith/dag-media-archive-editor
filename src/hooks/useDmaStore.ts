import {DmaStore, IDmaStore, IMediaEntry} from '@undyingwraith/dag-media-archive';
import {CID, create} from 'ipfs-http-client';
import {useEffect, useState} from 'react';

export const useDmaStore = () => {
	const [store, setStore] = useState<IDmaStore<IMediaEntry> | undefined>(undefined);

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

	return store
}

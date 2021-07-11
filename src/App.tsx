import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {DetailPage, ListPage} from './pages';
import {Pane} from 'evergreen-ui';

function App() {
	return <HashRouter>
		<Pane
			display="flex"
			alignItems="center"
			flexDirection={'column'}
			background={'dark'}
			minHeight={'100vh'}
		>
			<Pane width={'75%'} background={'default'} padding={15}>
				<h1>DAG Archive editor</h1>
			</Pane>
			<Pane
				border="default"
				width={'75%'}
				display="flex"
				flexDirection={'column'}
			>
				<Switch>
					<Route path={'/detail/:id/:tab?'} component={DetailPage}/>
					<Route path={'/'} component={ListPage}/>
				</Switch>
			</Pane>
		</Pane>
	</HashRouter>;
}

export default App;

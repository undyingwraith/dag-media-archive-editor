import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {DetailPage, ListPage} from './pages';
import {Pane} from 'evergreen-ui';

function App() {
	return <HashRouter>
		<Pane display="flex" alignItems="center" justifyContent="center" flexDirection={'column'}>
			<Pane width={'75%'} background={'greenTint'}>
				<Pane><h1>DAG Archive editor</h1></Pane>
			</Pane>
			<Pane border="default" width={'75%'}>
				<Switch>
					<Route path={'/detail/:id'} component={DetailPage}/>
					<Route path={'/'} component={ListPage}/>
				</Switch>
			</Pane>
		</Pane>
	</HashRouter>;
}

export default App;

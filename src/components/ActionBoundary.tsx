import {Alert, InlineAlert, Pane, Spinner} from 'evergreen-ui';
import React from 'react';

export const ActionBoundary = (props: IAlertBoundaryProps) => {
	const {alert, children} = props;
	const inline = props.inline ?? false;
	const loading = props.loading ?? false;

	const alertProps = {
		intent: alert?.type ?? 'none',
		title: alert?.msg ?? '',
		children: alert?.children,
	};

	return <>
		{loading ? <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
			<Spinner/>
		</Pane> : <>
			{alert && (inline ? <InlineAlert {...alertProps}/> : <Alert {...alertProps}/>)}
			{children}
		</>}
	</>;
};

export interface IAlertBoundaryProps {
	alert?: IAlertProps
	inline?: boolean
	loading?: boolean
	children: any
}

export interface IAlertProps {
	type: 'none' | 'success' | 'warning' | 'danger'
	msg: string
	children?: any
}

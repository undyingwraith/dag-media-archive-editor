import {Badge, Pane, Text} from 'evergreen-ui';

export const BreadCrumbs = (props: IBreadCrumbsProps) => {
	const {breadcrumbs} = props;

	let result: JSX.Element[] = [];

	breadcrumbs.forEach((crumb, key) => {
		if (key === breadcrumbs.length - 1) {
			result.push(<a href={crumb.link}>
				<Badge
					key={`crumb-${key}`}
					color="blue"
				>
					{crumb.name}
				</Badge>
			</a>);
		} else {
			result.push(<a href={crumb.link}>
				<Badge
					key={`crumb-${key}`}
					color="neutral"
				>
					{crumb.name}
				</Badge>
			</a>);
			result.push(<Text
				key={`sep-${key}`}
			>&gt;</Text>);
		}
	});

	return <Pane padding={7}>
		{result}
	</Pane>;
};

export interface IBreadCrumbsProps {
	breadcrumbs: IBreadcrumb[]
}

export interface IBreadcrumb {
	name: string
	link: string
}

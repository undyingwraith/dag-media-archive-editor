import {IMediaEntry} from '@undyingwraith/dag-media-archive';

export interface ITypeHandler<T extends IMediaEntry> {
	/**
	 *
	 * @param entry
	 */
	bigPreview(entry: T): JSX.Element

	/**
	 *
	 * @param entry
	 */
	listPreview(entry: T): JSX.Element

	getMeta(entry: T): { [key: string]: any }
}

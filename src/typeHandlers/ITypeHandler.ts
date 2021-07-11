import {IMediaEntry} from '@undyingwraith/dag-media-archive';

export interface ITypeHandler {
	/**
	 *
	 * @param entry
	 */
	bigPreview(entry: IMediaEntry): JSX.Element

	/**
	 *
	 * @param entry
	 */
	listPreview(entry: IMediaEntry): JSX.Element
}

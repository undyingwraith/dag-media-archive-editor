import {IVideoEntry} from '@undyingwraith/dag-media-archive';
import {ImageTypeHandler} from './ImageTypeHandler';
import {ITypeHandler} from './ITypeHandler';

export class VideoTypeHandler extends ImageTypeHandler implements ITypeHandler<IVideoEntry> {
}

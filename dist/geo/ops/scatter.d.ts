import { Shape, Vec2 } from '../types';
/**
 * Produces `num` random points for which {@link pointInside} succeeds for the
 * given `shape`. Shape must implement `pointInside` and `bounds` methods.
 *
 * @param shape
 * @param num
 */
export declare function scatter(shape: Shape, num: number): Vec2[] | undefined;

import {Component} from './interface.js';
import {Vector2} from '../geometry/index.js';

/**
 * A component used for 2d entities that can collide with each other, producing various effects.
 */
export class Collision2DComponent extends Component {
    /**
     * @inheritDoc
     * @override
     */
    static get identifier() {
        return 'collision';
    }

    /**
     * Creates a new 2d collision component.
     * @param {Collider} collider The collider shape.
     * @param {number} layer The layer to use for collisions (@todo currently unused).
     * @param {number} offset The offset in pixels from collider to entity.
     */
    constructor(collider, layer, offset = 0) {
        super();

        this._collider = collider.translate(new Vector2(offset, 0));
        this._layer = layer;
        this._collidingEntities = [];
        this._ignoreCollisions = false;
        this._offset = offset;
    }

    /**
     * Get the collider object.
     * @returns {Collider} The collider.
     */
    get collider() {
        return this._collider;
    }

    /**
     * Get the layer index.
     * @returns {number} The layer index.
     */
    get layer() {
        return this._layer;
    }

    /**
     * Get the entities colliding with this entity.
     * @returns {Entity[]} The colliding entities.
     */
    get collidingEntities() {
        return this._collidingEntities;
    }

    /**
     * Gets the offset in pixels of the collision component compared to the actual entity.
     * @returns {number} The offset.
     */
    get offset() {
        return this._offset;
    }

    /**
     * Resets the currently stored collisions.
     */
    resetCollisions() {
        this._collidingEntities = [];
    }

    /**
     * Adds a new collision entity.
     * @param {Entity} entity The entity this is colliding with.
     */
    addCollision(entity) {
        this._collidingEntities.push(entity);
    }

    /**
     * Disable collision detection completely for this collision component.
     */
    disableCollisions() {
        this._ignoreCollisions = true;
    }

    /**
     * Re-enable collision detection for this collision component.
     */
    enableCollisions() {
        this._ignoreCollisions = false;
    }

    /**
     * Get whether this component currently has its collision detection disabled.
     * @return {boolean} Whether collisions are ignored.
     */
    get ignoreCollisions() {
        return this._ignoreCollisions;
    }
}

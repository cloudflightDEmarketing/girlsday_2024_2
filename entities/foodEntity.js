import {
    Collision2DComponent,
    ConsumableComponent,
    Graphics2DComponent,
    Gravity2DComponent
} from '../engine/components/index.js';
import {GlobalGameState, LayerIndexes} from '../globals.js';
import {CircleCollider} from '../engine/geometry/index.js';
import {Entity, EntityTypes} from '../engine/entities/index.js';
import { GlobalConfig } from '../config.js';
import { SceneManager } from '../engine/resourcemanagers/sceneManager.js';

/**
 * Various available food types.
 */
const FoodTypes = Object.freeze({
    CUPCAKE: {
        name: 'cupcake',
        value: 1,
        weight: 3 // TODO TASK - try changing the weight of a cupcake to see how it affects the game

    },
    FRUIT: {
        name: 'fruit',
        value: 3,
        weight: 5
    },
    STAR: {
        name: 'star',
        value: 2,
        weight: 4
    },
    ICECREAM: {
        name: 'icecream',
        value: 2,
        weight: 6 // TODO TASK - try changing the weight of a cupcake to see how it affects the game
    },
    BOMB: {
        name: 'bomb',
        value: 0,
        weight: 6
    }
});

/**
 * Factory for creating food entities.
 */
export class FoodFactory {
    /**
     * Creates a food item.
     * @param position The position where the food item is spawned.
     * @returns {Entity} The created entity.
     */
    static createFood(position) {
        /*
         * TODO TASK
         *  Currently, only cupcakes are spawned by the game.
         *  Come up with a rule on how to spawn different food types, e.g. randomly selecting one or spawning one every n items / seconds.
         *  Then implement that rule.
         */
        let foodType = FoodTypes.CUPCAKE;

        if(SceneManager.currentScene.name === GlobalConfig.THIRD_SCENE_NAME) {
            const foodTypes = ['cupcake', 'star', 'icecream'];
            foodType = FoodTypes.ICECREAM;
        }
        if(SceneManager.currentScene.name === GlobalConfig.SECOND_SCENE_NAME) {
            foodType = FoodTypes.STAR;
        }

        if (Math.random() < 0.1) {
            foodType = FoodTypes.BOMB;
        }

        const realWeight = foodType.weight + (GlobalGameState.current.memo.get('itemSpeed') || 0);

        return new Entity(EntityTypes.FOOD)
            .addComponent(new ConsumableComponent(foodType.value, foodType.name === 'bomb'))
            .addComponent(new Graphics2DComponent(position, 44, 44, foodType.name))
            .addComponent(new Collision2DComponent(CircleCollider.fromDimensions(position, 44, 44), LayerIndexes.FOOD))
            .addComponent(new Gravity2DComponent(realWeight)); // TODO TASK - If you add a difficulty level via a global config, you could e.g. multiply it with the weight to make things fall faster
    }
}

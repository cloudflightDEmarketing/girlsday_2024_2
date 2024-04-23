import {FoodFactory} from '../../entities/foodEntity.js';
import {GlobalGameState, Time} from '../../globals.js';
import {GlobalConfig} from '../../config.js';
import {Vector2} from '../geometry/index.js';

/**
 * System for handling food spawns.
 */
export class FoodSpawnSystem {
    /**
     * Process a single game tick.
     * Will spawn new food entities in regular intervals in a randomized x position near the top of the screen.
     */
    static tick() {
        let lastFoodSpawn = 0;
        if (GlobalGameState.current.memo.has('lastFoodSpawn')) {
            lastFoodSpawn = GlobalGameState.current.memo.get('lastFoodSpawn');
        }
        else {
            GlobalGameState.current.memo.set('lastFoodSpawn', 0);
        }

        if (Time.deltaTime > lastFoodSpawn + GlobalGameState.current.foodSpawnIntervalMs) {
            GlobalGameState.current.memo.set('lastFoodSpawn', Time.deltaTime);

            const spawnX = GlobalConfig.FOOD_SPAWN_POSITIONS[Math.floor(Math.random() * GlobalConfig.FOOD_SPAWN_POSITIONS.length)];

            FoodFactory.createFood(new Vector2(spawnX, 20));
        }
    }
}

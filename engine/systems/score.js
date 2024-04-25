import {Collision2DComponent, ConsumableComponent} from '../components/index.js';
import {EntityList} from '../entities/index.js';
import {Player} from '../../entities/playerEntity.js';
import {SceneManager} from "../resourcemanagers/index.js";
import {GlobalGameState} from "../../globals.js";

/**
 * System for handling food-player-collisions and consuming.
 */
export class ScoreSystem {
    /**
     * Process a single game tick.
     * Checks whether the player is colliding with a food item.
     * If so, we play the eat sound, add the food value to the game state, and remove the food entity.
     */
    static tick() {
        if (!GlobalGameState.current.memo.has('itemSpeed')) {
            GlobalGameState.current.memo.set('itemSpeed', 0);
        }
        if (!GlobalGameState.current.memo.has('PlayerSpeed')) {
            GlobalGameState.current.memo.set('PlayerSpeed', 0);
        }
        const player = Player.getEntity();
        const playerCollision = player[Collision2DComponent.identifier];
        const collidingConsumables = playerCollision.collidingEntities.filter((iColliding) => iColliding.hasComponent(ConsumableComponent.identifier));

        for (const iConsumableEntity of collidingConsumables) {
            const entityConsumable = iConsumableEntity[ConsumableComponent.identifier];
            const eatSfx = SceneManager.currentScene.soundManager.sfx.get('eat');
            const bombSfx = SceneManager.currentScene.soundManager.sfx.get('bomb');


            if (entityConsumable.isBomb) {
                if (bombSfx !== undefined) {
                    bombSfx.play();
                }
                GlobalGameState.current.lives -= 1;
            }
            else {
                if (eatSfx !== undefined) {
                    eatSfx.play();
                }
                GlobalGameState.current.score += entityConsumable.value;
            }            

            if (GlobalGameState.current.score === 10) {
                GlobalGameState.current.memo.set('itemSpeed', 1);
                GlobalGameState.current.memo.set('PlayerSpeed', 1);
            }
            if (GlobalGameState.current.score === 20) {
                GlobalGameState.current.memo.set('itemSpeed', 3);
                GlobalGameState.current.memo.set('PlayerSpeed', 2);
            }
            if (GlobalGameState.current.score === 30) {
                GlobalGameState.current.memo.set('itemSpeed', 5);
                GlobalGameState.current.memo.set('PlayerSpeed', 4);
            }
            if (GlobalGameState.current.score === 40) {
                GlobalGameState.current.memo.set('itemSpeed', 7);
                GlobalGameState.current.memo.set('PlayerSpeed', 6);
            }
            if (GlobalGameState.current.score === 50) {
                GlobalGameState.current.memo.set('itemSpeed', 9);
                GlobalGameState.current.memo.set('PlayerSpeed', 8);
            }
            if (GlobalGameState.current.score === 60) {
                GlobalGameState.current.memo.set('itemSpeed', 11);
                GlobalGameState.current.memo.set('PlayerSpeed', 10);
            }
             if (GlobalGameState.current.score === 70) {
                GlobalGameState.current.memo.set('itemSpeed', 13);
                GlobalGameState.current.memo.set('PlayerSpeed', 12);
            }
             if (GlobalGameState.current.score === 80) {
                GlobalGameState.current.memo.set('itemSpeed', 15);
                GlobalGameState.current.memo.set('PlayerSpeed', 14);
            }
             if (GlobalGameState.current.score === 90) {
                GlobalGameState.current.memo.set('itemSpeed', 17);
                GlobalGameState.current.memo.set('PlayerSpeed', 16);
            }

            EntityList.remove(iConsumableEntity.id);
        }
    }
}

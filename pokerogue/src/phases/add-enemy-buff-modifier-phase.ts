import BattleScene from "#app/battle-scene";
import { ModifierTier } from "#app/modifier/modifier-tier";
import { regenerateModifierPoolThresholds, ModifierPoolType, getEnemyBuffModifierForWave } from "#app/modifier/modifier-type";
import { EnemyPersistentModifier } from "#app/modifier/modifier";
import { Phase } from "#app/phase";

export class AddEnemyBuffModifierPhase extends Phase {
  constructor(scene: BattleScene) {
    super(scene);
  }

  start() {
    super.start();

    const waveIndex = this.scene.currentBattle.waveIndex;
    const tier = !(waveIndex % 1000) ? ModifierTier.ULTRA : !(waveIndex % 250) ? ModifierTier.GREAT : ModifierTier.COMMON;

    regenerateModifierPoolThresholds(this.scene.getEnemyParty(), ModifierPoolType.ENEMY_BUFF);

    const count = Math.ceil(waveIndex / 250);
    for (let i = 0; i < count; i++) {
      this.scene.addEnemyModifier(getEnemyBuffModifierForWave(tier, this.scene.findModifiers(m => m instanceof EnemyPersistentModifier, false), this.scene), true, true);
    }
    this.scene.updateModifiers(false, true).then(() => this.end());
  }
}
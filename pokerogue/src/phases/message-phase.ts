import BattleScene from "#app/battle-scene";
import { Phase } from "#app/phase";

export class MessagePhase extends Phase {
  private text: string;
  private callbackDelay: integer | null;
  private prompt: boolean | null;
  private promptDelay: integer | null;
  private speaker?: string;

  constructor(scene: BattleScene, text: string, callbackDelay?: integer | null, prompt?: boolean | null, promptDelay?: integer | null, speaker?: string) {
    super(scene);

    this.text = text;
    this.callbackDelay = callbackDelay!; // TODO: is this bang correct?
    this.prompt = prompt!; // TODO: is this bang correct?
    this.promptDelay = promptDelay!; // TODO: is this bang correct?
    this.speaker = speaker;
  }

  start() {
    super.start();

    if (this.text.indexOf("$") > -1) {
      const pageIndex = this.text.indexOf("$");
      this.scene.unshiftPhase(new MessagePhase(this.scene, this.text.slice(pageIndex + 1), this.callbackDelay, this.prompt, this.promptDelay, this.speaker));
      this.text = this.text.slice(0, pageIndex).trim();
    }

    if (this.speaker) {
      this.scene.ui.showDialogue(this.text, this.speaker, null, () => this.end(), this.callbackDelay || (this.prompt ? 0 : 1500), this.promptDelay ?? 0);
    } else {
      this.scene.ui.showText(this.text, null, () => this.end(), this.callbackDelay || (this.prompt ? 0 : 1500), this.prompt, this.promptDelay);
    }
  }

  end() {
    if (this.scene.abilityBar.shown) {
      this.scene.abilityBar.hide();
    }

    super.end();
  }
}
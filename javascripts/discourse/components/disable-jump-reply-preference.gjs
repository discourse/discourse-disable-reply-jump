import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { Input } from "@ember/component";
import { on } from "@ember/modifier";
import { action } from "@ember/object";
import i18n from "discourse-common/helpers/i18n";

export const SETTING_NAME = "discourse-disable-jump-to-reply";

export default class DisableJumpReplyPreference extends Component {
  @tracked isDisabledJumpReply = localStorage.getItem(SETTING_NAME) === "true";

  @action
  onChangeIsDisabledJumpReply(event) {
    this.isDisabledJumpReply = event.target.checked;
    localStorage.setItem(SETTING_NAME, event.target.checked);
  }

  <template>
    <div class="control-group disable-jump">
      <label class="control-label">
        {{i18n (themePrefix "discourse_disable_jump_reply.label")}}
      </label>

      <div class="controls">
        <label class="checkbox-label">
          <Input
            @type="checkbox"
            @checked={{this.isDisabledJumpReply}}
            {{on "click" this.onChangeIsDisabledJumpReply}}
          />
          {{i18n
            (themePrefix
              "discourse_disable_jump_reply.disable_jump_after_i_reply"
            )
          }}
        </label>
      </div>

      <div class="instructions">
        {{i18n (themePrefix "discourse_disable_jump_reply.instructions")}}
      </div>
    </div>
  </template>
}

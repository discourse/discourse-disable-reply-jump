import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import DButton from "discourse/components/d-button";
import eq from "truth-helpers/helpers/eq";
import i18n from "discourse-common/helpers/i18n";
import { Input } from "@ember/component";
import { on } from "@ember/modifier";
import { fn } from "@ember/helper";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

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

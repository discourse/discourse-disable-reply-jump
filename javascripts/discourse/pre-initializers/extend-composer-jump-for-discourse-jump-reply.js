import { withPluginApi } from "discourse/lib/plugin-api";
import { SETTING_NAME } from "../components/disable-jump-reply-preference";

export default {
  name: "extend-composer-jump-for-discourse-jump-reply",
  before: "inject-discourse-objects",

  initialize() {
    withPluginApi("1.0.0", (api) => {
      api.modifyClass("controller:composer", {
        pluginId: "discourse-disable-reply-jump",

        save(force, options = {}) {
          options.jump =
            localStorage.getItem(SETTING_NAME) === "true"
              ? false
              : options.jump;
          this._super(force, options);
        },
      });
    });
  },
};

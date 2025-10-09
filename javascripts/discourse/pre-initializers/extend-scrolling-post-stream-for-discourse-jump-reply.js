import { withSilencedDeprecations } from "discourse/lib/deprecated";
import { withPluginApi } from "discourse/lib/plugin-api";
import { SETTING_NAME } from "../components/disable-jump-reply-preference";

export default {
  name: "extend-scrolling-post-stream-for-discourse-jump-reply",
  before: "inject-discourse-objects",

  initialize() {
    withPluginApi((api) => {
      withSilencedDeprecations("discourse.post-stream-widget-overrides", () => {
        api.modifyClass("component:scrolling-post-stream", {
          pluginId: "discourse-disable-reply-jump",

          _posted() {
            if (localStorage.getItem(SETTING_NAME) === "true") {
              return;
            }

            this._super(...arguments);
          },
        });
      });
    });
  },
};

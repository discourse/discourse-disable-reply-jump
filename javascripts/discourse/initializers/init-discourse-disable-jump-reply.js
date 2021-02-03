import { withPluginApi } from "discourse/lib/plugin-api";

export const SETTING_NAME = "discourse-disable-jump-to-reply";

export default {
  name: "init-discourse-disable-jump-reply",

  initialize() {
    withPluginApi("0.8", (api) => {
      api.registerConnectorClass(
        "user-preferences-interface",
        "disable-jump-reply-preference",
        {
          setupComponent(args, component) {
            component.setProperties({
              isDisabledJumpReply: localStorage.getItem(SETTING_NAME),
              actions: {
                onChangeIsDisabledJumpReply(isChecked) {
                  component.set("isDisabledJumpReply", isChecked);

                  if (isChecked) {
                    localStorage.setItem(SETTING_NAME, true);
                  } else {
                    localStorage.setItem(SETTING_NAME, false);
                  }
                },
              },
            });
          },
        }
      );
    });
  },
};

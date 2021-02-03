import cookie, { removeCookie } from "discourse/lib/cookie";
import { withPluginApi } from "discourse/lib/plugin-api";

export const COOKIE_NAME = "ddjr";

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
              isDisabledJumpReply: cookie(COOKIE_NAME) === "1",
              actions: {
                onChangeIsDisabledJumpReply(isChecked) {
                  component.set("isDisabledJumpReply", isChecked);

                  if (isChecked) {
                    cookie(COOKIE_NAME, "1", {
                      path: "/",
                      expires: 9999,
                    });
                  } else {
                    removeCookie(COOKIE_NAME, { path: "/", expires: 1 });
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

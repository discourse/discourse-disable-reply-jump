import ScrollingPostStream from "discourse/components/scrolling-post-stream";
import { SETTING_NAME } from "../components/disable-jump-reply-preference";

export default {
  name: "extend-scrolling-post-stream-for-discourse-jump-reply",
  before: "inject-discourse-objects",

  initialize() {
    ScrollingPostStream.reopen({
      _posted() {
        if (localStorage.getItem(SETTING_NAME) === "true") {
          return;
        }

        this._super(...arguments);
      },
    });
  },
};

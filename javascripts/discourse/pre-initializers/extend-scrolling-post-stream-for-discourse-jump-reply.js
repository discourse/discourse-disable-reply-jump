import cookie from "discourse/lib/cookie";
import ScrollingPostStream from "discourse/components/scrolling-post-stream";
import COOKIE_NAME from "discourse/initializer/init-discourse-disable-jump-reply";

export default {
  name: "extend-scrolling-post-stream-for-discourse-jump-reply",

  before: "inject-discourse-objects",

  initialize() {
    ScrollingPostStream.reopen({
      _posted(staged) {
        if (cookie(COOKIE_NAME) === "1") {
          return;
        }

        this._super(...arguments);
      },
    });
  },
};

import cookie from "discourse/lib/cookie";
import ScrollingPostStream from "discourse/components/scrolling-post-stream";

export default {
  name: "extend-scrolling-post-stream-for-discourse-jump-reply",

  before: "inject-discourse-objects",

  initialize() {
    ScrollingPostStream.reopen({
      _posted(staged) {
        if (cookie("ddjr") === "1") {
          return;
        }

        this._super(...arguments);
      },
    });
  },
};

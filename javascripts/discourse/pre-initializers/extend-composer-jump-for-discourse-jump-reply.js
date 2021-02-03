import cookie from "discourse/lib/cookie";
import Composer from "discourse/controllers/composer";

export default {
  name: "extend-composer-jump-for-discourse-jump-reply",

  before: "inject-discourse-objects",

  initialize() {
    Composer.reopen({
      save(force, options = {}) {
        options.jump = cookie("ddjr") === "1" ? false : options.jump;

        this._super(force, options);
      },
    });
  },
};

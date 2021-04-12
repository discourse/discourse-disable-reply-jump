import Composer from "discourse/controllers/composer";
import { SETTING_NAME } from "../initializers/init-discourse-disable-jump-reply";

export default {
  name: "extend-composer-jump-for-discourse-jump-reply",

  before: "inject-discourse-objects",

  initialize() {
    Composer.reopen({
      save(force, options = {}) {
        options.jump =
          localStorage.getItem(SETTING_NAME) === "true" ? false : options.jump;

        this._super(force, options);
      },
    });
  },
};

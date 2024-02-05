import { apiInitializer } from "discourse/lib/api";
import DisableJumpReplyPreference from "../components/disable-jump-reply-preference";

export default apiInitializer("1.14.0", (api) => {
  api.renderInOutlet("user-preferences-interface", DisableJumpReplyPreference);
});

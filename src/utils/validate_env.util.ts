import { cleanEnv, str } from "envalid";

export default cleanEnv(process.env, {
  SERVER_URL: str(),
});

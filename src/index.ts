import { app } from "./setup/app";
import { env } from "./setup/env";

app.listen(env.PORT, () => {
  console.log("Hello via Bun!");
  console.log(`Server is running on port http://localhost:${env.PORT}/api/v1\n`);
});

export type App = typeof app; 
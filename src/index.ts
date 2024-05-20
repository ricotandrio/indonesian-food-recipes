import { app } from "./configs/app";
import { env } from "./configs/env";

app.listen(env.PORT, () => {
  console.log("Hello via Bun!");
  console.log(`Server is running on port http://localhost:${env.PORT}`);
});

export type App = typeof app;
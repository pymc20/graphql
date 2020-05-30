import { Application } from "oak";
import { GraphQLService } from "./graphql/index.ts";
import { oakCors } from "cors";


const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(oakCors());

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8000");
await app.listen({ port: 8000 });
const http = require("http");
const DEFAULT_USER = {
  username: "ErickWendel",
  password: "123",
};

const { once } = require("events");
const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },

  /**
   * success: curl -X POST --data '{"username": "ErickWendel", "password": "123"}' localhost:3000/login
   * fail: curl -X POST --data '{"username": "ErickWende", "password": "123"}' localhost:3000/login
   */

  "/login:post": async (request, response) => {
    const user = JSON.parse(await once(request, "data"));
    const toLower = (str) => str.toLowerCase();

    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      return response.end("Login failed!");
    }

    return response.end("Login successful!");
  },
  default: (request, response) => {
    response.writeHead(404);
    return response.end("Not found!");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const route = `${url.toLowerCase()}:${method.toLowerCase()}`;

  const routeHandler = routes[route] || routes.default;

  return routeHandler(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Listening on port 3000"));

module.exports = app;
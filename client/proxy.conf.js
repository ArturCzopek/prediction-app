const PROXY_CONFIG = [
  {
    context: [
      "/matches",
      "/results",
      "/types",
      "/users"
    ],
    target: "http://localhost:8080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

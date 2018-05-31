const PROXY_CONFIG = [
  {
    context: [
      "/api/matches",
      "/api/results",
      "/api/types",
      "/api/user",
      "/logout"
    ],
    target: "http://localhost:8080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

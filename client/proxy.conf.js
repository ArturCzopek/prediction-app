const PROXY_CONFIG = [
  {
    context: [
      "/api/matches",
      "/api/results",
      "/api/statistics",
      "/api/types",
      "/api/user",
    ],
    target: "http://localhost:8080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

import { devices, PlaywrightTestConfig } from "@playwright/test"

// Vite's default port
const port = 4173

const config: PlaywrightTestConfig = {
  testDir: ".",
  timeout: 10000,
  retries: process.env.CI === "true" ? 1 : 0,
  use: {
    viewport: { width: 1280, height: 720 },
    acceptDownloads: true,
    baseURL: `http://localhost:${port}`,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "edge",
      use: {
        channel: "msedge",
      },
    },
  ],
  webServer: {
    command: "npm run serve",
    port: port,
    timeout: parseInt(process.env.WAIT_ON_TIMEOUT) || 20 * 1000,
  },
}

export default config

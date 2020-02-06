const fs = require("fs");
const path = require("path");
const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");
const srcDir = path.resolve(__dirname, "web/e2e");
const logPath = path.resolve(__dirname, "tmp/e2e/logs");

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath, { recursive: true });
}

module.exports = {
  src_folders: [`${srcDir}/specs`],
  output_folder: `tmp/e2e/reports`,
  page_objects_path: `${srcDir}/page-objects`,
  custom_assertions_path: `${srcDir}/custom-assertions`,
  custom_commands_path: `${srcDir}/custom-commands`,
  test_workers: false,
  test_settings: {
    default: {
      launch_url: process.env.URL || "http://0.0.0.0:3000"
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          w3c: false,
          args: ["headless"]
        }
      },
      webdriver: {
        log_path: logPath,
        port: 9515,
        server_path: chromedriver.path
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox",
        alwaysMatch: {
          acceptInsecureCerts: true,
          "moz:firefoxOptions": {
            args: ["--headless"]
          }
        }
      },
      webdriver: {
        log_path: logPath,
        port: 4444,
        server_path: geckodriver.path
      }
    }
  },
  webdriver: {
    start_process: true
  }
};

# Capstone
Angular Web App
# Start-up
# Files
API repo is located at https://github.com/Ajay-Capstone-Team-A/CapstoneAPI
Clone both the API Repo and UI Repo into your own repositories.
Remember to run `npm install`
The SQL script for the tables is in this directory.

# Connecting
Information for connecting DB and API is in the API repo.
Change necessary variables in `ECommerce.UI/src/environments/environment.prod.ts` before attempting to run with the API

# Deployment
.yaml files are located in .github/workflow folders for both repositories.
app-location is `ECommerce.UI`
default output location is `dist/e-commerce`
When building the UI, you might need to set environment variable `NPM_CONFIG_LEGACY_PEER_DEPS` to true, alternately build with the `--legacy-peer-deps` flag.


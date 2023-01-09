# Capstone


# Files
Clone both the API Repo and UI Repo into your own repositories.
The SQL script for the tables is in the UI repo.

# Connecting
The Connection String for the database should be saved under the key `ConnectionStrings:ECommerce:ConnectionString`
In Azure App Services, Add your connection string in Settings > Configuration > Application settings > Connection Strings with the name `ECommerce:ConnectionString`

# Deploy
.yaml files are located in .github/workflow folders for both repositories.

When building the UI, you might need to set environment variable `NPM_CONFIG_LEGACY_PEER_DEPS` to true, alternately build with the `--legacy-peer-deps` flag.


# Turbohub

Superfast issue reader

# Setup

1. Clone the repo

   ```sh
   git clone https://github.com/toyamarinyon/turbohub
   ```

1. Go to the project folder

   ```sh
   cd turbohub
   ```

1. Copy `.env.example` to `.env`

   ```sh
   cp apps/web/.env.example apps/web/.env
   ```

1. Set [personal access token](https://github.com/settings/tokens) of GitHub to `GITHUB_PERSONAL_ACCESS_TOKEN` in your .env, for example:

    ```sh
    # apps/web/.env
    GITHUB_PERSONAL_ACCESS_TOKEN=ghp_sample_access_token
    ```

    Turbohub requires following scopes:

    ```
    user
    public_repo
    repo
    repo_deployment
    repo:status
    read:repo_hook
    read:org
    read:public_key
    read:gpg_key
    ```

1. Install packages with yarn

   ```sh
   yarn
   ```

1. Run

    ```sh
    yarn dev
    ```
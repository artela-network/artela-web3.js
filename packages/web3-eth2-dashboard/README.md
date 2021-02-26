# ETH2 Validator Dashboard

## Install

1. `npm i`
2. `npm start`

## Controls

### Validator Selection Table

- `enter` selects validator to populate the rest of the screen
- `ᐃ` and `ᐁ` to scroll
- `a` will open _Add Validator_ prompt
    - `esc` will exit prompt
    - `enter` will submit form
- `e` will open _Edit Validator_ prompt
    - `esc` will exit prompt
    - `enter` will submit form
- `d` will open _Delete Validator_ confirmation
    - Use `enter` to select `Cancel` or `Confirm`

## Limitations

- Currently, the dashboard uses [beaconcha.in's API](https://beaconcha.in/api/v1/docs/index.html) to get Validator information. Fortunately, they have a free tier, but it's rate limited, and fetching some information can be a bit slow. Only 10 API requests are allowed per minute, so results will be cached (by the API) if you select more than one Validator per minute

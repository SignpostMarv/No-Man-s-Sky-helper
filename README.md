# No Man's Sky Helper

WebGL & lit-element based helper for remembering where things are on a planet.

uses:
* lit-element
* three.js
* emojis for textures because reasons.

## Usage
* `npm install && gulp`
* copy `./dist/init.js` and `./dist/init.worker.js` to your desired location
* refer to [the example](https://github.com/SignpostMarv/No-Mans-Sky-helper/tree/master/src/examples/index.html)

### Marker API

| Name | Description | Types of Values |
| --------- | ----------- | --------------- |
| `lat` | latitude | numbers in the range of `-90.00` to `90.00` |
| `lng` | longitude | numbers in the range of `-180.00` to `180.00` |
| `title` | name for marker | descriptive string |
| `focusHere(distance: number)` | method for focusing a render view on a marker | `distance` is the number of units above the surface of the planet.


### Supported Markers

| Icon | Purpose | Tag Name |
| ---- | ------- | -------- |
| 📍 | General Purpose Marker | `nmsh-marker` |
| 🕴 | Drop Pods | `nmsh-drop-pod` |
| 🚨 | Distress Beacons | `nmsh-distress-beacon` |
| 🚢 | Crashed Freighters | `nmsh-crashed-freighter` |
| 🏫 | Monolith | `nmsh-monolith` |
| 🏺 | Knowledge Stones | `nmsh-knowledge-stone` |
| ⚙ | Damaged Machinery | `nmsh-damaged-machinery` |
| ⛏ | Mineral Deposits | `nmsh-mineral-deposit` |
| 🏢 | Building | `nmsh-building` |
| ℹ | Waypoint | `nmsh-waypoint` |
| 🏪 | Trade Post | `nmsh-trade-post` |
| 🏘 | Minor Settlements | `nmsh-minor-settlement` |
| 🗼 | Transmission Towers | `nmsh-transmission-tower` |
| 🏛 | Ancient Ruins | `nmsh-ancient-ruin` |
| 🔭 | Observatories | `nmsh-observatory` |
| 🚪 | Portals | `nmsh-portal` |
| 📦 | Cargo Drop | `nmsh-cargo-drop` |
| 🛩 | Damaged Starship | `nmsh-damaged-starship` |
| 🏭 | Manufacturing Facility | `nmsh-manufacturing-facility`|
| ⛺ | Shelters | `nmsh-shelter` |
| 📻 | Holographic Comms Tower | `nmsh-comms-tower` |


## Demo

[![YouTube video demo](https://img.youtube.com/vi/dg5pIbQ6PX8/0.jpg)](https://www.youtube.com/watch?v=dg5pIbQ6PX8)

## License
Apache 2.0

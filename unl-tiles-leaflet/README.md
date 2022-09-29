This is an example of rendering UNL vector tiles using Leaflet and Tangram as a leaflet plugin to create the layers. In order to run this example, you have to:

1. Create a `config.js` file with the following content (at the same level with `config.example.js`):

```js
export default {
  API_KEY: "PLACE-YOUR-OWN-API-KEY-HERE",
  VPM_ID: "PLACE-YOUR-OWN-VPM-ID-HERE",
};
```

2. Replace `PLACE-YOUR-OWN-API-KEY-HERE` with your actual api key and `PLACE-YOUR-OWN-VPM-ID-HERE`with the vpm id. You can create an `api key` and `vpm id` [here](https://studio.unl.global/). Checkout the [Developer's Portal section](https://studio.unl.global/developers_portal/docs?page=introduction) for instructions on how to do that.

3. Run `npm i && npm run build` to install the dependencies and build the project
4. Open the project in `Visual Studio Code` and open the `index.html` file using [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

![UNL tiles with leaflet example](https://github.com/u-n-l/examples/blob/main/unl-tiles-leaflet/gifs/leaflet_tiles_example.gif?raw=true)

// These are important and needed before anything else
import "zone.js/dist/zone-node";
import "reflect-metadata";

import { enableProdMode } from "@angular/core";

import * as express from "express";
//import * as cors from "cors";
import * as compression from "compression";
import { join } from "path";



// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
//app.use(cors());

const PORT = process.env.PORT || 4001;
const DIST_FOLDER = join(process.cwd(), "dist");

// fixes window is not defined
/*const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(DIST_FOLDER, 'browser', 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = win;
global['document'] = win.document;*/

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require("./dist/server/main");

// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

app.engine("html", (_, options, callback) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: "REQUEST",
        useFactory: () => Object.assign({ cookies: {} }, options.req),
        deps: []
      },
      { provide: "RESPONSE", useFactory: () => options.req.res, deps: [] }
    ]
  });
  engine(_, options, callback);
});

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));
app.use(compression());




// TODO: implement data requests securely
app.get("/api/*", (req, res) => {
  res.status(404).send("data requests are not supported");
});



// Server static files from /browser
app.get("*.*", express.static(join(DIST_FOLDER, "browser")));

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

/*app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "localhost");
});*/
// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

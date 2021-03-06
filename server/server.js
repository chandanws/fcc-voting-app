#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});

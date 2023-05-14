const express = require("express");
const router = express.Router();

router.get("/:val", async (query, host) => {
host.send("This is backend of my pric tracker") 
});

module.exports = router;

import express from "express";

const router = express.Router();
router.get("/", (request, response) => {
  response.json({
    message: "vanakkam da mapla",
  });
});

export default router;

import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello Sprints");
});

export default router;
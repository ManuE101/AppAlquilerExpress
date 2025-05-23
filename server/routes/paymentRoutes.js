import { Router } from "express";
import { createOrder, receiveWebhook } from "../controllers/paymentController.js";

const router = Router();

router.get("/create-order", createOrder);

router.get("/success", (req, res) => res.send("success"));

router.get("/failure", (req, res) => res.send("failure"));

router.get("/pending", (req, res) => res.send("pending"));

router.get("/webhook", receiveWebhook);

export default router;
import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getOneHotel,
  updateHotel
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getOneHotel);
router.get("/", getAllHotels);

export default router;

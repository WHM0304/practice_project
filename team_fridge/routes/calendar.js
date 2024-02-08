import express from "express";
import DB from "../models/index.js";
import moment from "moment";

const router = express.Router();
const PRODUCT = DB.models.tbl_product;
router.get("/", async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const result = await PRODUCT.findAll({ order: [["p_date", "ASC"]] });
  return res.render("./calendar/calendar.pug", { result: result });
  // return res.json(result);
});

router.get(`/:day/detail`, async (req, res) => {
  const p_date = req.params.day;
  const row = p_date;
  const result = await PRODUCT.findAll({
    where: { p_date: p_date },
  });

  // return res.json(result);
  return res.render("calendar/detail", { result: result, row: row });
});

export default router;

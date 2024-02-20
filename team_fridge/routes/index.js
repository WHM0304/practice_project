import express from "express";
import DB from "../models/index.js";
const FRIDGE = DB.models.tbl_fridge;
const PRODUCT = DB.models.tbl_product;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const fridge = await FRIDGE.findAll();
  if (fridge.length === 0) {
    res.render("index", { message: "냉장고를 추가하세요!" });
  } else {
    const rows = await FRIDGE.findAll();
    return res.render("fridge/list_fridge", { FR: rows });
  }
});

router.get("/qq", async (req, res) => {
  const rows = await PRODUCT.findAll();
  return res.json(`${rows[0].p_exdate}`);
});

export default router;

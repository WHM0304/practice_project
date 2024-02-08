import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const FRIDGE = DB.models.tbl_fridge;
const PRODUCT = DB.models.tbl_product;

router.get("/", async (req, res) => {
  const result = await PRODUCT.findAll();
  return res.render("alarm/alarm.pug", { result: result });
});

// router.get("/:foodName/detail", async (req, res) => {
//   const foodName = req.params.foodName;
//   try {
//     const row = await fridge.findByPk(foodName);
//     return res.render("alarm/detail", { food: row });
//   } catch (error) {
//     return res.json(error);
//   }
// });
router.get("/:p_seq/detail", async (req, res) => {
  const p_seq = req.params.p_seq;

  try {
    const result = await PRODUCT.findByPk(p_seq);

    return res.render("alarm/detail", { result: result });
  } catch (error) {}
});

router.get("/:p_num/delete", async (req, res) => {
  const p_num = req.params.p_num;
  try {
    const _delete = PRODUCT.destroy({ where: { p_seq: p_num } });
    return res.redirect("/alarm");
  } catch (error) {}
});

router.get("/:p_num/update", async (req, res) => {
  const p_num = req.params.p_num;
  const result = await PRODUCT.findByPk(p_num);
  return res.render("fridge/add_food", { food: result });
  // return res.json(result);
});
router.post("/:p_num/update", async (req, res) => {
  const p_num = req.params.p_num;
  const data = req.body;
  const update = await PRODUCT.update(data, { where: { p_seq: p_num } });

  return res.redirect(`/alarm/${p_num}/detail`);
});

export default router;

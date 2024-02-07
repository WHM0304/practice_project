import express from "express";
import DB from "../models/index.js";

const FRIDGE = DB.models.tbl_fridge;
const PRODUCT = DB.models.tbl_product;
const router = express.Router();

router.get("/", async (req, res) => {
  const have = await FRIDGE.findAll();

  if (have) {
    return res.redirect("fridge/list_fridge");
  } else {
    return res.render("fridge/add");
  }
});

router.get("/add_fridge", (req, res) => {
  return res.render("fridge/add_fridge");
});

router.get("/list_fridge", async (req, res) => {
  const rows = await FRIDGE.findAll();
  // return res.json(rows);
  return res.render("fridge/list_fridge", { FR: rows });
});

router.get("/shopmemo", (req, res) => {
  const sql = " SELECT * FROM tbl_templist";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json();
    } else {
      return res.render("fridge/shopmemo", { templist: result });
    }
  });
});
router.post("/shopmemo", (req, res) => {
  const t_name = req.body.t_name;
  const t_quan = req.body.t_quan;
  const params = [t_name, t_quan];
  const sql = "INSERT INTO tbl_templist (t_name, t_quan) VALUES (?, ?)";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return console.error(err);
    } else {
      return res.redirect("/fridge/shopmemo");
    }
  });
});

router.get("/shopmemo/deleteAll", (req, res) => {
  const sql = " TRUNCATE tbl_templist";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json();
    } else {
      return res.redirect("/fridge/shopmemo");
    }
  });
});

// ============================

router.get("/shopmemo/:t_num/delete", (req, res) => {
  const t_num = req.params.t_num;
  const sql = "DELETE FROM tbl_templist WHERE t_num = ?";

  dbConn.query(sql, t_num, (err, result) => {
    if (err) {
      return res.json();
    } else {
      return res.redirect("/fridge/shopmemo");
    }
  });
});
router.get("/shopmemo/:t_num/add", (req, res) => {
  const t_num = req.params.t_num;

  const sql2 = " SELECT * FROM tbl_templist WHERE t_num = ? ";
  dbConn.query(sql2, t_num, (err, result) => {
    // t_num을 파라미터로 전달
    if (err) {
      return res.json();
    } else {
      const params = result.map((item) => {
        return [item.t_num, item.t_name, item.t_quan];
      });
      const sql = "INSERT INTO tbl_shopping(s_num, s_name, s_quan) " + " VALUES (?,?,?) ";
      dbConn.query(sql, params, (err, result) => {
        if (err) {
          const sql = "DELETE FROM tbl_shopping WHERE s_num = ?";

          dbConn.query(sql, t_num, (err, result) => {
            if (err) {
              return res.json();
            } else {
              return res.redirect("/fridge/shopmemo");
            }
          });
        } else {
          return res.redirect("/fridge/shopmemo");
        }
      });
    }
  });
});

router.get("/shopmemo/save", (req, res) => {
  //어떻게 할지까먹어서 나중에 생각나면 할것.
  // 저장버튼을 누르면 쇼핑테이블에있는 데이터들이 자동으로 냉장고 테이블과 연동됨.
  res.redirect("/fridge/shopmemo");
});

// ============================

router.post("/add_fridge", async (req, res) => {
  const data = req.body;
  // req.body.f_pseq = "1";
  // return res.json(data);
  try {
    FRIDGE.create(data);
    const FR = await FRIDGE.findAll();
    return res.redirect("/fridge/list_fridge");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/fridge_list", async (req, res) => {
  const result = await PRODUCT.findAll();
  // return res.json(result);

  return res.render("fridge/fridge_list", { food: result });
});

router.get("/:p_num/fridge_detail", async (req, res) => {
  const p_num = req.params.p_num;

  const result = await PRODUCT.findByPk(p_num);
  // return res.json(result);

  return res.render("fridge/fridge_detail", { item: result });
});

router.get("/:p_num/delete", async (req, res) => {
  const p_num = req.params.p_num;
  const destroy = await PRODUCT.destroy({ where: { p_seq: p_num } });
  return res.redirect("/fridge/fridge_list");
});

router.get("/add_food", (req, res) => {
  return res.render("fridge/add_food");
});

router.post("/add_food", async (req, res) => {
  const data = req.body;

  const food = PRODUCT.findAll();
  // return res.json(data);
  try {
    await PRODUCT.create(data);
    return res.redirect("/fridge/fridge_list");
  } catch (error) {}

  // const f_div = req.body.f_div;

  // return res.redirect("/fridge/fridge_list", { food: result });
});

router.get("/:p_num/update", async (req, res) => {
  const p_num = req.params.p_num;
  const update = await PRODUCT.findByPk(p_num);
  return res.render("fridge/add_food", { food: update });
});
router.post("/:p_num/update", async (req, res) => {
  const p_num = req.params.p_num;
  const data = req.body;
  try {
    await PRODUCT.update(data, { where: { p_seq: p_num } });
    return res.redirect(`/fridge/${p_num}/fridge_detail`);
  } catch (error) {
    return res.json(error);
  }
});
export default router;

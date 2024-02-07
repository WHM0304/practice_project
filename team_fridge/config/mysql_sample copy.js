import DB from "mysql2";

const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "****",
  password: "****",
  database: "fridgedb",
};

const dbCreate = {
  init: () => {
    const connection = DB.createConnection(mysql_info);
    return connection;
  },
};
export default dbCreate;

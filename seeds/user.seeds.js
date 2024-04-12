const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");

const userSeed = async () => {
  try {
    await connect();
    console.log("Tenemos conexión");

    // Borrar datos
    await User.collection.drop();
    console.log("Usuarios eliminados");

    const userList = [
      { name: "Justine", lastName: "Diperaus", email: "jdiperaus0@accuweather.com" },
      { name: "Melinda", lastName: "Kynaston", email: "mkynaston1@homestead.com" },
      { name: "Dawn", lastName: "Chamney", email: "dchamney2@netlog.com" },
      { name: "Thomasa", lastName: "Rousel", email: "trousel3@tinypic.com" },
      { name: "Jodie", lastName: "Hinder", email: "jhinder4@wp.com" },
      { name: "Seline", lastName: "Stockhill", email: "sstockhill5@tinyurl.com" },
      { name: "Gisele", lastName: "Edeler", email: "gedeler6@naver.com" },
      { name: "Ingar", lastName: "Danev", email: "idanev7@un.org" },
      { name: "Bentley", lastName: "Tuddenham", email: "btuddenham8@blinklist.com" },
      { name: "Thorin", lastName: "Swancott", email: "tswancott9@yahoo.com" },
      { name: "Miner", lastName: "McEllen", email: "mmcellena@pagesperso-orange.fr" },
      { name: "Skippy", lastName: "Bozworth", email: "sbozworthb@netscape.com" },
      { name: "Thea", lastName: "Pomeroy", email: "tpomeroyc@youku.com" },
      { name: "Malissia", lastName: "Solley", email: "msolleyd@wikispaces.com" },
      { name: "Noelle", lastName: "Lowle", email: "nlowlee@blogger.com" },
      { name: "Hagan", lastName: "Ogger", email: "hoggerf@canalblog.com" },
      { name: "Demetria", lastName: "Glencrash", email: "dglencrashg@toplist.cz" },
      { name: "Jody", lastName: "MacCaughey", email: "jmaccaugheyh@independent.co.uk" },
      { name: "Lyndell", lastName: "Dumbleton", email: "ldumbletoni@techcrunch.com" },
      { name: "Jock", lastName: "Leatt", email: "jleattj@phpbb.com" }
    ];

    const documents = userList.map((user) => new User(user));
    await User.insertMany(documents);

    console.log("Autores creados correctamente!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

userSeed();

const {Model,Op} = require('sequelize');


class CustomerModel extends Model{
  static init(sequelize, DataTypes) {
    return super.init(
        {
          firstname: DataTypes.STRING,
          lastname: DataTypes.STRING,
          email: DataTypes.STRING,
          telephone: DataTypes.STRING,
          password: DataTypes.STRING,
          salt: DataTypes.STRING,
          role: DataTypes.ENUM('manager','admin','provider'),
          prefix: DataTypes.STRING,
          status: DataTypes.BOOLEAN
        },
        {
          tableName: 'customers',
          sequelize
        }
    );
  }
  static getId(id) {
    return this.findOne({
      where: {id},
      attributes: ["id","role","email"],
      order: [["createdAt", "DESC"]]
    });
  }

  static findFullInfo({id}) {
    return this.findOne({
      where: {id},
      attributes: ["id","role","email","firstname","lastname","telephone"],
      order: [["createdAt", "DESC"]]
    });
  }

  static findAllUser() {
    return this.findAll();
  }

  static createUser(body) {
    return this.create(body);
  }

  static deleteById({user_id}) {
    return this.destroy({
        where: {id:user_id}
    });
  }

  static updateById(body,id) {
    return this.update(body,{
        where: {id}
    });
  }

  static findByLogin({email,password}) {
    return this.findOne({
        where: {
            [Op.and]: [
                {email: email},
                {password: password},
                {status: true}
            ]
        },
      attributes: ["id","role"],
      order: [["createdAt", "DESC"]]
    });
  }



  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

module.exports = {
    CustomerModel
};
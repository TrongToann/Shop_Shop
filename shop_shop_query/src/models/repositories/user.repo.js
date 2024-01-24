const {
  getSelectData,
  getUnSelectData,
  removeUndefineObject,
} = require("../../utils/index");
const { NotFoundError } = require("../../utils/error.handle");
const _User = require("../user.model");
class UserRepository {
  static async findOne({ query, filter = [] }) {
    const result = await _User
      .findOne(query)
      .select(getSelectData(filter))
      .lean();
    if (!result) throw new NotFoundError("Cannot Find Any Result!");
    return result;
  }
  static async findAll({
    query,
    filter,
    page = 1,
    limit = 50,
    sort = "ctime",
  }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: 1 } : sort;
    return await _User
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .select(getSelectData(filter))
      .lean();
  }
  static async findOneWithUnselected({ query, filter = [] }) {
    const result = await _User
      .findOne(query)
      .select(getUnSelectData(filter))
      .lean();
    if (!result) throw new NotFoundError("Cannot Find Any Result!");
    return result;
  }
  static async updateUserById({ query, payload, isNew = true }) {
    return await _User.findByIdAndUpdate(query, payload, {
      new: isNew,
    });
  }
  static async enableDisAble({ query }) {
    const entityCheck = this.findOne({ query });
    let payload = {
      $set: {
        status: entityCheck.status === true ? false : true,
      },
    };
    return this.updateUserById({ query, payload });
  }
}
module.exports = UserRepository;

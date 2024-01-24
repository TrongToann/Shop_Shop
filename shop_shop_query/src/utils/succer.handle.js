const statusCodeBase = {
  OK: 200,
  CREATED: 201,
};
const reasonStatusCodeBase = {
  OK: "Success",
  CREATED: "Created",
};
class SuccessRespone {
  constructor({
    message,
    statusCode = statusCodeBase.OK,
    reasonStatus = reasonStatusCodeBase.OK,
    metaData,
  }) {
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metaData = metaData;
  }
  send(res) {
    return res.status(this.status).json(this);
  }
}
class OK extends SuccessRespone {
  constructor({ message, metaData = [] }) {
    super({ message, metaData });
  }
}
class CREATED extends SuccessRespone {
  constructor({
    message,
    statusCode = statusCodeBase.CREATED,
    reasonStatus = reasonStatusCodeBase.CREATED,
    metaData = [],
  }) {
    super({ message, statusCode, reasonStatus, metaData });
  }
}
module.exports = { OK, CREATED };

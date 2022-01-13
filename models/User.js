class User {
  constructor(id, email, password, verified) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.verified = verified;
  }
}

module.exports = { User };

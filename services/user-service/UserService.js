const Users = require("../../models/users/Users");
const { hasher, compareHashes } = require("../../utilities/hasher/hasher");
const generateToken = require("../../utilities/token-generator/token-generator");
const {
  emailValidator,
  emailNotUnique
} = require("../../utilities/validation/email-validator/email-validator");
const modelNotFoundError = require("../../utilities/validation/model-not-found/model-not-found");
const unauthorizedError = require("../../utilities/validation/unauthorized/unauthorized");
const unverifiedError = require("../../utilities/validation/unverified/unverified");
const invalidTokenError = require("../../utilities/validation/invalid-token/invalid-token");
const jwt = require("../../utilities/jwt/jwt");
const mailer = require("../../utilities/mailer/Mailer");

class UserService {
  fields = [
    "id",
    "firstName",
    "lastName",
    "dob",
    "email",
    "gender",
    "verified",
    "verificationToken",
    "resetToken",
    "joinDate",
    "endDate"
  ];

  //   eagerFileds = {
  //     company: ['id', 'name', 'email'],
  //     cards: ['id', 'number', 'expMonth', 'expYear']
  //   };

  async getAllUsers() {
    return await Users.query().select(...this.fields);
  }

  async getUserById(id) {
    const data = await Users.query()
      .select(...this.fields)
      .findById(id);
    data === undefined ? modelNotFoundError() : null;
    return data;
  }

  async getUserByEmail(email) {
    return await Users.query()
      .select(...this.fields, "password")
      .where("email", "=", email);
  }

  async createUser(firstName, lastName, dob, gender, email, password) {
    emailValidator(email);
    const existingUser = await this.getUserByEmail(email);
    existingUser[0] !== undefined ? emailNotUnique() : null;
    const hashedPassword = await hasher(password);
    const user = await Users.query().insert({
      firstName,
      lastName,
      dob,
      gender,
      email,
      password: hashedPassword
    });

    const mail = await mailer.sendVerificationEmail(
      user.id,
      user.email,
      user.verificationToken
    );

    return {
      userId: user.id,
      mail
    };
  }

  async updateUser(id, firstName, lastName, dob, gender, email) {
    emailValidator(email);
    const existingUser = await this.getUserByEmail(email);
    // existingMember[0] !== undefined ? emailNotUnique() : null;

    const data = await Users.query()
      .findById(id)
      .patch({ firstName, lastName, dob, gender, email });
    data === 0 ? modelNotFoundError() : null;
    return data;
  }

  async login(email, password) {
    const user = await this.getUserByEmail(email);

    user[0] === undefined ? modelNotFoundError() : null;
    user[0].verified === 0 ? unverifiedError() : null;
    // if (!(await compareHashes(password, user[0].password))) {
    //   unauthorizedError();
    // }
    jwt.setPayload({
      id: user[0].id,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      dob: user[0].dob,
      email: user[0].email,
      verified: user[0].verified,
      joinDate: user[0].joinDate,
      endDate: user[0].endDate,
      verificationToken: user[0].verificationToken,
      resetToken: user[0].resetToken
    });

    return {
      token: jwt.signToken(),
      userId: user[0].id,
      userFirstName: user[0].firstName,
      userLastName: user[0].lastName
    };
  }

  async verify(id, verificationToken) {
    const existingUser = await this.getUserById(id);
    if (existingUser.verified === 1) {
      return {
        message: "Already verified."
      };
    }

    existingUser.verificationToken !== verificationToken
      ? invalidTokenError()
      : null;
    return {
      verified: await Users.query()
        .findById(id)
        .patch({ verified: true, verificationToken: null })
    };
  }

  async requestPasswordReset(email) {
    const existingUser = await this.getUserByEmail(email);
    const mail = await mailer.sendResetEmail(
      existingUser[0].id,
      email,
      existingUser[0].resetToken
    );
    return mail;
  }

  async resetPassword(id, resetToken, newPassword) {
    const existingUser = await this.getUserById(id);
    existingUser.resetToken !== resetToken ? invalidTokenError() : null;
    const hashedPassword = await hasher(newPassword);

    return {
      passwordReset: await Users.query()
        .findById(id)
        .patch({ password: hashedPassword, resetToken: generateToken() })
    };
  }

  async changePassword(id, oldPassword, newPassword) {
    const existingUser = await this.getUserById(id);
    if (!(await compareHashes(oldPassword, existingUser.password))) {
      unauthorizedError();
    }
    const hashedPassword = await hasher(newPassword);
    return {
      passwordChanged: await query()
        .findById(id)
        .patch({ password: hashedPassword })
    };
  }
}

module.exports = UserService;

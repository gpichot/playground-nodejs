import { UserModel } from "../mongo.js";

class UserRepository {
  async listUsers() {
    const users = await UserModel.find(
      {},
      {
        username: true,
        role: true,
      }
    );
    return users;
  }

  async createUser(userPayload) {
    return await UserModel.create(userPayload);
  }
}

export default new UserRepository();

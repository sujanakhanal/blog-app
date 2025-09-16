import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.logIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }
  async logOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUSer() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite serive:: getCurrentUser :: error ", error);
    }
    return null;
  }
}

const authService = new Authservice();
export default authService;

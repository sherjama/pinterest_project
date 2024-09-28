import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async CreateAccout(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return await this.Login(email, password);
      }
    } catch (error) {
      console.log("createAccout :", error);
    }
  }

  async Login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
      //   dispatch(email,password)
    } catch (error) {
      console.log("Login :", error);
    }
  }

  async SessionDetail() {
    try {
      return await this.account.getSession("current");
    } catch (error) {
      console.log("SessionDetail :", error);
    }
  }

  // async OAuth2Login(provider, success, fail) {
  //   try {
  //     return this.account.createOAuth2Session(provider, success, fail);
  //   } catch (error) {
  //     console.log("OAuth2Login :", error);
  //   }
  // }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser :", error);
    }
    return null;
  }

  async Logout(session) {
    try {
      return await this.account.deleteSession(session);
    } catch (error) {
      console.log("Logout :", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;

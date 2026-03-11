// src/appwrite/auth.js
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite Error :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createSession({ email, password });
    } catch (error) {
      console.error("Appwrite Error :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite Error :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite Error :: logout :: error", error);
    }
  }

  async sendVerification() {
    try {
      const user = await this.account.get();
      return await this.account.createEmailToken(ID.unique(), user.email);
    } catch (error) {
      console.error("Appwrite Error :: sendVerification :: error", error);
      throw error;
    }
  }

  async confirmVerification(userId, secret) {
    try {
      return await this.account.createSession({ userId, secret });
    } catch (error) {
      console.error("Appwrite Error :: confirmVerification :: error", error);
      throw error;
    }
  }

  // Send password reset OTP to email
  async passwordRecovery({ email }) {
    try {
      return await this.account.createEmailToken(
        ID.unique(),
        email,
        true, // true = security phrase (phase)
      );
    } catch (error) {
      console.error("Appwrite Error :: passwordRecovery :: error", error);
      throw error;
    }
  }

  // Confirm OTP and create session, then update password
  async confirmPasswordRecovery(userId, secret, newPassword) {
    try {
      // First create session using the OTP secret
      await this.account.createSession({ userId, secret });
      // Then update the password
      return await this.account.updatePassword(newPassword);
    } catch (error) {
      console.error(
        "Appwrite Error :: confirmPasswordRecovery :: error",
        error,
      );
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;

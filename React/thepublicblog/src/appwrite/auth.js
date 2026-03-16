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
      }
      return userAccount;
    } catch (error) {
      console.error("Appwrite Error :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // ✅ correct method for email+password login
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite Error :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // 401 = guest user, completely normal — don't log it as an error
      if (error?.code === 401) return null;
      console.error("Appwrite Error :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      // 401 = already logged out, ignore silently
      if (error?.code === 401) return;
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

  async passwordRecovery({ email }) {
    try {
      return await this.account.createEmailToken(ID.unique(), email, true);
    } catch (error) {
      console.error("Appwrite Error :: passwordRecovery :: error", error);
      throw error;
    }
  }

  async confirmPasswordRecovery(userId, secret, newPassword) {
    try {
      await this.account.createSession({ userId, secret });
      return await this.account.updatePassword(newPassword);
    } catch (error) {
      console.error("Appwrite Error :: confirmPasswordRecovery :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
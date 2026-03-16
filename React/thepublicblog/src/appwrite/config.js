import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(   // ← createDocument
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        ID.unique(),
        { title, slug, content, featuredImage, status, userId },
      );
    } catch (error) {
      console.error("Appwrite Error :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(documentId, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(   // ← updateDocument
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        documentId,
        { title, slug, content, featuredImage, status },
      );
    } catch (error) {
      console.error("Appwrite Error :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(          // ← deleteDocument
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        documentId,
      );
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(      // ← getDocument
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        documentId,
      );
    } catch (error) {
      console.error("Appwrite Error :: getPost :: error", error);
      return null;
    }
  }

  async getPosts({ limit = 10, offset = 0, status = "active" } = {}) {
    try {
      const queries = [Query.orderDesc("$createdAt")];
      if (status) queries.push(Query.equal("status", status));

      return await this.databases.listDocuments(    // ← listDocuments
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        queries,
      );
    } catch (error) {
      console.error("Appwrite Error :: getPosts :: error", error);
      return null;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.error("Appwrite Error :: uploadFile :: error", error);
      return null;
    }
  }

  getFilePreview(fileId) {
    // This is synchronous — returns a URL string directly, no async needed
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId,
    );
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deleteFile :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
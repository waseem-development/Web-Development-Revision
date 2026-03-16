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
      return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        documentId: ID.unique(),
        data: { title, slug, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.error("Appwrite Error :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(documentId, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        documentId,
        data: { title, slug, content, featuredImage, status },
      });
    } catch (error) {
      console.error("Appwrite Error :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        documentId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        documentId,
      });
    } catch (error) {
      console.error("Appwrite Error :: getPost :: error", error);
      return null;
    }
  }

  async getPosts({ queries: extraQueries = [], status = "active" } = {}) {
    try {
      const queries = [Query.orderDesc("$createdAt"), ...extraQueries];
      if (status) queries.push(Query.equal("status", status));
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        queries,
      });
    } catch (error) {
      console.error("Appwrite Error :: getPosts :: error", error);
      return null;
    }
  }

  async getPostsByUser(userId) {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwritePostsTableId,
        queries: [
          Query.equal("userId", userId),
          Query.orderDesc("$createdAt"),
        ],
      });
    } catch (error) {
      console.error("Appwrite Error :: getPostsByUser :: error", error);
      return null;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Appwrite Error :: uploadFile :: error", error);
      return null;
    }
  }

  getFilePreview(fileId) {
    return this.bucket
      .getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId,
      })
      .toString();
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deleteFile :: error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
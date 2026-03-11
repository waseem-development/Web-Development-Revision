import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Tables } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  tables;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.tables = new Tables(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tables.createRow(
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        ID.unique(),
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.error("Appwrite Error :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(
    documentId,
    { title, slug, content, featuredImage, status },
  ) {
    try {
      return await this.tables.updateRow(
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        documentId,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.error("Appwrite Error :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(documentId) {
    try {
      await this.tables.deleteRow(
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
      return await this.tables.getRow(
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        documentId,
      );
    } catch (error) {
      console.error("Appwrite Error :: getPost :: error", error);
      return null;
    }
  }

  // ========== ENHANCED GET POSTS WITH SEARCH & PAGINATION ==========

  /**
   * Get posts with real-world features:
   * - Search in title AND content (partial word matching)
   * - Pagination (limit/offset)
   * - Filter by author
   * - Filter by date range
   * - Sort by various fields
   */
  async getPosts({
    // Pagination
    limit = 10,
    offset = 0,
    page = 1, // Alternative: calculate offset from page

    // Search
    searchQuery = null, // Search in title and content

    // Filters
    status = "active", // null for all statuses
    authorId = null,
    category = null,

    // Date range
    fromDate = null,
    toDate = null,

    // Sorting
    sortBy = "$createdAt", // title, $createdAt, etc.
    sortOrder = "DESC", // ASC or DESC

    // Additional custom queries
    customQueries = [],
  } = {}) {
    try {
      // Calculate offset from page if provided
      const calculatedOffset = page ? (page - 1) * limit : offset;

      // Build queries array
      const queries = [...customQueries];

      // 1. Status filter (if specified)
      if (status) {
        queries.push(Query.equal("status", status));
      }

      // 2. Author filter
      if (authorId) {
        queries.push(Query.equal("userId", authorId));
      }

      // 3. SEARCH - This is the important part!
      // Search in both title AND content for partial matches
      if (searchQuery && searchQuery.trim() !== "") {
        const searchTerm = searchQuery.trim();

        // Appwrite v23 supports search with multiple fields
        // You can search in specific fields
        queries.push(Query.search("title", searchTerm));

        // For content search, you might need a separate query
        // or use a combined approach
        // Note: Some versions support OR queries
        queries.push(Query.search("content", searchTerm));

        // If your Appwrite version supports OR conditions:
        // queries.push(Query.or([
        //   Query.search("title", searchTerm),
        //   Query.search("content", searchTerm)
        // ]));
      }

      // 4. Date range filters
      if (fromDate) {
        queries.push(Query.greaterThan("$createdAt", fromDate));
      }
      if (toDate) {
        queries.push(Query.lessThan("$createdAt", toDate));
      }

      // 5. Sorting
      if (sortOrder === "DESC") {
        queries.push(Query.orderDesc(sortBy));
      } else {
        queries.push(Query.orderAsc(sortBy));
      }

      // Execute the query
      const response = await this.tables.listRows(
        conf.appwriteDatabaseId,
        conf.appwritePostsTableId,
        queries,
        limit,
        calculatedOffset,
      );

      // Return enriched response with pagination info
      return {
        posts: response.rows,
        total: response.total,
        limit: limit,
        offset: calculatedOffset,
        page: page || Math.floor(calculatedOffset / limit) + 1,
        totalPages: Math.ceil(response.total / limit),
        hasNextPage: calculatedOffset + limit < response.total,
        hasPrevPage: calculatedOffset > 0,
      };
    } catch (error) {
      console.error("Appwrite Error :: getPosts :: error", error);
      return null;
    }
  }

  // ========== SPECIALIZED QUERY METHODS ==========

  /**
   * Search posts by keyword (in title and content)
   */
  async searchPosts(keyword, limit = 10, page = 1) {
    return await this.getPosts({
      searchQuery: keyword,
      limit: limit,
      page: page,
      sortBy: "$createdAt",
      sortOrder: "DESC",
    });
  }

  /**
   * Get posts by author with pagination
   */
  async getPostsByAuthor(authorId, limit = 10, page = 1) {
    return await this.getPosts({
      authorId: authorId,
      status: "active",
      limit: limit,
      page: page,
      sortBy: "$createdAt",
      sortOrder: "DESC",
    });
  }

  /**
   * Get recent posts (last 7 days)
   */
  async getRecentPosts(limit = 10) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return await this.getPosts({
      fromDate: sevenDaysAgo.toISOString(),
      limit: limit,
      sortBy: "$createdAt",
      sortOrder: "DESC",
    });
  }

  // ========== FILE METHODS (unchanged) ==========

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.error("Appwrite Error :: uploadFile :: error", error);
      return null;
    }
  }

  async getFilePreview(fileId) {
    try {
      return await this.bucket.getFilePreview({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.error("Appwrite Error :: getFilePreview :: error", error);
      return null;
    }
  }

  async getFileView(fileId) {
    try {
      return await this.bucket.getFileView({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.error("Appwrite Error :: getFileView :: error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error("Appwrite Error :: deleteFile :: error", error);
      return false;
    }
  }

  async listFiles({
    limit = 25,
    offset = 0,
    search = "",
    queries = [],
    sortBy = "$createdAt",
    sortOrder = "DESC",
  } = {}) {
    try {
      // Add sorting
      if (sortOrder === "DESC") {
        queries.push(Query.orderDesc(sortBy));
      } else {
        queries.push(Query.orderAsc(sortBy));
      }

      return await this.bucket.listFiles({
        bucketId: conf.appwriteBucketId,
        queries: queries,
        search: search,
        limit: limit,
        offset: offset,
      });
    } catch (error) {
      console.error("Appwrite Error :: listFiles :: error", error);
      return null;
    }
  }
}

const service = new Service();

export default service;

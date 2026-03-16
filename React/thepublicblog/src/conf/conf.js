const conf = {
    appwriteEndpoint:     String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteDatabaseId:   String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteProjectId:    String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteBucketId:     String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwritePostsTableId: String(import.meta.env.VITE_APPWRITE_POSTS_TABLE_ID),
    tinymceApiKey:        String(import.meta.env.VITE_TINYMCE_API_KEY),  // ← ADD THIS
}

export default conf
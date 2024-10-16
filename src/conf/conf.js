const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  serviceId: String(import.meta.env.VITE_SERVICE_ID),
  templateId: String(import.meta.env.VITE_TEMPLATE_ID),
  userId: String(import.meta.env.VITE_USER_ID),
};

export default conf;

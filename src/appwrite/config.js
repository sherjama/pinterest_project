import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async CreatePost({
    title,
    description,
    board,
    tag,
    pinID,
    userId,
    image,
    status,
    auther,
    autherDp,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          description,
          board,
          tag,
          pinID,
          userId,
          image,
          status,
          auther,
          autherDp,
        }
      );
    } catch (error) {
      console.log("CreatePost :", error);
      throw error;
    }
  }

  async UpdatePost(postID, { image, title, board, tag, description }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postID,
        {
          image,
          title,
          board,
          tag,
          description,
        }
      );
    } catch (error) {
      console.log("UpdatePost", error);
      throw error;
    }
  }

  async DeletePost(postID) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postID
      );
      return true;
    } catch (error) {
      console.log("DeletePost :", error);
      throw error;
    }
  }

  async GetPost(postID) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postID
      );
    } catch (error) {
      console.log("GetPost :", error);
      throw error;
    }
  }

  async ListPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("ListPosts :", error);
      throw error;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;

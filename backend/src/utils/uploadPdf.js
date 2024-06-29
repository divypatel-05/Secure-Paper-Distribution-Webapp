import admin from "firebase-admin";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { ErrorHandler } from "./errorHandler.js"; // Assuming errorHandler.js defines custom error handling

dotenv.config({
    path: "./.env",
});

const serviceAccountPath = path.resolve("./src/utils/firebase.json");

let initialized = false; // Flag to track if Firebase is initialized

// Function to read and parse JSON file
const getServiceAccount = async () => {
    try {
        const serviceAccountJson = await fs.promises.readFile(
            serviceAccountPath,
            "utf8"
        );
        return JSON.parse(serviceAccountJson);
    } catch (error) {
        console.error("Error reading service account file:", error);
        throw new ErrorHandler(
            `Failed to read service account file: ${error.message}`,
            500
        );
    }
};

// Initialize Firebase
const initializeFirebase = async () => {
    if (!initialized) {
        const serviceAccount = await getServiceAccount();

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });

        initialized = true;
    }

    return admin.storage().bucket();
};

// Exported function to upload PDF to Firebase
export const uploadImage = async (localFilePath) => {
    try {
        const bucket = await initializeFirebase();
        const fileName = path.basename(localFilePath);
        const fileUploadPath = `${fileName}`;

        // Create a reference to the file you want to upload
        const fileRef = bucket.file(fileUploadPath);

        // Read the entire file content into a buffer for upload
        const fileData = await fs.promises.readFile(localFilePath);

        // Upload the file using the buffer (more efficient for larger files)
        await fileRef.save(fileData, {
            metadata: {
                contentType: "application/pdf", // Set the content type appropriately
            },
        });

        // Generate a download URL (media link) for the uploaded file
        const [url] = await fileRef.getSignedUrl({
            action: "read",
            expires: "03-09-2491", // Adjust the expiration date as needed
        });

        // Optionally delete the local file after successful upload
        await fs.promises.unlink(localFilePath); // Use fs.promises for modern promise-based approach

        return url;
    } catch (error) {
        // Handle errors and cleanup
        console.error("Failed to upload PDF to Firebase:", error);
        throw new ErrorHandler(`Failed to upload PDF: ${error.message}`, 500);
    }
};

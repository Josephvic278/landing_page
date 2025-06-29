import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  name: string;
  path: string;
  size: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateAssignmentFile = (file: File): ValidationResult => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB'
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Please upload TXT, PDF, DOC, or DOCX files.'
    };
  }

  return { isValid: true };
};

export const uploadAssignmentFile = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a unique file path
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const filePath = `assignments/${userId}/${fileName}`;
      
      // Create storage reference
      const storageRef = ref(storage, filePath);
      
      // Start upload
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress callback
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          // Error callback
          console.error('Upload error:', error);
          reject(new Error(`Upload failed: ${error.message}`));
        },
        async () => {
          // Success callback
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              url: downloadURL,
              name: file.name,
              path: filePath,
              size: file.size
            });
          } catch (error) {
            reject(new Error(`Failed to get download URL: ${error}`));
          }
        }
      );
    } catch (error) {
      reject(new Error(`Upload initialization failed: ${error}`));
    }
  });
};

export const deleteAssignmentFile = async (filePath: string): Promise<void> => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error(`Failed to delete file: ${error}`);
  }
};
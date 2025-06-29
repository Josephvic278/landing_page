import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  uploadAssignmentFile, 
  validateAssignmentFile, 
  deleteAssignmentFile,
  UploadResult,
  ValidationResult 
} from '../lib/fileUploadUtils';

// Component prop types
interface FirebaseFileUploaderProps {
  userId: string;
  onFileUploaded: (fileUrl: string, fileName: string, filePath: string) => void;
  onFileRemoved: () => void;
  buttonText?: string;
  accept?: string;
  disabled?: boolean;
  maxSizeMB?: number;
}

// Internal file state type
interface UploadedFileState {
  name: string;
  url: string;
  path: string;
  size: number;
}

const FirebaseFileUploader: React.FC<FirebaseFileUploaderProps> = ({
  userId,
  onFileUploaded,
  onFileRemoved,
  buttonText = "Upload File",
  accept = ".txt,.pdf,.doc,.docx",
  disabled = false,
  maxSizeMB = 10
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFileState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation: ValidationResult = validateAssignmentFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError('');
    handleUpload(file);
  };

  const handleUpload = async (file: File): Promise<void> => {
    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const result: UploadResult = await uploadAssignmentFile(
        file,
        userId,
        (progressPercent: number) => {
          setProgress(progressPercent);
        }
      );

      const fileInfo: UploadedFileState = {
        name: result.name,
        url: result.url,
        path: result.path,
        size: result.size
      };

      setUploadedFile(fileInfo);
      onFileUploaded(result.url, result.name, result.path);

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError('Upload failed: ' + errorMessage);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = async (): Promise<void> => {
    if (!uploadedFile) return;

    try {
      if (uploadedFile.path) {
        await deleteAssignmentFile(uploadedFile.path);
      }

      setUploadedFile(null);
      setError('');
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onFileRemoved();

    } catch (error) {
      console.error('Error removing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError('Failed to remove file: ' + errorMessage);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Upload Button */}
      {!uploadedFile && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
            id="firebase-file-upload-input"
          />
          
          <label
            htmlFor="firebase-file-upload-input"
            className={`
              inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer
              transition-colors duration-200 text-sm font-medium
              ${disabled || uploading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }
            `}
          >
            <Upload size={16} className="mr-2" />
            {uploading ? 'Uploading...' : buttonText}
          </label>

          <p className="text-xs text-gray-500">
            Supported: {accept.replace(/\./g, '').toUpperCase()} files (max {maxSizeMB}MB)
          </p>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Uploading...</span>
            <span className="text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Uploaded File Display */}
      {uploadedFile && !uploading && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-green-600">
                  {formatFileSize(uploadedFile.size)} • Uploaded successfully
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              disabled={disabled}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mt-3">
          <AlertCircle size={16} />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FirebaseFileUploader;
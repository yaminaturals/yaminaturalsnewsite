import { UploadedDocumentMetadata } from '../types';

export interface FileValidationOptions {
  maxSizeInBytes?: number; // Default 10MB
  allowedMimeTypes?: string[];
  allowedExtensions?: string[];
}

export interface FileUploadResult {
  success: boolean;
  metadata?: UploadedDocumentMetadata;
  error?: string;
}

export interface IFileStorageService {
  validateFile(file: File, options?: FileValidationOptions): { valid: boolean; error?: string };
  uploadDocument(file: File): Promise<FileUploadResult>;
  deleteDocument(documentId: string): Promise<boolean>;
}

const DEFAULT_VALIDATION: FileValidationOptions = {
  maxSizeInBytes: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain'
  ],
  allowedExtensions: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.webp', '.txt']
};

/**
 * FileStorageService
 * ARCHITECTURE NOTICE:
 * In this prototype phase, files are parsed locally into memory ObjectURLs and metadata
 * structures for local demonstration.
 * In production, this service class will be swapped with direct S3 / Google Cloud Storage /
 * Supabase presigned URL uploads without modifying the consumer UI components.
 */
class FileStorageService implements IFileStorageService {
  validateFile(file: File, options: FileValidationOptions = DEFAULT_VALIDATION): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file provided.' };
    }

    // 1. File Name Safety Check
    if (!file.name || file.name.trim().length === 0) {
      return { valid: false, error: 'Invalid file name.' };
    }

    // Check dangerous file extensions
    const forbiddenExtensions = ['.exe', '.bat', '.cmd', '.sh', '.js', '.vbs', '.scr'];
    const lowerName = file.name.toLowerCase();
    if (forbiddenExtensions.some(ext => lowerName.endsWith(ext))) {
      return { valid: false, error: 'Executable files are prohibited for security reasons.' };
    }

    // 2. File Size Check
    const maxSize = options.maxSizeInBytes || DEFAULT_VALIDATION.maxSizeInBytes!;
    if (file.size > maxSize) {
      const maxMb = (maxSize / (1024 * 1024)).toFixed(0);
      return { valid: false, error: `File size exceeds the allowable limit of ${maxMb}MB.` };
    }

    if (file.size === 0) {
      return { valid: false, error: 'The selected file is empty (0 bytes).' };
    }

    // 3. File Type Check
    const allowedTypes = options.allowedMimeTypes || DEFAULT_VALIDATION.allowedMimeTypes!;
    const isMimeAllowed = allowedTypes.includes(file.type);
    const hasAllowedExtension = (options.allowedExtensions || DEFAULT_VALIDATION.allowedExtensions!).some(
      ext => lowerName.endsWith(ext)
    );

    if (!isMimeAllowed && !hasAllowedExtension) {
      return { 
        valid: false, 
        error: 'Unsupported file format. Please attach a PDF, DOC, DOCX, or high-res image (JPG/PNG).' 
      };
    }

    return { valid: true };
  }

  async uploadDocument(file: File): Promise<FileUploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Prototype Mode: Generate ephemeral preview URL and capture metadata
      const previewUrl = URL.createObjectURL(file);
      const metadata: UploadedDocumentMetadata = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        sizeBytes: file.size,
        mimeType: file.type || 'application/octet-stream',
        previewUrl,
        uploadedAt: new Date().toISOString()
      };

      return {
        success: true,
        metadata
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'An error occurred while preparing file upload.'
      };
    }
  }

  async deleteDocument(documentId: string): Promise<boolean> {
    // In production, this issues a DELETE request to cloud storage
    console.debug(`[FileStorageService] Prototype: Deleting document ref ${documentId}`);
    return true;
  }
}

export const fileStorageService = new FileStorageService();

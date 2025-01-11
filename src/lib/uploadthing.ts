/* eslint-disable no-unused-vars */
import * as React from "react";
import { toast } from "sonner";
import { z } from "zod";

// 기본 파일 타입 정의
export interface UploadedFile {
  key: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface UseUploadFileProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

interface UploadFilesOptions {
  files: File[];
}

async function uploadFiles(
  _endpoint: string,
  options: UploadFilesOptions,
): Promise<UploadedFile[]> {
  const file = options.files[0];
  return [
    {
      key: `mock-key-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    },
  ];
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<
    UploadedFile | undefined
  >();
  const [uploadingFile, setUploadingFile] = React.useState<File | undefined>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThing(file: File): Promise<UploadedFile | undefined> {
    setIsUploading(true);
    setUploadingFile(file);

    try {
      // 모의 업로드 진행
      let uploadProgress = 0;
      const progressInterval = setInterval(() => {
        uploadProgress += 10;
        setProgress(Math.min(uploadProgress, 100));
        if (uploadProgress >= 100) clearInterval(progressInterval);
      }, 200);

      const res = await uploadFiles("imageUpload", {
        files: [file],
      });

      clearInterval(progressInterval);
      setProgress(100);

      const uploadedFile = res[0];
      setUploadedFile(uploadedFile);
      onUploadComplete?.(uploadedFile);

      return uploadedFile;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      onUploadError?.(error);
      return undefined;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadFile: uploadThing,
    uploadedFile,
    uploadingFile,
  };
}

export function getErrorMessage(err: unknown): string {
  const unknownError = "업로드 중 오류가 발생했습니다. 다시 시도해주세요.";

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return errors.join("\n");
  } else if (err instanceof Error) {
    return err.message;
  }
  return unknownError;
}

export function showErrorToast(err: unknown): void {
  const errorMessage = getErrorMessage(err);
  toast.error(errorMessage);
}

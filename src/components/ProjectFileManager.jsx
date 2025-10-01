import React, { useState, useEffect } from "react";
import { Upload, File, X, Download, Eye, Image, FileText, Loader2 } from "lucide-react";

const ProjectFileManager = ({ projectId = "project_123" }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProjectFiles();
  }, [projectId]);

  const fetchProjectFiles = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}/files`);
      const data = await response.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to load files");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (fileList) => {
    setError(null);
    for (const file of fileList) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}/files`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFiles(prev => [...prev, data.file]);
      }
    } catch (err) {
      setError("Upload failed");
    }
    setUploading(false);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Files</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">
            {uploading ? "Uploading..." : "Drop files here or click to upload"}
          </p>
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div key={file.id} className="border rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-8 w-8 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium truncate">
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`http://localhost:3001/${file.path}`}
                    download={file.originalName}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFileManager;

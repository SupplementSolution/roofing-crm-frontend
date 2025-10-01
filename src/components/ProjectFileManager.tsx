import React, { useState, useEffect } from "react";
import { Upload, File, Download, Eye } from "lucide-react";

const ProjectFileManager = ({ projectId }: { projectId: string }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${projectId}/files`)
      .then(res => res.json())
      .then(data => setFiles(data.files || []))
      .catch(err => console.error(err));
  }, [projectId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setUploading(true);
    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${projectId}/files`, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (data.success) setFiles(prev => [...prev, data.file]);
      } catch (err) {
        console.error(err);
      }
    }
    setUploading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Files</h3>
      <input
        type="file"
        multiple
        onChange={handleUpload}
        disabled={uploading}
        className="mb-4"
      />
      {uploading && <p>Uploading...</p>}
      <div className="space-y-2">
        {files.map((file: any) => (
          <div key={file.id} className="flex justify-between p-2 border rounded">
            <span>{file.originalName}</span>
            <a href={`http://localhost:5000/${file.path}`} download>
              <Download className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectFileManager;

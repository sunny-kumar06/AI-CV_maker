import React, { useState, useRef } from 'react';
import Icon from '../Icon';

const FileUpload = ({
  onFileSelect,
  selectedFile,
  accept = ".pdf",
  maxSizeMB = 3,
  label = "Upload your resume (PDF)"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

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
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const validateAndSelect = (file) => {
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds maximum allowed size of ${maxSizeMB}MB.`);
      return;
    }
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className="c-form-group">
      {label && <label className="c-form-label">{label}</label>}
      <div
        className={`c-fileupload-dropzone ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        {selectedFile ? (
          <div className="fileupload-selected-preview">
            <div className="file-info-icon">
              <Icon name="file" />
            </div>
            <div className="file-info-details">
              <span className="file-name">{selectedFile.name}</span>
              <span className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
            </div>
            <button type="button" className="btn-remove-file" onClick={handleRemove} title="Remove File">
              <Icon name="close" />
            </button>
          </div>
        ) : (
          <div className="fileupload-empty-prompt">
            <div className="upload-cloud-icon">
              <Icon name="upload" />
            </div>
            <div className="upload-text-main">
              <span>Click to browse</span> or drag and drop your resume
            </div>
            <div className="upload-text-sub">PDF format only • Maximum size {maxSizeMB}MB</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

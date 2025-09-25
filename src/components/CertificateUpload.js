// CertificateUpload.js
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";

function CertificateUpload({ userId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    setUploading(true);

    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `certificates/${userId}/${file.name}`);
      await uploadBytes(storageRef, file);

      // Get file URL
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);

      // Update user's Firestore profile
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        certificates: [...(userRef.certificates || []), downloadURL],
      });

      alert("Certificate uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Certificate"}
      </button>
      {url && (
        <p>
          Uploaded File: <a href={url} target="_blank">View</a>
        </p>
      )}
    </div>
  );
}

export default CertificateUpload;

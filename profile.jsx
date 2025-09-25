import React, { useState } from "react";

function Profile() {
  const [certificate, setCertificate] = useState(null);

  const handleFileChange = (e) => {
    setCertificate(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!certificate) {
      alert("Please select a certificate to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("certificate", certificate);

    try {
      const res = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Certificate uploaded successfully!");
      } else {
        alert("Failed to upload certificate");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading certificate");
    }
  };

  return (
    <div className="profile">
      <h2>Upload Your Certificates</h2>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Profile;

import React, { useRef, useState } from "react";

export default function BulkUpload() {
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState("2");
  const [loading, setLoading] = useState(false);

  const handleBulkUpload = async (event) => {
    event.preventDefault();
    const file = fileInputRef.current?.files[0];

    if (!file) {
      alert("Please select a JSON file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const endpoint =
          category === "1" ? "/api/team/bulk-team-create" : "/api/player/bulk-add-players";

        setLoading(true);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {

          alert("Bulk upload successful!");
          fileInputRef.current.value = null;
        } else {
          const errorData = await response.json();
          alert(`Upload failed: ${errorData.message || "Unknown error"}`);
        }
      } catch (err) {
        alert("Invalid JSON file. Please check your content.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleBulkUpload}
        className=" bg-white space-y-4"
      >
        <h1 className="text-2xl font-bold">Bulk Upload</h1>

        <div>
          <label htmlFor="category" className="block text-xs mb-1">
            Select Team/Player
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="1">Bulk Team Upload</option>
            <option value="2">Bulk Player Upload</option>
          </select>
        </div>

        <div>
          <label htmlFor="file" className="block text-xs mb-1">
            Select JSON File
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded-md ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

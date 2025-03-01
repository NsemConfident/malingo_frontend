import { useState, useEffect } from "react";

const PostActivityForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    numberOfMembers: "",
    location: "",
    time: "",
    ActivityPhoto: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");
  const [serverValidationErrors, setServerValidationErrors] = useState({});

  // Get token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Authentication token not found. Please login again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for this field when user makes changes
    if (serverValidationErrors[name]) {
      setServerValidationErrors({
        ...serverValidationErrors,
        [name]: null,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is png or jpeg
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        setError("Please upload only PNG or JPEG files");
        return;
      }

      setFormData({
        ...formData,
        ActivityPhoto: file,
      });

      // Create a preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);

      // Clear validation error for this field
      if (serverValidationErrors.ActivityPhoto) {
        setServerValidationErrors({
          ...serverValidationErrors,
          ActivityPhoto: null,
        });
      }
    }
  };

  // Format the datetime to match the server's expected format
  const formatDatetime = (dateTimeString) => {
    if (!dateTimeString) return "";

    // Convert from datetime-local format to Y-m-d H:i:s
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = "00"; // Seconds are not included in datetime-local input

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setServerValidationErrors({});

    // Check if token exists
    if (!token) {
      setError("Authentication token not found. Please login again.");
      setLoading(false);
      return;
    }

    // Form validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.link ||
      !formData.numberOfMembers ||
      !formData.location ||
      !formData.time
    ) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object for multipart/form-data (for file upload)
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("link", formData.link);
      data.append("numberOfMembers", formData.numberOfMembers);
      data.append("location", formData.location);
      data.append("time", formatDatetime(formData.time));

      if (formData.ActivityPhoto) {
        data.append("ActivityPhoto", formData.ActivityPhoto);
      }

      console.log("Sending data to server:", {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        numberOfMembers: formData.numberOfMembers,
        location: formData.location,
        time: formatDatetime(formData.time),
        // Can't log file object meaningfully
      });

      const response = await fetch(
        "https://rrn24.techchantier.site/malingo/public/api/activity",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            // Note: Don't set Content-Type with FormData, browser will set it with boundary
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from the server
        if (response.status === 422 && result.errors) {
          setServerValidationErrors(result.errors);
          throw new Error("Please fix the validation errors");
        }
        throw new Error(result.message || "Failed to create activity");
      }

      setSuccess("Activity created successfully!");
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        link: "",
        numberOfMembers: "",
        location: "",
        time: "",
        ActivityPhoto: null,
      });
      setPreviewUrl(null);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Error creating activity:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to display field error
  const getFieldError = (fieldName) => {
    if (serverValidationErrors[fieldName]) {
      return Array.isArray(serverValidationErrors[fieldName])
        ? serverValidationErrors[fieldName][0]
        : serverValidationErrors[fieldName];
    }
    return null;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create New Activity
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("title") ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Morning Run"
          />
          {getFieldError("title") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("title")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("description")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="A group run in the park."
            rows="3"
          ></textarea>
          {getFieldError("description") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("description")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link *
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("link") ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="https://whatsapp.com/group"
          />
          {getFieldError("link") && (
            <p className="mt-1 text-sm text-red-600">{getFieldError("link")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Members *
          </label>
          <input
            type="number"
            name="numberOfMembers"
            value={formData.numberOfMembers}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("numberOfMembers")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="4"
            min="1"
          />
          {getFieldError("numberOfMembers") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("numberOfMembers")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("location") ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Central Park"
          />
          {getFieldError("location") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("location")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date and Time *
          </label>
          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("time") ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD HH:MM</p>
          {getFieldError("time") && (
            <p className="mt-1 text-sm text-red-600">{getFieldError("time")}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activity Photo
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 border ${
              getFieldError("ActivityPhoto")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PNG, JPEG
          </p>
          {getFieldError("ActivityPhoto") && (
            <p className="mt-1 text-sm text-red-600">
              {getFieldError("ActivityPhoto")}
            </p>
          )}

          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
              <img
                src={previewUrl}
                alt="Activity preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading || !token ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
        >
          {loading ? "Creating..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
};

export default PostActivityForm;

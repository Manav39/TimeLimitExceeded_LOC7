import React, { useState } from "react";
import { Star } from "lucide-react";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
    setError(""); // Reset error on selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please provide a rating before submitting.");
      return;
    }

    const feedbackData = {
      rating,
      description,
      timestamp: new Date(),
    };

    try {
      // Replace with API or database storage logic
      console.log("Submitting feedback:", feedbackData);

      setSubmitted(true);
      setError("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-20">
        <h2 className="text-3xl font-semibold text-red-600 mb-6 text-center">
          🚑 Ride Feedback
        </h2>
        {submitted ? (
          <p className="text-green-600 font-medium text-lg text-center">
            ✅ Thank you for your feedback!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-gray-700 font-medium text-center text-lg">
                Rate Your Ride:
              </label>
              <div className="flex justify-center gap-3 mt-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-12 h-12 cursor-pointer transition ${
                      value <= rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(value)}
                    fill={value <= rating ? "currentColor" : "none"} // Fully fills the selected stars
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
              )}
            </div>

            {/* Description (Optional) */}
            <div>
              <label className="block text-gray-700 font-medium text-lg">
                Comments (Optional):
              </label>
              <textarea
                className="w-full p-4 border rounded-lg mt-2 text-lg"
                rows="4"
                placeholder="Share your experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white p-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;

"use client";
import { useState, useEffect } from "react";

interface ReviewFormProps {
    movieListId: string | null;
}

export default function ReviewForm({ movieListId }: ReviewFormProps) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number>(0);

    //når review-teksten endres:
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    //når review-stjernen endres:
    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    //håndtering av review submit
    const handleSubmit = async () => {
        try {
            if (!reviewText || rating === 0) {
                alert('You need to provide both rating and review.')
                return;
            }
            const response = await fetch("http://localhost:8000/api/reviews/moviereviews/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    review_text: reviewText,
                    rating: rating,
                    movie_list: movieListId,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to submit review");
            }
            console.log("Review submitted successfully");

            //oppdaterer feltene til å bli tomme etter at man har submittet:
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className="border p-4 rounded-md">
            <h2 className="text-1g font-semibold mb-2">Write a Review</h2>
            <textarea
                value={reviewText}
                onChange={handleTextChange}
                placeholder="Write your review..."
                className="w-full h-24 border p-2 rounded-md mb-2"
                style={{ color: "black" }}
            />
            <div className="flex items-center mb-2">
                <span className="mr-2">Rating</span>
                {[1, 2, 3, 4, 5].map((value) => (
                    <button
                        key={value}
                        onClick={() => handleRatingChange(value)}
                        className={`text-2xl ${value <= rating ? 'text-yellow-500' : 'text-gray-400'} focus:outline-none`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={value <= rating ? "yellow" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </button>
                ))}
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Review</button>
        </div>
    );

}
import { useState } from "react";
import axios from "axios";

const CommentForm = ({
  albumId,
  onCommentPosted,
}: {
  albumId: string;
  onCommentPosted: (newComment: any) => void;
}) => {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/comments", { albumId, content: comment });
      setComment("");
      alert("Comment posted successfully!");
      onCommentPosted(response.data);
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form mt-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        rows={3}
        className="form-control"
        required
      />
      <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;

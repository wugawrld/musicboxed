import { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

const AlbumComments = ({ albumId }: { albumId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${albumId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [albumId]);

  return (
    <div className="album-comments">
      <h3>Comment History</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="comments-list mt-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment.content}</p>
                <span className="timestamp">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}

      <CommentForm albumId={albumId} onCommentPosted={(newComment) => setComments((prev) => [...prev, newComment])} />
    </div>
  );
};

export default AlbumComments;

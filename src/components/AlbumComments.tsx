import { useState, useEffect } from "react";
import axios from "axios";

const AlbumComments = ({ albumId }: { albumId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(`/api/comments/${albumId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [albumId, accessToken]);

  const handleCommentSubmit = async () => {
    if (!newComment || !accessToken) return;

    try {
      const commentData = {
        albumId,
        content: newComment,
        timestamp: new Date().toISOString(),
      };

      await axios.post(`/api/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setComments((prev) => [...prev, commentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="album-comments">
      <h3>Comments</h3>
      <div className="comments-list mt-3">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.content}</p>
            <span className="timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Leave a comment..."
      />
      <button onClick={handleCommentSubmit}>Post Comment</button>
    </div>
  );
};

export default AlbumComments;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import appwriteService from "../appwrite/config";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.$id) {
      appwriteService.getPostsByUser(userData.$id).then((result) => {
        if (result) setPosts(result.documents);
        setLoading(false);
      });
    }
  }, [userData]);

  const handleDelete = async (post) => {
    if (!confirm("Delete this post?")) return;
    await appwriteService.deletePost(post.$id);
    if (post.featuredImage) {
      await appwriteService.deleteFile(post.featuredImage);
    }
    setPosts((prev) => prev.filter((p) => p.$id !== post.$id));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-semibold mb-2">My Posts</h1>
        <p className="text-muted text-sm">{posts.length} posts written</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-lg mb-4">You haven't written anything yet.</p>
          <button
            onClick={() => navigate("/add-post")}
            className="px-6 py-3 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Write your first post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.$id}
              className="group bg-surface border border-default rounded-2xl overflow-hidden"
            >
              {post.featuredImage && (
                <div
                  className="aspect-video overflow-hidden bg-surface-raised cursor-pointer"
                  onClick={() => navigate(`/post/${post.$id}`)}
                >
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2
                  className="font-display text-xl font-semibold text-foreground leading-snug mb-2 cursor-pointer hover:text-amber transition-colors line-clamp-2"
                  onClick={() => navigate(`/post/${post.$id}`)}
                >
                  {post.title}
                </h2>
                <div className="flex items-center justify-between pt-4 border-t border-subtle mt-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.status === "active"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-surface-raised text-ghost"
                    }`}
                  >
                    {post.status === "active" ? "Published" : "Draft"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-post/${post.$id}`)}
                      className="px-3 py-1 text-xs border border-default rounded-lg text-foreground hover:bg-surface-raised transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="px-3 py-1 text-xs border border-destructive/40 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import appwriteService from "../appwrite/config";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result) setPosts(result.documents);
      setLoading(false);
    });
  }, []);

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
        <h1 className="font-display text-4xl font-semibold mb-2">All Posts</h1>
        <p className="text-muted text-sm">{posts.length} articles published</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-lg mb-4">No posts yet.</p>
          <button
            onClick={() => navigate("/add-post")}
            className="px-6 py-3 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Write the first post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.$id}
              onClick={() => navigate(`/post/${post.$id}`)}
              className="group bg-surface border border-default rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              {post.featuredImage && (
                <div className="aspect-video overflow-hidden bg-surface-raised">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-widest text-amber mb-3 block">
                  Article
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground leading-snug mb-3 group-hover:text-amber transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <div className="flex items-center justify-between pt-4 border-t border-subtle">
                  <span className="text-xs text-ghost">
                    {new Date(post.$createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs font-medium text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                    Read →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
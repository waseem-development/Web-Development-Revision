import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [postCount, setPostCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.$id) {
      appwriteService.getPostsByUser(userData.$id).then((result) => {
        if (result) setPostCount(result.total);
      });
    }
  }, [userData]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-semibold mb-8">Profile</h1>
      <div className="bg-surface border border-default rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-glow border border-default flex items-center justify-center">
            <span className="font-display text-2xl text-amber">
              {userData?.name?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {userData?.name || "Anonymous"}
            </h2>
            <p className="text-sm text-muted">{userData?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-default">
          <div className="bg-surface-raised rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-semibold text-amber">
              {postCount}
            </p>
            <p className="text-xs text-ghost mt-1 uppercase tracking-widest">
              Posts Written
            </p>
          </div>
          <div className="bg-surface-raised rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-semibold text-amber">
              {userData?.emailVerification ? "✓" : "✗"}
            </p>
            <p className="text-xs text-ghost mt-1 uppercase tracking-widest">
              Email Verified
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/add-post")}
          className="w-full py-3 bg-amber text-[oklch(0.08_0_0)] font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          Write a new post
        </button>
      </div>
    </div>
  );
}
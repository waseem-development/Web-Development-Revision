import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function PostCard({ $id, title, featuredImage, excerpt, author, date }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <article className="bg-surface border border-default rounded-2xl overflow-hidden hover-lift transition-all">
        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden bg-surface-raised">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tag placeholder */}
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-amber mb-3">
            Article
          </span>

          <h2 className="font-display text-xl font-semibold text-foreground leading-snug mb-3 group-hover:text-amber transition-colors line-clamp-2">
            {title}
          </h2>

          {excerpt && (
            <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
              {excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-subtle">
            <div className="flex items-center gap-2">
              {author && (
                <span className="text-xs text-ghost">{author}</span>
              )}
              {date && (
                <>
                  <span className="text-ghost text-xs">·</span>
                  <span className="text-xs text-ghost">{date}</span>
                </>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-amber opacity-0 group-hover:opacity-100 transition-opacity">
              Read
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
function FormCard({ title, description, children, footer }) {
  return (
    <div className="w-full max-w-md mx-auto bg-surface border border-default rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-subtle">
        {title && (
          <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm text-muted">{description}</p>
        )}
      </div>

      {/* Body */}
      <div className="px-8 py-6 flex flex-col gap-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-8 pb-8">
          {footer}
        </div>
      )}
    </div>
  );
}

export default FormCard;
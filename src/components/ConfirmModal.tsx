"use client";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border bg-white p-4 shadow-lg">
          <h4 className="font-semibold mb-1">{title}</h4>
          {description && (
            <p className="text-sm opacity-80 mb-4">{description}</p>
          )}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-2 text-sm rounded border"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-2 text-sm rounded bg-black text-white"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

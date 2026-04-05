import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectModal({ isOpen, onClose, onSuccess, project }: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setPreview(project.image.startsWith('http') ? project.image : `http://localhost:8001/storage/${project.image}`);
    } else {
      setTitle("");
      setImage(null);
      setPreview(null);
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);
    if (project) formData.append("_method", "PUT");

    const url = project 
      ? `http://localhost:8001/api/projects/${project.id}`
      : "http://localhost:8001/api/projects";

    try {
      const response = await fetch(url, {
        method: "POST", // Laravel handles PUT via _method in FormData
        headers: {
          "Authorization": `Bearer ${auth.getToken()}`,
          "Accept": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await response.json();
        alert(data.message || "Xəta baş verdi.");
      }
    } catch (error) {
      alert("Şəbəkə xətası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {project ? "Layihəni Redaktə Et" : "Yeni Layihə Əlavə Et"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Layihə Başlığı</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Məsələn: Modern Villa Dizaynı"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ef4444]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Layihə Şəkli</label>
              <div className="relative group border-2 border-dashed border-white/10 rounded-2xl p-4 transition-all hover:border-[#ef4444]/50">
                {preview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImage(null); setPreview(null); }}
                      className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center py-8 cursor-pointer">
                    <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-gray-400">Şəkil seçmək üçün klikləyin</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImage(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-white/10 text-gray-400 rounded-xl py-6"
              >
                Ləğv Et
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="flex-[2] bg-[#ef4444] hover:bg-[#dc2626] rounded-xl py-6 font-bold"
              >
                {loading ? "Yadda saxlanılır..." : "Yadda Saxla"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

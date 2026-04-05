import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import ProjectModal from "~/components/ProjectModal";

interface Project {
  id: number;
  title: string;
  image: string;
  created_at: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/login");
      return;
    }
    setUser(auth.getUser());
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Layihələr çəkilərkən xəta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const deleteProject = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Bu layihəni silmək istədiyinizə əminsiniz?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`http://localhost:8001/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${auth.getToken()}`,
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Silmə zamanı xəta: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      alert("Silmə zamanı server xətası baş verdi.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#ef4444]/30 border-t-[#ef4444] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <nav className="border-b border-white/5 bg-[#141414]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#ef4444] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-[#ef4444]/20">
              S
            </div>
            <div>
              <h2 className="text-lg font-bold leading-none">SemaliAdmin</h2>
              <p className="text-xs text-gray-400 mt-1">Xoş gəldiniz, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-white/10 hover:bg-white/5 text-gray-300 rounded-xl"
            >
              Çıxış Et
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Layihələr</h1>
            <p className="text-gray-400">Saytınızdakı layihələri idarə edin</p>
          </div>
          <Button 
            onClick={handleAddNew}
            className="bg-[#ef4444] hover:bg-[#dc2626] py-6 px-8 text-md font-semibold rounded-2xl shadow-lg shadow-[#ef4444]/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            + Yeni Layihə
          </Button>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-24 bg-[#141414]/50 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 mb-4">Hələ heç bir layihə əlavə edilməyib.</p>
            <Button onClick={handleAddNew} variant="link" className="text-[#ef4444]">İlk layihəni indi əlavə et</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-[#141414] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#ef4444]/50 hover:shadow-2xl hover:shadow-[#ef4444]/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image.startsWith('http') ? project.image : `http://localhost:8001/storage/${project.image}`} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 line-clamp-1">{project.title}</h3>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleEdit(project)}
                      variant="secondary" 
                      className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl py-5"
                    >
                      Redaktə
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={(e) => deleteProject(e, project.id)}
                      disabled={deletingId === project.id}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl p-0 w-11 shadow-none disabled:opacity-50"
                    >
                      {deletingId === project.id ? (
                        <div className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
        project={selectedProject}
      />
    </div>
  );
}

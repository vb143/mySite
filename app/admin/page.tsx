'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
    LogOut, Plus, Edit, Trash2, X,
    Calendar, Code, BookOpen, Link as LinkIcon, User, Save, Settings as SettingsIcon
} from 'lucide-react';

import { Navbar } from '@/components/ui/navbar';
import { AdminDataManager, Project, TimelineEvent, BlogPost, SocialLink, PersonalInfo, SiteSettings } from '@/lib/admin-data';
import { isAuthenticated, authenticate, logout } from '@/lib/admin-auth';
import { AdminForms } from "@/app/components/admin/AdminForms";

// Type conversion helpers
type ProjectFormData = {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    technologies: string;
    githubUrl: string;
};

type PostFormData = {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    coverImage: string;
    tags: string;
};

type SocialLinkFormData = {
    id?: string;
    platform: string;
    url: string;
    icon: string;
};

// Convert Project to ProjectFormData
function projectToFormData(project: Project | null | undefined): ProjectFormData | null {
    if (!project) return null;
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image || '',
        projectUrl: project.liveUrl || project.links?.live || '',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        githubUrl: project.githubUrl || project.links?.github || '',
    };
}

// Convert ProjectFormData to Project
function formDataToProject(formData: ProjectFormData): Project {
    return {
        id: formData.id || Date.now().toString(),
        title: formData.title,
        description: formData.description,
        longDescription: formData.description,
        image: formData.imageUrl,
        liveUrl: formData.projectUrl,
        githubUrl: formData.githubUrl,
        technologies: formData.technologies.split(',').map((t: string) => t.trim()),
        category: 'web' as const,
        featured: false,
        year: new Date().getFullYear().toString(),
        links: {
            live: formData.projectUrl,
            github: formData.githubUrl,
        },
    };
}

// Convert BlogPost to PostFormData
function blogPostToFormData(post: BlogPost | null | undefined): PostFormData | null {
    if (!post) return null;
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        coverImage: post.coverImage || '',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
    };
}

// Convert PostFormData to BlogPost
function formDataToBlogPost(formData: PostFormData): BlogPost {
    return {
        id: formData.id || Date.now().toString(),
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        coverImage: formData.coverImage,
        tags: formData.tags.split(',').map((t: string) => t.trim()),
        author: 'Admin',
        readTime: Math.ceil(formData.content.split(' ').length / 200) + ' min read',
        category: 'tutorial',
        featured: false,
    };
}

// Convert SocialLink to SocialLinkFormData
function socialLinkToFormData(link: SocialLink | null | undefined): SocialLinkFormData | null {
    if (!link) return null;
    return {
        id: link.id,
        platform: link.platform,
        url: link.url,
        icon: link.icon,
    };
}

// Convert SocialLinkFormData to SocialLink
function formDataToSocialLink(formData: SocialLinkFormData): SocialLink {
    return {
        id: formData.id || Date.now().toString(),
        platform: formData.platform,
        url: formData.url,
        username: formData.url.split('/').pop() || '',
        icon: formData.icon,
        visible: true,
    };
}

type AdminSection = 'timeline' | 'projects' | 'blog' | 'personal' | 'social' | 'settings';

interface LoginFormProps {
    onLogin: () => void;
}

function LoginForm({onLogin}: LoginFormProps) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authenticate(password)) {
            onLogin();
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient mb-2">Admin Login</h1>
                    <p className="text-[var(--color-text-secondary)]">Enter your password to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-[var(--color-primary)] text-black font-medium rounded-lg hover:bg-[var(--color-accent)] transition-colors duration-200"
                    >
                        Login to Admin Panel
                    </button>
                </form>
            </div>
        </div>
    );
}

interface TimelineFormProps {
    event?: TimelineEvent;
    onSave: (event: TimelineEvent) => void;
    onCancel: () => void;
}

function TimelineForm({event, onSave, onCancel}: TimelineFormProps) {
    const [formData, setFormData] = useState<TimelineEvent>(
        event || {
            id: Date.now().toString(),
            year: new Date().getFullYear().toString(),
            title: '',
            description: '',
            type: 'work',
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div
                className="bg-[var(--color-surface)] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{event ? 'Edit' : 'Add'} Timeline Event</h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-white"
                            aria-label="Close"
                        >
                            <X size={24}/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                            <input
                                type="text"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: e.target.value})}
                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                rows={3}
                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value as TimelineEvent['type']})}
                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white"
                                required
                            >
                                <option value="work">Work</option>
                                <option value="education">Education</option>
                                <option value="personal">Personal</option>
                                <option value="achievement">Achievement</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Location (Optional)</label>
                            <input
                                type="text"
                                value={formData.location || ''}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white"
                                placeholder="e.g., Mumbai, India"
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-accent)] rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeSection, setActiveSection] = useState<AdminSection>('timeline');
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(AdminDataManager.getDefaultPersonalInfo());
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(AdminDataManager.getDefaultSiteSettings());
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingPersonal, setIsSavingPersonal] = useState(false);
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Dialog state management
    const [activeDialog, setActiveDialog] = useState<{
        type: 'timeline' | 'project' | 'blog' | 'social' | null;
        data?: TimelineEvent | Project | BlogPost | SocialLink | null;
    }>({type: null, data: null});

    // Dialog helper functions
    const openTimelineForm = (event?: TimelineEvent) =>
        setActiveDialog({type: 'timeline', data: event || null});
    const openProjectForm = (project?: Project) =>
        setActiveDialog({type: 'project', data: project || null});
    const openBlogForm = (post?: BlogPost) =>
        setActiveDialog({type: 'blog', data: post || null});
    const openSocialForm = (link?: SocialLink) =>
        setActiveDialog({type: 'social', data: link || null});
    const closeDialog = () => setActiveDialog({type: null, data: null});

    // Load data on mount and when logged in
    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsLoggedIn(authStatus);
            if (authStatus) {
                loadData();
            }
        };
        checkAuth();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const [
                timelineData,
                projectsData,
                blogData,
                socialData,
                personalData,
                settingsData
            ] = await Promise.all([
                AdminDataManager.getTimelineEvents(),
                AdminDataManager.getProjects(),
                AdminDataManager.getBlogPosts(),
                AdminDataManager.getSocialLinks(),
                AdminDataManager.getPersonalInfo(),
                AdminDataManager.getSiteSettings()
            ]);

            setTimelineEvents(timelineData);
            setProjects(projectsData);
            setBlogPosts(blogData);
            setSocialLinks(socialData);
            setPersonalInfo(personalData);
            setSiteSettings(settingsData);
        } catch (error) {
            console.error('Error loading data:', error);
            // Handle error (e.g., show error message)
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        loadData();
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    // Save handlers
    const handleSaveTimelineEvent = async (event: TimelineEvent) => {
        try {
            if (activeDialog.data) {
                await AdminDataManager.updateTimelineEvent(
                    (activeDialog.data as TimelineEvent).id,
                    event
                );
            } else {
                await AdminDataManager.addTimelineEvent(event);
            }
            await loadData();
            closeDialog();
        } catch (error) {
            console.error('Error saving timeline event:', error);
            // Handle error
        }
    };

    const handleSaveProject = async (formData: ProjectFormData) => {
        try {
            const project = formDataToProject(formData);
            if (activeDialog.data) {
                await AdminDataManager.updateProject(
                    (activeDialog.data as Project).id,
                    project
                );
            } else {
                await AdminDataManager.addProject(project);
            }
            await loadData();
            closeDialog();
        } catch (error) {
            console.error('Error saving project:', error);
            // Handle error
        }
    };

    const handleSaveBlogPost = async (formData: PostFormData) => {
        try {
            const post = formDataToBlogPost(formData);
            if (activeDialog.data) {
                await AdminDataManager.updateBlogPost(
                    (activeDialog.data as BlogPost).id,
                    post
                );
            } else {
                await AdminDataManager.addBlogPost(post);
            }
            await loadData();
            closeDialog();
        } catch (error) {
            console.error('Error saving blog post:', error);
            // Handle error
        }
    };

    const handleSaveSocialLink = async (formData: SocialLinkFormData) => {
        try {
            const link = formDataToSocialLink(formData);
            if (activeDialog.data) {
                await AdminDataManager.updateSocialLink(
                    (activeDialog.data as SocialLink).id,
                    link
                );
            } else {
                await AdminDataManager.addSocialLink(link);
            }
            await loadData();
            closeDialog();
        } catch (error) {
            console.error('Error saving social link:', error);
            // Handle error
        }
    };

    // Delete handlers
    const handleDeleteTimelineEvent = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this timeline event?')) {
            try {
                await AdminDataManager.deleteTimelineEvent(id);
                await loadData();
            } catch (error) {
                console.error('Error deleting timeline event:', error);
                // Handle error
            }
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await AdminDataManager.deleteProject(id);
                await loadData();
            } catch (error) {
                console.error('Error deleting project:', error);
                // Handle error
            }
        }
    };

    const handleDeleteBlogPost = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await AdminDataManager.deleteBlogPost(id);
                await loadData();
            } catch (error) {
                console.error('Error deleting blog post:', error);
                // Handle error
            }
        }
    };

    const handleDeleteSocialLink = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this social link?')) {
            try {
                await AdminDataManager.deleteSocialLink(id);
                await loadData();
            } catch (error) {
                console.error('Error deleting social link:', error);
                // Handle error
            }
        }
    };

    // Personal Info handlers
    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSavePersonalInfo = async () => {
        try {
            setIsSavingPersonal(true);
            await AdminDataManager.savePersonalInfo(personalInfo);
            // Show success message (you can add a toast notification here)
            alert('Personal information saved successfully!');
        } catch (error) {
            console.error('Error saving personal info:', error);
            alert('Error saving personal information');
        } finally {
            setIsSavingPersonal(false);
        }
    };

    // Settings handlers
    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSiteSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveSettings = async () => {
        try {
            setIsSavingSettings(true);
            await AdminDataManager.saveSiteSettings(siteSettings);
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Error saving settings');
        } finally {
            setIsSavingSettings(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen">
                <Navbar/>
                <LoginForm onLogin={handleLogin}/>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    return (<div className="min-h-screen">
        <Navbar/>

        <div className="pt-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
                        <p className="text-[var(--color-text-secondary)]">
                            Manage your portfolio content
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 glass border-gradient rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                    >
                        <LogOut size={16}/>
                        <span>Logout</span>
                    </button>
                </div>

                {/* Section Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {(['timeline', 'projects', 'blog', 'social', 'personal', 'settings'] as const).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                                activeSection === section
                                    ? 'bg-[var(--color-primary)] text-black'
                                    : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="glass border-gradient rounded-xl p-4 md:p-6">
                    {activeSection === 'timeline' && (
                        <div>
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Timeline Events</h2>
                                <button
                                    onClick={() => openTimelineForm()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={16}/>
                                    <span>Add Event</span>
                                </button>
                            </div>

                            {timelineEvents.length === 0 ? (
                                <div className="text-center py-8 text-[var(--color-text-secondary)]">
                                    <Calendar className="mx-auto h-12 w-12 mb-4"/>
                                    <p>No timeline events yet. Add your first event!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {timelineEvents.map((event) => (
                                        <div key={event.id} className="p-4 bg-[var(--color-surface)] rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                                    <p className="text-[var(--color-text-secondary)] text-sm">{event.year}</p>
                                                    <p className="mt-2 text-sm">{event.description}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openTimelineForm(event)}
                                                        className="p-2 text-gray-400 hover:text-white"
                                                        aria-label="Edit"
                                                    >
                                                        <Edit size={16}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTimelineEvent(event.id)}
                                                        className="p-2 text-red-400 hover:text-red-300"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'projects' && (
                        <div>
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Projects</h2>
                                <button
                                    onClick={() => openProjectForm()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={16}/>
                                    <span>Add Project</span>
                                </button>
                            </div>

                            {projects.length === 0 ? (
                                <div className="text-center py-8 text-[var(--color-text-secondary)]">
                                    <Code className="mx-auto h-12 w-12 mb-4"/>
                                    <p>No projects yet. Add your first project!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="p-4 bg-[var(--color-surface)] rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{project.title}</h3>
                                                    <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                                                        {project.technologies?.join(', ')}
                                                    </p>
                                                    <p className="mt-2 text-sm line-clamp-2">{project.description}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openProjectForm(project)}
                                                        className="p-2 text-gray-400 hover:text-white"
                                                        aria-label="Edit"
                                                    >
                                                        <Edit size={16}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProject(project.id)}
                                                        className="p-2 text-red-400 hover:text-red-300"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'blog' && (
                        <div>
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Blog Posts</h2>
                                <button
                                    onClick={() => openBlogForm()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={16}/>
                                    <span>Add Post</span>
                                </button>
                            </div>

                            {blogPosts.length === 0 ? (
                                <div className="text-center py-8 text-[var(--color-text-secondary)]">
                                    <BookOpen className="mx-auto h-12 w-12 mb-4"/>
                                    <p>No blog posts yet. Write your first post!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {blogPosts.map((post: BlogPost) => (
                                        <div key={post.id} className="p-4 bg-[var(--color-surface)] rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                                    <p className="text-[var(--color-text-secondary)] text-sm">
                                                        {new Date(post?.publishedAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="mt-2 text-sm line-clamp-2">{post.excerpt}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openBlogForm(post)}
                                                        className="p-2 text-gray-400 hover:text-white"
                                                        aria-label="Edit"
                                                    >
                                                        <Edit size={16}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBlogPost(post.id)}
                                                        className="p-2 text-red-400 hover:text-red-300"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'social' && (
                        <div>
                            <div
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Social Links</h2>
                                <button
                                    onClick={() => openSocialForm()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors w-full sm:w-auto justify-center"
                                >
                                    <Plus size={16}/>
                                    <span>Add Link</span>
                                    </button>
                            </div>

                            {socialLinks.length === 0 ? (
                                <div className="text-center py-8 text-[var(--color-text-secondary)]">
                                    <LinkIcon className="mx-auto h-12 w-12 mb-4"/>
                                    <p>No social links yet. Add your first link!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {socialLinks.map((link) => (
                                        <div key={link.id} className="p-4 bg-[var(--color-surface)] rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        {link.icon && (
                                                            <span className="text-lg">{link.icon}</span>
                                                        )}
                                                        <h3 className="text-lg font-semibold">{link.platform}</h3>
                                                    </div>
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[var(--color-primary)] hover:underline text-sm mt-1 inline-block"
                                                    >
                                                        {link.url}
                                                    </a>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openSocialForm(link)}
                                                        className="p-2 text-gray-400 hover:text-white"
                                                        aria-label="Edit"
                                                    >
                                                        <Edit size={16}/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSocialLink(link.id)}
                                                        className="p-2 text-red-400 hover:text-red-300"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === 'personal' && (
                        <div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Personal Information</h2>
                                <button
                                    onClick={handleSavePersonalInfo}
                                    disabled={isSavingPersonal}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors w-full sm:w-auto justify-center disabled:opacity-50"
                                >
                                    <Save size={16}/>
                                    <span>{isSavingPersonal ? 'Saving...' : 'Save Changes'}</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Basic Information */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-lg">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <User className="text-[var(--color-primary)]" size={20} />
                                        <h3 className="text-lg font-semibold">Basic Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={personalInfo.name}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Professional Title *</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={personalInfo.title}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="e.g., Full Stack Developer"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Tagline *</label>
                                            <input
                                                type="text"
                                                name="tagline"
                                                value={personalInfo.tagline}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="A catchy tagline that describes you"
                                                required
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Bio *</label>
                                            <textarea
                                                name="bio"
                                                value={personalInfo.bio}
                                                onChange={handlePersonalInfoChange}
                                                rows={4}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="Tell us about yourself..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-lg">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <LinkIcon className="text-[var(--color-primary)]" size={20} />
                                        <h3 className="text-lg font-semibold">Contact Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={personalInfo.location}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="e.g., Mumbai, India"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={personalInfo.email}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Phone (Optional)</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={personalInfo.phone || ''}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="+91 9876543210"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image URL (Optional)</label>
                                            <input
                                                type="url"
                                                name="profileImage"
                                                value={personalInfo.profileImage || ''}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="https://example.com/profile.jpg"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Resume URL (Optional)</label>
                                            <input
                                                type="url"
                                                name="resumeUrl"
                                                value={personalInfo.resumeUrl || ''}
                                                onChange={handlePersonalInfoChange}
                                                className="w-full px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                                                placeholder="https://example.com/resume.pdf"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-lg">
                                    <h3 className="text-lg font-semibold mb-4">Preview</h3>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <span className="text-gray-400">Name:</span>
                                            <span className="ml-2 text-white font-medium">{personalInfo.name}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Title:</span>
                                            <span className="ml-2 text-white">{personalInfo.title}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Tagline:</span>
                                            <span className="ml-2 text-white italic">{personalInfo.tagline}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Location:</span>
                                            <span className="ml-2 text-white">{personalInfo.location}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Email:</span>
                                            <span className="ml-2 text-white">{personalInfo.email}</span>
                                        </div>
                                        {personalInfo.phone && (
                                            <div>
                                                <span className="text-gray-400">Phone:</span>
                                                <span className="ml-2 text-white">{personalInfo.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'settings' && (
                        <div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold">Site Settings</h2>
                                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">Customize your portfolio appearance and content</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Column - Settings Forms */}
                                <div className="lg:col-span-2 space-y-6">
                                {/* General Site Settings */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg">
                                            <SettingsIcon className="text-[var(--color-primary)]" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">General Settings</h3>
                                            <p className="text-xs text-gray-400">Basic site information</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Site Title *</label>
                                            <input
                                                type="text"
                                                name="siteTitle"
                                                value={siteSettings.siteTitle}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                                placeholder="Your Portfolio - Full Stack Developer"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Site Description *</label>
                                            <textarea
                                                name="siteDescription"
                                                value={siteSettings.siteDescription}
                                                onChange={handleSettingsChange}
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                                placeholder="A brief description of your portfolio site"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Hero Section Settings */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-blue-500 transition-colors">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Code className="text-blue-500" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Hero Section</h3>
                                            <p className="text-xs text-gray-400">Landing page hero content</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Hero Heading *</label>
                                            <input
                                                type="text"
                                                name="heroHeading"
                                                value={siteSettings.heroHeading}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Welcome to My Digital Journey"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Hero Subheading *</label>
                                            <input
                                                type="text"
                                                name="heroSubheading"
                                                value={siteSettings.heroSubheading}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Crafting experiences through code and creativity"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* About Section Settings */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-green-500 transition-colors">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <User className="text-green-500" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">About Section</h3>
                                            <p className="text-xs text-gray-400">About page content</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">About Heading *</label>
                                            <input
                                                type="text"
                                                name="aboutHeading"
                                                value={siteSettings.aboutHeading}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="About Me"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">About Description *</label>
                                            <textarea
                                                name="aboutDescription"
                                                value={siteSettings.aboutDescription}
                                                onChange={handleSettingsChange}
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="Get to know my story, skills, and passion for technology"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Projects Section Settings */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-purple-500 transition-colors">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Code className="text-purple-500" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Projects Section</h3>
                                            <p className="text-xs text-gray-400">Projects showcase content</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Projects Heading *</label>
                                            <input
                                                type="text"
                                                name="projectsHeading"
                                                value={siteSettings.projectsHeading}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                placeholder="My Projects"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Projects Description *</label>
                                            <textarea
                                                name="projectsDescription"
                                                value={siteSettings.projectsDescription}
                                                onChange={handleSettingsChange}
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                placeholder="Explore my latest work and creative solutions"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Blog Section Settings */}
                                <div className="p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-pink-500 transition-colors">
                                    <div className="flex items-center space-x-3 mb-5">
                                        <div className="p-2 bg-pink-500/10 rounded-lg">
                                            <BookOpen className="text-pink-500" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Blog Section</h3>
                                            <p className="text-xs text-gray-400">Blog page content</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Blog Heading *</label>
                                            <input
                                                type="text"
                                                name="blogHeading"
                                                value={siteSettings.blogHeading}
                                                onChange={handleSettingsChange}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                                placeholder="Thoughts & Insights"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Blog Description *</label>
                                            <textarea
                                                name="blogDescription"
                                                value={siteSettings.blogDescription}
                                                onChange={handleSettingsChange}
                                                rows={3}
                                                className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                                placeholder="Sharing knowledge and experiences from my journey"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                </div>

                                {/* Right Column - Preview & Actions */}
                                <div className="lg:col-span-1 space-y-6">
                                    {/* Save Button - Sticky */}
                                    <div className="sticky top-24">
                                        <div className="p-6 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-xl border border-[var(--color-primary)]/30">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold mb-1">Save Changes</h3>
                                                <p className="text-xs text-gray-400">Apply your settings to the site</p>
                                            </div>
                                            <button
                                                onClick={handleSaveSettings}
                                                disabled={isSavingSettings}
                                                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[var(--color-primary)] text-black font-medium rounded-lg hover:bg-[var(--color-accent)] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                                            >
                                                {isSavingSettings ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={18}/>
                                                        <span>Save All Settings</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Live Preview */}
                                        <div className="mt-6 p-6 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                                <span className="mr-2">📋</span>
                                                Live Preview
                                            </h3>
                                            <div className="space-y-4 text-sm">
                                                <div className="p-3 bg-[var(--color-background)] rounded-lg border-l-4 border-[var(--color-primary)]">
                                                    <h4 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wide text-[var(--color-primary)]">General</h4>
                                                    <p className="text-white font-medium mb-1 line-clamp-1">{siteSettings.siteTitle || 'Site Title'}</p>
                                                    <p className="text-gray-400 text-xs line-clamp-2">{siteSettings.siteDescription || 'Site description'}</p>
                                                </div>
                                                
                                                <div className="p-3 bg-[var(--color-background)] rounded-lg border-l-4 border-blue-500">
                                                    <h4 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wide text-blue-500">Hero</h4>
                                                    <p className="text-white font-medium mb-1 line-clamp-1">{siteSettings.heroHeading || 'Hero heading'}</p>
                                                    <p className="text-gray-400 text-xs italic line-clamp-2">{siteSettings.heroSubheading || 'Hero subheading'}</p>
                                                </div>

                                                <div className="p-3 bg-[var(--color-background)] rounded-lg border-l-4 border-green-500">
                                                    <h4 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wide text-green-500">About</h4>
                                                    <p className="text-white font-medium mb-1 line-clamp-1">{siteSettings.aboutHeading || 'About heading'}</p>
                                                    <p className="text-gray-400 text-xs italic line-clamp-2">{siteSettings.aboutDescription || 'About description'}</p>
                                                </div>

                                                <div className="p-3 bg-[var(--color-background)] rounded-lg border-l-4 border-purple-500">
                                                    <h4 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wide text-purple-500">Projects</h4>
                                                    <p className="text-white font-medium mb-1 line-clamp-1">{siteSettings.projectsHeading || 'Projects heading'}</p>
                                                    <p className="text-gray-400 text-xs italic line-clamp-2">{siteSettings.projectsDescription || 'Projects description'}</p>
                                                </div>

                                                <div className="p-3 bg-[var(--color-background)] rounded-lg border-l-4 border-pink-500">
                                                    <h4 className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wide text-pink-500">Blog</h4>
                                                    <p className="text-white font-medium mb-1 line-clamp-1">{siteSettings.blogHeading || 'Blog heading'}</p>
                                                    <p className="text-gray-400 text-xs italic line-clamp-2">{siteSettings.blogDescription || 'Blog description'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Form Dialogs */}
        <AnimatePresence>
            {activeDialog.type === 'timeline' && (
                <TimelineForm
                    event={activeDialog.data as TimelineEvent | undefined}
                    onSave={handleSaveTimelineEvent}
                    onCancel={closeDialog}
                />
            )}

            {activeDialog.type === 'project' && (
                <AdminForms
                    type="project"
                    initialData={projectToFormData(activeDialog.data as Project | null | undefined)}
                    onSave={handleSaveProject}
                    onCancel={closeDialog}
                />
            )}

            {activeDialog.type === 'blog' && (
                <AdminForms
                    type="post"
                    initialData={blogPostToFormData(activeDialog.data as BlogPost | null | undefined)}
                    onSave={handleSaveBlogPost}
                    onCancel={closeDialog}
                />
            )}

            {activeDialog.type === 'social' && (
                <AdminForms
                    type="social"
                    initialData={socialLinkToFormData(activeDialog.data as SocialLink | null | undefined)}
                    onSave={handleSaveSocialLink}
                    onCancel={closeDialog}
                />
            )}
        </AnimatePresence>
    </div>)
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Image as ImageIcon, ExternalLink, FileText } from 'lucide-react';

export type FormType = 'project' | 'post' | 'social';

export interface ProjectFormData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies: string;
  githubUrl: string;
}

export interface PostFormData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage: string;
  tags: string;
}

export interface SocialLinkFormData {
  id?: string;
  platform: string;
  url: string;
  icon: string;
}

type FormDataMap = {
  project: ProjectFormData;
  post: PostFormData;
  social: SocialLinkFormData;
};

interface AdminFormsProps<T extends FormType> {
  type: T;
  initialData?: FormDataMap[T] | null;
  onSave: (data: FormDataMap[T]) => void | Promise<void>;
  onCancel: () => void;
}

export function AdminForms<T extends FormType>({ type, initialData, onSave, onCancel }: AdminFormsProps<T>) {
  const [formData, setFormData] = useState<FormDataMap[T]>(
    initialData || getDefaultFormData(type)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(getDefaultFormData(type));
    }
  }, [type, initialData]);

  function getDefaultFormData(type: T): FormDataMap[T] {
    const now = new Date().toISOString().split('T')[0];
    
    switch (type) {
      case 'project':
        return {
          title: '',
          description: '',
          imageUrl: '',
          projectUrl: '',
          technologies: '',
          githubUrl: ''
        } as FormDataMap[T];
      case 'post':
        return {
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          publishedAt: now,
          coverImage: '',
          tags: ''
        } as FormDataMap[T];
      case 'social':
        return {
          platform: '',
          url: '',
          icon: ''
        } as FormDataMap[T];
      default:
        return {} as never;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Pass form data to parent - parent will handle conversion
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'project':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={(formData as ProjectFormData).title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={(formData as ProjectFormData).description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Project URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="projectUrl"
                      value={(formData as ProjectFormData).projectUrl}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    GitHub URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.254-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.398.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.34 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C20.565 20.195 24 16.436 24 12.017 24 6.484 19.522 2 12 2z" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      name="githubUrl"
                      value={(formData as ProjectFormData).githubUrl}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={(formData as ProjectFormData).technologies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, Next.js, Tailwind CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cover Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="imageUrl"
                    value={(formData as ProjectFormData).imageUrl}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 'post':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                value={(formData as PostFormData).title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={(formData as PostFormData).slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="my-awesome-post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Publish Date *
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  value={(formData as PostFormData).publishedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={(formData as PostFormData).excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Content (Markdown) *
              </label>
              <textarea
                name="content"
                value={(formData as PostFormData).content}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cover Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="coverImage"
                    value={(formData as PostFormData).coverImage}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={(formData as PostFormData).tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="react, nextjs, typescript"
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Platform *
              </label>
              <input
                type="text"
                name="platform"
                value={(formData as SocialLinkFormData).platform}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="GitHub, Twitter, LinkedIn, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="url"
                  value={(formData as SocialLinkFormData).url}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Icon Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="icon"
                  value={(formData as SocialLinkFormData).icon}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="github, twitter, linkedin, etc."
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Use icon names from Lucide Icons (e.g., github, twitter, linkedin)
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div 
        className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="sticky top-0 bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {initialData?.id ? `Edit ${type}` : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {renderFormFields()}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-2 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{initialData?.id ? 'Save Changes' : 'Create'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

import { ProjectRepository } from '../repositories/project_repositories';
import { CreateProjectDto, UpdateProjectDto, ImageUploadResponse } from '../dtos/project_dto';
import { Project } from '../entities/project_entity';
import { ImageUploadUtil } from '../utils/image_uploader';

export class ProjectService {
  private projectRepository: ProjectRepository;
  private imageUploadUtil: ImageUploadUtil;

  constructor() {
    this.projectRepository = new ProjectRepository();
    this.imageUploadUtil = new ImageUploadUtil();
  }

  async createProject(dto: CreateProjectDto): Promise<{ 
    success: boolean; 
    error?: string; 
    project?: Project 
  }> {
    try {
      const { project, error } = await this.projectRepository.createProject(dto);
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, project };
    } catch (error) {
      return { success: false, error: 'Project creation failed' };
    }
  }

  async editProject(id: string, dto: UpdateProjectDto): Promise<{ 
    success: boolean; 
    error?: string; 
    project?: Project 
  }> {
    try {
      const { project: existingProject, error: fetchError } = await this.projectRepository.getProjectById(id);
      if (fetchError || !existingProject) {
        return { success: false, error: 'Project not found' };
      }

      // Build update object with fallbacks to existing values
      const updateData: UpdateProjectDto = {
        groomName: (dto.groomName && dto.groomName.trim()) || existingProject.groomName,
        brideName: (dto.brideName && dto.brideName.trim()) || existingProject.brideName,
        slug: (dto.slug && dto.slug.trim()) || existingProject.slug
      };

      if (Object.keys(updateData).length === 0) {
        const { project, error } = await this.projectRepository.getProjectById(id);
        if (error) {
          return { success: false, error: 'Project not found' };
        }
        return { success: true, project };
      }

      const { project, error } = await this.projectRepository.updateProject(id, updateData);
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Project not found or no changes were applied.' };
        }
        return { success: false, error: error.message || 'Failed to update project due to a database error.' };
      }

      return { success: true, project };
    } catch (error) {
      return { success: false, error: 'Project update failed' };
    }
  }

  async getAllProjects(): Promise<{ 
    success: boolean; 
    error?: string; 
    projects?: Project[] 
  }> {
    try {
      const { projects, error } = await this.projectRepository.getAllProjects();
      if (error) {
        return { success: false, error: 'failed to fetch projects list' };
      }

      return { success: true, projects };
    } catch (error) {
      return { success: false, error: 'Failed to fetch projects' };
    }
  }

  async deactivateProject(projectId: string): Promise<{ 
    success: boolean; 
    error?: string; 
    project?: Project 
  }> {
    try {
      const { project, error } = await this.projectRepository.updateProjectStatus(projectId, false);
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Project not found or already inactive.' };
        }
        return { success: false, error: 'Failed to deactivate project.' };
      }

      return { success: true, project };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }

  async activateProject(projectId: string): Promise<{ 
    success: boolean; 
    error?: string; 
    project?: Project 
  }> {
    try {
      const { project, error } = await this.projectRepository.updateProjectStatus(projectId, true);
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Project not found or already active.' };
        }
        return { success: false, error: 'Failed to activate project.' };
      }

      return { success: true, project };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }

  async deleteProject(projectId: string): Promise<{ 
    success: boolean; 
    error?: string; 
    project?: Project 
  }> {
    try {
      const { project, error } = await this.projectRepository.deleteProject(projectId);
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Project not found or no changes were made.' };
        }
        return { success: false, error: 'Failed to delete project.' };
      }

      return { success: true, project };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }

   async uploadProjectImages(
    slugName: string,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<{ 
    success: boolean; 
    error?: string; 
    uploadResult?: ImageUploadResponse 
  }> {
    try {
      // Business validation - verify project exists
      const { project, error: projectError } = await this.projectRepository.getProjectBySlug(slugName);
      if (projectError) {
        return { success: false, error: 'Project not found' };
      }

      if (!files || Object.keys(files).length === 0) {
        return { success: false, error: 'No files upload found' };
      }

      const { uploadResult, error } = await this.imageUploadUtil.uploadImages(slugName, files);
      if (error) {
        return { success: false, error: error.message || 'Internal server error during image upload.' };
      }

      return { success: true, uploadResult };
    } catch (error) {
      return { success: false, error: 'Image upload failed' };
    }
  }
}
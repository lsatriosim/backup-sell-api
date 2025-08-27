import { IntroPrayRepository } from '../repositories/intro_pray_repositories';
import { CreateProjectDto, UpdateProjectDto,  } from '../dtos/project_dto';
import { BrideGroomDetail, IntroPray, Project } from '../entities/project_entity';
import { CreateBrideGroomDetail, CreateIntroPrayDto, UpdateBrideGroomDetail, UpdateIntroPrayDto, IntroPrayResponse, BrideGroomDetailResponse } from 'dtos/intro_pray_dto';

export class IntroPrayService {
  private introPrayRepository: IntroPrayRepository;

  constructor() {
    this.introPrayRepository = new IntroPrayRepository();
  }

  async createBrideGroomDetail(dto: CreateBrideGroomDetail, id: string): Promise<{ 
    success: boolean; 
    error?: string; 
    brideGroomDetail?: BrideGroomDetail; 
  }> {
    try {
      // Check if bride/groom detail already exists for this project and type
      const existingDetail = await this.introPrayRepository.getIntroPrayByProjectId(id);
      
      if (existingDetail.introPray && !existingDetail.error) {
        return { 
          success: false, 
          error: `Intro and Pray already registered for this Project` 
        };
      }

      const { brideGroomDetail, error } = await this.introPrayRepository.createBrideGroomDetail(dto);
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, brideGroomDetail };
    } catch (error) {
      return { success: false, error: 'Bride/Groom detail creation failed' };
    }
  }

  async updateBrideGroomDetail(dto: UpdateBrideGroomDetail): Promise<{ 
    success: boolean; 
    error?: string; 
    brideGroomDetail?: BrideGroomDetail; 
  }> {
    try {
      const { brideGroomDetail, error } = await this.introPrayRepository.updateBrideGroomDetail(dto);
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, brideGroomDetail };
    } catch (error) {
      return { success: false, error: 'Bride/Groom detail update failed' };
    }
  }

  async getBrideGroomById(id: string): Promise<{ 
    success: boolean; 
    error?: string;
    brideGroom?: BrideGroomDetailResponse; 
  }> {
    try {
      const { brideGroomDetail: brideGroomDetail, error: brideError } = await this.introPrayRepository.getBrideGroomDetailById(id);
      if (brideError) {
        return { success: false, error: 'Failed to get bride details' };
      }

      return { success: true, brideGroom: brideGroomDetail };
    } catch (error) {
      return { success: false, error: 'Failed to get Intro and Pray data' };
    }
  }

  async createIntroPray(dto: CreateIntroPrayDto): Promise<{ 
    success: boolean; 
    error?: string; 
    introPray?: IntroPray; 
  }> {
    try {
      // Check if intro pray already exists for this project
      const existingIntroPray = await this.introPrayRepository.getIntroPrayByProjectId(dto.projectId);
      
      if (existingIntroPray.introPray && !existingIntroPray.error) {
        return { 
          success: false, 
          error: 'Intro and Pray already exists for this project' 
        };
      }

      const { introPray, error } = await this.introPrayRepository.createIntroPray(dto);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, introPray };
    } catch (error) {
      return { success: false, error: 'Intro and Pray creation failed' };
    }
  }

  async updateIntroPray(dto: UpdateIntroPrayDto): Promise<{ 
    success: boolean; 
    error?: string; 
    introPray?: IntroPray; 
  }> {
    try {
      const { introPray, error } = await this.introPrayRepository.updateIntroPray(dto);
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, introPray };
    } catch (error) {
      return { success: false, error: 'Intro and Pray update failed' };
    }
  }

  async getIntroPrayByProjectId(projectId: string): Promise<{ 
    success: boolean; 
    error?: string; 
    introPray?: IntroPrayResponse; 
  }> {
    try {
      const { introPray, error } = await this.introPrayRepository.getIntroPrayByProjectId(projectId);
      if (error) {
        return { success: false, error: error.message };
      }

      if (!introPray) {
        return { success: false, error: 'Intro and Pray not found' };
      }

      // Get bride details by project ID and type
      const { brideGroomDetail: brideDetail, error: brideError } = await this.introPrayRepository.getBrideGroomDetailById(introPray.brideDetails);
      if (brideError) {
        return { success: false, error: 'Failed to get bride details' };
      }

      // Get groom details by project ID and type
      const { brideGroomDetail: groomDetail, error: groomError } = await this.introPrayRepository.getBrideGroomDetailById(introPray.groomDetails);
      if (groomError) {
        return { success: false, error: 'Failed to get groom details' };
      }

      const introPrayResponse: IntroPrayResponse = {
        id: introPray.id,
        projectId: introPray.projectId,
        verseTitle: introPray.verseTitle,
        verseContent: introPray.verseContent,
        invitationCaption: introPray.invitationCaption,
        brideDetails: brideDetail,
        groomDetails: groomDetail,
      };

      return { success: true, introPray: introPrayResponse };
    } catch (error) {
      return { success: false, error: 'Failed to get Intro and Pray data' };
    }
  }

  
}
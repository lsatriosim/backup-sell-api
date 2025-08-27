import { EventRepository } from '../repositories/event_repositories';
import { ProjectRepository } from '../repositories/project_repositories';
import { CreateEventDto, UpdateEventDto } from '../dtos/project_dto';
import { Event } from '../entities/event_entity';

export class EventService {
  private eventRepository: EventRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.eventRepository = new EventRepository();
    this.projectRepository = new ProjectRepository();
  }

  async createEvent(slugName: string, eventData: {
    eventType: string;
    locationDescription: string;
    locationName: string;
    locationUrl: string;
    timeStart: string;
    timeEnd?: string;
  }): Promise<{ 
    success: boolean; 
    error?: string; 
    event?: Event 
  }> {
    try {
      // Verify couple exists
      const { project, error: projectError } = await this.projectRepository.getProjectBySlug(slugName);
      if (projectError) {
        return { success: false, error: projectError.message || 'slug couple not found' };
      }

      // Business validation
      if (!eventData.eventType || !eventData.locationDescription || 
          !eventData.locationName || !eventData.locationUrl || !eventData.timeStart) {
        return { success: false, error: 'Missing required fields' };
      }

      const createEventDto: CreateEventDto = {
        projectId: project.id,
        eventType: eventData.eventType,
        locationDescription: eventData.locationDescription,
        locationName: eventData.locationName,
        locationUrl: eventData.locationUrl,
        time_start: eventData.timeStart,
        time_end: eventData.timeEnd
      };

      const { event, error: createError } = await this.eventRepository.createEvent(createEventDto);
      if (createError) {
        return { success: false, error: createError.message || 'Failed to create event.' };
      }

      return { success: true, event };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }

  async editEvent(id: string, eventData: {
    eventType: string;
    locationDescription: string;
    locationName: string;
    locationUrl: string;
    timeStart: string;
    timeEnd?: string;
  }): Promise<{ 
    success: boolean; 
    error?: string; 
    event?: Event 
  }> {
    try {
      const existingEvent = await this.eventRepository.getEventById(id);
      if (!existingEvent){
        return { success: false, error: 'Event not found' };
      }

      const updateEventDto: UpdateEventDto = {
        eventType: eventData.eventType || existingEvent.event.eventType,
        locationDescription: eventData.locationDescription || existingEvent.event.locationDescription,
        locationName: eventData.locationName || existingEvent.event.locationName,
        locationUrl: eventData.locationUrl || existingEvent.event.locationUrl,
        time_start: eventData.timeStart || existingEvent.event.timeStart,
        time_end: eventData.timeEnd || existingEvent.event.timeEnd
      };

      const { event, error: updateError } = await this.eventRepository.updateEvent(id, updateEventDto);
      if (updateError) {
        if (updateError.code === 'PGRST116') {
          return { success: false, error: 'Event not found' };
        }
        return { success: false, error: updateError.message || 'Failed to update event.' };
      }

      return { success: true, event };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }

  async getEventsByCoupleSlug(slugName: string): Promise<{ 
    success: boolean; 
    error?: string; 
    events?: Event[] 
  }> {
    try {
      const { project, error: projectError } = await this.projectRepository.getProjectBySlug(slugName);
      if (projectError) {
        return { success: false, error: projectError.message || 'slug couple not found' };
      }

      const { events, error } = await this.eventRepository.getEventsByProjectId(project.id);
      if (error) {
        return { success: false, error: 'failed to fetch couples list' };
      }
      console.log(events);
      return { success: true, events: events };
    } catch (error) {
      return { success: false, error: 'Failed to fetch events' };
    }
  }

  async deleteEvent(eventId: string): Promise<{ 
    success: boolean; 
    error?: string; 
    event?: Event 
  }> {
    try {
      const { event, error } = await this.eventRepository.deleteEvent(eventId);
      if (error) {
        if (error.code === 'PGRST116') {
          return { success: false, error: 'Event not found or no changes were made.' };
        }
        return { success: false, error: 'Failed to delete event.' };
      }

      return { success: true, event };
    } catch (error) {
      return { success: false, error: 'An unexpected server error occurred.' };
    }
  }
}

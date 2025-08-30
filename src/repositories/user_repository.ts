import { supabase } from '../lib/supabaseClient';
import { RegisterUserDto, LoginUserDto } from '../dtos/user_dto';
import { User } from '../entities/user_entity';

export class UserRepository {
  async createUser(dto: RegisterUserDto): Promise<{ user: User; error?: any }> {
    const { data, error } = await supabase.auth.admin.createUser({
    email: dto.email,
    password: dto.password,
    user_metadata: {
      name: dto.name
    },
    email_confirm: true
  });

    if (error) {
      return { user: null as any, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.ame,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at || data.user.created_at,
      phone: data.user.phone
    };

    return { 
      user: user
    };
  }

  async signInUser(dto: LoginUserDto): Promise<{ user: User; error?: any }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password
    });

    if (error) {
      return { user: null as any, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at || data.user.created_at,
      phone: data.user.phone
    };

    return { 
      user: user 
    };
  }

  async getUserById(userId: string): Promise<{ user: User; error?: any }> {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
      return { user: null as any, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at || data.user.created_at,
      phone: data.user.phone
    };

    return { user: user as User };
  }

  async updateUser(userId: string, updates: { name?: string; phone?: string }): 
    Promise<{ user: User; error?: any }> {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      phone: updates.phone,
      user_metadata: {
        ...(updates.name && { name: updates.name }),
      },
    });

    if (error) {
      return { user: null as any, error };
    }

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      phone: data.user.phone,
      created_at: data.user.created_at,
      updated_at: data.user.updated_at || data.user.created_at
    };

    return { user };
  }
}
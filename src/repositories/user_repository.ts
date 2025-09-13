import { supabase } from '../lib/supabaseClient';
import { RegisterUserDto, LoginUserDto } from '../dtos/user_dto';
import { User } from '../entities/user_entity';

export class UserRepository {
  async createUser(dto: RegisterUserDto): Promise<{ user: User; accessToken?: string; error?: any }> {
    const { data, error } = await supabase.auth.admin.createUser({
    email: dto.email,
    password: dto.password,
    user_metadata: {
      name: dto.name
    },
    phone: dto.phone,
    email_confirm: true
  });

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password
    });

     if (loginError || error) {
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
      user: user,
      accessToken: loginData.session.access_token
    };
  }

  async signInUser(dto: LoginUserDto): Promise<{ user: User; accessToken?: string; error?: any }> {
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
      user: user,
      accessToken: data.session.access_token
    };
  }

  async getUserById(jwtToken: string): Promise<{ user: User; error?: any }> {
    const { data, error } = await supabase.auth.getUser(jwtToken);
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

  async logoutUser(): Promise<{ success: boolean; error?: any }> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  }
}
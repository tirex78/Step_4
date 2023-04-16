import { CreateProfileDto } from '../dto/create-profile.dto';

interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ProfilesService {
  createProfile(profile: CreateProfileDto): Promise<Profile>;
  getAllProfiles(params: {}): Promise<Profile>;
}

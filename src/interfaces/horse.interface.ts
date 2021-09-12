import IProfile from './profile.interface';

export default interface IHorseDto {
  id: string;
  name: string;
  profile: IProfile;
}
